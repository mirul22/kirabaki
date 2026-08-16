import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const knowledgeKind = pgEnum("knowledge_kind", ["book", "article", "regulator"]);
export const ruleStatus = pgEnum("rule_status", ["draft", "active", "retired"]);

export const knowledgeSource = pgTable("knowledge_source", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  kind: knowledgeKind("kind").notNull(),
  year: integer("year"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const principle = pgTable("principle", {
  id: text("id").primaryKey(),
  sourceId: text("source_id")
    .notNull()
    .references(() => knowledgeSource.id),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  explanation: text("explanation").notNull(),
  chapter: text("chapter"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rule = pgTable("rule", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const ruleVersion = pgTable("rule_version", {
  id: text("id").primaryKey(),
  ruleId: text("rule_id")
    .notNull()
    .references(() => rule.id),
  version: integer("version").notNull(),
  status: ruleStatus("status").notNull().default("active"),
  predicateKey: text("predicate_key").notNull(),
  explanationTemplate: text("explanation_template").notNull(),
  whyTemplate: text("why_template").notNull(),
  ifNothingTemplate: text("if_nothing_template").notNull(),
  nextActionTemplate: text("next_action_template").notNull(),
  principleId: text("principle_id").references(() => principle.id),
  priority: integer("priority").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
