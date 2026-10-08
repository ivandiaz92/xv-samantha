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

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !Number.isInteger(guests) ||
      guests < 1 ||
      guests > 20
    ) {
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

    // Local backup first so we never lose the RSVP if Sheets is slow
    await appendLocalJson("rsvp.json", entry);
    const sheets = await postToSheets(entry);

    return NextResponse.json({ ok: true, sheets: sheets.ok });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
