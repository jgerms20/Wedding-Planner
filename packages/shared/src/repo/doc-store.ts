import type { ZodType } from "zod";
import {
  aiUsageSchema,
  budgetCategorySchema,
  budgetItemSchema,
  chatMessageSchema,
  decisionSchema,
  destinationSchema,
  eventSchema,
  guestSchema,
  householdSchema,
  noteSchema,
  prioritySchema,
  savingsEntrySchema,
  scenarioSchema,
  settingsSchema,
  subEventSchema,
  taskSchema,
  venueSchema,
  watchItemSchema,
  weddingPartyMemberSchema,
  weddingSchema,
} from "../entities/index";
import { EXPORT_BUNDLE_VERSION, exportBundleSchema, type ExportBundle } from "./export-bundle";
import type { EntityRepo, FilesRepo, WeddingRepo } from "./types";

/**
 * A wedding's data as JSON documents grouped by collection — the shape the shared (Supabase)
 * store uses, one row per (wedding, collection, id). The store is already scoped to a single
 * wedding; `createDocRepo` turns it into the same `WeddingRepo` the local IndexedDB repo
 * implements, so no page knows which one it's talking to.
 */
export interface DocStore {
  list(collection: string): Promise<unknown[]>;
  get(collection: string, id: string): Promise<unknown | undefined>;
  put(collection: string, id: string, data: unknown): Promise<void>;
  putMany(collection: string, docs: { id: string; data: unknown }[]): Promise<void>;
  remove(collection: string, id: string): Promise<void>;
  /** Deletes every document for this wedding (used when importing a whole bundle). */
  clear(): Promise<void>;
}

/** Entity collections, named after the matching `WeddingRepo` key. */
export const ENTITY_COLLECTIONS = [
  "tasks",
  "events",
  "destinations",
  "venues",
  "scenarios",
  "households",
  "guests",
  "budgetCategories",
  "budgetItems",
  "subEvents",
  "partyMembers",
  "decisions",
  "notes",
  "chatMessages",
  "aiUsage",
  "priorities",
  "watchItems",
  "savingsEntries",
] as const;
export type EntityCollection = (typeof ENTITY_COLLECTIONS)[number];

const SCHEMAS: Record<EntityCollection, ZodType<{ id: string; weddingId: string }>> = {
  tasks: taskSchema,
  events: eventSchema,
  destinations: destinationSchema,
  venues: venueSchema,
  scenarios: scenarioSchema,
  households: householdSchema,
  guests: guestSchema,
  budgetCategories: budgetCategorySchema,
  budgetItems: budgetItemSchema,
  subEvents: subEventSchema,
  partyMembers: weddingPartyMemberSchema,
  decisions: decisionSchema,
  notes: noteSchema,
  chatMessages: chatMessageSchema,
  aiUsage: aiUsageSchema,
  priorities: prioritySchema,
  watchItems: watchItemSchema,
  savingsEntries: savingsEntrySchema,
};

/** Collections carried in the JSON export bundle (chat history and AI usage stay per-device). */
const BUNDLE_COLLECTIONS = [
  "tasks",
  "events",
  "destinations",
  "venues",
  "scenarios",
  "households",
  "guests",
  "budgetCategories",
  "budgetItems",
  "subEvents",
  "partyMembers",
  "decisions",
  "notes",
  "priorities",
  "watchItems",
  "savingsEntries",
] as const satisfies readonly EntityCollection[];

function docEntityRepo<T extends { id: string; weddingId: string }>(
  store: DocStore,
  collection: EntityCollection,
  weddingId: string,
): EntityRepo<T> {
  const schema = SCHEMAS[collection] as unknown as ZodType<T>;
  return {
    async list(id) {
      if (id !== weddingId) return [];
      const docs = await store.list(collection);
      // A document written by a newer version of the app can fail an older client's schema; skip
      // it rather than blanking the whole page. It stays in the store untouched.
      return docs.flatMap((doc) => {
        const parsed = schema.safeParse(doc);
        return parsed.success ? [parsed.data] : [];
      });
    },
    async get(id) {
      const doc = await store.get(collection, id);
      const parsed = doc === undefined ? undefined : schema.safeParse(doc);
      return parsed?.success ? parsed.data : undefined;
    },
    async upsert(entity) {
      const parsed = schema.parse({ ...entity, weddingId });
      await store.put(collection, parsed.id, parsed);
      return parsed;
    },
    async remove(id) {
      await store.remove(collection, id);
    },
  };
}

