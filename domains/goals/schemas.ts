import { z } from "zod";
import { parseAmountToCents } from "@/lib/money";

const amountSchema = z
  .string()
  .trim()
  .refine((value) => parseAmountToCents(value) !== null, "Enter an amount like 1,000.00.")
  .transform((value) => parseAmountToCents(value)!);

export const goalSchema = z.object({
  name: z.string().trim().min(1, "What is this for?").max(80),
  targetAmount: amountSchema,
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date."),
  monthlyContribution: amountSchema,
  progressFrom: z.enum(["net_worth", "cash"]),
});
