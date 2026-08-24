import {
  currentBalanceCents,
  emergencyFundMonths,
  goalProjection,
  healthLanguage,
  isInRange,
  monthRange,
  monthSentence,
  netWorth,
  periodCashflow,
  monthClosesFromLines,
  todayIso,
  type FinanceFacts,
  type GoalProjection,
  type IsoDate,
} from "@/lib/money";

const CASH_KINDS = new Set(["cash", "bank", "ewallet"]);

export type PictureAccount = {
  id: string;
  name: string;
  kind: string;
  statedBalanceCents: number;
  isPrimary: boolean;
};

export type PictureLine = {
  id: string;
  accountId: string | null;
  type: "income" | "expense";
  name: string;
  amountCents: number;
  occurredOn: string;
  category: string | null;
};

export type PicturePosition = {
  id: string;
  name: string;
  amountCents: number;
};

export type PictureGoal = {
  name: string;
  targetAmountCents: number;
  targetDate: string;
  monthlyContributionCents: number;
  progressFrom: "cash" | "net_worth";
} | null;

export function assembleMoneyPicture(input: {
  asOf?: IsoDate;
  accounts: readonly PictureAccount[];
  transactions: readonly PictureLine[];
  assets: readonly PicturePosition[];
  liabilities: readonly PicturePosition[];
  goal: PictureGoal;
}) {
  const asOf = input.asOf ?? todayIso();
  const month = monthRange(asOf);
  const known = input.transactions.filter((row) => row.occurredOn <= asOf);
  const monthLines = known.filter((row) => isInRange(row.occurredOn, month.start, month.end));
  const incomeCents = monthLines
    .filter((row) => row.type === "income")
    .reduce((sum, row) => sum + row.amountCents, 0);
  const expenseCents = monthLines
    .filter((row) => row.type === "expense")
    .reduce((sum, row) => sum + row.amountCents, 0);
  const cashflow = periodCashflow({ incomeCents, expenseCents });
  const places = input.accounts
    .map((row) => ({
      ...row,
      currentCents: currentBalanceCents(
        row.statedBalanceCents,
        known
          .filter((line) => line.accountId === row.id)
          .map((line) => ({ type: line.type, amountCents: line.amountCents })),
      ),
    }))
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  const worth = netWorth({
    cashAccountCents: places.filter((row) => CASH_KINDS.has(row.kind)).map((row) => row.currentCents),
    otherAccountCents: places.filter((row) => !CASH_KINDS.has(row.kind)).map((row) => row.currentCents),
    assetCents: input.assets.map((row) => row.amountCents),
    liabilityCents: input.liabilities.map((row) => row.amountCents),
  });
  const buffer = emergencyFundMonths({
    cashCents: worth.cashCents,
    monthlyExpenseCents: cashflow.expenseCents,
  });

  let projection: GoalProjection | null = null;
  if (input.goal) {
    const currentCents = input.goal.progressFrom === "cash" ? worth.cashCents : worth.netWorthCents;
    projection = goalProjection({
      currentCents,
      targetCents: input.goal.targetAmountCents,
      monthlyContributionCents: input.goal.monthlyContributionCents,
      targetDate: input.goal.targetDate,
      asOf,
    });
  }

  const closes = monthClosesFromLines(known, asOf, 6);
  const previous = closes[1] ?? null;

  const facts: FinanceFacts = {
    accountCount: places.length,
    incomeCents: cashflow.incomeCents,
    expenseCents: cashflow.expenseCents,
    savingsCents: cashflow.savingsCents,
    savingsRateBps: cashflow.savingsRateBps,
    emergencyFundMonths: buffer.months,
    goalOnTrack: projection?.onTrack ?? null,
    monthsBehind: projection?.monthsBehind ?? null,
    lastSavingsCents: previous?.savingsCents ?? null,
    lastIncomeCents: previous?.incomeCents ?? null,
    lastExpenseCents: previous?.expenseCents ?? null,
    lastMonthStart: previous?.periodStart ?? null,
  };

  return {
    asOf,
    month,
    accounts: places,
    transactions: known,
    monthLines,
    assets: input.assets,
    liabilities: input.liabilities,
    goal: input.goal,
    cashflow,
    netWorth: worth,
    buffer,
    projection,
    facts,
    sentence: monthSentence(cashflow),
    health: healthLanguage({
      hasAccounts: places.length > 0,
      buffer,
      goal: projection,
      cashflow,
    }),
  };
}

export type MoneyPicture = ReturnType<typeof assembleMoneyPicture>;
