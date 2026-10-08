import { NextResponse } from "next/server";
import {
  appendLocalJson,
  getFromSheets,
  postToSheets,
  readLocalJson,
} from "@/lib/store";

type Message = {
  name: string;
  message: string;
  createdAt: string;
};

export async function GET() {
  const remote = await getFromSheets("guestbook");
  if (remote && Array.isArray(remote.messages)) {
    return NextResponse.json({ messages: remote.messages });
  }

  const local = await readLocalJson<Message>("guestbook.json");
  return NextResponse.json({ messages: local });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !message) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const entry: Message = {
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    await appendLocalJson("guestbook.json", entry);
    await postToSheets({ type: "guestbook", ...entry });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
