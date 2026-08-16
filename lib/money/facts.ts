export type FinanceFacts = {
  accountCount: number;
  incomeCents: number;
  expenseCents: number;
  savingsCents: number;
  savingsRateBps: number | null;
  emergencyFundMonths: number | null;
  goalOnTrack: boolean | null;
  monthsBehind: number | null;
};

export type PredicateKey =
  | "missing_picture"
  | "empty_month"
  | "thin_buffer"
  | "nothing_stayed"
  | "goal_slipping"
  | "quiet_good";

export const predicates: Record<PredicateKey, (facts: FinanceFacts) => boolean> = {
  missing_picture: (facts) => facts.accountCount === 0,
  empty_month: (facts) => facts.accountCount > 0 && facts.incomeCents === 0 && facts.expenseCents === 0,
  thin_buffer: (facts) => facts.emergencyFundMonths !== null && facts.emergencyFundMonths < 3,
  nothing_stayed: (facts) => facts.incomeCents > 0 && facts.savingsCents <= 0,
  goal_slipping: (facts) => facts.goalOnTrack === false,
  quiet_good: (facts) =>
    facts.accountCount > 0 &&
    facts.emergencyFundMonths !== null &&
    facts.emergencyFundMonths >= 3 &&
    facts.savingsCents > 0,
};

export function fillTemplate(template: string, tokens: Record<string, string>): string {
  return template.replace(/\{([a-z_]+)\}/g, (_, key: string) => tokens[key] ?? "");
}
