import type { CostBenchmarks, DestinationSeed } from "./types";

/**
 * The researched seed modules, registered here once they exist. The web app's
 * first-load bootstrap builds the bundle from these; when the list is empty it
 * falls back to a minimal wedding with just the couple's known facts.
 */
export const SEED_DESTINATIONS: DestinationSeed[] = [];
export const SEED_BENCHMARKS: CostBenchmarks | null = null;
