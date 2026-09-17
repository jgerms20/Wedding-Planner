import { createLocalRepo } from "./local.js";
import type { DataMode, WeddingRepo } from "./types.js";

export * from "./types.js";
export * from "./local.js";
export * from "./export-bundle.js";

/**
 * Creates a WeddingRepo for the given data mode. "local" (Phase 0a) is backed
 * by IndexedDB via Dexie and fully implemented. "supabase" (Phase 0b) will
 * return a repo backed by Postgres/Supabase behind the same interface; the UI
 * never branches on which one it got.
 */
export function createRepo(mode: DataMode): WeddingRepo {
  if (mode === "local") {
    return createLocalRepo();
  }
  throw new Error(
    "createRepo('supabase') is not implemented yet — Phase 0b wires this up against packages/db.",
  );
}
