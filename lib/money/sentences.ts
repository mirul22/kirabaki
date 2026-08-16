import type { PeriodCashflow } from "./cashflow";
import type { EmergencyFundMonths } from "./emergency";
import { formatMoney } from "./format";
import type { GoalProjection } from "./goal";

export function monthSentence(cashflow: PeriodCashflow): string {
  if (cashflow.incomeCents === 0 && cashflow.expenseCents === 0) {
    return "This month is still quiet.";
  }
  if (cashflow.savingsCents > 0) {
    return "Some of it stayed.";
  }
  if (cashflow.savingsCents === 0) {
    return "It evened out.";
  }
  return "This month went a little differently.";
}

export function monthPlainTalk(cashflow: PeriodCashflow, currency: string): string {
  if (cashflow.incomeCents === 0 && cashflow.expenseCents === 0) {
    return "This month is still quiet.";
  }
  if (cashflow.incomeCents > 0 && cashflow.savingsCents > 0) {
    return `You kept ${formatMoney(cashflow.savingsCents, currency)} of ${formatMoney(cashflow.incomeCents, currency)} that came in.`;
  }
  if (cashflow.incomeCents > 0 && cashflow.savingsCents === 0) {
    return `In and out evened out at ${formatMoney(cashflow.incomeCents, currency)}.`;
  }
  if (cashflow.expenseCents > 0 && cashflow.incomeCents === 0) {
    return `${formatMoney(cashflow.expenseCents, currency)} went out. Nothing came in yet.`;
  }
  return `This month went a little differently — ${formatMoney(cashflow.expenseCents, currency)} out.`;
}

export function monthAgainstLast(
  current: { savingsCents: number },
  previous: { savingsCents: number } | null,
): string | null {
  if (!previous) {
    return null;
  }
  if (current.savingsCents > previous.savingsCents && current.savingsCents > 0) {
    return "You kept more than last month.";
  }
  if (current.savingsCents > previous.savingsCents) {
    return "Less went out than last month.";
  }
  if (current.savingsCents === previous.savingsCents) {
    return "You kept about the same as last month.";
  }
  if (previous.savingsCents > 0 && current.savingsCents <= 0) {
    return "This month went a little differently than last.";
  }
  return "You kept less than last month. That’s allowed.";
}

export function healthLanguage(input: {
  hasAccounts: boolean;
  buffer: EmergencyFundMonths;
  goal: GoalProjection | null;
  cashflow: PeriodCashflow;
}): string {
  if (!input.hasAccounts) {
    return "Building momentum";
  }
  if (input.buffer.months !== null && input.buffer.months < 3) {
    return "Needs attention";
  }
  if (input.goal?.onTrack === false) {
    return "Off track";
  }
  if (
    input.buffer.months !== null &&
    input.buffer.months >= 3 &&
    input.cashflow.savingsCents > 0
  ) {
    return "Getting stronger";
  }
  if (input.goal?.onTrack) {
    return "On track";
  }
  return "Building momentum";
}
