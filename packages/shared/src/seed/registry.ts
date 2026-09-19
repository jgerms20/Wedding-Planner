import { benchmarks } from "./benchmarks";
import { bahamas } from "./destinations/bahamas";
import { brazil } from "./destinations/brazil";
import { columbiaSc } from "./destinations/columbia-sc";
import { jamaica } from "./destinations/jamaica";
import { newOrleans } from "./destinations/new-orleans";
import { portlandOr } from "./destinations/portland-or";
import { santaFeNm } from "./destinations/santa-fe-nm";
import { charlottesvilleVa } from "./destinations/virginia";
import { washingtonDc } from "./destinations/washington-dc";
import type { CostBenchmarks, DestinationSeed } from "./types";

/**
 * The researched seed modules. The web app's first-load bootstrap builds the
 * bundle from these. Every number in them carries a source URL or an explicit
 * "estimated" note; see .claude/skills/wedding-research. A destination added
 * here after a wedding's first seed reaches existing couples non-destructively
 * via `reconcileDestinations` (apps/web/src/lib/bootstrap.ts), not a reseed.
 */
export const SEED_DESTINATIONS: DestinationSeed[] = [
  brazil,
  jamaica,
  bahamas,
  washingtonDc,
  columbiaSc,
  portlandOr,
  charlottesvilleVa,
  newOrleans,
  santaFeNm,
];
export const SEED_BENCHMARKS: CostBenchmarks | null = benchmarks;
