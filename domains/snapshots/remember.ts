import { and, desc, eq } from "drizzle-orm";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import type { MoneyPicture } from "@/domains/finance/picture";
import { db } from "@/lib/db";
import { financialSnapshot, netWorthSnapshot } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function rememberMonth(workspaceId: string, picture: MoneyPicture) {
  const id = assertWorkspaceId(workspaceId);

  await db
    .insert(financialSnapshot)
    .values({
      id: newId(),
      workspaceId: id,
      periodStart: picture.month.start,
      incomeCents: picture.cashflow.incomeCents,
      expenseCents: picture.cashflow.expenseCents,
      savingsCents: picture.cashflow.savingsCents,
      savingsRateBps: picture.cashflow.savingsRateBps,
      cashflowCents: picture.cashflow.cashflowCents,
    })
    .onConflictDoUpdate({
      target: [financialSnapshot.workspaceId, financialSnapshot.periodStart],
      set: {
        incomeCents: picture.cashflow.incomeCents,
        expenseCents: picture.cashflow.expenseCents,
        savingsCents: picture.cashflow.savingsCents,
        savingsRateBps: picture.cashflow.savingsRateBps,
        cashflowCents: picture.cashflow.cashflowCents,
      },
    });

  await db
    .insert(netWorthSnapshot)
    .values({
      id: newId(),
      workspaceId: id,
      capturedOn: picture.asOf,
      netWorthCents: picture.netWorth.netWorthCents,
      cashCents: picture.netWorth.cashCents,
      assetsCents: picture.netWorth.assetsCents,
      liabilitiesCents: picture.netWorth.liabilitiesCents,
    })
    .onConflictDoUpdate({
      target: [netWorthSnapshot.workspaceId, netWorthSnapshot.capturedOn],
      set: {
        netWorthCents: picture.netWorth.netWorthCents,
        cashCents: picture.netWorth.cashCents,
        assetsCents: picture.netWorth.assetsCents,
        liabilitiesCents: picture.netWorth.liabilitiesCents,
      },
    });
}

export async function listRecentSnapshots(workspaceId: string, limit = 6) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select()
    .from(financialSnapshot)
    .where(eq(financialSnapshot.workspaceId, id))
    .orderBy(desc(financialSnapshot.periodStart))
    .limit(limit);
}

export async function latestNetWorthSnapshot(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(netWorthSnapshot)
    .where(and(eq(netWorthSnapshot.workspaceId, id)))
    .orderBy(desc(netWorthSnapshot.capturedOn))
    .limit(1);
  return rows[0] ?? null;
}
