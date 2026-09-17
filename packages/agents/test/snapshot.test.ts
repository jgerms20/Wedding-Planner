import { describe, expect, it } from "vitest";
import { emptySnapshot, renderSnapshot } from "../src/snapshot.js";
import type { WeddingSnapshot } from "../src/types.js";

describe("renderSnapshot", () => {
  it("renders deterministically for the same snapshot (cache stability)", () => {
    const snapshot: WeddingSnapshot = {
      wedding: { id: "w1", name: "Alex & Sam", targetDate: "2028-05-20" },
      tasksSummary: {
        total: 10,
        done: 3,
        upcoming: [
          { title: "Book venue", phase: "foundation", dueDate: "2027-01-01" },
          { title: "Send save-the-dates", phase: "communications" },
        ],
      },
    };

    const first = renderSnapshot(snapshot);
    const second = renderSnapshot(structuredClone(snapshot));

    expect(first).toBe(second);
    expect(first).toContain("Alex & Sam");
    expect(first).toContain("2028-05-20");
    expect(first).toContain("3/10 done");
    expect(first).toContain("[foundation] Book venue (due 2027-01-01)");
    expect(first).toContain("[communications] Send save-the-dates");
  });

  it("renders an empty snapshot without throwing", () => {
    const rendered = renderSnapshot(emptySnapshot("w2"));
    expect(rendered).toContain("Untitled wedding");
    expect(rendered).toContain("0/0 done");
  });
});
