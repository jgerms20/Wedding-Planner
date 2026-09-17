import { describe, expect, it } from "vitest";
import { scenarioMath, type Scenario } from "../src/entities/index";

function makeScenario(overrides: Partial<Scenario> = {}): Scenario {
  return {
    id: "s1",
    weddingId: "w1",
    name: "Scenario",
    guestAssumption: 100,
    attendanceRate: 0.6,
    fixedCosts: 10_000,
    perGuestCost: 150,
    travelCostPerGuest: 400,
    pinned: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("scenarioMath", () => {
  it("computes expected guests, total cost, cost per guest, and travel burden", () => {
    const scenario = makeScenario();
    const math = scenarioMath(scenario);

    expect(math.expectedGuests).toBe(60); // round(100 * 0.6)
    expect(math.totalCost).toBe(10_000 + 150 * 60); // 19,000
    expect(math.costPerGuest).toBeCloseTo(19_000 / 60);
    expect(math.guestTravelBurden).toBe(400 * 60); // 24,000
  });

  it("doesn't divide by zero when expected guests is zero", () => {
    const scenario = makeScenario({ guestAssumption: 0 });
    const math = scenarioMath(scenario);
    expect(math.expectedGuests).toBe(0);
    expect(math.costPerGuest).toBe(0);
  });
});
