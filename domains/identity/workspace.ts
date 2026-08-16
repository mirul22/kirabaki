import { and, eq, isNull } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { jurisdictionFor, type WorkspaceCurrency } from "@/domains/identity/currency";
import { db } from "@/lib/db";
import { membership, workspace } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export type WorkspaceRecord = typeof workspace.$inferSelect;

function personalWorkspaceName(displayName: string): string {
  const first = displayName.trim().split(/\s+/)[0] ?? "Personal";
  return `${first}'s workspace`;
}

export async function findPersonalWorkspace(userId: string): Promise<WorkspaceRecord | null> {
  const rows = await db
    .select({ workspace })
    .from(membership)
    .innerJoin(workspace, eq(membership.workspaceId, workspace.id))
    .where(
      and(
        eq(membership.userId, userId),
        eq(workspace.type, "personal"),
        isNull(workspace.deletedAt),
      ),
    )
    .limit(1);

  return rows[0]?.workspace ?? null;
}

export async function createPersonalWorkspace(
  userId: string,
  displayName: string,
  options?: { name?: string; currency?: WorkspaceCurrency },
): Promise<WorkspaceRecord> {
  const currency = options?.currency ?? "MYR";
  const created = await db.transaction(async (tx) => {
    const [row] = await tx
      .insert(workspace)
      .values({
        id: newId(),
        name: options?.name?.trim() || personalWorkspaceName(displayName),
        type: "personal",
        currency,
        jurisdiction: jurisdictionFor(currency),
      })
      .returning();

    if (!row) {
      throw new Error("Failed to create workspace");
    }

    await tx.insert(membership).values({
      id: newId(),
      workspaceId: row.id,
      userId,
      role: "owner",
    });

    return row;
  });

  await recordAudit({
    action: "workspace.created",
    workspaceId: created.id,
    actorUserId: userId,
  });

  return created;
}

export async function ensurePersonalWorkspace(
  userId: string,
  displayName: string,
): Promise<WorkspaceRecord> {
  const existing = await findPersonalWorkspace(userId);
  if (existing) {
    return existing;
  }
  return createPersonalWorkspace(userId, displayName);
}

export async function updatePersonalWorkspace(
  userId: string,
  input: { name: string; currency: WorkspaceCurrency },
): Promise<WorkspaceRecord> {
  const existing = await findPersonalWorkspace(userId);
  if (!existing) {
    throw new Error("Workspace not found");
  }

  const [updated] = await db
    .update(workspace)
    .set({
      name: input.name,
      currency: input.currency,
      jurisdiction: jurisdictionFor(input.currency),
      updatedAt: new Date(),
    })
    .where(and(eq(workspace.id, existing.id), isNull(workspace.deletedAt)))
    .returning();

  if (!updated) {
    throw new Error("Workspace not found");
  }

  await recordAudit({
    action: "workspace.updated",
    workspaceId: existing.id,
    actorUserId: userId,
  });

  return updated;
}
