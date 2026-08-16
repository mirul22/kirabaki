import { and, desc, eq, isNull } from "drizzle-orm";
import { recordAudit } from "@/domains/audit/record";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { db } from "@/lib/db";
import { moneyTransaction } from "@/lib/db/schema";
import { newId } from "@/lib/id";

export async function listTransactions(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select()
    .from(moneyTransaction)
    .where(and(eq(moneyTransaction.workspaceId, id), isNull(moneyTransaction.deletedAt)))
    .orderBy(desc(moneyTransaction.occurredOn));
}

export async function createTransaction(
  workspaceId: string,
  actorUserId: string,
  input: {
    accountId: string;
    type: "income" | "expense";
    name: string;
    amountCents: number;
    occurredOn: string;
    category?: string;
  },
) {
  const id = assertWorkspaceId(workspaceId);
  await db.insert(moneyTransaction).values({
    id: newId(),
    workspaceId: id,
    accountId: input.accountId,
    type: input.type,
    name: input.name,
    amountCents: input.amountCents,
    occurredOn: input.occurredOn,
    category: input.category || null,
  });
  await recordAudit({ action: "transaction.created", workspaceId: id, actorUserId });
}

export async function softDeleteTransaction(
  workspaceId: string,
  actorUserId: string,
  transactionId: string,
) {
  const id = assertWorkspaceId(workspaceId);
  await db
    .update(moneyTransaction)
    .set({ deletedAt: new Date() })
    .where(and(eq(moneyTransaction.id, transactionId), eq(moneyTransaction.workspaceId, id)));
  await recordAudit({ action: "transaction.deleted", workspaceId: id, actorUserId });
}
