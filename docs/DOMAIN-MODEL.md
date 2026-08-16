# Domain Model

Design document. **No Drizzle schemas in this Phase 0 pass.** Implement during Milestone 1.

## Tenancy

```text
User → Membership → Workspace
                        ↓
              all financial rows (workspaceId)
```

- Personal product starts as one user, one personal workspace, role `owner`
- Later: same User, multiple Workspaces (personal + business)
- Professional later: `advisor` membership on client workspaces
- **Never** query money tables without `workspaceId`
- Never allow cross-workspace access

Defaults: currency `MYR`, `jurisdiction: MY`.

## Milestone 1 entities

### Identity

| Entity | Purpose |
| --- | --- |
| User | Auth identity |
| Workspace | Tenant boundary |
| Membership | User ↔ Workspace + role |

### Finance

| Entity | Purpose |
| --- | --- |
| FinancialProfile | Preferences, risk, household context |
| FinancialAccount | Cash, bank, e-wallet, investment (as accounts) |
| Transaction | Income / expense lines with **date** |
| TransactionCategory | Optional in M1; can start minimal |

`RecurringTransaction` — model later if needed; do not block M1.

### Position

| Entity | Purpose |
| --- | --- |
| Asset | Non-account assets contributing to net worth |
| Liability | Debts |

### Goals (PLAN)

| Entity | Purpose |
| --- | --- |
| FinancialGoal | Target amount, target date, current amount, contribution, assumptions, status |

Projections use deterministic engine, not LLM arithmetic.

### Memory (Financial Twin history)

| Entity | Purpose |
| --- | --- |
| FinancialSnapshot | Monthly income, expenses, savings, savings rate, cashflow, etc. |
| NetWorthSnapshot | Point-in-time net worth |

Do **not** store only the latest balance. Memory is a moat.

### Brain

| Entity | Purpose |
| --- | --- |
| KnowledgeSource | Book / regulation / research (metadata, not PDF dump) |
| Principle | Traceable financial principle |
| Rule | Inspectable if/then rule |
| RuleVersion | Version + effective date + status |

### Decision loop

| Entity | Purpose |
| --- | --- |
| Recommendation | What / why / next action |
| RecommendationEvidence | Links to data, rules, knowledge, calculations |
| Action | User accepted / did something |
| Outcome | Measured result later |

### Audit

| Entity | Purpose |
| --- | --- |
| AuditEvent | Who / what / when — no secrets, no balances in clear logs |

## Recommendation shape (trust fields)

Every recommendation should support:

| Field | Meaning |
| --- | --- |
| title, description, type | What |
| priority, severity, confidence | Ranking |
| evidence | What data triggered it |
| rules used | Rule ids + versions |
| knowledge sources | Principle / source ids |
| calculation references | Deterministic function / snapshot ids |
| risk | What could make this wrong |
| status | open / accepted / dismissed / completed |
| user_action | Decision |
| outcome | Link to Outcome |
| created_at, resolved_at | Timeline |

A recommendation must answer:

1. What is happening?
2. Why does it matter?
3. What evidence supports this?
4. What should the user consider doing?
5. What happens if they do nothing?
6. What is the next action?

**Bad:** “Save more money.”

**Good:** “Your savings rate fell from 42% to 31% over three months. Your RM1m goal is ~X months behind. Largest driver: recurring discretionary. Review the three highest recurring increases before cutting essentials.”

## Product names → domain

| Product name | Domain meaning in M1 |
| --- | --- |
| KIRABAKI FIND | Ranked recommendations / findings (thin) |
| KIRABAKI PLAN | FinancialGoal + deterministic projection |
| KIRABAKI DISCIPLINE | Later: Commitment + check-ins; M1: Action + Outcome only |

## Later entities (name now — do not implement)

Commitment, CommitmentCheckin, Receipt, TaxRecord, TaxRuleVersion, MyInvois*, Business*, BusinessAccount, BusinessTransaction, Scenario (full), Professional client graph.

## Knowledge seeding policy

- Do **not** ingest copyrighted book PDFs
- Founder writes **8–15** paraphrased principles (e.g. Psychology of Money / KCLau *ideas*) with source + chapter citation
- Enough to prove: “I’m recommending this because…”

## Financial Twin (design target)

Eventually represent: income, expenses, assets, liabilities, cashflow, goals, tax position, business, recurring commitments, behaviour, scenarios.

Scenario questions (deterministic math):

- Can I afford this purchase?
- What if income drops 10%?
- What if I save RM500 more/month?
- When could I reach RM1 million?
- Which action has the biggest impact?

## Ownership rule

Every user-owned financial record has clear ownership via `workspaceId` (+ `createdBy` where useful). Soft-delete preferred for money rows until hard-delete/export flows exist.

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
- [VISION.md](./VISION.md)
