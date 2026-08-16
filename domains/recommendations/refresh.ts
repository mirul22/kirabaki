import { and, desc, eq } from "drizzle-orm";
import type { MoneyPicture } from "@/domains/finance/picture";
import { assertWorkspaceId } from "@/domains/finance/tenant";
import { ensureKnowledge } from "@/domains/knowledge/ensure";
import { db } from "@/lib/db";
import { recommendation, recommendationEvidence, rule, ruleVersion } from "@/lib/db/schema";
import { newId } from "@/lib/id";
import {
  fillTemplate,
  formatMoney,
  formatMonths,
  predicates,
  type PredicateKey,
} from "@/lib/money";

function tokens(picture: MoneyPicture, currency: string): Record<string, string> {
  return {
    emergency_fund_months:
      picture.buffer.months === null ? "—" : formatMonths(picture.buffer.months),
    income: formatMoney(picture.cashflow.incomeCents, currency),
    expenses: formatMoney(picture.cashflow.expenseCents, currency),
    months_behind:
      picture.facts.monthsBehind === null ? "—" : String(picture.facts.monthsBehind),
  };
}

export async function refreshRecommendations(workspaceId: string, picture: MoneyPicture, currency: string) {
  const id = assertWorkspaceId(workspaceId);
  await ensureKnowledge();

  const versions = await db
    .select({ version: ruleVersion, rule })
    .from(ruleVersion)
    .innerJoin(rule, eq(ruleVersion.ruleId, rule.id))
    .where(eq(ruleVersion.status, "active"));

  const fired = versions
    .filter((row) => {
      const key = row.version.predicateKey as PredicateKey;
      return key in predicates && predicates[key](picture.facts);
    })
    .sort((a, b) => a.version.priority - b.version.priority);

  const chosen = fired[0];
  const openRows = await db
    .select()
    .from(recommendation)
    .where(and(eq(recommendation.workspaceId, id), eq(recommendation.status, "open")));

  if (!chosen) {
    for (const row of openRows) {
      await db
        .update(recommendation)
        .set({ status: "dismissed", resolvedAt: new Date() })
        .where(and(eq(recommendation.id, row.id), eq(recommendation.workspaceId, id)));
    }
    return null;
  }

  const t = tokens(picture, currency);
  const copy = {
    title: chosen.rule.name,
    happening: fillTemplate(chosen.version.explanationTemplate, t),
    whyItMatters: fillTemplate(chosen.version.whyTemplate, t),
    ifNothing: fillTemplate(chosen.version.ifNothingTemplate, t),
    nextAction: fillTemplate(chosen.version.nextActionTemplate, t),
  };

  const already = openRows.find((row) => row.ruleVersionId === chosen.version.id);
  if (already) {
    const [updated] = await db
      .update(recommendation)
      .set(copy)
      .where(and(eq(recommendation.id, already.id), eq(recommendation.workspaceId, id)))
      .returning();
    return updated ?? already;
  }

  for (const row of openRows) {
    await db
      .update(recommendation)
      .set({ status: "dismissed", resolvedAt: new Date() })
      .where(and(eq(recommendation.id, row.id), eq(recommendation.workspaceId, id)));
  }

  const recId = newId();
  await db.insert(recommendation).values({
    id: recId,
    workspaceId: id,
    ruleVersionId: chosen.version.id,
    principleId: chosen.version.principleId,
    ...copy,
    type: chosen.rule.key,
    status: "open",
    calculationRef: chosen.version.predicateKey,
  });

  const evidence: { kind: "rule" | "principle" | "calculation"; refId: string; label: string }[] = [
    {
      kind: "rule",
      refId: chosen.version.id,
      label: `${chosen.rule.name} v${chosen.version.version}`,
    },
    {
      kind: "calculation",
      refId: picture.cashflow.calculation,
      label: picture.cashflow.calculation,
    },
    {
      kind: "calculation",
      refId: picture.buffer.calculation,
      label: picture.buffer.calculation,
    },
  ];
  if (chosen.version.principleId) {
    evidence.push({
      kind: "principle",
      refId: chosen.version.principleId,
      label: chosen.version.principleId,
    });
  }

  await db.insert(recommendationEvidence).values(
    evidence.map((item) => ({
      id: newId(),
      recommendationId: recId,
      ...item,
    })),
  );

  const created = await db
    .select()
    .from(recommendation)
    .where(eq(recommendation.id, recId))
    .limit(1);
  return created[0] ?? null;
}

export async function getOpenRecommendation(workspaceId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rows = await db
    .select()
    .from(recommendation)
    .where(and(eq(recommendation.workspaceId, id), eq(recommendation.status, "open")))
    .orderBy(desc(recommendation.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

export async function listFindings(workspaceId: string, limit = 3) {
  const id = assertWorkspaceId(workspaceId);
  return db
    .select()
    .from(recommendation)
    .where(eq(recommendation.workspaceId, id))
    .orderBy(desc(recommendation.createdAt))
    .limit(limit);
}

export async function listEvidence(workspaceId: string, recommendationId: string) {
  const id = assertWorkspaceId(workspaceId);
  const rec = await db
    .select()
    .from(recommendation)
    .where(and(eq(recommendation.id, recommendationId), eq(recommendation.workspaceId, id)))
    .limit(1);
  if (!rec[0]) {
    return [];
  }
  return db
    .select()
    .from(recommendationEvidence)
    .where(eq(recommendationEvidence.recommendationId, recommendationId));
}
