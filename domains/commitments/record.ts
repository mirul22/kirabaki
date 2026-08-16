import { and, desc, eq } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { action, outcome, recommendation } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function decideRecommendation(
  workspaceId: string,
  actorUserId: string,
  recommendationId: string,
  decision: "accepted" | "later" | "not_relevant",
) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(recommendation)
    .where(and(eq(recommendation.id, recommendationId), eq(recommendation.workspaceId, id)))
    .limit(1);
  const rec = rows[0];
  if (!rec) {
    return { error: "That finding is gone." };
  }

  const status =
    decision === "accepted" ? "accepted" : decision === "later" ? "later" : "dismissed";

  await db
    .update(recommendation)
    .set({ status, resolvedAt: new Date() })
    .where(and(eq(recommendation.id, rec.id), eq(recommendation.workspaceId, id)));

  const actionId = newId();
  await db.insert(action).values({
    id: actionId,
    workspaceId: id,
    recommendationId: rec.id,
    decision,
  });
  await recordAudit({ action: "recommendation.decided", workspaceId: id, actorUserId });
  return { ok: true as const, actionId };
}

export async function recordOutcome(
  workspaceId: string,
  actorUserId: string,
  actionId: string,
  note: string,
) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(action)
    .where(and(eq(action.id, actionId), eq(action.workspaceId, id)))
    .limit(1);
  if (!rows[0]) {
    return { error: "That decision is gone." };
  }
  await db.insert(outcome).values({
    id: newId(),
    workspaceId: id,
    actionId,
    note,
  });
  await db
    .update(recommendation)
    .set({ status: "completed" })
    .where(and(eq(recommendation.id, rows[0].recommendationId), eq(recommendation.workspaceId, id)));
  await recordAudit({ action: "outcome.recorded", workspaceId: id, actorUserId });
  return { ok: true as const };
}

export async function latestDecision(workspaceId: string) {
  const rows = await listRecentDecisions(workspaceId, 1);
  return rows[0] ?? null;
}

export async function listRecentDecisions(workspaceId: string, limit = 6) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select({ action, recommendation, outcome })
    .from(action)
    .innerJoin(recommendation, eq(action.recommendationId, recommendation.id))
    .leftJoin(outcome, eq(outcome.actionId, action.id))
    .where(eq(action.workspaceId, id))
    .orderBy(desc(action.createdAt))
    .limit(limit);
}
