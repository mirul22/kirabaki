ALTER TABLE "financial_account" ADD COLUMN "is_primary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "financial_account" AS a
SET "is_primary" = true
WHERE a."deleted_at" IS NULL
AND a."id" = (
  SELECT b."id"
  FROM "financial_account" AS b
  WHERE b."workspace_id" = a."workspace_id"
    AND b."deleted_at" IS NULL
  ORDER BY b."created_at" ASC
  LIMIT 1
);