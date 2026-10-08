import { NextResponse } from "next/server";
import { appendLocalJson, postToSheets } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const allergies = String(body.allergies ?? "").trim();
    const guests = Number(body.guests);

    if (!firstName || !lastName || !phone || ![1, 2].includes(guests)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const entry = {
      type: "rsvp",
      firstName,
      lastName,
      guests,
      allergies,
      phone,
      createdAt: new Date().toISOString(),
    };

    const sheets = await postToSheets(entry);
    await appendLocalJson("rsvp.json", entry);

    if (!sheets.ok && process.env.GOOGLE_SHEETS_WEBAPP_URL) {
      return NextResponse.json({ error: "sheets_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, sheets: sheets.ok });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
