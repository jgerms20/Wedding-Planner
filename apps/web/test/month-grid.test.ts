import { format } from "date-fns";
import { describe, expect, it } from "vitest";
import { dateKey, getMonthWeeks } from "@/components/calendar/month-grid";

function keys(weeks: Date[][]): string[][] {
  return weeks.map((week) => week.map((d) => format(d, "yyyy-MM-dd")));
}

describe("getMonthWeeks", () => {
  it("covers April 2028 (starts Sat, 30 days) with 6 leading/trailing-filled weeks", () => {
    const weeks = getMonthWeeks(new Date(2028, 3, 15));
    expect(weeks).toHaveLength(6);
    for (const week of weeks) expect(week).toHaveLength(7);

    const grid = keys(weeks);
    // Leading days borrowed from March fill out the week containing April 1st (a Saturday).
    expect(grid[0]).toEqual(["2028-03-26", "2028-03-27", "2028-03-28", "2028-03-29", "2028-03-30", "2028-03-31", "2028-04-01"]);
    // Trailing days spill into May to complete the last week.
    expect(grid[5]).toEqual(["2028-04-30", "2028-05-01", "2028-05-02", "2028-05-03", "2028-05-04", "2028-05-05", "2028-05-06"]);
  });

  it("needs no leading days when the 1st is already a Sunday (Sept 2024)", () => {
    const weeks = getMonthWeeks(new Date(2024, 8, 10));
    expect(weeks).toHaveLength(5);
    expect(keys(weeks)[0]?.[0]).toBe("2024-09-01");
    // Trailing days spill into October to complete the last week.
    expect(keys(weeks)[4]?.[6]).toBe("2024-10-05");
  });

  it("borrows leading days from the previous year across a January/February boundary", () => {
    const weeks = getMonthWeeks(new Date(2025, 1, 10));
    expect(weeks).toHaveLength(5);
    const grid = keys(weeks);
    expect(grid[0]).toEqual(["2025-01-26", "2025-01-27", "2025-01-28", "2025-01-29", "2025-01-30", "2025-01-31", "2025-02-01"]);
    expect(grid[4]).toEqual(["2025-02-23", "2025-02-24", "2025-02-25", "2025-02-26", "2025-02-27", "2025-02-28", "2025-03-01"]);
  });

  it("returns every day exactly once, in order, with no gaps", () => {
    const weeks = getMonthWeeks(new Date(2028, 3, 1));
    const flat = weeks.flat();
    for (let i = 1; i < flat.length; i++) {
      const prev = flat[i - 1] as Date;
      const curr = flat[i] as Date;
      expect(curr.getTime() - prev.getTime()).toBe(24 * 60 * 60 * 1000);
    }
  });
});

describe("dateKey", () => {
  it("formats as yyyy-MM-dd", () => {
    expect(dateKey(new Date(2028, 3, 17))).toBe("2028-04-17");
  });
});
