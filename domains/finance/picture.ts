import { listAccounts } from "@/domains/finance/accounts";
import { listAssets, listLiabilities } from "@/domains/finance/positions";
import { listTransactions } from "@/domains/finance/transactions";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { findPrimaryGoal } from "@/domains/goals/goals";
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
  todayIso,
  type FinanceFacts,
  type GoalProjection,
  type IsoDate,
} from "@/lib/money";

const CASH_KINDS = new Set(["cash", "bank", "ewallet"]);

export async function loadMoneyPicture(workspaceId: string, asOf: IsoDate = todayIso()) {
  const id = assertWorkspaceId(workspaceId);
  const [accounts, transactions, assets, liabilities, goal] = await Promise.all([
    listAccounts(id),
    listTransactions(id),
    listAssets(id),
    listLiabilities(id),
    findPrimaryGoal(id),
  ]);

  const month = monthRange(asOf);
  const monthLines = transactions.filter((row) => isInRange(row.occurredOn, month.start, month.end));
  const incomeCents = monthLines
    .filter((row) => row.type === "income")
    .reduce((sum, row) => sum + row.amountCents, 0);
  const expenseCents = monthLines
    .filter((row) => row.type === "expense")
    .reduce((sum, row) => sum + row.amountCents, 0);
  const cashflow = periodCashflow({ incomeCents, expenseCents });
  const places = accounts
    .map((row) => ({
      ...row,
      currentCents: currentBalanceCents(
        row.statedBalanceCents,
        transactions
          .filter((line) => line.accountId === row.id)
          .map((line) => ({ type: line.type, amountCents: line.amountCents })),
      ),
    }))
    .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  const worth = netWorth({
    cashAccountCents: places
      .filter((row) => CASH_KINDS.has(row.kind))
      .map((row) => row.currentCents),
    otherAccountCents: places
      .filter((row) => !CASH_KINDS.has(row.kind))
      .map((row) => row.currentCents),
    assetCents: assets.map((row) => row.amountCents),
    liabilityCents: liabilities.map((row) => row.amountCents),
  });
  const buffer = emergencyFundMonths({
    cashCents: worth.cashCents,
    monthlyExpenseCents: cashflow.expenseCents,
  });

  let projection: GoalProjection | null = null;
  if (goal) {
    const currentCents = goal.progressFrom === "cash" ? worth.cashCents : worth.netWorthCents;
    projection = goalProjection({
      currentCents,
      targetCents: goal.targetAmountCents,
      monthlyContributionCents: goal.monthlyContributionCents,
      targetDate: goal.targetDate,
      asOf,
    });
  }

  const facts: FinanceFacts = {
    accountCount: places.length,
    incomeCents: cashflow.incomeCents,
    expenseCents: cashflow.expenseCents,
    savingsCents: cashflow.savingsCents,
    savingsRateBps: cashflow.savingsRateBps,
    emergencyFundMonths: buffer.months,
    goalOnTrack: projection?.onTrack ?? null,
    monthsBehind: projection?.monthsBehind ?? null,
  };

  return {
    asOf,
    month,
    accounts: places,
    transactions,
    monthLines,
    assets,
    liabilities,
    goal,
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

export type MoneyPicture = Awaited<ReturnType<typeof loadMoneyPicture>>;
