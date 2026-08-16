import { db } from "@/lib/db";
import { auditEvent } from "@/lib/db/schema";
import { newId } from "@/lib/id";

type AuditInput = {
  action: string;
  workspaceId?: string;
  actorUserId?: string;
};

/** Who / what / when only. Never pass balances, goals, or secrets. */
export async function recordAudit(input: AuditInput): Promise<void> {
  await db.insert(auditEvent).values({
    id: newId(),
    action: input.action,
    workspaceId: input.workspaceId,
    actorUserId: input.actorUserId,
  });
}
