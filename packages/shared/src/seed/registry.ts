import { benchmarks } from "./benchmarks";
import { ashevilleNc } from "./destinations/asheville-nc";
import { austinTx } from "./destinations/austin-tx";
import { bahamas } from "./destinations/bahamas";
import { batonRougeLa } from "./destinations/baton-rouge-la";
import { beaufortSc } from "./destinations/beaufort-sc";
import { brazil } from "./destinations/brazil";
import { caboSanLucasMexico } from "./destinations/cabo-san-lucas-mexico";
import { cannonBeachOr } from "./destinations/cannon-beach-or";
import { cartagenaColombia } from "./destinations/cartagena-colombia";
import { charlestonSc } from "./destinations/charleston-sc";
import { chattanoogaTn } from "./destinations/chattanooga-tn";
import { columbiaSc } from "./destinations/columbia-sc";
import { fredericksburgTx } from "./destinations/fredericksburg-tx";
import { galvestonTx } from "./destinations/galveston-tx";
import { gulfShoresOrangeBeachAl } from "./destinations/gulf-shores-orange-beach-al";
import { highlandsCashiersNc } from "./destinations/highlands-cashiers-nc";
import { jamaica } from "./destinations/jamaica";
import { memphisTn } from "./destinations/memphis-tn";
import { mobileAl } from "./destinations/mobile-al";
import { newOrleans } from "./destinations/new-orleans";
import { pensacolaFl } from "./destinations/pensacola-fl";
import { portlandOr } from "./destinations/portland-or";
import { puntaCanaDominicanRepublic } from "./destinations/punta-cana-dominican-republic";
import { rivieraMayaMexico } from "./destinations/riviera-maya-mexico";
import { sanAntonioTx } from "./destinations/san-antonio-tx";
import { santaFeNm } from "./destinations/santa-fe-nm";
import { seattleWa } from "./destinations/seattle-wa";
import { sedonaAz } from "./destinations/sedona-az";
import { taosNm } from "./destinations/taos-nm";
import { thirtyARosemaryBeachFl } from "./destinations/30a-rosemary-beach-fl";
import { tucsonAz } from "./destinations/tucson-az";
import { tulumMexico } from "./destinations/tulum-mexico";
import { charlottesvilleVa } from "./destinations/virginia";
import { washingtonDc } from "./destinations/washington-dc";
import { wilmingtonNc } from "./destinations/wilmington-nc";
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
  sedonaAz,
  taosNm,
  tucsonAz,
  seattleWa,
  cannonBeachOr,
  wilmingtonNc,
  beaufortSc,
  batonRougeLa,
  memphisTn,
  mobileAl,
  tulumMexico,
  caboSanLucasMexico,
  rivieraMayaMexico,
  cartagenaColombia,
  puntaCanaDominicanRepublic,
];
export const SEED_BENCHMARKS: CostBenchmarks | null = benchmarks;
