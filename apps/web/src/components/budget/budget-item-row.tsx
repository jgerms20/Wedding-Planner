"use client";

import { isAutoEstimated, type BudgetItem } from "@bower/shared";
import { Badge } from "@/components/ui/badge";
import { InlineDate, InlineMoney } from "@/components/budget/inline-fields";

export function BudgetItemRow({
  item,
  onPatch,
  onEdit,
  onSources,
}: {
  item: BudgetItem;
  onPatch: (patch: Partial<BudgetItem>) => void;
  onEdit: () => void;
  onSources: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 py-3 first:border-t-0">
      <div className="flex min-w-40 flex-1 items-center gap-2">
        <button type="button" onClick={onEdit} className="text-left text-sm text-foreground hover:text-coral">
          {item.name}
        </button>
        {isAutoEstimated(item) && (
          <Badge data-testid="budget-estimate-chip" className="border-transparent bg-gold-soft text-ink">
            estimate
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <InlineMoney label="Est" value={item.estimate} onCommit={(v) => onPatch({ estimate: v })} />
        <InlineMoney label="Quoted" value={item.quoted} onCommit={(v) => onPatch({ quoted: v })} />
        <InlineMoney label="Contracted" value={item.contracted} onCommit={(v) => onPatch({ contracted: v })} />
        <InlineMoney label="Paid" value={item.paid} onCommit={(v) => onPatch({ paid: v })} />
        <InlineDate value={item.dueDate} onCommit={(v) => onPatch({ dueDate: v })} />
      </div>
      {item.notes && (
        <button type="button" onClick={onSources} className="text-xs text-coral underline underline-offset-2">
          Sources
        </button>
      )}
    </div>
  );
}
