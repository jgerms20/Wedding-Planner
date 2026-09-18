"use client";

import type { AiUsage } from "@bower/shared";
import { useCallback } from "react";
import { formatCents, summarizeUsage, USAGE_FEATURE_LABELS } from "@/lib/ai/usage";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

/**
 * What Atlas has cost so far, by feature and over the last week. Every model
 * call writes an `aiUsage` row as it happens, so this is a sum, not an
 * estimate — priced from the published per-token rates.
 */
export function AiUsageCard() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const load = useCallback(
    async () => (repo && weddingId ? ((await repo.aiUsage.list(weddingId)) as AiUsage[]) : undefined),
    [repo, weddingId],
  );
  const { items: rows } = useEntityList(load);
  const summary = summarizeUsage(rows);

  return (
    <section className="postcard p-5">
      <p className="eyebrow">What Atlas costs</p>
      <h2 className="mt-1 font-display text-2xl">
        <span className="tabular">{formatCents(summary.costCents)}</span> so far
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        {summary.calls === 0
          ? "No model calls yet."
          : `${summary.calls} call${summary.calls === 1 ? "" : "s"} · ${formatCents(summary.lastSevenDays.costCents)} in the last 7 days`}
      </p>

      {summary.byFeature.length > 0 && (
        <ul className="mt-4 divide-y divide-line">
          {summary.byFeature.map((bucket) => (
            <li key={bucket.feature} className="flex items-baseline justify-between gap-3 py-2.5">
              <span className="text-[15px]">{USAGE_FEATURE_LABELS[bucket.feature] ?? bucket.feature}</span>
              <span className="text-sm text-ink-soft">
                <span className="tabular">{bucket.calls}</span> call{bucket.calls === 1 ? "" : "s"} ·{" "}
                <span className="tabular text-foreground">{formatCents(bucket.costCents)}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
