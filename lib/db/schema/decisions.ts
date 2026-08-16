import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { workspace } from "./identity";
import { principle, ruleVersion } from "./knowledge";

export const recommendationStatus = pgEnum("recommendation_status", [
  "open",
  "accepted",
  "later",
  "dismissed",
  "completed",
]);
export const evidenceKind = pgEnum("evidence_kind", ["rule", "principle", "calculation", "snapshot"]);
export const actionDecision = pgEnum("action_decision", ["accepted", "later", "not_relevant"]);

export const recommendation = pgTable(
  "recommendation",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    ruleVersionId: text("rule_version_id")
      .notNull()
      .references(() => ruleVersion.id),
    principleId: text("principle_id").references(() => principle.id),
    title: text("title").notNull(),
    happening: text("happening").notNull(),
    whyItMatters: text("why_it_matters").notNull(),
    ifNothing: text("if_nothing").notNull(),
    nextAction: text("next_action").notNull(),
    type: text("type").notNull(),
    status: recommendationStatus("status").notNull().default("open"),
    calculationRef: text("calculation_ref"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (table) => [index("recommendation_workspace_idx").on(table.workspaceId)],
);

export const recommendationEvidence = pgTable(
  "recommendation_evidence",
  {
    id: text("id").primaryKey(),
    recommendationId: text("recommendation_id")
      .notNull()
      .references(() => recommendation.id, { onDelete: "cascade" }),
    kind: evidenceKind("kind").notNull(),
    refId: text("ref_id").notNull(),
    label: text("label").notNull(),
  },
  (table) => [index("recommendation_evidence_rec_idx").on(table.recommendationId)],
);

export const action = pgTable(
  "action",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    recommendationId: text("recommendation_id")
      .notNull()
      .references(() => recommendation.id),
    decision: actionDecision("decision").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("action_workspace_idx").on(table.workspaceId)],
);

export const outcome = pgTable(
  "outcome",
  {
    id: text("id").primaryKey(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id),
    actionId: text("action_id")
      .notNull()
      .references(() => action.id),
    note: text("note").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("outcome_workspace_idx").on(table.workspaceId)],
);
