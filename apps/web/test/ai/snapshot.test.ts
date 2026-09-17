import { describe, expect, it } from "vitest";
import { buildSnapshot } from "@/lib/ai/snapshot";
import { seededRepo } from "./fixtures";

describe("buildSnapshot", () => {
  it("is byte-for-byte identical across two builds of the same data", async () => {
    const { repo, wedding } = await seededRepo();
    const first = await buildSnapshot(repo, wedding.id, { today: "2026-09-17" });
    const second = await buildSnapshot(repo, wedding.id, { today: "2026-09-17" });
    expect(second).toBe(first);
  });

  it("covers the facts Bower answers from", async () => {
    const { repo, wedding } = await seededRepo();
    const snapshot = await buildSnapshot(repo, wedding.id, { today: "2026-09-17" });

    expect(snapshot).toContain("TODAY: 2026-09-17");
    expect(snapshot).toContain("partner A (side a): Joshua");
    expect(snapshot).toContain("partner B (side b): Janel");
    expect(snapshot).toContain("## Anchors and communication offsets");
    expect(snapshot).toContain("save-the-dates:");
    expect(snapshot).toContain("## Destinations");
    expect(snapshot).toContain("## Scenarios");
    expect(snapshot).toContain("## Next 15 open tasks");
    expect(snapshot).toContain("## Sub-events");
    expect(snapshot).toContain("## Wedding party");
    expect(snapshot).toContain("## Guests");
    expect(snapshot).toContain("## Budget totals");
    expect(snapshot).toContain("## Last 6 decisions");
  });

  it("lists destinations alphabetically and never more than 15 open tasks", async () => {
    const { repo, wedding } = await seededRepo();
    const snapshot = await buildSnapshot(repo, wedding.id, { today: "2026-09-17" });
    const lines = snapshot.split("\n");

    const destinationNames = section(lines, "## Destinations")
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2));
    expect(destinationNames.length).toBeGreaterThan(1);
    expect([...destinationNames].sort()).toEqual(destinationNames);

    const taskLines = section(lines, "## Next 15 open tasks").filter((line) => line.startsWith("- "));
    expect(taskLines.length).toBeLessThanOrEqual(15);
  });

  it("stays well inside the context budget", async () => {
    const { repo, wedding } = await seededRepo();
    const snapshot = await buildSnapshot(repo, wedding.id, { today: "2026-09-17" });
    // ~4 characters per token; the spec's ceiling is about 3k tokens.
    expect(snapshot.length).toBeLessThan(12_000);
  });
});

function section(lines: string[], heading: string): string[] {
  const start = lines.indexOf(heading);
  if (start === -1) return [];
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith("## "));
  return end === -1 ? rest : rest.slice(0, end);
}
