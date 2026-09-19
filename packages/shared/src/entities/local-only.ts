import { z } from "zod";

/**
 * Entities that live in the browser only for now (no Supabase table yet).
 * They get proper tables with RLS in Phase 0b; the shapes here are the contract.
 */

export const noteSourceSchema = z.enum(["chat", "voice", "manual"]);
export type NoteSource = z.infer<typeof noteSourceSchema>;

/** A free-text note the couple (or Bower) captured, optionally pinned to an entity. */
export const noteSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  text: z.string(),
  source: noteSourceSchema,
  linkedType: z.string().optional(),
  linkedId: z.string().optional(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;

export const chatRoleSchema = z.enum(["user", "assistant"]);
export type ChatRole = z.infer<typeof chatRoleSchema>;

/** One turn of the Concierge conversation. `actions` holds the proposed/applied action objects as plain JSON. */
export const chatMessageSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  role: chatRoleSchema,
  content: z.string(),
  actions: z.array(z.record(z.string(), z.unknown())).optional(),
  createdAt: z.string(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

/** One model call's usage, so cost is visible in Settings. */
export const aiUsageSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  feature: z.string(),
  model: z.string(),
  inputTokens: z.number(),
  outputTokens: z.number(),
  cacheReadTokens: z.number(),
  cacheWriteTokens: z.number(),
  costCents: z.number(),
  createdAt: z.string(),
});
export type AiUsage = z.infer<typeof aiUsageSchema>;

/** A must-have, either overall or for a specific area (venue, catering, ...). `area` is a plain
 * string rather than a closed enum so the couple can categorize however makes sense to them; the
 * UI offers a few common areas as quick picks. */
export const prioritySchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  area: z.string(),
  label: z.string(),
  done: z.boolean(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Priority = z.infer<typeof prioritySchema>;

export const watchItemKindSchema = z.enum(["movie", "show", "podcast"]);
export type WatchItemKind = z.infer<typeof watchItemKindSchema>;

/** One title on the couple's wedding-themed movies/shows/podcasts checklist. */
export const watchItemSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  kind: watchItemKindSchema,
  title: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
});
export type WatchItem = z.infer<typeof watchItemSchema>;

/** One deposit toward the wedding fund. `date` is when it was set aside, not a due date. */
export const savingsEntrySchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  date: z.string(),
  amount: z.number(),
  note: z.string().optional(),
  createdAt: z.string(),
});
export type SavingsEntry = z.infer<typeof savingsEntrySchema>;
