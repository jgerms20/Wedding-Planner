import { describeAction, type BowerResponse } from "@bower/shared";
import { describe, expect, it } from "vitest";
import { autonomyFor, interpret, runProposal } from "@/lib/ai/interpret";
import { createFakePort } from "./fake-port";
import { seededRepo } from "./fixtures";

const MODEL_RESPONSE: BowerResponse = {
  reply: "Added Marcus to the must list.",
  actions: [
    {
      type: "add_guests",
      guests: [{ firstName: "Marcus", lastName: "Lee", side: "a", tier: "must", homeCity: "Atlanta", relationship: "cousin" }],
    },
  ],
};

describe("interpret", () => {
  it("returns the model's proposal and logs what it cost", async () => {
    const { repo, wedding } = await seededRepo();
    const port = createFakePort({ parse: [{ parsed: MODEL_RESPONSE, model: "claude-sonnet-5" }] });

    const result = await interpret({
      text: "add my cousin Marcus from Atlanta, must invite",
      repo,
      weddingId: wedding.id,
      port,
      today: "2026-09-17",
    });

    expect(result.fromModel).toBe(true);
    expect(result.response.reply).toBe("Added Marcus to the must list.");
    expect(result.response.actions).toHaveLength(1);
    expect(describeAction(result.response.actions[0]!)).toContain("Marcus Lee");

    // Sonnet 5 at $2/$10 per MTok: 1000 in + 500 out = $0.007 = 0.7 cents.
    const usage = await repo.aiUsage.list(wedding.id);
    expect(usage).toHaveLength(1);
    expect(usage[0]!.feature).toBe("tell_bower");
    expect(usage[0]!.model).toBe("claude-sonnet-5");
    expect(usage[0]!.costCents).toBeCloseTo(0.7, 6);
  });

  it("sends the cached system block first and the snapshot after it", async () => {
    const { repo, wedding } = await seededRepo();
    const port = createFakePort({ parse: [{ parsed: MODEL_RESPONSE }] });

    await interpret({ text: "add a guest", repo, weddingId: wedding.id, port, today: "2026-09-17" });

    const [call] = port.parseCalls;
    expect(call!.system).toHaveLength(2);
    expect(call!.system[0]!.cache_control).toEqual({ type: "ephemeral" });
    expect(call!.system[0]!.text).toContain("You are Bower");
    expect(call!.system[1]!.cache_control).toBeUndefined();
    expect(call!.system[1]!.text).toContain("TODAY: 2026-09-17");
    expect(call!.model).toBe("claude-sonnet-5");
  });

  it("falls back to the deterministic parser when no key is connected", async () => {
    const { repo, wedding } = await seededRepo();

    const result = await interpret({
      text: "add my aunt Denise and uncle Ray from Columbia, must invite",
      repo,
      weddingId: wedding.id,
      today: "2026-09-17",
    });

    expect(result.fromModel).toBe(false);
    expect(result.response.actions).toHaveLength(1);
    const action = result.response.actions[0]!;
    expect(action.type).toBe("add_guests");
    if (action.type !== "add_guests") return;
    expect(action.guests.map((guest) => guest.firstName)).toEqual(["Denise", "Ray"]);
    expect(action.guests[0]!.homeCity).toBe("Columbia");
    expect(await repo.aiUsage.list(wedding.id)).toHaveLength(0);
  });

  it("falls back and reports the error when the model call throws", async () => {
    const { repo, wedding } = await seededRepo();
    const port = createFakePort({ parse: [] }); // an empty script throws on first use

    const result = await interpret({ text: "note: check the marina", repo, weddingId: wedding.id, port });

    expect(result.fromModel).toBe(false);
    expect(result.error).toContain("no parse turn left");
    expect(result.response.actions[0]).toMatchObject({ type: "add_note", text: "check the marina" });
  });
});

describe("runProposal", () => {
  it("leaves everything pending at draft-and-approve", async () => {
    const { repo, wedding } = await seededRepo();
    const outcome = await runProposal({ repo, weddingId: wedding.id, actions: MODEL_RESPONSE.actions, autonomy: 1 });

    expect(outcome.results).toHaveLength(0);
    expect(outcome.pending).toHaveLength(1);
    expect(await repo.guests.list(wedding.id)).toHaveLength(0);
  });

  it("auto-applies additions at level 2 and leaves other actions for approval", async () => {
    const { repo, wedding } = await seededRepo();
    const outcome = await runProposal({
      repo,
      weddingId: wedding.id,
      actions: [...MODEL_RESPONSE.actions, { type: "complete_task", titleMatch: "something" }],
      autonomy: 2,
    });

    expect(outcome.results).toHaveLength(1);
    expect(outcome.results[0]!.ok).toBe(true);
    expect(outcome.pending).toHaveLength(1);
    expect(outcome.pending[0]!.type).toBe("complete_task");
    expect(await repo.guests.list(wedding.id)).toHaveLength(1);
  });
});

describe("autonomyFor", () => {
  it("defaults to draft and approve", () => {
    expect(autonomyFor(undefined)).toBe(1);
    expect(autonomyFor({})).toBe(1);
    expect(autonomyFor({ tell_bower: 2 })).toBe(2);
    expect(autonomyFor({ tell_bower: 0 })).toBe(0);
  });
});
