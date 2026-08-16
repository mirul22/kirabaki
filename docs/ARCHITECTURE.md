# Architecture

## Principles

- Modular monolith — no microservices
- Extensibility over premature scale
- AI is not the source of truth
- Deterministic calculations in code; rules inspectable; knowledge traceable
- Prefer small milestones over “build the company in one PR”
- First user is the founder

## Stack (locked for Milestone 1)

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | Next.js 16 + React 19, TypeScript strict, Tailwind 3, shadcn/ui | Reuse UI primitives from v1 |
| Backend | Server Actions; API routes when needed | Same app |
| Database | PostgreSQL + Drizzle ORM | Neon free tier hosted; Docker Postgres locally |
| Auth | Better Auth + Drizzle adapter | Self-hosted; no Clerk lock-in |
| Validation | Zod at every boundary | |
| Money math | Pure functions in `lib/money` | Never in React components |
| AI | `AIProvider` interface later | **No LLM in M1** by default; template explanations from rules |
| Storage / jobs | Interfaces only until Tax/OCR | No S3/OCR yet |
| Client | **PWA from day 1** (`@serwist/next`) | Phone product until MVP proven |
| Hosting | Vercel | Analytics events only — never balances/goals |

## SaaS + PWA contract

| Concern | Owner |
| --- | --- |
| System of record | Postgres (memory, decisions, snapshots) |
| Client | Installable PWA — fast, touch-first |
| Offline (M1) | Honest offline page; mutations need network |
| Offline (later) | Cached last home snapshot for *read*; optional write queue much later |
| Sync | Account = same workspace on phone and laptop |

v1 said “everything lives in localStorage.” v2 keeps “feels like an app in my pocket” but **memory lives on the server**.

Details: [PLATFORM-AND-SCALE.md](./PLATFORM-AND-SCALE.md).

## App shape (when coding starts)

```text
app/                 routes + layouts only
domains/
  identity/
  finance/
  accounts/
  transactions/
  assets/
  liabilities/
  goals/
  knowledge/
  rules/
  analysis/
  recommendations/
  commitments/
  outcomes/
  snapshots/
  ai/
  audit/
  tax/               stub README only until Phase 7
  receipts/          stub until Phase 7
  business/          stub until Phase 9
lib/db/              Drizzle schema + client
lib/auth/            Better Auth
lib/money/           deterministic engine (pure, tested)
ai/prompts/          versioned prompts (when LLM exists)
```

Rules:

- UI never owns formulas
- Presentation never queries the DB directly
- Domain logic independently testable
- No business logic buried in components
- Presentation uses **design tokens** once a direction is locked ([UX-AND-BRAND.md](./UX-AND-BRAND.md)); copy/tone is product surface
- **No AI chat as primary IA.** AI is embedded in Journey, Find, Money, Learn

## Four-layer Brain (law)

```text
User data → Financial model
              ↓
     Layer 1 Deterministic engine
              ↓
     Layer 2 Versioned rules  ← Layer 3 Knowledge
              ↓
     Recommendations / FIND
              ↓
     Layer 4 LLM (explain only)
              ↓
     PLAN → ACTION → DISCIPLINE → OUTCOME → Snapshots
```

### Layer 1 — Deterministic

Balances, cashflow, income, expenses, savings rate, net worth, debt math, goal progress, projections, ratios, scenarios.

**Must not** be delegated to an LLM. All important calculations = testable functions.

### Layer 2 — Rules

Structured data, not hidden in prompts:

- id, name, description, category
- conditions, required inputs, calculation
- recommendation, severity, confidence
- source references, effective date, version, status

Example: `IF emergency_fund_months < target AND monthly_cashflow > 0 THEN recommend increasing emergency savings.`

### Layer 3 — Knowledge

Entities: KnowledgeSource, Principle (and later Book/Chapter/Claim/Evidence/Citation/KnowledgeVersion).

Every principle keeps provenance: source, chapter, summary, applicability, exceptions, confidence.

**Do not** dump copyrighted PDFs into an LLM. Founder-written paraphrased principles with citations for M1.

### Layer 4 — AI Reasoning

May: interpret questions, summarise, explain calculations, synthesise rules, produce reviews.

Must not: invent balances, invent tax rules, invent math, override Layer 1, claim false certainty, invent regulations.

When LLM exists: central `AIProvider`, prompt versions under `ai/prompts/`, cost tracking, schema-validated outputs.

## Trust architecture (every recommendation)

- Evidence — what data triggered it?
- Rule — which rule version?
- Source — which knowledge?
- Calculation — which deterministic refs?
- Confidence
- Risk — what could make this wrong?
- Status, user decision, outcome

## Tax / MyInvois (future contract — design only)

Versioned from day one of that phase:

- `TaxRuleVersion`, `MyInvoisVersion`, `EffectiveDate`, `Source`
- Never hardcode LHDN forever; guidelines change (e.g. July 2026 updates)
- Abstraction for: TIN validation, submit, retrieve, search, cancel/reject, storage
- AI suggests → rules validate → **user confirms**

Do not implement in Milestone 1.

## Security (design Day 1; implement with M1)

- Strict authz + tenant isolation (`workspaceId` on every money row)
- Zod server-side validation
- Encrypted secrets; no financial data in logs or analytics
- Audit events (who/what/when; no raw secrets)
- Export / delete capability designed Day 1 (implement in M1)
- Least privilege; secure file access when receipts exist
- Never expose private financial data to the client unnecessarily

## Testing priorities (when coding)

1. Financial calculations, projections, net worth, cashflow
2. Rules evaluation
3. Authorization / tenant isolation
4. Recommendation generation + evidence
5. AI structured outputs (when LLM exists)

## Related docs

- [DOMAIN-MODEL.md](./DOMAIN-MODEL.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
- [AGENT-SKILLS.md](./AGENT-SKILLS.md)
- [PLATFORM-AND-SCALE.md](./PLATFORM-AND-SCALE.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
- [AUDIT.md](./AUDIT.md)
