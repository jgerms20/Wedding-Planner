import Dexie, { type Table } from "dexie";
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
  type AiUsage,
  type BudgetCategory,
  type BudgetItem,
  type ChatMessage,
  type Decision,
  type Destination,
  type Event,
  type Guest,
  type Household,
  type Note,
  type Priority,
  type SavingsEntry,
  type Scenario,
  type Settings,
  type SubEvent,
  type Task,
  type Venue,
  type Wedding,
  type WeddingPartyMember,
  type WatchItem,
} from "../entities/index";
import { newId } from "../util";
import { EXPORT_BUNDLE_VERSION, exportBundleSchema } from "./export-bundle";
import type { EntityRepo, FileAttachment, FilesRepo, WeddingRepo } from "./types";

/** A file's blob lives only in this row — never in the JSON export bundle (blobs don't
 * round-trip through JSON, and this app has no server to hold them yet). */
interface FileBlobRow extends FileAttachment {
  blob: Blob;
}

/** IndexedDB is generous but not infinite; keep individual uploads sane in a browser-only store. */
const MAX_FILE_BYTES = 20 * 1024 * 1024;

/** The local Dexie (IndexedDB) database. One table per entity, database name "bower". */
class BowerDatabase extends Dexie {
  weddings!: Table<Wedding, string>;
  settings!: Table<Settings, string>;
  tasks!: Table<Task, string>;
  events!: Table<Event, string>;
  destinations!: Table<Destination, string>;
  venues!: Table<Venue, string>;
  scenarios!: Table<Scenario, string>;
  households!: Table<Household, string>;
  guests!: Table<Guest, string>;
  budgetCategories!: Table<BudgetCategory, string>;
  budgetItems!: Table<BudgetItem, string>;
  subEvents!: Table<SubEvent, string>;
  partyMembers!: Table<WeddingPartyMember, string>;
  decisions!: Table<Decision, string>;
  notes!: Table<Note, string>;
  chatMessages!: Table<ChatMessage, string>;
  aiUsage!: Table<AiUsage, string>;
  priorities!: Table<Priority, string>;
  watchItems!: Table<WatchItem, string>;
  savingsEntries!: Table<SavingsEntry, string>;
  fileBlobs!: Table<FileBlobRow, string>;

  constructor(name = "bower") {
    super(name);
    this.version(1).stores({
      weddings: "id, slug",
      settings: "weddingId",
      tasks: "id, weddingId, phase, status, templateId",
      events: "id, weddingId, kind, startsAt",
      destinations: "id, weddingId",
      venues: "id, weddingId, destinationId, status",
      scenarios: "id, weddingId, destinationId, venueId, pinned",
      households: "id, weddingId, side",
      guests: "id, weddingId, householdId, side, tier",
      budgetCategories: "id, weddingId, sortOrder",
      budgetItems: "id, weddingId, categoryId",
      subEvents: "id, weddingId, kind",
      partyMembers: "id, weddingId, side",
      decisions: "id, weddingId, decidedAt",
    });
    // v2: notes, concierge chat, and AI usage (browser-only until Phase 0b).
    this.version(2).stores({
      notes: "id, weddingId, createdAt, linkedId",
      chatMessages: "id, weddingId, createdAt",
      aiUsage: "id, weddingId, createdAt, feature",
    });
    // v3: must-haves and the wedding-media watch-list (also browser-only until Phase 0b).
    this.version(3).stores({
      priorities: "id, weddingId, area",
      watchItems: "id, weddingId, kind",
    });
    // v4: the wedding-fund savings log, and uploaded files (blob stays out of the JSON bundle).
    this.version(4).stores({
      savingsEntries: "id, weddingId, date",
      fileBlobs: "id, weddingId, createdAt",
    });
  }
}

function entityRepo<T extends { id: string; weddingId: string }>(
  table: Table<T, string>,
  schema: ZodType<T>,
): EntityRepo<T> {
  return {
    async list(weddingId) {
      return table.where("weddingId").equals(weddingId).toArray();
    },
    async get(id) {
      return table.get(id);
    },
    async upsert(entity) {
      const parsed = schema.parse(entity);
      await table.put(parsed);
      return parsed;
    },
    async remove(id) {
      await table.delete(id);
    },
  };
}

