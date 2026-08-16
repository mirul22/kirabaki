import { date, index, integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { workspace } from "./identity";

export const financialSnapshot = pgTable(
  "financial_snapshot",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    periodStart: date("period_start", { mode: "string" }).notNull(),
    incomeCents: integer("income_cents").notNull(),
    expenseCents: integer("expense_cents").notNull(),
    savingsCents: integer("savings_cents").notNull(),
    savingsRateBps: integer("savings_rate_bps"),
    cashflowCents: integer("cashflow_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique("financial_snapshot_workspace_period").on(table.workspaceId, table.periodStart),
    index("financial_snapshot_workspace_idx").on(table.workspaceId),
  ],
);

export const netWorthSnapshot = pgTable(
  "net_worth_snapshot",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    capturedOn: date("captured_on", { mode: "string" }).notNull(),
    netWorthCents: integer("net_worth_cents").notNull(),
    cashCents: integer("cash_cents").notNull(),
    assetsCents: integer("assets_cents").notNull(),
    liabilitiesCents: integer("liabilities_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    unique("net_worth_snapshot_workspace_day").on(table.workspaceId, table.capturedOn),
    index("net_worth_snapshot_workspace_idx").on(table.workspaceId),
  ],
);
