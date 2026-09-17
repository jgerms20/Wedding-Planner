import { integer, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { agentRuns } from "./agent-runs";
import { weddings } from "./weddings";

export const costLedger = pgTable("cost_ledger", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  runId: uuid("run_id").references(() => agentRuns.id, { onDelete: "cascade" }),
  model: text("model").notNull(),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  cacheReadTokens: integer("cache_read_tokens").notNull().default(0),
  cacheWriteTokens: integer("cache_write_tokens").notNull().default(0),
  costCents: numeric("cost_cents").notNull().default("0"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CostLedgerEntry = typeof costLedger.$inferSelect;
export type NewCostLedgerEntry = typeof costLedger.$inferInsert;