/** Creates the local (IndexedDB via Dexie) implementation of WeddingRepo. */
export function createLocalRepo(databaseName = "bower"): WeddingRepo {
  const db = new BowerDatabase(databaseName);

  const tasks = entityRepo(db.tasks, taskSchema);
  const events = entityRepo(db.events, eventSchema);
  const destinations = entityRepo(db.destinations, destinationSchema);
  const venues = entityRepo(db.venues, venueSchema);
  const scenarios = entityRepo(db.scenarios, scenarioSchema);
  const households = entityRepo(db.households, householdSchema);
  const guests = entityRepo(db.guests, guestSchema);
  const budgetCategories = entityRepo(db.budgetCategories, budgetCategorySchema);
  const budgetItems = entityRepo(db.budgetItems, budgetItemSchema);
  const subEvents = entityRepo(db.subEvents, subEventSchema);
  const partyMembers = entityRepo(db.partyMembers, weddingPartyMemberSchema);
  const decisions = entityRepo(db.decisions, decisionSchema);
  const notes = entityRepo(db.notes, noteSchema);
  const chatMessages = entityRepo(db.chatMessages, chatMessageSchema);
  const aiUsage = entityRepo(db.aiUsage, aiUsageSchema);
  const priorities = entityRepo(db.priorities, prioritySchema);
  const watchItems = entityRepo(db.watchItems, watchItemSchema);
  const savingsEntries = entityRepo(db.savingsEntries, savingsEntrySchema);

  const files: FilesRepo = {
    async list(weddingId) {
      const rows = await db.fileBlobs.where("weddingId").equals(weddingId).toArray();
      return rows.map(({ blob: _blob, ...meta }) => meta).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async upload(weddingId, file) {
      if (file.size > MAX_FILE_BYTES) {
        throw new Error(`${file.name} is larger than 20MB — this browser-only storage can't hold it yet.`);
      }
      const row: FileBlobRow = {
        id: newId(),
        weddingId,
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        blob: file,
        createdAt: new Date().toISOString(),
      };
      await db.fileBlobs.put(row);
      const { blob: _blob, ...meta } = row;
      return meta;
    },
    async remove(id) {
      await db.fileBlobs.delete(id);
    },
    async getObjectUrl(id) {
      const row = await db.fileBlobs.get(id);
      return row ? URL.createObjectURL(row.blob) : undefined;
    },
  };

  const bundleTables = [
    db.weddings,
    db.settings,
    db.tasks,
    db.events,
    db.destinations,
    db.venues,
    db.scenarios,
    db.households,
    db.guests,
    db.budgetCategories,
    db.budgetItems,
    db.subEvents,
    db.partyMembers,
    db.decisions,
    db.notes,
    db.priorities,
    db.watchItems,
    db.savingsEntries,
  ];

  return {
    tasks,
    events,
    destinations,
    venues,
    scenarios,
    households,
    guests,
    budgetCategories,
    budgetItems,
    subEvents,
    partyMembers,
    decisions,
    notes,
    chatMessages,
    aiUsage,
    priorities,
    watchItems,
    savingsEntries,
    files,

    async getWedding(slug) {
      return db.weddings.where("slug").equals(slug).first();
    },
    async upsertWedding(wedding) {
      const parsed = weddingSchema.parse(wedding);
      await db.weddings.put(parsed);
      return parsed;
    },
    async getSettings(weddingId) {
      return db.settings.get(weddingId);
    },
    async saveSettings(settings) {
      const parsed = settingsSchema.parse(settings);
      await db.settings.put(parsed);
      return parsed;
    },

    async exportJson(weddingId) {
      const wedding = await db.weddings.get(weddingId);
      if (!wedding) {
        throw new Error(`No wedding found with id ${weddingId}`);
      }
      const bundle = {
        version: EXPORT_BUNDLE_VERSION,
        exportedAt: new Date().toISOString(),
        wedding,
        settings: await db.settings.get(weddingId),
        tasks: await tasks.list(weddingId),
        events: await events.list(weddingId),
        destinations: await destinations.list(weddingId),
        venues: await venues.list(weddingId),
        scenarios: await scenarios.list(weddingId),
        households: await households.list(weddingId),
        guests: await guests.list(weddingId),
        budgetCategories: await budgetCategories.list(weddingId),
        budgetItems: await budgetItems.list(weddingId),
        subEvents: await subEvents.list(weddingId),
        partyMembers: await partyMembers.list(weddingId),
        decisions: await decisions.list(weddingId),
        notes: await notes.list(weddingId),
        priorities: await priorities.list(weddingId),
        watchItems: await watchItems.list(weddingId),
        savingsEntries: await savingsEntries.list(weddingId),
      };
      const parsed = exportBundleSchema.parse(bundle);
      return JSON.stringify(parsed, null, 2);
    },

    async importJson(json) {
      const raw: unknown = JSON.parse(json);
      const bundle = exportBundleSchema.parse(raw);

      await db.transaction("rw", bundleTables, async () => {
        // Local mode holds a single wedding: importing replaces everything.
        await Promise.all(bundleTables.map((table) => table.clear()));

        await db.weddings.put(bundle.wedding);
        if (bundle.settings) {
          await db.settings.put(bundle.settings);
        }
        await db.tasks.bulkPut(bundle.tasks);
        await db.events.bulkPut(bundle.events);
        await db.destinations.bulkPut(bundle.destinations);
        await db.venues.bulkPut(bundle.venues);
        await db.scenarios.bulkPut(bundle.scenarios);
        await db.households.bulkPut(bundle.households);
        await db.guests.bulkPut(bundle.guests);
        await db.budgetCategories.bulkPut(bundle.budgetCategories);
        await db.budgetItems.bulkPut(bundle.budgetItems);
        await db.subEvents.bulkPut(bundle.subEvents);
        await db.partyMembers.bulkPut(bundle.partyMembers);
        await db.decisions.bulkPut(bundle.decisions);
        await db.notes.bulkPut(bundle.notes);
        await db.priorities.bulkPut(bundle.priorities);
        await db.watchItems.bulkPut(bundle.watchItems);
        await db.savingsEntries.bulkPut(bundle.savingsEntries);
      });
    },
  };
}
