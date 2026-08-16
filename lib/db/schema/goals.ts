import { boolean, date, index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./identity";

export const goalStatus = pgEnum("goal_status", ["active", "paused", "reached"]);
export const goalProgressFrom = pgEnum("goal_progress_from", ["net_worth", "cash"]);

export const financialGoal = pgTable(
  "financial_goal",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    name: text("name").notNull(),
    targetAmountCents: integer("target_amount_cents").notNull(),
    targetDate: date("target_date", { mode: "string" }).notNull(),
    monthlyContributionCents: integer("monthly_contribution_cents").notNull().default(0),
    progressFrom: goalProgressFrom("progress_from").notNull().default("net_worth"),
    status: goalStatus("status").notNull().default("active"),
    isPrimary: boolean("is_primary").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [index("financial_goal_workspace_idx").on(table.workspaceId)],
);
