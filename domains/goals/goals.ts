import { and, eq, isNull } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { financialGoal } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function findPrimaryGoal(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(financialGoal)
    .where(
      and(
        eq(financialGoal.workspaceId, id),
        isNull(financialGoal.deletedAt),
        eq(financialGoal.isPrimary, true),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertPrimaryGoal(
  workspaceId: string,
  actorUserId: string,
  input: {
    name: string;
    targetAmountCents: number;
    targetDate: string;
    monthlyContributionCents: number;
    progressFrom: "net_worth" | "cash";
  },
) {
  const id = assertWorkspaceId(workspaceId);
  const existing = await findPrimaryGoal(id);
  if (existing) {
    await db
      .update(financialGoal)
      .set({
        name: input.name,
        targetAmountCents: input.targetAmountCents,
        targetDate: input.targetDate,
        monthlyContributionCents: input.monthlyContributionCents,
        progressFrom: input.progressFrom,
        status: "active",
        updatedAt: new Date(),
      })
      .where(and(eq(financialGoal.id, existing.id), eq(financialGoal.workspaceId, id)));
    await recordAudit({ action: "goal.updated", workspaceId: id, actorUserId });
    return;
  }

  await db.insert(financialGoal).values({
    id: newId(),
    workspaceId: id,
    name: input.name,
    targetAmountCents: input.targetAmountCents,
    targetDate: input.targetDate,
    monthlyContributionCents: input.monthlyContributionCents,
    progressFrom: input.progressFrom,
    isPrimary: true,
    status: "active",
  });
  await recordAudit({ action: "goal.created", workspaceId: id, actorUserId });
}
