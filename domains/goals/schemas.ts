import { z } from "zod";
import { majorToCents } from "@/lib/money";

const amountSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d{1,2})?$/, "Enter an amount like 10000 or 500.00.")
  .transform((value) => majorToCents(Number(value)));

export const goalSchema = z.object({
  name: z.string().trim().min(1, "What is this for?").max(80),
  targetAmount: amountSchema,
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date."),
  monthlyContribution: amountSchema,
  progressFrom: z.enum(["net_worth", "cash"]),
});
