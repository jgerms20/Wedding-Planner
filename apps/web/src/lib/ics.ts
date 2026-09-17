export interface IcsEvent {
  uid: string;
  title: string;
  date: string; // ISO date (YYYY-MM-DD) or datetime
  description?: string;
}

function toIcsDate(iso: string): string {
  const digits = iso.replace(/[-:]/g, "");
  return digits.length <= 8 ? `${digits}` : digits.slice(0, 15);
}

/** Builds a minimal all-day-event ICS file from a list of dated items. */
export function buildIcs(calendarName: string, events: IcsEvent[]): string {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bower//Wedding Planner//EN", `X-WR-CALNAME:${calendarName}`];
  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.uid}@bower.local`,
      `DTSTART;VALUE=DATE:${toIcsDate(event.date)}`,
      `SUMMARY:${escapeIcsText(event.title)}`,
      ...(event.description ? [`DESCRIPTION:${escapeIcsText(event.description)}`] : []),
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function escapeIcsText(text: string): string {
  return text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
