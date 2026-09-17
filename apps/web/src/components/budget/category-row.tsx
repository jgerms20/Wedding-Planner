"use client";

import type { BudgetCategory, BudgetItem } from "@bower/shared";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { BudgetItemRow } from "@/components/budget/budget-item-row";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CategoryRow({
  category,
  items,
  target,
  onAddItem,
  onPatchItem,
  onEditItem,
  onSourcesItem,
}: {
  category: BudgetCategory;
  items: BudgetItem[];
  /** The dollar amount this category's target percent implies, from the pinned scenario's total. */
  target: number | undefined;
  onAddItem: () => void;
  onPatchItem: (item: BudgetItem, patch: Partial<BudgetItem>) => void;
  onEditItem: (item: BudgetItem) => void;
  onSourcesItem: (item: BudgetItem) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const estimate = items.reduce((s, i) => s + (i.estimate ?? 0), 0);
  const quoted = items.reduce((s, i) => s + (i.quoted ?? 0), 0);
  const contracted = items.reduce((s, i) => s + (i.contracted ?? 0), 0);
  const paid = items.reduce((s, i) => s + (i.paid ?? 0), 0);
  const barPct = target && target > 0 ? Math.min(100, (estimate / target) * 100) : 0;
  const overTarget = target !== undefined && estimate > target;

  return (
    <div className="postcard" data-testid="budget-category-row">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-testid="budget-category-toggle"
        className="flex w-full flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 text-left"
      >
        <div className="min-w-48 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg">{category.name}</span>
            {category.targetPercent !== undefined && <span className="text-xs text-ink-mute">target {category.targetPercent}%</span>}
          </div>
          <div className="mt-2 h-1.5 max-w-sm overflow-hidden rounded-full bg-paper-deep">
            <div className={cn("h-full rounded-full", overTarget ? "bg-coral" : "bg-gold")} style={{ width: `${barPct}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <MoneyStat label="Est" value={estimate} />
          <MoneyStat label="Quoted" value={quoted} />
          <MoneyStat label="Contracted" value={contracted} />
          <MoneyStat label="Paid" value={paid} />
        </div>
        <ChevronDown className={cn("size-4 shrink-0 text-ink-soft transition-transform", expanded && "rotate-180")} />
      </button>
      {expanded && (
        <div className="border-t border-line px-5 py-3">
          {items.length === 0 ? (
            <p className="py-2 text-sm text-ink-soft">Nothing in this category yet.</p>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <BudgetItemRow
                  key={item.id}
                  item={item}
                  onPatch={(patch) => onPatchItem(item, patch)}
                  onEdit={() => onEditItem(item)}
                  onSources={() => onSourcesItem(item)}
                />
              ))}
            </div>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={(e) => {
              e.stopPropagation();
              onAddItem();
            }}
          >
            <Plus className="size-3.5" /> Item
          </Button>
        </div>
      )}
    </div>
  );
}

function MoneyStat({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex flex-col items-end">
      <span className="text-[0.6rem] tracking-wide text-ink-mute uppercase">{label}</span>
      <span className="tabular">{formatMoney(value)}</span>
    </span>
  );
}
