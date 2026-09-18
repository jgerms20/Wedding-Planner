"use client";

import {
  DEFAULT_BUDGET_CATEGORIES,
  newId,
  nowIso,
  reestimateBudgetFromScenario,
  scenarioMath,
  SEED_BENCHMARKS,
  type BudgetCategory,
  type BudgetItem,
  type Scenario,
} from "@bower/shared";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BudgetItemEditorDialog } from "@/components/budget-item-editor-dialog";
import { CategoryRow } from "@/components/budget/category-row";
import { SourcesDrawer } from "@/components/budget/sources-drawer";
import { PageHeader } from "@/components/page-header";
import { PrioritiesCard } from "@/components/priorities/priorities-card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatMoney } from "@/lib/format";
import { LoadingState } from "@/components/loading-state";
import { cn } from "@/lib/utils";
import { usePriorities } from "@/lib/use-priorities";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

const GUEST_SLIDER_MIN = 50;
const GUEST_SLIDER_MAX = 200;

export default function BudgetPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadCategories = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.budgetCategories.list(weddingId);
  }, [repo, weddingId]);
  const { items: categories, reload: reloadCategories, loading: categoriesLoading } = useEntityList(loadCategories);

  const { priorities, add: addPriority, toggle: togglePriority, remove: removePriority } = usePriorities();

  const loadItems = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.budgetItems.list(weddingId);
  }, [repo, weddingId]);
  const { items, reload: reloadItems } = useEntityList(loadItems);

  const loadScenarios = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.scenarios.list(weddingId);
  }, [repo, weddingId]);
  const { items: scenarios, reload: reloadScenarios } = useEntityList(loadScenarios);
  const pinned = scenarios.find((s) => s.pinned);

  // Seed the typical category split only for a wedding that genuinely has none,
  // and tidy the empty duplicates an earlier build could create. Both read the
  // repo directly rather than trusting in-memory state, which can still be
  // loading on first paint.
  useEffect(() => {
    if (!repo || !weddingId || categoriesLoading) return;
    (async () => {
      const existing = await repo.budgetCategories.list(weddingId);
      if (existing.length === 0) {
        for (const [i, cat] of DEFAULT_BUDGET_CATEGORIES.entries()) {
          await repo.budgetCategories.upsert({ id: newId(), weddingId, name: cat.name, targetPercent: cat.targetPercent, sortOrder: i });
        }
        await reloadCategories();
        return;
      }
      // One-time cleanup: a category with no lines at all is a leftover from
      // the duplicate-seeding bug. Only runs when the list is clearly doubled.
      if (existing.length > DEFAULT_BUDGET_CATEGORIES.length) {
        const lines = await repo.budgetItems.list(weddingId);
        const used = new Set(lines.map((line) => line.categoryId));
        const empties = existing.filter((c) => !used.has(c.id));
        if (empties.length > 0 && empties.length < existing.length) {
          for (const c of empties) await repo.budgetCategories.remove(c.id);
          await reloadCategories();
        }
      }
    })();
  }, [repo, weddingId, categoriesLoading, reloadCategories]);

  const [itemDialog, setItemDialog] = useState<{ open: boolean; categoryId?: string; item?: BudgetItem }>({ open: false });
  const [sourcesItem, setSourcesItem] = useState<BudgetItem | undefined>(undefined);
  const [infoCategory, setInfoCategory] = useState<BudgetCategory | undefined>(undefined);
  const [reestimating, setReestimating] = useState(false);
  const [mode, setMode] = useState<"estimate" | "actuals">("estimate");

  // buildSeedBundle copies bench.category verbatim as the BudgetCategory name, so matching by
  // name is exact for every real (research-seeded) wedding. It only falls back to sortOrder as a
  // 0-based array position for the rare DEFAULT_BUDGET_CATEGORIES path (no research registered at
  // first bootstrap), whose abbreviated names ("Transport" vs. "Transportation") don't match —
  // that path's sortOrder really is 0-based, unlike the research path's 1-based bench.sortOrder.
  const benchmarkFor = useCallback(
    (category: BudgetCategory) => SEED_BENCHMARKS?.categories.find((b) => b.category === category.name) ?? SEED_BENCHMARKS?.categories[category.sortOrder],
    [],
  );

  const pinnedId = pinned?.id;
  const pinnedGuestAssumption = pinned?.guestAssumption;
  const [previewGuests, setPreviewGuests] = useState<number>(pinnedGuestAssumption ?? 100);
  useEffect(() => {
    if (pinnedGuestAssumption !== undefined) setPreviewGuests(pinnedGuestAssumption);
  }, [pinnedId, pinnedGuestAssumption]);

  const totals = useMemo(() => {
    const estimate = items.reduce((s, i) => s + (i.estimate ?? 0), 0);
    const quoted = items.reduce((s, i) => s + (i.quoted ?? 0), 0);
    const contracted = items.reduce((s, i) => s + (i.contracted ?? 0), 0);
    const paid = items.reduce((s, i) => s + (i.paid ?? 0), 0);
    return { estimate, quoted, contracted, paid };
  }, [items]);

  const target = pinned ? scenarioMath(pinned).totalCost : undefined;
  const previewMath = pinned ? scenarioMath({ ...pinned, guestAssumption: previewGuests }) : undefined;

  async function commitGuestAssumption(nextGuests: number) {
    if (!repo || !weddingId || !pinned || nextGuests === pinned.guestAssumption) return;
    const updated: Scenario = { ...pinned, guestAssumption: nextGuests, updatedAt: nowIso() };
    await repo.scenarios.upsert(updated);
    await reestimateBudgetFromScenario(repo, weddingId, updated);
    await Promise.all([reloadScenarios(), reloadItems()]);
  }

  async function reestimateAll() {
    if (!repo || !weddingId || !pinned) return;
    setReestimating(true);
    await reestimateBudgetFromScenario(repo, weddingId, pinned);
    await reloadItems();
    setReestimating(false);
  }

  if (!repo || !weddingId) return <LoadingState />;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Budget"
        description="Categories seeded from a typical split, with estimates that show where they came from."
        action={
          <Button variant="outline" size="sm" onClick={reestimateAll} disabled={!pinned || reestimating}>
            <RefreshCw className="size-4" /> {reestimating ? "Re-estimating…" : "Re-estimate from scenario"}
          </Button>
        }
      />

      <div className="postcard rise grid gap-8 p-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow">{pinned ? `Target · ${pinned.name}` : "Target"}</p>
          <p className="numeral mt-1 text-5xl text-coral">{target !== undefined ? formatMoney(target) : "—"}</p>
          <p className="mt-2 text-sm text-ink-soft">
            Sum of estimates so far: <span className="tabular text-foreground">{formatMoney(totals.estimate)}</span>
          </p>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <p className="eyebrow">Guests we&apos;re planning for</p>
            <span className="tabular text-sm text-ink-soft">{previewMath ? formatMoney(previewMath.totalCost) : "—"}</span>
          </div>
          <p className="numeral mt-1 text-3xl">{previewGuests}</p>
          <Slider
            className="mt-3"
            min={GUEST_SLIDER_MIN}
            max={GUEST_SLIDER_MAX}
            value={previewGuests}
            disabled={!pinned}
            onChange={(e) => setPreviewGuests(Number(e.target.value))}
            onMouseUp={(e) => void commitGuestAssumption(Number(e.currentTarget.value))}
            onTouchEnd={(e) => void commitGuestAssumption(Number(e.currentTarget.value))}
            onKeyUp={(e) => void commitGuestAssumption(Number(e.currentTarget.value))}
            aria-label="Guest assumption"
            data-testid="budget-guest-slider"
          />
          <p className="mt-2 text-xs text-ink-soft">Drag to preview; release to update the pinned scenario and re-estimate.</p>
        </div>
      </div>

      <PrioritiesCard
        title="Budget must-haves"
        area="Budget"
        priorities={priorities}
        onAdd={(area, label) => void addPriority(area, label)}
        onToggle={(p) => void togglePriority(p)}
        onRemove={(p) => void removePriority(p)}
      />

      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow">Category lines</p>
        <div className="inline-flex rounded-full border border-line p-0.5 text-xs">
          {(["estimate", "actuals"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                "rounded-full px-3 py-1 capitalize transition-colors",
                mode === m ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {categories
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((category) => {
            const categoryItems = items.filter((i) => i.categoryId === category.id);
            const categoryTarget = target !== undefined && category.targetPercent !== undefined ? (target * category.targetPercent) / 100 : undefined;
            const benchmark = benchmarkFor(category);
            return (
              <CategoryRow
                key={category.id}
                category={category}
                items={categoryItems}
                target={categoryTarget}
                percentLow={benchmark?.percentLow}
                percentHigh={benchmark?.percentHigh}
                mode={mode}
                onAddItem={() => setItemDialog({ open: true, categoryId: category.id })}
                onPatchItem={async (item, patch) => {
                  await repo.budgetItems.upsert({ ...item, ...patch, updatedAt: nowIso() });
                  await reloadItems();
                }}
                onEditItem={(item) => setItemDialog({ open: true, item })}
                onSourcesItem={(item) => setSourcesItem(item)}
                onInfo={() => setInfoCategory(category)}
              />
            );
          })}
        {categories.length === 0 && <p className="text-sm text-ink-soft">Categories are loading…</p>}
      </div>

      <BudgetItemEditorDialog
        open={itemDialog.open}
        onOpenChange={(open) => setItemDialog((s) => ({ ...s, open }))}
        weddingId={weddingId}
        categories={categories}
        defaultCategoryId={itemDialog.categoryId}
        item={itemDialog.item}
        onSave={async (item) => {
          await repo.budgetItems.upsert(item);
          await reloadItems();
        }}
      />

      <SourcesDrawer open={sourcesItem !== undefined} onOpenChange={(open) => !open && setSourcesItem(undefined)} itemName={sourcesItem?.name ?? ""} notes={sourcesItem?.notes} />
      <SourcesDrawer
        open={infoCategory !== undefined}
        onOpenChange={(open) => !open && setInfoCategory(undefined)}
        itemName={infoCategory?.name ?? ""}
        notes={infoCategory && benchmarkFor(infoCategory)?.note}
        sourceUrls={infoCategory && benchmarkFor(infoCategory)?.sourceUrls}
      />
    </div>
  );
}
