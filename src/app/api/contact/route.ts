import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import dateFormat from "dateformat";

import {
  CONTACT_ADDON_MAX,
  CONTACT_COMPANY_MAX,
  contactSubjects,
} from "@/constants/contact";

const notionApiKey = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const notionDatabaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_KEY;

const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;

type NotionDatabaseWithSources = {
  data_sources?: Array<{ id?: string }>;
};

let cachedDataSourceId: string | null = null;

async function resolveDataSourceId(
  client: Client,
  databaseId: string
): Promise<string | null> {
  if (cachedDataSourceId) return cachedDataSourceId;

  const database = (await client.databases.retrieve({
    database_id: databaseId,
  })) as NotionDatabaseWithSources;

  const dataSourceId = database.data_sources?.[0]?.id;
  if (!dataSourceId) return null;

  cachedDataSourceId = dataSourceId;
  return dataSourceId;
}

const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const SUBJECT_VALUES = new Set<string>(Object.values(contactSubjects));
const RECRUITER_SUBJECT = contactSubjects.recruiter;
const MAX_EMAIL_LOCAL_LENGTH = 64;
const MAX_EMAIL_DOMAIN_LENGTH = 255;

const isValidEmail = (email: string): boolean => {
  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@")) return false;

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (
    local.length > MAX_EMAIL_LOCAL_LENGTH ||
    domain.length < 3 ||
    domain.length > MAX_EMAIL_DOMAIN_LENGTH
  ) {
    return false;
  }
  if (local.includes(" ") || domain.includes(" ")) return false;

  const lastDot = domain.lastIndexOf(".");
  if (lastDot < 1 || lastDot === domain.length - 1) return false;
  if (domain.includes("..")) return false;

  return true;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (req: Request): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const current = requestsByIp.get(ip);
  if (!current || now > current.resetAt) {
    requestsByIp.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  current.count += 1;
  requestsByIp.set(ip, current);
  return false;
};

const parsePayload = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;
  const name = typeof obj.name === "string" ? obj.name.trim() : "";
  const email = typeof obj.email === "string" ? obj.email.trim().toLowerCase() : "";
  const message = typeof obj.message === "string" ? obj.message.trim() : "";
  const subject = typeof obj.subject === "string" ? obj.subject.trim() : "";
  const addon = typeof obj.addon === "string" ? obj.addon.trim() : "";
  const company = typeof obj.company === "string" ? obj.company.trim() : "";

  if (!name || !email || !message || !subject || !addon) return null;
  if (!isValidEmail(email)) return null;
  if (!SUBJECT_VALUES.has(subject)) return null;
  if (name.length > MAX_NAME_LENGTH) return null;
  if (message.length > MAX_MESSAGE_LENGTH) return null;
  if (addon.length > CONTACT_ADDON_MAX) return null;

  let notionMessage = message;
  if (subject === RECRUITER_SUBJECT) {
    if (!company || company.length > CONTACT_COMPANY_MAX) return null;
    notionMessage = `Empresa: ${company}\n\n${message}`;
    if (notionMessage.length > MAX_MESSAGE_LENGTH) return null;
  }

  return { name, email, message: notionMessage, subject, addon };
};

type NotionPropertySchema = {
  type?: string;
};

type NotionRichText = {
  plain_text?: string;
};

type NotionPageProperty = {
  type?: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: { name?: string } | null;
  status?: { name?: string } | null;
  url?: string | null;
  email?: string | null;
};

function richTextValue(content: string) {
  return {
    rich_text: [
      {
        type: "text",
        text: {
          content,
        },
      },
    ],
  };
}

function findProperty(
  schema: Record<string, NotionPropertySchema>,
  name: string,
) {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(schema)) {
    if (key.toLowerCase() === target) {
      return { key, type: value.type ?? "rich_text" };
    }
  }
  return null;
}

