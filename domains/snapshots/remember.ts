import { and, desc, eq } from "drizzle-orm";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import type { MoneyPicture } from "@/domains/finance/picture";
import { db } from "@/lib/db";
import { financialSnapshot, netWorthSnapshot } from "@/lib/db/schema";
import { newId } from "@/lib/id";
import { monthClosesFromLines, type MonthClose, type MonthCloseLine } from "@/lib/money";

async function upsertFinancialClose(workspaceId: string, close: MonthClose) {
  await db
    .insert(financialSnapshot)
    .values({
      id: newId(),
      workspaceId,
      periodStart: close.periodStart,
      incomeCents: close.incomeCents,
      expenseCents: close.expenseCents,
      savingsCents: close.savingsCents,
      savingsRateBps: close.savingsRateBps,
      cashflowCents: close.cashflowCents,
    })
    .onConflictDoUpdate({
      target: [financialSnapshot.workspaceId, financialSnapshot.periodStart],
      set: {
        incomeCents: close.incomeCents,
        expenseCents: close.expenseCents,
        savingsCents: close.savingsCents,
        savingsRateBps: close.savingsRateBps,
        cashflowCents: close.cashflowCents,
      },
    });
}

export async function rememberClosesFromLines(
  workspaceId: string,
  lines: readonly MonthCloseLine[],
  asOf: string,
) {
  const id = assertWorkspaceId(workspaceId);
  const closes = monthClosesFromLines(lines, asOf, 6);
  for (const close of closes) {
    await upsertFinancialClose(id, close);
  }
}

export async function rememberMonth(workspaceId: string, picture: MoneyPicture) {
  const id = assertWorkspaceId(workspaceId);

  await upsertFinancialClose(id, {
    periodStart: picture.month.start,
    ...picture.cashflow,
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
