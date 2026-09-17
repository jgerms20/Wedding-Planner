import { newId, nowIso, type AiUsage, type WeddingRepo } from "@bower/shared";
import type { PortUsage } from "./client";

/**
 * What every model call cost, written down as it happens so Settings can show
 * the running total. Prices come from the `claude-api` skill's table (cached
 * 2026-06-24) and are per million tokens; cache reads bill at 10% of the
 * input rate and cache writes at 125%.
 */

const PRICES_PER_MILLION: Record<string, { input: number; output: number }> = {
  "claude-opus-5": { input: 5, output: 25 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
};

const CACHE_READ_MULTIPLIER = 0.1;
const CACHE_WRITE_MULTIPLIER = 1.25;

/** Unknown model ids price as Opus 5 — the safe overestimate. */
function pricesFor(model: string) {
  return PRICES_PER_MILLION[model] ?? PRICES_PER_MILLION["claude-opus-5"]!;
}

/** Cost in US cents, rounded to four decimals so a single small call is not zero. */
export function costCentsFor(model: string, usage: PortUsage): number {
  const prices = pricesFor(model);
  const dollars =
    (usage.inputTokens * prices.input +
      usage.outputTokens * prices.output +
      usage.cacheReadTokens * prices.input * CACHE_READ_MULTIPLIER +
      usage.cacheWriteTokens * prices.input * CACHE_WRITE_MULTIPLIER) /
    1_000_000;
  return Math.round(dollars * 100 * 10_000) / 10_000;
}

/** Which part of the app spent the money. */
export type UsageFeature = "tell_bower" | "concierge" | "research";

/** Writes one `aiUsage` row. Never throws: a logging failure must not lose a reply. */
export async function logUsage(
  repo: WeddingRepo,
  weddingId: string,
  feature: UsageFeature,
  model: string,
  usage: PortUsage,
): Promise<AiUsage | undefined> {
  const row: AiUsage = {
    id: newId(),
    weddingId,
    feature,
    model,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cacheReadTokens: usage.cacheReadTokens,
    cacheWriteTokens: usage.cacheWriteTokens,
    costCents: costCentsFor(model, usage),
    createdAt: nowIso(),
  };
  try {
    return await repo.aiUsage.upsert(row);
  } catch {
    return undefined;
  }
}

export interface UsageBucket {
  feature: string;
  calls: number;
  inputTokens: number;
  outputTokens: number;
  costCents: number;
}

export interface UsageSummary {
  calls: number;
  costCents: number;
  byFeature: UsageBucket[];
  /** Same shape, limited to rows from the last seven days. */
  lastSevenDays: { calls: number; costCents: number };
}

/** Totals by feature, newest-spend-first, plus a seven-day window. */
export function summarizeUsage(rows: AiUsage[], now: Date = new Date()): UsageSummary {
  const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const buckets = new Map<string, UsageBucket>();
  let calls = 0;
  let costCents = 0;
  let recentCalls = 0;
  let recentCost = 0;

  for (const row of rows) {
    const bucket = buckets.get(row.feature) ?? {
      feature: row.feature,
      calls: 0,
      inputTokens: 0,
      outputTokens: 0,
      costCents: 0,
    };
    bucket.calls += 1;
    bucket.inputTokens += row.inputTokens;
    bucket.outputTokens += row.outputTokens;
    bucket.costCents += row.costCents;
    buckets.set(row.feature, bucket);
    calls += 1;
    costCents += row.costCents;
    if (row.createdAt >= cutoff) {
      recentCalls += 1;
      recentCost += row.costCents;
    }
  }

  return {
    calls,
    costCents: round4(costCents),
    byFeature: [...buckets.values()]
      .map((bucket) => ({ ...bucket, costCents: round4(bucket.costCents) }))
      .sort((a, b) => b.costCents - a.costCents || a.feature.localeCompare(b.feature)),
    lastSevenDays: { calls: recentCalls, costCents: round4(recentCost) },
  };
}

function round4(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}

/** "$0.42" / "<$0.01" — cents are too small to read on their own. */
export function formatCents(cents: number): string {
  if (cents <= 0) return "$0.00";
  const dollars = cents / 100;
  if (dollars < 0.01) return "<$0.01";
  return `$${dollars.toFixed(2)}`;
}

export const USAGE_FEATURE_LABELS: Record<string, string> = {
  tell_bower: "Tell Bower",
  concierge: "Concierge",
  research: "Venue research",
};