function assignProperty(
  properties: Record<string, unknown>,
  schema: Record<string, NotionPropertySchema>,
  name: string,
  content: string,
) {
  const property = findProperty(schema, name);
  if (!property) return false;

  if (property.type === "title") {
    properties[property.key] = {
      title: [{ type: "text", text: { content } }],
    };
  } else if (property.type === "select") {
    properties[property.key] = { select: { name: content } };
  } else if (property.type === "status") {
    properties[property.key] = { status: { name: content } };
  } else if (property.type === "url") {
    properties[property.key] = { url: content };
  } else if (property.type === "email") {
    properties[property.key] = { email: content };
  } else {
    properties[property.key] = richTextValue(content);
  }

  return true;
}

function readPropertyText(property: NotionPageProperty | undefined) {
  if (!property) return "";
  if (property.type === "title") {
    return property.title?.map((item) => item.plain_text ?? "").join("") ?? "";
  }
  if (property.type === "rich_text") {
    return property.rich_text?.map((item) => item.plain_text ?? "").join("") ?? "";
  }
  if (property.type === "select") return property.select?.name ?? "";
  if (property.type === "status") return property.status?.name ?? "";
  if (property.type === "url") return property.url ?? "";
  if (property.type === "email") return property.email ?? "";
  return "";
}

export async function POST(req: Request) {
  if (!notion || !notionDatabaseId) {
    return NextResponse.json(
      { ok: false, error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const parsed = parsePayload(body);
  if (!parsed) {
    return NextResponse.json(
      { ok: false, error: "Invalid request fields" },
      { status: 400 }
    );
  }

  const { name, email, message, subject, addon } = parsed;
  const now = new Date();
  const dateFormated = dateFormat(now, "yyyy-mm-dd");

  try {
    const dataSourceId = await resolveDataSourceId(notion, notionDatabaseId);
    if (!dataSourceId) {
      return NextResponse.json(
        { ok: false, error: "Unable to create contact message" },
        { status: 502 }
      );
    }

    const source = (await notion.dataSources.retrieve({
      data_source_id: dataSourceId,
    })) as { properties?: Record<string, NotionPropertySchema> };
    const schema = source.properties ?? {};
    const properties: Record<string, unknown> = {};
    const wroteSubject = assignProperty(properties, schema, "Subject", subject);
    const wroteAddon = assignProperty(properties, schema, "Addon", addon);

    if (!wroteSubject || !wroteAddon) {
      console.error("[contact] Notion columns not found", Object.keys(schema));
      return NextResponse.json(
        { ok: false, error: "Unable to create contact message" },
        { status: 502 }
      );
    }

    assignProperty(properties, schema, "ID", email);
    assignProperty(properties, schema, "Name", name);
    assignProperty(properties, schema, "Message", message);
    assignProperty(properties, schema, "Status", "Mensagem não respondida");

    const dateProperty = findProperty(schema, "Date");
    if (dateProperty?.type === "date") {
      properties[dateProperty.key] = {
        date: { start: dateFormated },
      };
    }

    const created = (await notion.pages.create({
      parent: {
        type: "data_source_id",
        data_source_id: dataSourceId,
      },
      properties: properties as never,
    })) as { properties?: Record<string, NotionPageProperty> };

    const savedSubject = readPropertyText(
      created.properties?.[findProperty(schema, "Subject")?.key ?? "Subject"],
    );
    const savedAddon = readPropertyText(
      created.properties?.[findProperty(schema, "Addon")?.key ?? "Addon"],
    );

    if (!savedSubject || !savedAddon) {
      console.error("[contact] Notion saved the page without Subject or Addon", {
        savedSubject,
        savedAddon,
        types: Object.fromEntries(
          Object.entries(schema).map(([key, value]) => [key, value.type]),
        ),
      });
      return NextResponse.json(
        { ok: false, error: "Unable to create contact message" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("[contact] Failed to create Notion page", error);
    return NextResponse.json(
      { ok: false, error: "Unable to create contact message" },
      {
        status: 502,
      }
    );
  }
}
