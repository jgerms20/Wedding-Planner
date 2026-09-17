import { applyActions, undoResults, type BowerAction } from "@bower/shared";
import { describe, expect, it } from "vitest";
import { costCentsFor, formatCents, logUsage, summarizeUsage } from "@/lib/ai/usage";
import { seededRepo } from "./fixtures";

/** What the cards do when Apply, then Undo, is pressed. */
describe("applying and undoing a proposal", () => {
  it("creates the entities, then removes exactly what it created", async () => {
    const { repo, wedding } = await seededRepo();
    const actions: BowerAction[] = [
      {
        type: "add_guests",
        guests: [
          { firstName: "Marcus", lastName: "Lee", side: "a", tier: "must", householdName: "The Lees" },
          { firstName: "Tasha", lastName: "Lee", side: "a", householdName: "The Lees" },
        ],
      },
      { type: "add_task", title: "Email the Sandals coordinator", dueDate: "2027-01-15" },
    ];

    const before = {
      guests: (await repo.guests.list(wedding.id)).length,
      households: (await repo.households.list(wedding.id)).length,
      tasks: (await repo.tasks.list(wedding.id)).length,
    };

    const results = await applyActions(repo, wedding.id, actions, { source: "chat" });
    expect(results.every((result) => result.ok)).toBe(true);
    expect((await repo.guests.list(wedding.id)).length).toBe(before.guests + 2);
    expect((await repo.households.list(wedding.id)).length).toBe(before.households + 1);
    expect((await repo.tasks.list(wedding.id)).length).toBe(before.tasks + 1);

    await undoResults(repo, results);
    expect((await repo.guests.list(wedding.id)).length).toBe(before.guests);
    expect((await repo.households.list(wedding.id)).length).toBe(before.households);
    expect((await repo.tasks.list(wedding.id)).length).toBe(before.tasks);
  });

  it("restores a completed task's previous state on undo", async () => {
    const { repo, wedding } = await seededRepo();
    const [task] = await repo.tasks.list(wedding.id);
    const results = await applyActions(repo, wedding.id, [{ type: "complete_task", taskId: task!.id }], {});
    expect((await repo.tasks.get(task!.id))!.status).toBe("done");

    await undoResults(repo, results);
    expect((await repo.tasks.get(task!.id))!.status).toBe(task!.status);
  });
});

describe("usage accounting", () => {
  it("prices Opus and Sonnet from the published rates", () => {
    // Opus 5: $5 in / $25 out per MTok → 1M in + 1M out = $30 = 3000 cents.
    expect(costCentsFor("claude-opus-5", { inputTokens: 1e6, outputTokens: 1e6, cacheReadTokens: 0, cacheWriteTokens: 0 })).toBe(3000);
    // Sonnet 5: $2 in / $10 out per MTok.
    expect(costCentsFor("claude-sonnet-5", { inputTokens: 1e6, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 })).toBe(200);
    // Cache reads bill at 10% of input, writes at 125%.
    expect(costCentsFor("claude-sonnet-5", { inputTokens: 0, outputTokens: 0, cacheReadTokens: 1e6, cacheWriteTokens: 0 })).toBe(20);
    expect(costCentsFor("claude-sonnet-5", { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 1e6 })).toBe(250);
    // An unknown model prices as Opus rather than as free.
    expect(costCentsFor("claude-unknown-9", { inputTokens: 1e6, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 })).toBe(500);
  });

  it("writes a row per call and totals it by feature", async () => {
    const { repo, wedding } = await seededRepo();
    await logUsage(repo, wedding.id, "tell_bower", "claude-sonnet-5", {
      inputTokens: 1000,
      outputTokens: 500,
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
    });
    await logUsage(repo, wedding.id, "concierge", "claude-opus-5", {
      inputTokens: 1000,
      outputTokens: 500,
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
    });

    const rows = await repo.aiUsage.list(wedding.id);
    const summary = summarizeUsage(rows, new Date("2026-09-17T12:00:00.000Z"));
    expect(summary.calls).toBe(2);
    expect(summary.byFeature.map((bucket) => bucket.feature)).toEqual(["concierge", "tell_bower"]);
    expect(summary.byFeature[0]!.costCents).toBeCloseTo(1.75, 6);
    expect(summary.byFeature[1]!.costCents).toBeCloseTo(0.7, 6);
    expect(summary.lastSevenDays.calls).toBe(2);
  });

  it("ignores rows older than a week in the seven-day window", () => {
    const summary = summarizeUsage(
      [
        {
          id: "1",
          weddingId: "w",
          feature: "concierge",
          model: "claude-opus-5",
          inputTokens: 0,
          outputTokens: 0,
          cacheReadTokens: 0,
          cacheWriteTokens: 0,
          costCents: 5,
          createdAt: "2026-08-01T00:00:00.000Z",
        },
      ],
      new Date("2026-09-17T12:00:00.000Z"),
    );
    expect(summary.costCents).toBe(5);
    expect(summary.lastSevenDays.costCents).toBe(0);
  });

  it("reads tiny spends as a floor, not as zero", () => {
    expect(formatCents(0)).toBe("$0.00");
    expect(formatCents(0.7)).toBe("<$0.01");
    expect(formatCents(42)).toBe("$0.42");
  });
});
