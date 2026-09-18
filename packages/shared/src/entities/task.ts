import { z } from "zod";
import { phaseKeySchema, taskStatusSchema } from "./common";

export const taskSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  templateId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  phase: phaseKeySchema,
  dueDate: z.string().optional(),
  /** Plain-language explanation of why dueDate is what it is — set once by generatePlan, not
   * recomputed in the UI, so it always matches the actual rule that decided the date. */
  dueDateReason: z.string().optional(),
  status: taskStatusSchema,
  tags: z.array(z.string()),
  dependsOn: z.array(z.string()),
  sourceAgent: z.string().optional(),
  windowId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Task = z.infer<typeof taskSchema>;

export const eventKindSchema = z.enum(["anchor", "deadline", "tour", "travel", "sub_event", "other"]);
export type EventKind = z.infer<typeof eventKindSchema>;

export const eventSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  title: z.string(),
  startsAt: z.string(),
  endsAt: z.string().optional(),
  allDay: z.boolean(),
  kind: eventKindSchema,
  linkedType: z.string().optional(),
  linkedId: z.string().optional(),
});
export type Event = z.infer<typeof eventSchema>;
