import "fake-indexeddb/auto";
import {
  buildSeedBundle,
  createLocalRepo,
  newId,
  SEED_BENCHMARKS,
  SEED_DESTINATIONS,
  type Wedding,
  type WeddingRepo,
} from "@bower/shared";

/** A fresh IndexedDB database per test, loaded with Joshua & Janel's real seed. */
export async function seededRepo(now = "2026-09-17T12:00:00.000Z"): Promise<{ repo: WeddingRepo; wedding: Wedding }> {
  const repo = createLocalRepo(`ai-test-${newId()}`);
  const bundle = buildSeedBundle({
    destinations: SEED_DESTINATIONS,
    benchmarks: SEED_BENCHMARKS!,
    slug: "our-wedding",
    now,
  });
  await repo.importJson(JSON.stringify(bundle));
  return { repo, wedding: bundle.wedding };
}
