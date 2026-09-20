import { z } from "zod";
import { sideSchema, subEventKindSchema } from "./common";

export const subEventSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  kind: subEventKindSchema,
  title: z.string(),
  date: z.string().optional(),
  location: z.string().optional(),
  hostName: z.string().optional(),
  budgetEstimate: z.number().optional(),
  notes: z.string().optional(),
  guestRule: z.string().optional(),
  /** Manual rank, lowest first — the couple's own order. Optional so events added before this
   * field existed still read back fine. */
  sortOrder: z.number().optional(),
});
export type SubEvent = z.infer<typeof subEventSchema>;

export const weddingPartyMemberSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  name: z.string(),
  role: z.string(),
  side: sideSchema,
  asked: z.boolean(),
  askedDate: z.string().optional(),
  contact: z.string().optional(),
  notes: z.string().optional(),
});
export type WeddingPartyMember = z.infer<typeof weddingPartyMemberSchema>;

export const decisionSourceSchema = z.enum(["chat", "approval", "manual"]);
export type DecisionSource = z.infer<typeof decisionSourceSchema>;

export const decisionSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  title: z.string(),
  detail: z.string().optional(),
  decidedAt: z.string(),
  decidedBy: z.string().optional(),
  source: decisionSourceSchema,
});
export type Decision = z.infer<typeof decisionSchema>;
