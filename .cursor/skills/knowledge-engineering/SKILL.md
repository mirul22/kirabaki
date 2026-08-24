---
name: knowledge-engineering
description: Turns trusted sources into structured KIRABAKI principles, claims, and rules with provenance. Use when adding books, principles, citations, knowledge graph, RAG, or connecting lessons to recommendations.
---

# Knowledge Engineering

**Bad:** upload 100 books to RAG and hope.

**Good:** structured principles, claims, rules, applicability, and provenance.

```text
Book → Chapter → Concept → Principle → Claim → Evidence → Rule → Application → Recommendation
```

## Entities (see docs/DOMAIN-MODEL.md)

KnowledgeSource, Principle, Rule, RuleVersion. Later: Book, Chapter, Claim, Evidence, Citation, KnowledgeVersion.

A principle includes: source, chapter, title, summary, explanation, applicable situations, exceptions, related principles/rules, confidence, source location.

The system must answer “Why did KIRABAKI recommend this?” with a traceable source.

## Hard rules

- **No fabricated citations.** If you do not have the source, do not invent chapter names or quotes.
- Do not dump copyrighted PDFs into an LLM or train a model on full books without rights.
- Store structured understanding and metadata. Quote sparingly and legally.
- Version knowledge. Tax/regulatory interpretations change; books’ *interpretations* can too.
- Record conflicts between sources; do not silently pick one.
- Prefer founder-written paraphrased principles (8–15 to start) with source + chapter citation. Foundation v1: add sources through the catalog with a **tier** (official / theory / book / educator / community). See `docs/FOUNDATION-V1.md`. Do not add `sources/*.yaml` trees or ingest full books.

## Reliability

Prioritize: official regulators (LHDN, SC, BNM, MOF) for legal facts; named books/research for behaviour principles. Mark confidence. Never present a blog paraphrase as LHDN law.

## Lessons

Learn screens teach a principle in 60–180s and **connect it to the user’s numbers** (numbers from the engine). Not a blog dump.

See `docs/VISION.md` and `docs/UX-AND-BRAND.md`.
