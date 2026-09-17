import { bigserial, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { agentRuns } from "./agent-runs";
import { weddings } from "./weddings";

export const agentEventKindValues = [
  "thinking",
  "text",
  "tool_call",
  "tool_result",
  "approval_requested",
  "done",
  "error",
] as const;
export type AgentEventKind = (typeof agentEventKindValues)[number];

export const agentEvents = pgTable("agent_events", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  runId: uuid("run_id")
    .notNull()
    .references(() => agentRuns.id, { onDelete: "cascade" }),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  seq: integer("seq").notNull(),
  kind: text("kind").$type<AgentEventKind>().notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AgentEvent = typeof agentEvents.$inferSelect;
export type NewAgentEvent = typeof agentEvents.$inferInsert;
