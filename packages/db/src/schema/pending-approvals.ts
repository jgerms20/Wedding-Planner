import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { agentRuns } from "./agent-runs";
import { profiles } from "./profiles";
import { weddings } from "./weddings";

export const approvalStatusValues = ["pending", "approved", "rejected", "executed", "failed"] as const;
export type ApprovalStatus = (typeof approvalStatusValues)[number];

export const pendingApprovals = pgTable("pending_approvals", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  runId: uuid("run_id").references(() => agentRuns.id, { onDelete: "cascade" }),
  actionType: text("action_type").notNull(),
  payload: jsonb("payload"),
  status: text("status").$type<ApprovalStatus>().notNull().default("pending"),
  decidedBy: uuid("decided_by").references(() => profiles.id),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PendingApproval = typeof pendingApprovals.$inferSelect;
export type NewPendingApproval = typeof pendingApprovals.$inferInsert;
