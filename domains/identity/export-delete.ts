import { eq } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { listAccounts } from "@/domains/finance/accounts";
import { listAssets, listLiabilities } from "@/domains/finance/positions";
import { listTransactions } from "@/domains/finance/transactions";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { findPrimaryGoal } from "@/domains/goals/goals";
import { getProfile } from "@/domains/identity/profile";
import { listFindings } from "@/domains/recommendations/refresh";
import { listRecentSnapshots } from "@/domains/snapshots/remember";
import { db } from "@/lib/db";
import {
  action,
  asset,
  financialAccount,
  financialGoal,
  financialProfile,
  financialSnapshot,
  liability,
  membership,
  moneyTransaction,
  netWorthSnapshot,
  outcome,
  recommendation,
  recommendationEvidence,
  workspace,
} from "@/lib/db/schema";
import { user } from "@/lib/db/schema/auth";

export async function exportWorkspace(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  const [accounts, transactions, assets, liabilities, goal, profile, snapshots, findings] =
    await Promise.all([
      listAccounts(id),
      listTransactions(id),
      listAssets(id),
      listLiabilities(id),
      findPrimaryGoal(id),
      getProfile(id),
      listRecentSnapshots(id, 24),
      listFindings(id, 20),
    ]);

  return {
    exportedAt: new Date().toISOString(),
    workspaceId: id,
    profile: profile ? { focus: profile.focus } : null,
    accounts: accounts.map((row) => ({
      name: row.name,
      kind: row.kind,
      statedBalanceCents: row.statedBalanceCents,
    })),
    transactions: transactions.map((row) => ({
      type: row.type,
      name: row.name,
      amountCents: row.amountCents,
      occurredOn: row.occurredOn,
      category: row.category,
    })),
    assets: assets.map((row) => ({ name: row.name, amountCents: row.amountCents })),
    liabilities: liabilities.map((row) => ({ name: row.name, amountCents: row.amountCents })),
    goal: goal
      ? {
          name: goal.name,
          targetAmountCents: goal.targetAmountCents,
          targetDate: goal.targetDate,
          monthlyContributionCents: goal.monthlyContributionCents,
        }
      : null,
    snapshots: snapshots.map((row) => ({
      periodStart: row.periodStart,
      incomeCents: row.incomeCents,
      expenseCents: row.expenseCents,
      savingsCents: row.savingsCents,
      savingsRateBps: row.savingsRateBps,
    })),
    findings: findings.map((row) => ({
      title: row.title,
      status: row.status,
      createdAt: row.createdAt,
    })),
  };
}

export async function deleteWorkspaceAndUser(workspaceId: string, userId: string) {
  const id = assertWorkspaceId(workspaceId);
  await recordAudit({ action: "workspace.deleted", workspaceId: id, actorUserId: userId });

  const recs = await db.select({ id: recommendation.id }).from(recommendation).where(eq(recommendation.workspaceId, id));
  const recIds = recs.map((row) => row.id);
  if (recIds.length > 0) {
    for (const recId of recIds) {
      await db.delete(recommendationEvidence).where(eq(recommendationEvidence.recommendationId, recId));
    }
  }
  await db.delete(outcome).where(eq(outcome.workspaceId, id));
  await db.delete(action).where(eq(action.workspaceId, id));
  await db.delete(recommendation).where(eq(recommendation.workspaceId, id));
  await db.delete(financialSnapshot).where(eq(financialSnapshot.workspaceId, id));
  await db.delete(netWorthSnapshot).where(eq(netWorthSnapshot.workspaceId, id));
  await db.delete(moneyTransaction).where(eq(moneyTransaction.workspaceId, id));
  await db.delete(asset).where(eq(asset.workspaceId, id));
  await db.delete(liability).where(eq(liability.workspaceId, id));
  await db.delete(financialAccount).where(eq(financialAccount.workspaceId, id));
  await db.delete(financialGoal).where(eq(financialGoal.workspaceId, id));
  await db.delete(financialProfile).where(eq(financialProfile.workspaceId, id));
  await db.delete(membership).where(eq(membership.workspaceId, id));
  await db.delete(workspace).where(eq(workspace.id, id));
  await db.delete(user).where(eq(user.id, userId));
}
