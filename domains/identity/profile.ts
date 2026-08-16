import { eq } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { financialProfile } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function getProfile(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(financialProfile)
    .where(eq(financialProfile.workspaceId, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertProfile(workspaceId: string, actorUserId: string, focus: string) {
  const id = assertWorkspaceId(workspaceId);
  const existing = await getProfile(id);
  if (existing) {
    await db
      .update(financialProfile)
      .set({ focus, updatedAt: new Date() })
      .where(eq(financialProfile.workspaceId, id));
  } else {
    await db.insert(financialProfile).values({
      id: newId(),
      workspaceId: id,
      focus,
    });
  }
  await recordAudit({ action: "profile.updated", workspaceId: id, actorUserId });
}
