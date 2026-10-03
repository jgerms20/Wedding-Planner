import { describe, expect, it } from "vitest";
import {
  JAMAICA_EXCLUDED,
  JAMAICA_EXPERIENCES,
  JAMAICA_ITINERARIES,
  JAMAICA_LINE_ITEMS,
  JAMAICA_VENUE_COSTS,
  jamaicaGuestTripCost,
  jamaicaLineItemCost,
  jamaicaVenueCost,
  SEED_DESTINATIONS,
} from "../src/index";

const jamaica = SEED_DESTINATIONS.find((d) => d.key === "jamaica")!;

describe("Jamaica guide", () => {
  it("costs every venue that's on the Jamaica destination, and only those", () => {
    const seedKeys = new Set(jamaica.venues.map((v) => v.key));
    for (const v of JAMAICA_VENUE_COSTS) expect(seedKeys.has(v.key), v.key).toBe(true);
    expect(JAMAICA_VENUE_COSTS.length).toBe(jamaica.venues.length);
  });

  it("never lists an excluded place as a venue or an experience", () => {
    const names = [...jamaica.venues.map((v) => v.name), ...JAMAICA_EXPERIENCES.map((e) => e.name)].map((n) => n.toLowerCase());
    for (const x of JAMAICA_EXCLUDED) expect(names).not.toContain(x.name.toLowerCase());
    expect(names.some((n) => n.includes("rose hall"))).toBe(false);
  });

  it("cites a source for every number", () => {
    const urls = [
      ...JAMAICA_VENUE_COSTS.flatMap((v) => v.sourceUrls),
      ...JAMAICA_LINE_ITEMS.map((i) => i.sourceUrl),
      ...JAMAICA_EXPERIENCES.map((e) => e.sourceUrl),
      ...JAMAICA_EXCLUDED.map((x) => x.sourceUrl),
    ];
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
    for (const v of JAMAICA_VENUE_COSTS) if (v.estimated) expect(v.derivation, v.key).toBeTruthy();
  });

  it("builds itineraries only from real experiences and real venues", () => {
    const experienceKeys = new Set(JAMAICA_EXPERIENCES.map((e) => e.key));
    const venueKeys = new Set(JAMAICA_VENUE_COSTS.map((v) => v.key));
    for (const it of JAMAICA_ITINERARIES) {
      for (const k of it.forVenues) expect(venueKeys.has(k), k).toBe(true);
      for (const d of it.days) for (const k of d.experienceKeys) expect(experienceKeys.has(k), k).toBe(true);
    }
    // Every venue gets a suggested itinerary.
    for (const v of JAMAICA_VENUE_COSTS) expect(JAMAICA_ITINERARIES.some((i) => i.forVenues.includes(v.key)), v.key).toBe(true);
  });

  it("adds the per-guest charge only past the package's included guests", () => {
    const royalton = JAMAICA_VENUE_COSTS.find((v) => v.key === "jamaica-royalton-negril")!;
    expect(jamaicaVenueCost(royalton, 40)).toBe(13199);
    expect(jamaicaVenueCost(royalton, 100)).toBe(13199 + 60 * 130);
    const jakes = JAMAICA_VENUE_COSTS.find((v) => v.key === "jamaica-jakes-treasure-beach")!;
    expect(jamaicaVenueCost(jakes, 50)).toBe(jakes.pkg.price + 50 * jakes.receptionPerGuest);
  });

  it("prices a guest's trip as flight + shuttles + nights (+ meals when not all-inclusive)", () => {
    const inn = JAMAICA_VENUE_COSTS.find((v) => v.key === "jamaica-jamaica-inn-ocho-rios")!;
    expect(jamaicaGuestTripCost(inn, 4, 500)).toBe(500 + 54 + 4 * (inn.guestNightlyPerPerson + inn.guestFoodPerDay));
  });

  it("scales per-guest line items with the headcount", () => {
    const welcome = JAMAICA_LINE_ITEMS.find((i) => i.key === "welcome-party")!;
    expect(jamaicaLineItemCost(welcome, "low", 80)).toBe(80 * welcome.low);
    const photo = JAMAICA_LINE_ITEMS.find((i) => i.key === "photographer")!;
    expect(jamaicaLineItemCost(photo, "high", 80)).toBe(photo.high);
    for (const i of JAMAICA_LINE_ITEMS) expect(i.low <= i.typical && i.typical <= i.high, i.key).toBe(true);
  });
});
