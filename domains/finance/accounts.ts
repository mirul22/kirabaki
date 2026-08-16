import { and, asc, eq, isNull } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { financialAccount } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function listAccounts(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select()
    .from(financialAccount)
    .where(and(eq(financialAccount.workspaceId, id), isNull(financialAccount.deletedAt)))
    .orderBy(asc(financialAccount.createdAt));
}

export async function setStatedBalance(
  workspaceId: string,
  accountId: string,
  statedBalanceCents: number,
) {
  const id = assertWorkspaceId(workspaceId);
  await db
    .update(financialAccount)
    .set({ statedBalanceCents, updatedAt: new Date() })
    .where(
      and(
        eq(financialAccount.id, accountId),
        eq(financialAccount.workspaceId, id),
        isNull(financialAccount.deletedAt),
      ),
    );
}

export async function getAccount(workspaceId: string, accountId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(financialAccount)
    .where(
      and(
        eq(financialAccount.id, accountId),
        eq(financialAccount.workspaceId, id),
        isNull(financialAccount.deletedAt),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function createAccount(
  workspaceId: string,
  actorUserId: string,
  input: { name: string; kind: "cash" | "bank" | "ewallet" | "investment"; statedBalanceCents: number },
) {
  const id = assertWorkspaceId(workspaceId);
  const existing = await listAccounts(id);
  await db.insert(financialAccount).values({
    id: newId(),
    workspaceId: id,
    name: input.name,
    kind: input.kind,
    statedBalanceCents: input.statedBalanceCents,
    isPrimary: existing.length === 0,
  });
  await recordAudit({ action: "account.created", workspaceId: id, actorUserId });
}

export async function setPrimaryAccount(workspaceId: string, actorUserId: string, accountId: string) {
  const id = assertWorkspaceId(workspaceId);
  const account = await getAccount(id, accountId);
  if (!account) {
    return { error: "Pick a place that is still there." };
  }
  await db
    .update(financialAccount)
    .set({ isPrimary: false, updatedAt: new Date() })
    .where(and(eq(financialAccount.workspaceId, id), isNull(financialAccount.deletedAt)));
  await db
    .update(financialAccount)
    .set({ isPrimary: true, updatedAt: new Date() })
    .where(and(eq(financialAccount.id, accountId), eq(financialAccount.workspaceId, id)));
  await recordAudit({ action: "account.primary_set", workspaceId: id, actorUserId });
  return { ok: true as const };
}

export async function softDeleteAccount(workspaceId: string, actorUserId: string, accountId: string) {
  const id = assertWorkspaceId(workspaceId);
  const account = await getAccount(id, accountId);
  await db
    .update(financialAccount)
    .set({ deletedAt: new Date(), updatedAt: new Date(), isPrimary: false })
    .where(and(eq(financialAccount.id, accountId), eq(financialAccount.workspaceId, id)));
  if (account?.isPrimary) {
    const remaining = await listAccounts(id);
    const next = remaining[0];
    if (next) {
      await db
        .update(financialAccount)
        .set({ isPrimary: true, updatedAt: new Date() })
        .where(and(eq(financialAccount.id, next.id), eq(financialAccount.workspaceId, id)));
    }
  }
  await recordAudit({ action: "account.deleted", workspaceId: id, actorUserId });
}
