"use client";

import { DEFAULT_BUDGET_CATEGORIES, newId, scenarioMath, type BudgetItem } from "@bower/shared";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BudgetItemEditorDialog } from "@/components/budget-item-editor-dialog";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatMoney } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function BudgetPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadCategories = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.budgetCategories.list(weddingId);
  }, [repo, weddingId]);
  const { items: categories, reload: reloadCategories, loading: categoriesLoading } = useEntityList(loadCategories);

  const loadItems = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.budgetItems.list(weddingId);
  }, [repo, weddingId]);
  const { items, reload: reloadItems } = useEntityList(loadItems);

  const loadScenarios = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.scenarios.list(weddingId);
  }, [repo, weddingId]);
  const { items: scenarios } = useEntityList(loadScenarios);
  const pinned = scenarios.find((s) => s.pinned);

  // Seed the typical category split the first time this wedding visits Budget.
  useEffect(() => {
    if (!repo || !weddingId || categoriesLoading || categories.length > 0) return;
    (async () => {
      for (const [i, cat] of DEFAULT_BUDGET_CATEGORIES.entries()) {
        await repo.budgetCategories.upsert({ id: newId(), weddingId, name: cat.name, targetPercent: cat.targetPercent, sortOrder: i });
      }
      await reloadCategories();
    })();
  }, [repo, weddingId, categoriesLoading, categories.length, reloadCategories]);

  const [itemDialog, setItemDialog] = useState<{ open: boolean; categoryId?: string; item?: BudgetItem }>({ open: false });

  const totals = useMemo(() => {
    const estimate = items.reduce((s, i) => s + (i.estimate ?? 0), 0);
    const quoted = items.reduce((s, i) => s + (i.quoted ?? 0), 0);
    const contracted = items.reduce((s, i) => s + (i.contracted ?? 0), 0);
    const paid = items.reduce((s, i) => s + (i.paid ?? 0), 0);
    return { estimate, quoted, contracted, paid };
  }, [items]);

  const target = pinned ? scenarioMath(pinned).totalCost : undefined;

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Budget" description="Categories seeded from a typical split — adjust freely." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Target (pinned scenario)" value={target !== undefined ? formatMoney(target) : "—"} highlight />
        <Stat label="Estimated" value={formatMoney(totals.estimate)} />
        <Stat label="Quoted" value={formatMoney(totals.quoted)} />
        <Stat label="Contracted" value={formatMoney(totals.contracted)} />
        <Stat label="Paid" value={formatMoney(totals.paid)} />
      </div>

      <div className="flex flex-col gap-4">
        {categories
          .slice()
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((category) => {
            const categoryItems = items.filter((i) => i.categoryId === category.id);
            const categoryEstimate = categoryItems.reduce((s, i) => s + (i.estimate ?? 0), 0);
            return (
              <Card key={category.id}>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle className="flex items-baseline gap-2">
                    {category.name}
                    {category.targetPercent !== undefined && (
                      <span className="text-xs font-normal text-muted-foreground">~{category.targetPercent}% of budget</span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{formatMoney(categoryEstimate)}</span>
                    <Button variant="outline" size="sm" onClick={() => setItemDialog({ open: true, categoryId: category.id })}>
                      <Plus className="size-3.5" /> Item
                    </Button>
                  </div>
                </CardHeader>
                {categoryItems.length > 0 && (
                  <CardContent>
                    <div className="flex flex-col divide-y divide-border">
                      {categoryItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setItemDialog({ open: true, item })}
                          className="flex flex-wrap items-center justify-between gap-2 py-2 text-left text-sm transition-colors hover:bg-accent"
                        >
                          <span>{item.name}</span>
                          <span className="flex gap-3 text-xs text-muted-foreground">
                            <span>Est. {formatMoney(item.estimate)}</span>
                            <span>Paid {formatMoney(item.paid)}</span>
                            {item.dueDate && <span>Due {formatDate(item.dueDate)}</span>}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
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
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className={`font-display text-xl ${highlight ? "text-rose" : ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
