import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { weddings } from "./weddings";

export const wedingMemberRoleValues = ["owner", "viewer", "editor", "planner"] as const;
export type WeddingMemberRole = (typeof wedingMemberRoleValues)[number];

export const weddingMembers = pgTable(
  "wedding_members",
  {
    weddingId: uuid("wedding_id")
      .notNull()
      .references(() => weddings.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    role: text("role").$type<WeddingMemberRole>().notNull().default("owner"),
    invitedEmail: text("invited_email"),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  },
  (table) => [primaryKey({ columns: [table.weddingId, table.userId] })],
);

export type WeddingMember = typeof weddingMembers.$inferSelect;
export type NewWeddingMember = typeof weddingMembers.$inferInsert;
