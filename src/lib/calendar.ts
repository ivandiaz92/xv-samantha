import { event } from "@/lib/event";

function toICSDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function buildDescription() {
  const lines = event.itinerary.map((item) => {
    const note = item.note ? ` — ${item.note}` : "";
    return `${item.time} ${item.title}${note}`;
  });
  const places = event.locations
    .map((loc) => `${loc.label}: ${loc.name}, ${loc.address}`)
    .join("\\n");
  return [...lines, "", places].join("\\n");
}

function buildLocation() {
  const first = event.locations[0];
  return first ? `${first.name}\\, ${first.address}` : "Monterrey\\, N.L.";
}

/** Download a .ics so guests can add the event to Apple / Google / Outlook */
export function downloadEventICS() {
  const uid = "xv-samantha-abigail-2026-11-20@invite";
  const stamp = toICSDate(new Date().toISOString());
  const start = toICSDate(event.eventDateISO);
  const end = toICSDate(event.eventEndISO);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//XV Samantha Abigail//ES",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.calendarTitle}`,
    `DESCRIPTION:${buildDescription()}`,
    `LOCATION:${buildLocation()}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "xv-samantha-abigail.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
