import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import dateFormat from "dateformat";

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const now = new Date();
  const dateFormated = dateFormat(now, "yyyy-mm-dd");

  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_KEY ?? "",
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
      { ok: false },
      {
        status: 400,
      }
    );
  }
}
