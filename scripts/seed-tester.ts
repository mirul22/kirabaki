import "dotenv/config";

import { and, eq, ilike, isNull } from "drizzle-orm";
import { createAccount, listAccounts, setPrimaryAccount, setStatedBalance } from "@/domains/finance/accounts";
import { createAsset, createLiability } from "@/domains/finance/positions";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { createTransaction } from "@/domains/finance/transactions";
import { upsertPrimaryGoal } from "@/domains/goals/goals";
import { upsertProfile } from "@/domains/identity/profile";
import { ensureKnowledge } from "@/domains/knowledge/ensure";
import { loadMoneyPicture } from "@/domains/finance/picture";
import { rememberMonth } from "@/domains/snapshots/remember";
import { RULES } from "@/domains/knowledge/catalog";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  action,
  asset,
  financialAccount,
  financialGoal,
  financialSnapshot,
  liability,
  membership,
  moneyTransaction,
  netWorthSnapshot,
  outcome,
  recommendation,
  recommendationEvidence,
  workspace,
} from "@/lib/db/schema";
import { user } from "@/lib/db/schema/auth";
import { planTravelLoop } from "@/lib/dev/travel-loop";
import {
  TEST_SEED_EMAIL,
  TEST_SEED_NAME,
  TEST_SEED_PASSWORD,
  planTravelStory,
} from "@/lib/dev/travel-story";
import { monthRange, todayIso } from "@/lib/money";
import { newId } from "@/lib/id";

const email = (process.env.TEST_SEED_EMAIL ?? TEST_SEED_EMAIL).trim().toLowerCase();
const password = process.env.TEST_SEED_PASSWORD ?? TEST_SEED_PASSWORD;
const clearOnly = process.argv.includes("--clear");

async function findTester() {
  const people = await db
    .select({ id: user.id, name: user.name })
    .from(user)
    .where(ilike(user.email, email))
    .limit(1);
  return people[0] ?? null;
}

async function ensureTester() {
  const existing = await findTester();
  if (existing) {
    return existing;
  }
  await auth.api.signUpEmail({
    body: {
      name: TEST_SEED_NAME,
      email,
      password,
    },
  });
  const created = await findTester();
  if (!created) {
    throw new Error("Could not create the test user. Sign up once with that email, then run this again.");
  }
  return created;
}

async function findSeat(userId: string) {
  const seats = await db
    .select({
      workspaceId: membership.workspaceId,
      currency: workspace.currency,
    })
    .from(membership)
    .innerJoin(workspace, eq(workspace.id, membership.workspaceId))
    .where(and(eq(membership.userId, userId), isNull(workspace.deletedAt)))
    .limit(1);
  const seat = seats[0];
  if (!seat) {
    throw new Error("That account has no workspace yet.");
  }
  return seat;
}

async function wipeWorkspace(workspaceId: string) {
  const recs = await db
    .select({ id: recommendation.id })
    .from(recommendation)
    .where(eq(recommendation.workspaceId, workspaceId));
  for (const rec of recs) {
    await db.delete(recommendationEvidence).where(eq(recommendationEvidence.recommendationId, rec.id));
  }
  await db.delete(outcome).where(eq(outcome.workspaceId, workspaceId));
  await db.delete(action).where(eq(action.workspaceId, workspaceId));
  await db.delete(recommendation).where(eq(recommendation.workspaceId, workspaceId));
  await db.delete(financialSnapshot).where(eq(financialSnapshot.workspaceId, workspaceId));
  await db.delete(netWorthSnapshot).where(eq(netWorthSnapshot.workspaceId, workspaceId));
  await db.delete(moneyTransaction).where(eq(moneyTransaction.workspaceId, workspaceId));
  await db.delete(asset).where(eq(asset.workspaceId, workspaceId));
  await db.delete(liability).where(eq(liability.workspaceId, workspaceId));
  await db.delete(financialAccount).where(eq(financialAccount.workspaceId, workspaceId));
  await db.delete(financialGoal).where(eq(financialGoal.workspaceId, workspaceId));
}

async function seedLoop(workspaceId: string, asOf: string) {
  await ensureKnowledge();
  const items = planTravelLoop(asOf);
  for (const item of items) {
    const rule = RULES.find((row) => row.key === item.key);
    if (!rule) {
      continue;
    }
    const recId = newId();
    const actionId = newId();
    const at = new Date(`${item.at}T10:00:00+08:00`);
    await db.insert(recommendation).values({
      id: recId,
      workspaceId,
      ruleVersionId: rule.versionId,
      principleId: rule.principleId,
      title: rule.name,
      happening: item.happening,
      whyItMatters: item.why,
      ifNothing: item.ifNothing,
      nextAction: item.nextAction,
      type: rule.key,
      status: item.status,
      calculationRef: rule.key,
      createdAt: at,
      resolvedAt: at,
    });
    await db.insert(action).values({
      id: actionId,
      workspaceId,
      recommendationId: recId,
      decision: item.decision,
      createdAt: at,
    });
    if (item.note) {
      await db.insert(outcome).values({
        id: newId(),
        workspaceId,
        actionId,
        note: item.note,
        createdAt: at,
      });
    }
  }
}

async function main() {
  const person = await ensureTester();
  const seat = await findSeat(person.id);
  await wipeWorkspace(seat.workspaceId);

  if (clearOnly) {
    console.log("Cleared the test workspace. Sign in and start from an empty picture.");
    return;
  }

  const asOf = todayIso();
  const plan = planTravelStory(asOf);

  for (const place of plan.places) {
    await createAccount(seat.workspaceId, person.id, {
      name: place.name,
      kind: place.kind,
      statedBalanceCents: place.statedBalanceCents,
    });
  }
  const places = await listAccounts(seat.workspaceId);
  const byName = new Map(places.map((row) => [row.name, row]));
  const maybank = byName.get("Maybank");
  if (maybank) {
    await setPrimaryAccount(seat.workspaceId, person.id, maybank.id);
  }
  for (const place of plan.places) {
    const row = byName.get(place.name);
    if (row) {
      await setStatedBalance(seat.workspaceId, row.id, place.statedBalanceCents);
    }
  }
  for (const line of plan.lines) {
    const place = plan.places.find((row) => row.key === line.place);
    const account = place ? byName.get(place.name) : null;
    if (!account) {
      continue;
    }
    await createTransaction(seat.workspaceId, person.id, {
      accountId: account.id,
      type: line.type,
      name: line.name,
      amountCents: line.amountCents,
      occurredOn: line.occurredOn,
      category: line.category,
    });
  }
  for (const row of plan.assets) {
    await createAsset(seat.workspaceId, person.id, row);
  }
  for (const row of plan.liabilities) {
    await createLiability(seat.workspaceId, person.id, row);
  }
  await upsertPrimaryGoal(seat.workspaceId, person.id, plan.goal);
  await upsertProfile(seat.workspaceId, person.id, plan.focus);

  for (const monthStart of plan.months.slice(0, 2)) {
    const end = monthRange(monthStart).end;
    const picture = await loadMoneyPicture(seat.workspaceId, end);
    await rememberMonth(seat.workspaceId, picture);
  }

  await seedLoop(seat.workspaceId, asOf);
  await afterMoneyChange(seat.workspaceId, seat.currency);

  console.log(`Seeded the travel story. Sign in as ${email} then open Money.`);
  if (!process.env.TEST_SEED_PASSWORD) {
    console.log(`Password: ${TEST_SEED_PASSWORD}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Seed failed.";
    console.error(message);
    process.exit(1);
  });
