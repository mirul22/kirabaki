CREATE TYPE "public"."account_kind" AS ENUM('cash', 'bank', 'ewallet', 'investment');--> statement-breakpoint
CREATE TYPE "public"."money_transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TYPE "public"."goal_progress_from" AS ENUM('net_worth', 'cash');--> statement-breakpoint
CREATE TYPE "public"."goal_status" AS ENUM('active', 'paused', 'reached');--> statement-breakpoint
CREATE TYPE "public"."knowledge_kind" AS ENUM('book', 'article', 'regulator');--> statement-breakpoint
CREATE TYPE "public"."rule_status" AS ENUM('draft', 'active', 'retired');--> statement-breakpoint
CREATE TYPE "public"."action_decision" AS ENUM('accepted', 'later', 'not_relevant');--> statement-breakpoint
CREATE TYPE "public"."evidence_kind" AS ENUM('rule', 'principle', 'calculation', 'snapshot');--> statement-breakpoint
CREATE TYPE "public"."recommendation_status" AS ENUM('open', 'accepted', 'later', 'dismissed', 'completed');--> statement-breakpoint
CREATE TABLE "asset" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"name" text NOT NULL,
	"amount_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_account" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"name" text NOT NULL,
	"kind" "account_kind" DEFAULT 'bank' NOT NULL,
	"stated_balance_cents" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"focus" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "financial_profile_workspace_id_unique" UNIQUE("workspace_id")
);
--> statement-breakpoint
CREATE TABLE "liability" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"name" text NOT NULL,
	"amount_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "money_transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"account_id" text,
	"type" "money_transaction_type" NOT NULL,
	"name" text NOT NULL,
	"amount_cents" integer NOT NULL,
	"occurred_on" date NOT NULL,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_goal" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"name" text NOT NULL,
	"target_amount_cents" integer NOT NULL,
	"target_date" date NOT NULL,
	"monthly_contribution_cents" integer DEFAULT 0 NOT NULL,
	"progress_from" "goal_progress_from" DEFAULT 'net_worth' NOT NULL,
	"status" "goal_status" DEFAULT 'active' NOT NULL,
	"is_primary" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "financial_snapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"period_start" date NOT NULL,
	"income_cents" integer NOT NULL,
	"expense_cents" integer NOT NULL,
	"savings_cents" integer NOT NULL,
	"savings_rate_bps" integer,
	"cashflow_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "financial_snapshot_workspace_period" UNIQUE("workspace_id","period_start")
);
--> statement-breakpoint
CREATE TABLE "net_worth_snapshot" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"captured_on" date NOT NULL,
	"net_worth_cents" integer NOT NULL,
	"cash_cents" integer NOT NULL,
	"assets_cents" integer NOT NULL,
	"liabilities_cents" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "net_worth_snapshot_workspace_day" UNIQUE("workspace_id","captured_on")
);
--> statement-breakpoint
CREATE TABLE "knowledge_source" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"kind" "knowledge_kind" NOT NULL,
	"year" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "principle" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"explanation" text NOT NULL,
	"chapter" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rule" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rule_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "rule_version" (
	"id" text PRIMARY KEY NOT NULL,
	"rule_id" text NOT NULL,
	"version" integer NOT NULL,
	"status" "rule_status" DEFAULT 'active' NOT NULL,
	"predicate_key" text NOT NULL,
	"explanation_template" text NOT NULL,
	"why_template" text NOT NULL,
	"if_nothing_template" text NOT NULL,
	"next_action_template" text NOT NULL,
	"principle_id" text,
	"priority" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "action" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"recommendation_id" text NOT NULL,
	"decision" "action_decision" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outcome" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"action_id" text NOT NULL,
	"note" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendation" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"rule_version_id" text NOT NULL,
	"principle_id" text,
	"title" text NOT NULL,
	"happening" text NOT NULL,
	"why_it_matters" text NOT NULL,
	"if_nothing" text NOT NULL,
	"next_action" text NOT NULL,
	"type" text NOT NULL,
	"status" "recommendation_status" DEFAULT 'open' NOT NULL,
	"calculation_ref" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "recommendation_evidence" (
	"id" text PRIMARY KEY NOT NULL,
	"recommendation_id" text NOT NULL,
	"kind" "evidence_kind" NOT NULL,
	"ref_id" text NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "asset" ADD CONSTRAINT "asset_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_account" ADD CONSTRAINT "financial_account_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_profile" ADD CONSTRAINT "financial_profile_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "liability" ADD CONSTRAINT "liability_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "money_transaction" ADD CONSTRAINT "money_transaction_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "money_transaction" ADD CONSTRAINT "money_transaction_account_id_financial_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."financial_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_goal" ADD CONSTRAINT "financial_goal_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_snapshot" ADD CONSTRAINT "financial_snapshot_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "net_worth_snapshot" ADD CONSTRAINT "net_worth_snapshot_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "principle" ADD CONSTRAINT "principle_source_id_knowledge_source_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."knowledge_source"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rule_version" ADD CONSTRAINT "rule_version_rule_id_rule_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."rule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rule_version" ADD CONSTRAINT "rule_version_principle_id_principle_id_fk" FOREIGN KEY ("principle_id") REFERENCES "public"."principle"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action" ADD CONSTRAINT "action_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "action" ADD CONSTRAINT "action_recommendation_id_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_action_id_action_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."action"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_rule_version_id_rule_version_id_fk" FOREIGN KEY ("rule_version_id") REFERENCES "public"."rule_version"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_principle_id_principle_id_fk" FOREIGN KEY ("principle_id") REFERENCES "public"."principle"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation_evidence" ADD CONSTRAINT "recommendation_evidence_recommendation_id_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."recommendation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "asset_workspace_idx" ON "asset" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "financial_account_workspace_idx" ON "financial_account" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "liability_workspace_idx" ON "liability" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "money_transaction_workspace_date_idx" ON "money_transaction" USING btree ("workspace_id","occurred_on");--> statement-breakpoint
CREATE INDEX "financial_goal_workspace_idx" ON "financial_goal" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "financial_snapshot_workspace_idx" ON "financial_snapshot" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "net_worth_snapshot_workspace_idx" ON "net_worth_snapshot" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "action_workspace_idx" ON "action" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "outcome_workspace_idx" ON "outcome" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "recommendation_workspace_idx" ON "recommendation" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "recommendation_evidence_rec_idx" ON "recommendation_evidence" USING btree ("recommendation_id");