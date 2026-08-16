import { boolean, date, index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./identity";

export const accountKind = pgEnum("account_kind", ["cash", "bank", "ewallet", "investment"]);
export const moneyTransactionType = pgEnum("money_transaction_type", ["income", "expense"]);

export const financialAccount = pgTable(
  "financial_account",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    name: text("name").notNull(),
    kind: accountKind("kind").notNull().default("bank"),
    statedBalanceCents: integer("stated_balance_cents").notNull().default(0),
    isPrimary: boolean("is_primary").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [index("financial_account_workspace_idx").on(table.workspaceId)],
);

export const moneyTransaction = pgTable(
  "money_transaction",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    accountId: text("account_id").references(() => financialAccount.id),
    type: moneyTransactionType("type").notNull(),
    name: text("name").notNull(),
    amountCents: integer("amount_cents").notNull(),
    occurredOn: date("occurred_on", { mode: "string" }).notNull(),
    category: text("category"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    index("money_transaction_workspace_date_idx").on(table.workspaceId, table.occurredOn),
  ],
);

export const asset = pgTable(
  "asset",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    name: text("name").notNull(),
    amountCents: integer("amount_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [index("asset_workspace_idx").on(table.workspaceId)],
);

export const liability = pgTable(
  "liability",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    name: text("name").notNull(),
    amountCents: integer("amount_cents").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [index("liability_workspace_idx").on(table.workspaceId)],
);

export const financialProfile = pgTable("financial_profile", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspace.id)
    .unique(),
  focus: text("focus"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
