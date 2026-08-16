import type { Cents } from "./cents";

export type EmergencyFundInput = {
  cashCents: Cents;
  monthlyExpenseCents: Cents;
};

export type EmergencyFundMonths = {
  calculation: "emergency_fund_months";
  cashCents: Cents;
  monthlyExpenseCents: Cents;
  months: number | null;
};

export function emergencyFundMonths(input: EmergencyFundInput): EmergencyFundMonths {
  const months =
    input.monthlyExpenseCents > 0
      ? Math.round((input.cashCents / input.monthlyExpenseCents) * 10) / 10
      : null;

  return {
    calculation: "emergency_fund_months",
    cashCents: input.cashCents,
    monthlyExpenseCents: input.monthlyExpenseCents,
    months,
  };
}
