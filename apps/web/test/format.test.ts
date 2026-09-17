import { describe, expect, it } from "vitest";
import { formatCountdown, formatDate, formatMoney, seasonLabel } from "@/lib/format";

describe("formatMoney", () => {
  it("formats whole-dollar USD and handles missing values", () => {
    expect(formatMoney(45000)).toBe("$45,000");
    expect(formatMoney(undefined)).toBe("—");
    expect(formatMoney(null)).toBe("—");
  });
});

describe("formatDate", () => {
  it("formats an ISO date and handles missing/invalid values", () => {
    expect(formatDate("2028-06-10")).toBe("Jun 10, 2028");
    expect(formatDate(undefined)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
  });
});

describe("formatCountdown", () => {
  it("says the date isn't set when there is none", () => {
    expect(formatCountdown(undefined)).toBe("Date not set yet");
  });

  it("counts down to a future date", () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    expect(formatCountdown(future.toISOString())).toBe("10 days to go");
  });
});

describe("seasonLabel", () => {
  it("title-cases a season string", () => {
    expect(seasonLabel("spring 2028")).toBe("Spring 2028");
    expect(seasonLabel(undefined)).toBeUndefined();
  });
});
