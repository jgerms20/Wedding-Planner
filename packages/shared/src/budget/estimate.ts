import { scenarioMath, type BudgetItem, type Scenario } from "../entities/index";
import type { WeddingRepo } from "../repo/types";
import { nowIso } from "../util";

/** Marker prefix on seed-generated budget line notes; only these lines are re-estimated automatically. */
export const ESTIMATE_NOTE_PREFIX = "Estimated as ";

export function isAutoEstimated(item: BudgetItem): boolean {
  return Boolean(item.notes?.startsWith(ESTIMATE_NOTE_PREFIX));
}

/**
 * Re-derives every auto-estimated budget line from a scenario's total and the
 * category's target percentage. Lines the couple typed a number into (no
 * marker note) are left alone. Returns the updated items.
 */
export async function reestimateBudgetFromScenario(
  repo: WeddingRepo,
  weddingId: string,
  scenario: Scenario,
): Promise<BudgetItem[]> {
  const total = scenarioMath(scenario).totalCost;
  const categories = await repo.budgetCategories.list(weddingId);
  const items = await repo.budgetItems.list(weddingId);
  const updated: BudgetItem[] = [];
  const now = nowIso();
  for (const item of items) {
    if (!isAutoEstimated(item)) continue;
    const category = categories.find((c) => c.id === item.categoryId);
    if (!category?.targetPercent) continue;
    const estimate = Math.round((total * category.targetPercent) / 100);
    const notes = item.notes!.replace(/^Estimated as \d+(\.\d+)?% of the pinned scenario total \([^)]*\)\./, "").trimStart();
    const next: BudgetItem = {
      ...item,
      estimate,
      notes: `${ESTIMATE_NOTE_PREFIX}${category.targetPercent}% of the pinned scenario total (${scenario.name}). ${notes}`,
      updatedAt: now,
    };
    await repo.budgetItems.upsert(next);
    updated.push(next);
  }
  return updated;
}

/** Makes `scenario` the plan: pins it, unpins the others, points the wedding at it, and re-estimates the budget. */
export async function pinScenario(repo: WeddingRepo, weddingId: string, scenarioId: string): Promise<Scenario | undefined> {
  const scenarios = await repo.scenarios.list(weddingId);
  const target = scenarios.find((s) => s.id === scenarioId);
  if (!target) return undefined;
  const now = nowIso();
  for (const s of scenarios) {
    const shouldPin = s.id === scenarioId;
    if (s.pinned !== shouldPin) await repo.scenarios.upsert({ ...s, pinned: shouldPin, updatedAt: now });
  }
  const wedding = await repo.getWedding("our-wedding");
  if (wedding && wedding.id === weddingId) {
    await repo.upsertWedding({ ...wedding, activeScenarioId: scenarioId, updatedAt: now });
  }
  const pinned = { ...target, pinned: true };
  await reestimateBudgetFromScenario(repo, weddingId, pinned);
  return pinned;
}
