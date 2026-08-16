import { eq } from "drizzle-orm";
import { KNOWLEDGE_SOURCES, PRINCIPLES, RULES } from "@/domains/knowledge/catalog";
import { db } from "@/lib/db";
import { knowledgeSource, principle, rule, ruleVersion } from "@/lib/db/schema";

export async function ensureKnowledge() {
  for (const source of KNOWLEDGE_SOURCES) {
    await db.insert(knowledgeSource).values(source).onConflictDoNothing();
  }
  for (const row of PRINCIPLES) {
    await db
      .insert(principle)
      .values(row)
      .onConflictDoUpdate({
        target: principle.id,
        set: {
          title: row.title,
          summary: row.summary,
          explanation: row.explanation,
          chapter: row.chapter,
        },
      });
  }
  for (const row of RULES) {
    await db
      .insert(rule)
      .values({ id: row.id, key: row.key, name: row.name })
      .onConflictDoUpdate({
        target: rule.id,
        set: { name: row.name },
      });
    await db
      .insert(ruleVersion)
      .values({
        id: row.versionId,
        ruleId: row.id,
        version: 1,
        status: "active",
        predicateKey: row.key,
        explanationTemplate: row.happening,
        whyTemplate: row.why,
        ifNothingTemplate: row.ifNothing,
        nextActionTemplate: row.nextAction,
        principleId: row.principleId,
        priority: row.priority,
      })
      .onConflictDoUpdate({
        target: ruleVersion.id,
        set: {
          explanationTemplate: row.happening,
          whyTemplate: row.why,
          ifNothingTemplate: row.ifNothing,
          nextActionTemplate: row.nextAction,
          priority: row.priority,
        },
      });
  }
}

export async function listPrinciples() {
  await ensureKnowledge();
  return db
    .select({
      principle,
      source: knowledgeSource,
    })
    .from(principle)
    .innerJoin(knowledgeSource, eq(principle.sourceId, knowledgeSource.id));
}

export async function getPrinciple(principleId: string) {
  await ensureKnowledge();
  const rows = await db
    .select({
      principle,
      source: knowledgeSource,
    })
    .from(principle)
    .innerJoin(knowledgeSource, eq(principle.sourceId, knowledgeSource.id))
    .where(eq(principle.id, principleId))
    .limit(1);
  return rows[0] ?? null;
}
