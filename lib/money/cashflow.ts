import type { Cents } from "./cents";

export type PeriodCashflowInput = {
  incomeCents: Cents;
  expenseCents: Cents;
};

export type PeriodCashflow = {
  calculation: "period_cashflow";
  incomeCents: Cents;
  expenseCents: Cents;
  savingsCents: Cents;
  cashflowCents: Cents;
  savingsRateBps: number | null;
};

export function periodCashflow(input: PeriodCashflowInput): PeriodCashflow {
  const savingsCents = input.incomeCents - input.expenseCents;
  const savingsRateBps =
    input.incomeCents > 0 ? Math.round((savingsCents / input.incomeCents) * 10_000) : null;

  return {
    calculation: "period_cashflow",
    incomeCents: input.incomeCents,
    expenseCents: input.expenseCents,
    savingsCents,
    cashflowCents: savingsCents,
    savingsRateBps,
  };
}
