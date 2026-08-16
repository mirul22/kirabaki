import { and, eq, isNull } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { asset, liability } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function listAssets(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  return db.select().from(asset).where(and(eq(asset.workspaceId, id), isNull(asset.deletedAt)));
}

export async function listLiabilities(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select()
    .from(liability)
    .where(and(eq(liability.workspaceId, id), isNull(liability.deletedAt)));
}

export async function createAsset(
  workspaceId: string,
  actorUserId: string,
  input: { name: string; amountCents: number },
) {
  const id = assertWorkspaceId(workspaceId);
  await db.insert(asset).values({
    id: newId(),
    workspaceId: id,
    name: input.name,
    amountCents: input.amountCents,
  });
  await recordAudit({ action: "asset.created", workspaceId: id, actorUserId });
}

export async function createLiability(
  workspaceId: string,
  actorUserId: string,
  input: { name: string; amountCents: number },
) {
  const id = assertWorkspaceId(workspaceId);
  await db.insert(liability).values({
    id: newId(),
    workspaceId: id,
    name: input.name,
    amountCents: input.amountCents,
  });
  await recordAudit({ action: "liability.created", workspaceId: id, actorUserId });
}

export async function softDeleteAsset(workspaceId: string, actorUserId: string, assetId: string) {
  const id = assertWorkspaceId(workspaceId);
  await db
    .update(asset)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(asset.id, assetId), eq(asset.workspaceId, id)));
  await recordAudit({ action: "asset.deleted", workspaceId: id, actorUserId });
}

export async function softDeleteLiability(
  workspaceId: string,
  actorUserId: string,
  liabilityId: string,
) {
  const id = assertWorkspaceId(workspaceId);
  await db
    .update(liability)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(liability.id, liabilityId), eq(liability.workspaceId, id)));
  await recordAudit({ action: "liability.deleted", workspaceId: id, actorUserId });
}
