import { listAccounts } from "@/domains/finance/accounts";
import { assembleMoneyPicture } from "@/domains/finance/assemble";
import { listAssets, listLiabilities } from "@/domains/finance/positions";
import { listTransactions } from "@/domains/finance/transactions";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { findPrimaryGoal } from "@/domains/goals/goals";
import { todayIso, type IsoDate } from "@/lib/money";

export async function loadMoneyPicture(workspaceId: string, asOf: IsoDate = todayIso()) {
  const id = assertWorkspaceId(workspaceId);
  const [accounts, transactions, assets, liabilities, goal] = await Promise.all([
    listAccounts(id),
    listTransactions(id),
    listAssets(id),
    listLiabilities(id),
    findPrimaryGoal(id),
  ]);

  return assembleMoneyPicture({
    asOf,
    accounts,
    transactions,
    assets,
    liabilities,
    goal: goal
      ? {
          name: goal.name,
          targetAmountCents: goal.targetAmountCents,
          targetDate: goal.targetDate,
          monthlyContributionCents: goal.monthlyContributionCents,
          progressFrom: goal.progressFrom,
        }
      : null,
  });
}

export type { MoneyPicture } from "@/domains/finance/assemble";
