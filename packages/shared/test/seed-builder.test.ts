import "fake-indexeddb/auto";
import { describe, expect, it } from "vitest";
import { scenarioMath } from "../src/entities/index";
import { createLocalRepo } from "../src/repo/local";
import { buildSeedBundle, COUPLE } from "../src/seed/builder";
import type { CostBenchmarks, DestinationSeed } from "../src/seed/types";
import { newId } from "../src/util";

const benchmarks: CostBenchmarks = {
  averageUsWeddingCost: 33000,
  averageDestinationWeddingCost: 35000,
  averageGuestCount: 115,
  perGuestCateringUs: 85,
  categories: [
    { category: "Venue & catering", key: "venue", percent: 50, sortOrder: 1, note: "test", sourceUrls: ["https://example.com/a"] },
    { category: "Photo & video", key: "photo", percent: 50, sortOrder: 2, note: "test", sourceUrls: ["https://example.com/b"] },
  ],
  subEventEstimates: [
    { kind: "engagement_party", low: 1000, high: 3000, note: "", sourceUrls: ["https://example.com/c"] },
    { kind: "brunch", low: 500, high: 1500, note: "", sourceUrls: ["https://example.com/d"] },
  ],
  tips: [],
  sourceUrls: [],
};

function destination(key: string, rank: number): DestinationSeed {
  return {
    key,
    name: key,
    country: "Testland",
    countryCode: "TL",
    rank,
    whyHere: "Because.",
    travelCostPerGuestEstimate: 1000,
    lodgingPerNightEstimate: 200,
    attendanceRateEstimate: 0.7,
    weatherNotes: "Nice.",
    legalNotes: "Verify with the local authority or an attorney.",
    seasonNotes: "Shoulder.",
    travelNotes: "Fly.",
    sourceUrls: ["https://example.com/dest"],
    venues: [{ key: `${key}-v1`, name: `${key} Hall`, capacity: 120, sourceUrls: ["https://example.com/v"] }],
    scenario: { fixedCosts: 20000, perGuestCost: 150, travelCostPerGuest: 1000, attendanceRate: 0.7, notes: "test" },
  };
}

describe("buildSeedBundle", () => {
  it("builds a bespoke, importable bundle with the top destination pinned", async () => {
    const bundle = buildSeedBundle({
      destinations: [destination("second", 2), destination("first", 1)],
      benchmarks,
      now: "2026-09-17T12:00:00.000Z",
    });

    expect(bundle.wedding.name).toBe(COUPLE.name);
    expect(bundle.wedding.targetSeason).toBe("spring 2028");
    expect(bundle.destinations.map((d) => d.name)).toEqual(["first", "second"]);
    const pinned = bundle.scenarios.find((s) => s.pinned);
    expect(pinned?.name).toBe("first");
    expect(bundle.wedding.activeScenarioId).toBe(pinned?.id);
    expect(bundle.venues).toHaveLength(2);

    // Budget estimates split the pinned scenario total by benchmark percentages.
    const total = scenarioMath(pinned!).totalCost;
    expect(bundle.budgetItems.map((i) => i.estimate)).toEqual([Math.round(total / 2), Math.round(total / 2)]);
    expect(bundle.budgetItems[0].notes).toContain("https://example.com/a");

    // Anchors, satellite events, and plan.
    expect(bundle.settings?.planConfig.anchors[0]?.kind).toBe("engagement_party");
    expect(bundle.subEvents.find((s) => s.kind === "engagement_party")?.budgetEstimate).toBe(2000);
    expect(bundle.subEvents.find((s) => s.kind === "brunch")?.date).toBe("2028-04-16");
    expect(bundle.tasks.length).toBeGreaterThan(30);
    expect(bundle.tasks[0].title).toMatch(/East Coast/);
    expect(bundle.events.some((e) => e.kind === "anchor")).toBe(true);
    expect(bundle.decisions).toHaveLength(4);

    const repo = createLocalRepo(`seed-${newId()}`);
    await repo.importJson(JSON.stringify(bundle));
    expect((await repo.getWedding("our-wedding"))?.partnerB.name).toBe("Janel");
    expect(await repo.scenarios.list(bundle.wedding.id)).toHaveLength(2);
  });
});

describe("registered seed", () => {
  it("builds the real Joshua & Janel bundle with all destinations and sourced numbers", async () => {
    const { SEED_BENCHMARKS, SEED_DESTINATIONS } = await import("../src/seed/registry");
    expect(SEED_DESTINATIONS).toHaveLength(7);
    expect(SEED_DESTINATIONS[0].name).toBe("Brazil");
    for (const d of SEED_DESTINATIONS) {
      expect(d.sourceUrls.length).toBeGreaterThan(0);
      expect(d.legalNotes).toMatch(/Verify with the local authority or an attorney\.$/);
      expect(d.venues.length).toBeGreaterThanOrEqual(3);
      for (const v of d.venues) expect(v.sourceUrls.length).toBeGreaterThan(0);
      expect(d.attendanceRateEstimate).toBeGreaterThan(0.5);
      expect(d.attendanceRateEstimate).toBeLessThanOrEqual(0.9);
    }
    const percentTotal = SEED_BENCHMARKS!.categories.reduce((s, c) => s + c.percent, 0);
    expect(Math.round(percentTotal)).toBe(100);
    const bundle = buildSeedBundle({ destinations: SEED_DESTINATIONS, benchmarks: SEED_BENCHMARKS! });
    expect(bundle.scenarios.filter((s) => s.pinned)).toHaveLength(1);
    expect(bundle.budgetItems).toHaveLength(12);
    expect(bundle.venues.length).toBeGreaterThanOrEqual(18);
  });
});
