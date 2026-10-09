import { event } from "@/lib/event";

function toGoogleDate(iso: string) {
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
    .join("\n");
  return [...lines, "", places].join("\n");
}

function buildLocation() {
  const first = event.locations[0];
  return first ? `${first.name}, ${first.address}` : "Monterrey, N.L.";
}

/** Open Google Calendar create-event screen with fields filled in. */
export function openCalendarEvent() {
  const dates = `${toGoogleDate(event.eventDateISO)}/${toGoogleDate(event.eventEndISO)}`;
  const q =
    `action=TEMPLATE` +
    `&text=${encodeURIComponent(event.calendarTitle)}` +
    `&dates=${dates}` +
    `&details=${encodeURIComponent(buildDescription())}` +
    `&location=${encodeURIComponent(buildLocation())}`;

  window.location.assign(`https://calendar.google.com/calendar/render?${q}`);
}