/** Points every record in a bundle at `weddingId` (a bundle built elsewhere carries its own id). */
export function rehomeBundle(bundle: ExportBundle, weddingId: string): ExportBundle {
  const rehome = <T extends { weddingId: string }>(list: T[]) => list.map((item) => ({ ...item, weddingId }));
  return {
    ...bundle,
    wedding: { ...bundle.wedding, id: weddingId },
    settings: bundle.settings ? { ...bundle.settings, weddingId } : undefined,
    tasks: rehome(bundle.tasks),
    events: rehome(bundle.events),
    destinations: rehome(bundle.destinations),
    venues: rehome(bundle.venues),
    scenarios: rehome(bundle.scenarios),
    households: rehome(bundle.households),
    guests: rehome(bundle.guests),
    budgetCategories: rehome(bundle.budgetCategories),
    budgetItems: rehome(bundle.budgetItems),
    subEvents: rehome(bundle.subEvents),
    partyMembers: rehome(bundle.partyMembers),
    decisions: rehome(bundle.decisions),
    notes: rehome(bundle.notes),
    priorities: rehome(bundle.priorities),
    watchItems: rehome(bundle.watchItems),
    savingsEntries: rehome(bundle.savingsEntries),
  };
}

/** A `WeddingRepo` over a single wedding's `DocStore`. Files stay on this device (`files`). */
export function createDocRepo(store: DocStore, weddingId: string, files: FilesRepo): WeddingRepo {
  const repos = Object.fromEntries(
    ENTITY_COLLECTIONS.map((collection) => [collection, docEntityRepo(store, collection, weddingId)]),
  ) as { [K in EntityCollection]: WeddingRepo[K] };

  // The shared store holds exactly one wedding, whatever slug the route uses.
  async function getWedding() {
    const parsed = weddingSchema.safeParse(await store.get("wedding", weddingId));
    return parsed.success ? parsed.data : undefined;
  }
  async function getSettings() {
    const parsed = settingsSchema.safeParse(await store.get("settings", weddingId));
    return parsed.success ? parsed.data : undefined;
  }

  return {
    ...repos,
    files,
    getWedding,
    getSettings,
    async upsertWedding(wedding) {
      const parsed = weddingSchema.parse({ ...wedding, id: weddingId });
      await store.put("wedding", weddingId, parsed);
      return parsed;
    },
    async saveSettings(settings) {
      const parsed = settingsSchema.parse({ ...settings, weddingId });
      await store.put("settings", weddingId, parsed);
      return parsed;
    },

    async exportJson() {
      const wedding = await getWedding();
      if (!wedding) throw new Error("This shared wedding has no data yet.");
      const bundle: Record<string, unknown> = {
        version: EXPORT_BUNDLE_VERSION,
        exportedAt: new Date().toISOString(),
        wedding,
        settings: await getSettings(),
      };
      for (const collection of BUNDLE_COLLECTIONS) bundle[collection] = await repos[collection].list(weddingId);
      return JSON.stringify(exportBundleSchema.parse(bundle), null, 2);
    },

    async importJson(json) {
      const bundle = rehomeBundle(exportBundleSchema.parse(JSON.parse(json)), weddingId);
      await store.clear();
      await store.put("wedding", weddingId, bundle.wedding);
      if (bundle.settings) await store.put("settings", weddingId, bundle.settings);
      for (const collection of BUNDLE_COLLECTIONS) {
        const list = bundle[collection] as { id: string }[];
        if (list.length > 0) await store.putMany(collection, list.map((entity) => ({ id: entity.id, data: entity })));
      }
    },
  };
}

/** An in-memory `DocStore`, for tests and for previewing a merge without touching anything. */
export function createMemoryDocStore(): DocStore & { snapshot(): Map<string, Map<string, unknown>> } {
  const collections = new Map<string, Map<string, unknown>>();
  const bucket = (name: string) => {
    let found = collections.get(name);
    if (!found) {
      found = new Map();
      collections.set(name, found);
    }
    return found;
  };
  const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
  return {
    async list(collection) {
      return [...bucket(collection).values()].map(clone);
    },
    async get(collection, id) {
      const value = bucket(collection).get(id);
      return value === undefined ? undefined : clone(value);
    },
    async put(collection, id, data) {
      bucket(collection).set(id, clone(data));
    },
    async putMany(collection, docs) {
      for (const doc of docs) bucket(collection).set(doc.id, clone(doc.data));
    },
    async remove(collection, id) {
      bucket(collection).delete(id);
    },
    async clear() {
      collections.clear();
    },
    snapshot() {
      return collections;
    },
  };
}
