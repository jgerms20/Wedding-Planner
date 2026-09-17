/**
 * Per-token USD prices, from the `claude-api` skill's model price table
 * (cached 2026-06-24). Prices are per 1M tokens. Cache writes price at
 * ~1.25x the input rate and cache reads at ~0.1x, per the skill's prompt
 * caching guidance.
 */
const MODEL_PRICES_PER_MILLION: Record<string, { input: number; output: number }> = {
  "claude-opus-5": { input: 5, output: 25 },
  "claude-opus-4-8": { input: 5, output: 25 },
  "claude-opus-4-7": { input: 5, output: 25 },
  "claude-opus-4-6": { input: 5, output: 25 },
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-sonnet-4-6": { input: 3, output: 15 },
  "claude-haiku-4-5": { input: 1, output: 5 },
};

const CACHE_WRITE_MULTIPLIER = 1.25;
const CACHE_READ_MULTIPLIER = 0.1;

/** Falls back to Opus 5 pricing for an unrecognized model rather than throwing. */
function pricesFor(model: string) {
  return MODEL_PRICES_PER_MILLION[model] ?? MODEL_PRICES_PER_MILLION["claude-opus-5"]!;
}

export function calcCostUsd(usage: {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
}): number {
  const prices = pricesFor(usage.model);
  const cost =
    (usage.inputTokens * prices.input +
      usage.outputTokens * prices.output +
      usage.cacheCreationInputTokens * prices.input * CACHE_WRITE_MULTIPLIER +
      usage.cacheReadInputTokens * prices.input * CACHE_READ_MULTIPLIER) /
    1_000_000;
  return Math.round(cost * 1_000_000) / 1_000_000;
}
