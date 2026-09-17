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
