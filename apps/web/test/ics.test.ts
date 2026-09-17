import { describe, expect, it } from "vitest";
import { buildIcs } from "@/lib/ics";

describe("buildIcs", () => {
  it("produces a VCALENDAR with one VEVENT per item", () => {
    const ics = buildIcs("Our wedding", [
      { uid: "1", title: "Ceremony", date: "2028-06-10" },
      { uid: "2", title: "Tastings, cake & venue", date: "2027-09-01" },
    ]);

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("END:VCALENDAR");
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics).toContain("DTSTART;VALUE=DATE:20280610");
    // Commas in free text are escaped per RFC 5545.
    expect(ics).toContain("SUMMARY:Tastings\\, cake & venue");
  });
});
