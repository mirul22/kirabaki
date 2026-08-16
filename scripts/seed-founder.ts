import "dotenv/config";

import { and, eq, ilike, isNull } from "drizzle-orm";
import { createAccount, listAccounts, setStatedBalance } from "@/domains/finance/accounts";
import { createAsset, createLiability } from "@/domains/finance/positions";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { createTransaction } from "@/domains/finance/transactions";
import { upsertPrimaryGoal } from "@/domains/goals/goals";
import { upsertProfile } from "@/domains/identity/profile";
import { db } from "@/lib/db";
import { asset, financialGoal, liability, membership, moneyTransaction, user, workspace } from "@/lib/db/schema";
import { FOUNDER_SEED_EMAIL, planFounderSeed, SEED_MARK } from "@/lib/dev/founder-seed";
import { todayIso } from "@/lib/money";

const email = (process.env.FOUNDER_SEED_EMAIL ?? FOUNDER_SEED_EMAIL).trim().toLowerCase();
const clearOnly = process.argv.includes("--clear");

async function findFounder() {
  const people = await db
    .select({ id: user.id, name: user.name })
    .from(user)
    .where(ilike(user.email, email))
    .limit(1);
  const person = people[0];
  if (!person) {
    throw new Error("No account for that email yet. Sign up once, then run this again.");
  }
  const seats = await db
    .select({
      workspaceId: membership.workspaceId,
      currency: workspace.currency,
    })
    .from(membership)
    .innerJoin(workspace, eq(workspace.id, membership.workspaceId))
    .where(and(eq(membership.userId, person.id), isNull(workspace.deletedAt)))
    .limit(1);
  const seat = seats[0];
  if (!seat) {
    throw new Error("That account has no workspace yet.");
  }
  return { person, workspaceId: seat.workspaceId, currency: seat.currency };
}

async function clearFacts(workspaceId: string) {
  const now = new Date();
  await db
    .update(moneyTransaction)
    .set({ deletedAt: now })
    .where(and(eq(moneyTransaction.workspaceId, workspaceId), isNull(moneyTransaction.deletedAt)));
  await db
    .update(asset)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(asset.workspaceId, workspaceId), isNull(asset.deletedAt)));
  await db
    .update(liability)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(liability.workspaceId, workspaceId), isNull(liability.deletedAt)));
  await db
    .update(financialGoal)
    .set({ deletedAt: now, updatedAt: now })
    .where(and(eq(financialGoal.workspaceId, workspaceId), isNull(financialGoal.deletedAt)));
}

async function main() {
  const { person, workspaceId, currency } = await findFounder();
  await clearFacts(workspaceId);

  if (clearOnly) {
    const places = await listAccounts(workspaceId);
    for (const place of places) {
      await setStatedBalance(workspaceId, place.id, 0);
    }
    await afterMoneyChange(workspaceId, currency);
    console.log("Cleared founder sample money. Places stayed. Refresh Journey and Money.");
    return;
  }

  let places = await listAccounts(workspaceId);
  if (places.length === 0) {
    await createAccount(workspaceId, person.id, { name: "Maybank", kind: "bank", statedBalanceCents: 0 });
    await createAccount(workspaceId, person.id, { name: "GX", kind: "ewallet", statedBalanceCents: 0 });
    await createAccount(workspaceId, person.id, { name: "In Hand", kind: "cash", statedBalanceCents: 0 });
    places = await listAccounts(workspaceId);
  }

  const plan = planFounderSeed(
    places.map((row) => ({ id: row.id, name: row.name, kind: row.kind })),
    todayIso(),
  );

  for (const row of plan.balances) {
    await setStatedBalance(workspaceId, row.accountId, row.statedBalanceCents);
  }
  for (const line of plan.lines) {
    await createTransaction(workspaceId, person.id, {
      accountId: line.accountId,
      type: line.type,
      name: line.name,
      amountCents: line.amountCents,
      occurredOn: line.occurredOn,
      category: SEED_MARK,
    });
  }
  await createAsset(workspaceId, person.id, plan.asset);
  await createLiability(workspaceId, person.id, plan.liability);
  await upsertPrimaryGoal(workspaceId, person.id, plan.goal);
  await upsertProfile(workspaceId, person.id, plan.focus);
  await afterMoneyChange(workspaceId, currency);

  console.log("Pressed sample money onto the founder places. Refresh Journey and Money.");
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Seed failed.";
    console.error(message);
    process.exit(1);
  });
