import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import dateFormat from "dateformat";

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_KEY;

const notion = notionApiKey ? new Client({ auth: notionApiKey }) : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
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
  if (!name || !email || !message) return null;
  if (!EMAIL_REGEX.test(email)) return null;
  if (name.length > MAX_NAME_LENGTH) return null;
  if (message.length > MAX_MESSAGE_LENGTH) return null;
  return { name, email, message };
};

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

  const { name, email, message } = parsed;
  const now = new Date();
  const dateFormated = dateFormat(now, "yyyy-mm-dd");

  try {
    await notion.pages.create({
      parent: {
        database_id: notionDatabaseId,
        type: "database_id",
      },
      properties: {
        ID: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: email,
              },
            },
          ],
        },
        Name: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: name,
              },
            },
          ],
        },
        Message: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: message,
              },
            },
          ],
        },
        Date: {
          type: "date",
          date: {
            start: dateFormated,
          },
        },
        Status: {
          type: "status",
          status: {
            name: "Mensagem não respondida",
            color: "red",
          },
        },
      },
    });

    return NextResponse.json(
      { ok: true },
      {
        status: 201,
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to create contact message" },
      {
        status: 502,
      }
    );
  }
}
