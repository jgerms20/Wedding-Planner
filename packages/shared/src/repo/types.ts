import type {
  AiUsage,
  BudgetCategory,
  BudgetItem,
  ChatMessage,
  Decision,
  Destination,
  Event,
  Guest,
  Household,
  Note,
  Priority,
  SavingsEntry,
  Scenario,
  Settings,
  SubEvent,
  Task,
  Venue,
  Wedding,
  WeddingPartyMember,
  WatchItem,
} from "../entities/index";

/** Per-entity CRUD, scoped to a wedding for list(). */
export interface EntityRepo<T> {
  list(weddingId: string): Promise<T[]>;
  get(id: string): Promise<T | undefined>;
  upsert(entity: T): Promise<T>;
  remove(id: string): Promise<void>;
}

/** A stored file's metadata — never the bytes, which stay in `FilesRepo`'s own store and are
 * fetched on demand via `getObjectUrl`. Not a Zod entity: it's browser-only, excluded from the
 * JSON export bundle (blobs don't round-trip through JSON), and won't get a Supabase table until
 * Phase 0b adds real storage. */
export interface FileAttachment {
  id: string;
  weddingId: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export interface FilesRepo {
  list(weddingId: string): Promise<FileAttachment[]>;
  upload(weddingId: string, file: File): Promise<FileAttachment>;
  remove(id: string): Promise<void>;
  /** A short-lived `blob:` URL for downloading/previewing one file, or undefined if it's gone. */
  getObjectUrl(id: string): Promise<string | undefined>;
}

/**
 * Data-access surface the app codes against. `createLocalRepo()` (Dexie /
 * IndexedDB, Phase 0a) and `createSupabaseRepo(client)` (Phase 0b) both
 * implement this so the UI never branches on data mode.
 */
export interface WeddingRepo {
  tasks: EntityRepo<Task>;
  events: EntityRepo<Event>;
  destinations: EntityRepo<Destination>;
  venues: EntityRepo<Venue>;
  scenarios: EntityRepo<Scenario>;
  households: EntityRepo<Household>;
  guests: EntityRepo<Guest>;
  budgetCategories: EntityRepo<BudgetCategory>;
  budgetItems: EntityRepo<BudgetItem>;
  subEvents: EntityRepo<SubEvent>;
  partyMembers: EntityRepo<WeddingPartyMember>;
  decisions: EntityRepo<Decision>;
  notes: EntityRepo<Note>;
  chatMessages: EntityRepo<ChatMessage>;
  aiUsage: EntityRepo<AiUsage>;
  priorities: EntityRepo<Priority>;
  watchItems: EntityRepo<WatchItem>;
  savingsEntries: EntityRepo<SavingsEntry>;
  files: FilesRepo;

  getWedding(slug: string): Promise<Wedding | undefined>;
  upsertWedding(wedding: Wedding): Promise<Wedding>;
  getSettings(weddingId: string): Promise<Settings | undefined>;
  saveSettings(settings: Settings): Promise<Settings>;

  /** Serializes one wedding's full data set (wedding, settings, and every entity list) to JSON. */
  exportJson(weddingId: string): Promise<string>;
  /** Replaces all local data with the contents of a previously exported JSON string. */
  importJson(json: string): Promise<void>;
}

export type DataMode = "local" | "supabase";
