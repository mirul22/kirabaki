import { formatMoney, formatMonth } from "./format";

export type FinanceFacts = {
  accountCount: number;
  incomeCents: number;
  expenseCents: number;
  savingsCents: number;
  savingsRateBps: number | null;
  emergencyFundMonths: number | null;
  goalOnTrack: boolean | null;
  monthsBehind: number | null;
  lastSavingsCents: number | null;
  lastIncomeCents: number | null;
  lastExpenseCents: number | null;
  lastMonthStart: string | null;
};

export type MonthKeepContrast = {
  lastLabel: string;
  lastKept: string;
  thisLabel: string;
  thisKept: string;
};

export const STRONG_SAVE_BPS = 3_000;
export const WEAK_SAVE_BPS = 2_000;

export type PredicateKey =
  | "missing_picture"
  | "empty_month"
  | "thin_buffer"
  | "nothing_stayed"
  | "out_after_kept"
  | "goal_slipping"
  | "kept_after_out"
  | "saving_bottleneck"
  | "income_bottleneck"
  | "quiet_good";

export const predicates: Record<PredicateKey, (facts: FinanceFacts) => boolean> = {
  missing_picture: (facts) => facts.accountCount === 0,
  empty_month: (facts) => facts.accountCount > 0 && facts.incomeCents === 0 && facts.expenseCents === 0,
  thin_buffer: (facts) => facts.emergencyFundMonths !== null && facts.emergencyFundMonths < 3,
  nothing_stayed: (facts) => facts.incomeCents > 0 && facts.savingsCents <= 0,
  out_after_kept: (facts) =>
    facts.lastSavingsCents !== null &&
    facts.lastSavingsCents > 0 &&
    facts.incomeCents > 0 &&
    facts.savingsCents <= 0,
  goal_slipping: (facts) => facts.goalOnTrack === false,
  kept_after_out: (facts) =>
    facts.lastSavingsCents !== null && facts.lastSavingsCents <= 0 && facts.savingsCents > 0,
  saving_bottleneck: (facts) =>
    facts.accountCount > 0 &&
    facts.incomeCents > 0 &&
    facts.savingsCents > 0 &&
    facts.savingsRateBps !== null &&
    facts.savingsRateBps < WEAK_SAVE_BPS,
  income_bottleneck: (facts) =>
    facts.accountCount > 0 &&
    facts.savingsCents > 0 &&
    facts.savingsRateBps !== null &&
    facts.savingsRateBps >= STRONG_SAVE_BPS &&
    facts.emergencyFundMonths !== null &&
    facts.emergencyFundMonths >= 3 &&
    facts.lastIncomeCents !== null &&
    facts.incomeCents <= facts.lastIncomeCents,
  quiet_good: (facts) =>
    facts.accountCount > 0 &&
    facts.emergencyFundMonths !== null &&
    facts.emergencyFundMonths >= 3 &&
    facts.savingsCents > 0,
};

export function fillTemplate(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{([a-z_]+)\}/g, (_, key: string) => tokens[key] ?? "");
}

export function monthKeepContrast(
  type: string,
  facts: FinanceFacts,
  currency: string,
): MonthKeepContrast | null {
  if (type !== "kept_after_out" && type !== "out_after_kept") {
    return null;
  }
  if (facts.lastMonthStart === null || facts.lastSavingsCents === null) {
    return null;
  }
  return {
    lastLabel: formatMonth(facts.lastMonthStart),
    lastKept: formatMoney(facts.lastSavingsCents, currency),
    thisLabel: "This month",
    thisKept: formatMoney(facts.savingsCents, currency),
  };
}
