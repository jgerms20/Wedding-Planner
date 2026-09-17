import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { defaultSettings, type Task, type Wedding } from "../src/entities/index.js";
import { createLocalRepo } from "../src/repo/local.js";
import type { WeddingRepo } from "../src/repo/types.js";
import { newId, nowIso } from "../src/util.js";

function makeWedding(): Wedding {
  const now = nowIso();
  return {
    id: newId(),
    slug: "our-wedding",
    name: "Our wedding",
    partnerA: { name: "Partner A" },
    partnerB: { name: "Partner B" },
    dateFlexibility: "fixed",
    targetDate: "2028-06-10",
    isDestination: false,
    createdAt: now,
    updatedAt: now,
  };
}

function makeTask(weddingId: string, title: string): Task {
  const now = nowIso();
  return {
    id: newId(),
    weddingId,
    title,
    phase: "foundation",
    status: "todo",
    tags: [],
    dependsOn: [],
    createdAt: now,
    updatedAt: now,
  };
}

describe("createLocalRepo", () => {
  let repo: WeddingRepo;

  beforeEach(() => {
    // A fresh database per test so tests don't see each other's data.
    repo = createLocalRepo(`bower-test-${newId()}`);
  });

  it("round-trips a wedding by slug", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    const found = await repo.getWedding("our-wedding");
    expect(found).toEqual(wedding);
    expect(await repo.getWedding("missing")).toBeUndefined();
  });

  it("round-trips settings", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    const settings = defaultSettings(wedding.id);
    settings.monthlyCostCapCents = 50000;
    await repo.saveSettings(settings);
    const found = await repo.getSettings(wedding.id);
    expect(found?.monthlyCostCapCents).toBe(50000);
  });

  it("does CRUD on a per-entity repo, scoped by weddingId", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    const task = makeTask(wedding.id, "Book venue");
    await repo.tasks.upsert(task);

    expect(await repo.tasks.get(task.id)).toEqual(task);
    expect(await repo.tasks.list(wedding.id)).toHaveLength(1);
    expect(await repo.tasks.list("some-other-wedding")).toHaveLength(0);

    const updated = { ...task, status: "done" as const };
    await repo.tasks.upsert(updated);
    expect((await repo.tasks.get(task.id))?.status).toBe("done");

    await repo.tasks.remove(task.id);
    expect(await repo.tasks.get(task.id)).toBeUndefined();
  });

  it("rejects an invalid entity via Zod validation", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    const badTask = { ...makeTask(wedding.id, "Bad"), status: "not-a-status" } as unknown as Task;
    await expect(repo.tasks.upsert(badTask)).rejects.toThrow();
  });

  it("exports and re-imports a wedding's full data set", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    await repo.saveSettings(defaultSettings(wedding.id));
    const task = makeTask(wedding.id, "Book venue");
    await repo.tasks.upsert(task);

    const json = await repo.exportJson(wedding.id);
    const parsed = JSON.parse(json);
    expect(parsed.wedding.id).toBe(wedding.id);
    expect(parsed.tasks).toHaveLength(1);

    const fresh = createLocalRepo(`bower-test-import-${newId()}`);
    await fresh.importJson(json);

    expect(await fresh.getWedding("our-wedding")).toEqual(wedding);
    expect(await fresh.tasks.list(wedding.id)).toEqual([task]);
  });

  it("import replaces all existing local data", async () => {
    const wedding = makeWedding();
    await repo.upsertWedding(wedding);
    const staleTask = makeTask(wedding.id, "Stale task");
    await repo.tasks.upsert(staleTask);

    const otherWedding = { ...makeWedding(), id: newId(), slug: "someone-elses-wedding" };
    const bundle = {
      version: 1,
      exportedAt: nowIso(),
      wedding: otherWedding,
      settings: defaultSettings(otherWedding.id),
      tasks: [],
      events: [],
      destinations: [],
      venues: [],
      scenarios: [],
      households: [],
      guests: [],
      budgetCategories: [],
      budgetItems: [],
      subEvents: [],
      partyMembers: [],
      decisions: [],
    };
    await repo.importJson(JSON.stringify(bundle));

    expect(await repo.getWedding("our-wedding")).toBeUndefined();
    expect(await repo.getWedding("someone-elses-wedding")).toEqual(otherWedding);
    expect(await repo.tasks.list(wedding.id)).toHaveLength(0);
  });
});
