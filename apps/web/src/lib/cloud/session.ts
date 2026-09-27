import type { SupabaseClient } from "@supabase/supabase-js";
import {
  createDocRepo,
  createLocalRepo,
  describeMerge,
  exportBundleSchema,
  newId,
  planMerge,
  type EntityCollection,
  type WeddingRepo,
} from "@bower/shared";
import { restoreSeed } from "../bootstrap";
import { WEDDING_SLUG } from "../constants";
import { supabaseDocStore } from "./client";

const mergedKey = (weddingId: string) => `atlas:merged-into:${weddingId}`;

function markMerged(weddingId: string) {
  try {
    window.localStorage.setItem(mergedKey(weddingId), new Date().toISOString());
  } catch {
    /* private mode: the merge banner may reappear, and merging again is a no-op */
  }
}

function wasMerged(weddingId: string): boolean {
  try {
    return window.localStorage.getItem(mergedKey(weddingId)) !== null;
  } catch {
    return false;
  }
}

export function sharedRepo(supabase: SupabaseClient, weddingId: string): WeddingRepo {
  return createDocRepo(supabaseDocStore(supabase, weddingId), weddingId, createLocalRepo().files);
}

/** Joins any wedding that invited this email, then returns the wedding this person belongs to. */
export async function findSharedWedding(supabase: SupabaseClient): Promise<string | null> {
  const claimed = await supabase.rpc("claim_invites");
  if (claimed.error) throw new Error(`Couldn't check for invites: ${claimed.error.message}`);
  const { data, error } = await supabase.from("weddings").select("id").order("created_at").limit(1);
  if (error) throw new Error(`Couldn't load your wedding: ${error.message}`);
  return data?.[0]?.id ?? null;
}

/**
 * The first partner to sign in creates the shared wedding from whatever this browser already
 * has — their favorites, guests, edits — so nothing they did before sign-in is lost. A browser
 * with no data starts from the Joshua & Janel seed.
 */
export async function createSharedWedding(supabase: SupabaseClient): Promise<string> {
  const local = createLocalRepo();
  const localWedding = await local.getWedding(WEDDING_SLUG);
  const weddingId = localWedding?.id ?? newId();

  const { error } = await supabase.rpc("create_wedding", { p_id: weddingId, p_slug: `our-wedding-${weddingId.slice(0, 8)}` });
  if (error) throw new Error(`Couldn't create the shared wedding: ${error.message}`);

  const repo = sharedRepo(supabase, weddingId);
  if (localWedding) await repo.importJson(await local.exportJson(localWedding.id));
  else await restoreSeed(repo);
  markMerged(weddingId);
  return weddingId;
}

/** True when this browser holds its own pre-sharing copy that hasn't been merged in yet. */
export async function localCopyPending(weddingId: string): Promise<boolean> {
  if (wasMerged(weddingId)) return false;
  const localWedding = await createLocalRepo().getWedding(WEDDING_SLUG);
  return Boolean(localWedding);
}

/** Brings this browser's pre-sharing copy into the shared wedding. Returns a one-line summary. */
export async function mergeLocalCopy(supabase: SupabaseClient, weddingId: string): Promise<string> {
  const local = createLocalRepo();
  const localWedding = await local.getWedding(WEDDING_SLUG);
  if (!localWedding) {
    markMerged(weddingId);
    return "Nothing to bring over from this browser.";
  }
  const shared = sharedRepo(supabase, weddingId);
  const existing = exportBundleSchema.parse(JSON.parse(await shared.exportJson(weddingId)));
  const incoming = exportBundleSchema.parse(JSON.parse(await local.exportJson(localWedding.id)));
  const { writes, summary } = planMerge(existing, incoming);

  const store = supabaseDocStore(supabase, weddingId);
  const byCollection = new Map<EntityCollection, { id: string; data: unknown }[]>();
  for (const write of writes) {
    byCollection.set(write.collection, [...(byCollection.get(write.collection) ?? []), { id: write.entity.id, data: write.entity }]);
  }
  for (const [collection, docs] of byCollection) await store.putMany(collection, docs);

  markMerged(weddingId);
  return describeMerge(summary);
}

/** Invites the other partner by email; they join automatically the first time they sign in with it. */
export async function invitePartner(supabase: SupabaseClient, weddingId: string, email: string): Promise<void> {
  const { error } = await supabase.from("wedding_invites").insert({
    wedding_id: weddingId,
    email: email.trim().toLowerCase(),
    token: crypto.randomUUID(),
    expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  });
  if (error) throw new Error(`Couldn't send the invite: ${error.message}`);
}

export interface SharingState {
  memberCount: number;
  invites: { email: string; accepted: boolean }[];
}

export async function loadSharingState(supabase: SupabaseClient, weddingId: string): Promise<SharingState> {
  const [members, invites] = await Promise.all([
    supabase.from("wedding_members").select("user_id").eq("wedding_id", weddingId),
    supabase.from("wedding_invites").select("email, accepted_by").eq("wedding_id", weddingId).order("created_at"),
  ]);
  if (members.error) throw new Error(members.error.message);
  if (invites.error) throw new Error(invites.error.message);
  return {
    memberCount: members.data.length,
    invites: invites.data.map((i) => ({ email: i.email as string, accepted: i.accepted_by !== null })),
  };
}
