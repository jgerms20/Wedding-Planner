import { integer, jsonb, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const agentRunStatusValues = ["queued", "running", "awaiting_approval", "done", "failed"] as const;
export type AgentRunStatus = (typeof agentRunStatusValues)[number];

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  agent: text("agent").notNull(),
  trigger: text("trigger").notNull(),
  status: text("status").$type<AgentRunStatus>().notNull().default("queued"),
  input: jsonb("input"),
  output: jsonb("output"),
  transcript: jsonb("transcript"),
  model: text("model"),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  cacheReadTokens: integer("cache_read_tokens"),
  cacheWriteTokens: integer("cache_write_tokens"),
  costCents: numeric("cost_cents"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AgentRun = typeof agentRuns.$inferSelect;
export type NewAgentRun = typeof agentRuns.$inferInsert;
