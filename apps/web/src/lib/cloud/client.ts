import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DocStore } from "@bower/shared";
import { DATA_MODE } from "../constants";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// The publishable ("anon") key is public by design: it ships in the page bundle, and the
// database's row-level security is what decides who can read or write anything.
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when this build shares data through Supabase instead of keeping it in this browser. */
export const CLOUD_ENABLED = DATA_MODE === "supabase" && Boolean(URL && KEY);

let client: SupabaseClient | null = null;

export function cloudClient(): SupabaseClient {
  if (!CLOUD_ENABLED) throw new Error("Shared mode isn't configured for this build.");
  client ??= createClient(URL!, KEY!, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "implicit" },
  });
  return client;
}

const PAGE = 1000;
const CHUNK = 400;

/** The `wedding_docs` table as a `DocStore`, scoped to one wedding. RLS enforces the scoping too. */
export function supabaseDocStore(supabase: SupabaseClient, weddingId: string): DocStore {
  const table = () => supabase.from("wedding_docs");
  const fail = (action: string, error: { message: string } | null) => {
    if (error) throw new Error(`Couldn't ${action}: ${error.message}`);
  };

  return {
    async list(collection) {
      const out: unknown[] = [];
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await table()
          .select("data")
          .eq("wedding_id", weddingId)
          .eq("collection", collection)
          .order("id")
          .range(from, from + PAGE - 1);
        fail(`load ${collection}`, error);
        out.push(...(data ?? []).map((row) => row.data as unknown));
        if (!data || data.length < PAGE) return out;
      }
    },
    async get(collection, id) {
      const { data, error } = await table()
        .select("data")
        .eq("wedding_id", weddingId)
        .eq("collection", collection)
        .eq("id", id)
        .maybeSingle();
      fail(`load ${collection}`, error);
      return data?.data as unknown;
    },
    async put(collection, id, data) {
      const { error } = await table().upsert({ wedding_id: weddingId, collection, id, data });
      fail(`save ${collection}`, error);
    },
    async putMany(collection, docs) {
      for (let i = 0; i < docs.length; i += CHUNK) {
        const rows = docs.slice(i, i + CHUNK).map((doc) => ({ wedding_id: weddingId, collection, id: doc.id, data: doc.data }));
        const { error } = await table().upsert(rows);
        fail(`save ${collection}`, error);
      }
    },
    async remove(collection, id) {
      const { error } = await table().delete().eq("wedding_id", weddingId).eq("collection", collection).eq("id", id);
      fail(`remove from ${collection}`, error);
    },
    async clear() {
      const { error } = await table().delete().eq("wedding_id", weddingId);
      fail("clear the wedding", error);
    },
  };
}
