import { benchmarks } from "./benchmarks";
import { ashevilleNc } from "./destinations/asheville-nc";
import { austinTx } from "./destinations/austin-tx";
import { bahamas } from "./destinations/bahamas";
import { brazil } from "./destinations/brazil";
import { charlestonSc } from "./destinations/charleston-sc";
import { chattanoogaTn } from "./destinations/chattanooga-tn";
import { columbiaSc } from "./destinations/columbia-sc";
import { fredericksburgTx } from "./destinations/fredericksburg-tx";
import { galvestonTx } from "./destinations/galveston-tx";
import { gulfShoresOrangeBeachAl } from "./destinations/gulf-shores-orange-beach-al";
import { highlandsCashiersNc } from "./destinations/highlands-cashiers-nc";
import { jamaica } from "./destinations/jamaica";
import { newOrleans } from "./destinations/new-orleans";
import { pensacolaFl } from "./destinations/pensacola-fl";
import { portlandOr } from "./destinations/portland-or";
import { sanAntonioTx } from "./destinations/san-antonio-tx";
import { santaFeNm } from "./destinations/santa-fe-nm";
import { thirtyARosemaryBeachFl } from "./destinations/30a-rosemary-beach-fl";
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
  charlestonSc,
  austinTx,
  fredericksburgTx,
  sanAntonioTx,
  gulfShoresOrangeBeachAl,
  thirtyARosemaryBeachFl,
  pensacolaFl,
  galvestonTx,
  ashevilleNc,
  highlandsCashiersNc,
  chattanoogaTn,
];
export const SEED_BENCHMARKS: CostBenchmarks | null = benchmarks;
