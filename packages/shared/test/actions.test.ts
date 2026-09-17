import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { applyActions, describeAction, undoResults, type BowerAction } from "../src/ai/actions";
import { defaultSettings, type Wedding } from "../src/entities/index";
import { createLocalRepo } from "../src/repo/local";
import type { WeddingRepo } from "../src/repo/types";
import { newId, nowIso } from "../src/util";

function makeWedding(): Wedding {
  const now = nowIso();
  return {
    id: newId(),
    slug: "our-wedding",
    name: "Joshua & Janel",
    partnerA: { name: "Joshua" },
    partnerB: { name: "Janel" },
    dateFlexibility: "season",
    targetSeason: "spring 2028",
    isDestination: true,
    createdAt: now,
    updatedAt: now,
  };
}

describe("applyActions", () => {
  let repo: WeddingRepo;
  let wedding: Wedding;

  beforeEach(async () => {
    repo = createLocalRepo(`actions-${newId()}`);
    wedding = makeWedding();
    await repo.upsertWedding(wedding);
    await repo.saveSettings(defaultSettings(wedding.id));
  });

  it("adds guests with a shared household and undoes them", async () => {
    const action: BowerAction = {
      type: "add_guests",
      guests: [
        { firstName: "Marcus", lastName: "Lee", side: "a", tier: "must", householdName: "The Lees", homeCity: "Atlanta" },
        { firstName: "Tasha", lastName: "Lee", side: "a", householdName: "The Lees" },
      ],
    };
    const results = await applyActions(repo, wedding.id, [action], { source: "voice" });
    expect(results[0].ok).toBe(true);
    expect(describeAction(action)).toContain("Add 2 guests");

    const guests = await repo.guests.list(wedding.id);
    const households = await repo.households.list(wedding.id);
    expect(guests).toHaveLength(2);
    expect(households).toHaveLength(1);
    expect(guests.every((g) => g.householdId === households[0].id)).toBe(true);
    expect(guests[1].tier).toBe("must");

    await undoResults(repo, results);
    expect(await repo.guests.list(wedding.id)).toHaveLength(0);
    expect(await repo.households.list(wedding.id)).toHaveLength(0);
  });

  it("completes a task by title and restores it on undo", async () => {
    const now = nowIso();
    await repo.tasks.upsert({
      id: newId(),
      weddingId: wedding.id,
      title: "Book venue and date",
      phase: "foundation",
      status: "todo",
      tags: [],
      dependsOn: [],
      createdAt: now,
      updatedAt: now,
    });
    const results = await applyActions(repo, wedding.id, [{ type: "complete_task", titleMatch: "book venue" }]);
    expect(results[0].ok).toBe(true);
    expect((await repo.tasks.list(wedding.id))[0].status).toBe("done");
    await undoResults(repo, results);
    expect((await repo.tasks.list(wedding.id))[0].status).toBe("todo");
  });

  it("reports a failure without throwing when a venue's destination is unknown", async () => {
    const results = await applyActions(repo, wedding.id, [
      { type: "add_venue", destinationName: "Atlantis", name: "Nowhere Hall" },
    ]);
    expect(results[0].ok).toBe(false);
    expect(results[0].error).toMatch(/destination/i);
  });

  it("sets wedding fields with coercion and creates budget lines under new categories", async () => {
    const results = await applyActions(repo, wedding.id, [
      { type: "set_wedding_field", field: "guestTarget", value: "120" },
      { type: "add_budget_item", categoryName: "Welcome party", name: "Beach bonfire", estimate: 2500 },
      { type: "add_sub_event", kind: "welcome_party", date: "2028-04-14" },
      { type: "add_note", text: "Janel wants sunset photos" },
    ]);
    expect(results.every((r) => r.ok)).toBe(true);
    expect((await repo.getWedding("our-wedding"))?.guestTarget).toBe(120);
    expect(await repo.budgetCategories.list(wedding.id)).toHaveLength(1);
    expect(await repo.budgetItems.list(wedding.id)).toHaveLength(1);
    expect(await repo.events.list(wedding.id)).toHaveLength(1);
    expect(await repo.notes.list(wedding.id)).toHaveLength(1);
    await undoResults(repo, results);
    expect((await repo.getWedding("our-wedding"))?.guestTarget).toBeUndefined();
    expect(await repo.events.list(wedding.id)).toHaveLength(0);
  });
});
