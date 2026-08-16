import { index, pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const workspaceType = pgEnum("workspace_type", ["personal", "business"]);
export const membershipRole = pgEnum("membership_role", ["owner", "member", "advisor"]);

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: workspaceType("type").notNull().default("personal"),
  currency: text("currency").notNull().default("MYR"),
  jurisdiction: text("jurisdiction").notNull().default("MY"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const membership = pgTable(
  "membership",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: membershipRole("role").notNull().default("owner"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique("membership_workspace_user").on(table.workspaceId, table.userId),
    index("membership_user_idx").on(table.userId),
    index("membership_workspace_idx").on(table.workspaceId),
  ],
);

export const auditEvent = pgTable(
  "audit_event",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id").references(() => workspace.id),
    actorUserId: text("actor_user_id").references(() => user.id),
    action: text("action").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("audit_event_workspace_idx").on(table.workspaceId),
    index("audit_event_actor_idx").on(table.actorUserId),
  ],
);
