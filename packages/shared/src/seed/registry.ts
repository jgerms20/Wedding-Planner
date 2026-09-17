import { benchmarks } from "./benchmarks";
import { bahamas } from "./destinations/bahamas";
import { brazil } from "./destinations/brazil";
import { columbiaSc } from "./destinations/columbia-sc";
import { jamaica } from "./destinations/jamaica";
import { portlandOr } from "./destinations/portland-or";
import { washingtonDc } from "./destinations/washington-dc";
import type { CostBenchmarks, DestinationSeed } from "./types";

/**
 * The researched seed modules. The web app's first-load bootstrap builds the
 * bundle from these. Every number in them carries a source URL or an explicit
 * "estimated" note; see .claude/skills/wedding-research.
 */
export const SEED_DESTINATIONS: DestinationSeed[] = [brazil, jamaica, bahamas, washingtonDc, columbiaSc, portlandOr];
export const SEED_BENCHMARKS: CostBenchmarks | null = benchmarks;
