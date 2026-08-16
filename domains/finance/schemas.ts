import { z } from "zod";
import { majorToCents } from "@/lib/money";

const amountSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d{1,2})?$/, "Enter an amount like 1500 or 12.50.")
  .transform((value) => majorToCents(Number(value)));

export const accountSchema = z.object({
  name: z.string().trim().min(1, "Give this a name.").max(80),
  kind: z.enum(["cash", "bank", "ewallet", "investment"]),
  statedBalance: amountSchema,
});

export const transactionSchema = z.object({
  accountId: z.string().trim().min(1, "Pick which place this is for."),
  type: z.enum(["income", "expense"]),
  name: z.string().trim().min(1, "What was this?").max(80),
  amount: amountSchema,
  occurredOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date."),
  category: z.string().trim().max(40).optional(),
});

export const positionSchema = z.object({
  name: z.string().trim().min(1, "Give this a name.").max(80),
  amount: amountSchema,
});

export const profileFocusSchema = z.object({
  focus: z.string().trim().max(160).optional(),
});
