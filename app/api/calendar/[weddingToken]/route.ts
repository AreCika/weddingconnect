import { getWeddingPageData } from "@/lib/weddings";
import { NextResponse } from "next/server";

// RFC 5545 requires escaping backslash, comma, and semicolon in TEXT values —
// venue addresses routinely contain commas, so this isn't optional.
function escapeICS(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function nowAsUtcStamp(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ weddingToken: string }> }
) {
  const { weddingToken } = await params;
  const wedding = await getWeddingPageData(weddingToken);

  const date = wedding.wedding_date.replace(/-/g, "");
  const summary = escapeICS(`${wedding.bride_name} & ${wedding.groom_name}'s Wedding`);
  const location = [wedding.venue_name, wedding.venue_address].filter(Boolean).join(", ");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WeddingConnect//EN",
    "BEGIN:VEVENT",
    `UID:${wedding.id}@weddingconnect`,
    `DTSTAMP:${nowAsUtcStamp()}`,
    `SUMMARY:${summary}`,
    `DTSTART;VALUE=DATE:${date}`,
    ...(location ? [`LOCATION:${escapeICS(location)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="wedding.ics"`,
    },
  });
}
