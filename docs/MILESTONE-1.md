# Milestone 1 — Build Brief

**Status:** In the five-tab PWA. Living board: [STATUS.md](./STATUS.md). Design System v0.8 is locked ([UX-AND-BRAND.md](./UX-AND-BRAND.md), [ux-mockups/IDENTITY.md](./ux-mockups/IDENTITY.md)). Do not build the whole company in one pass.

Objective: prove the core financial intelligence loop with real founder data.

## In scope

- Authentication (Better Auth)
- Workspace / tenant scoping
- User financial profile
- Financial goals
- Accounts
- Income and expenses (transactions with dates)
- Assets and liabilities
- Net worth (deterministic)
- Basic financial / net-worth snapshots (monthly memory)
- Knowledge source + Principle models
- Rule model (versioned)
- Recommendation + RecommendationEvidence
- Action + Outcome
- Basic KIRABAKI Brain orchestration (Layers 1–3; template explanations; no LLM required)
- **Journey home** (decision-first, touch-first — not a metric wall)
- **PWA baseline:** valid manifest, real icons in `public/`, service worker, `/offline`, Apple web-app meta, installable, honest offline state

## Out of scope

- Bank integrations
- OCR / receipts pipeline
- Tax automation / MyInvois
- Full accounting / business module
- Investment trading
- Native mobile apps / Capacitor / TWA
- Social features / marketplace
- Web Push
- Offline write-queue / full offline-first sync
- Vector DB / custom LLM / microservices
- **Momentum / streaks / Kira animations** — design later; not required for M1 DoD
- Three visual-direction exploration pages (Design Milestone 0.5, before this code)

## Journey home (target UX)

Replace the old `/budget` list. Navigation: **Journey | Money | Find | Learn | You**. No Ask AI tab.

Journey should answer where I am, where I am going, and what to do next:

1. **Friendly greeting** + current state (health **language**, not a credit-score vibe)
2. **Path / primary goal** — on/off track
3. **One Next Move** — from the recommendation engine (what, why, evidence, impact)
4. **KIRABAKI Found** — few ranked findings (discovery, not red alerts)
5. **Recent decisions / outcomes**
6. **Small learning moment** — principle tied to current situation
7. Optional secondary: this month income / expenses / saved (not the hero)

Must be **touch-first** (no hover-only edit/delete). That is a PWA requirement. Copy follows the no-shame rules in [UX-AND-BRAND.md](./UX-AND-BRAND.md).

## Definition of Done

A user can:

1. Create a financial profile
2. Define a financial goal
3. Add accounts
4. Add income
5. Add expenses
6. Add assets
7. Add liabilities
8. See net worth
9. See monthly cashflow
10. Add a financial principle
11. Define a financial rule
12. Generate a recommendation from **actual** financial data
13. See **why** it was generated (rule + knowledge + evidence)
14. Record an action
15. Record an outcome
16. Return later and see historical progress (snapshots)

If any of these are missing, do not move to the next milestone.

**Founder “holy shit” moment:** enter real data → get one explainable recommendation → commit → KIRABAKI remembers it.

## Coding slice order (when approved)

Work in small prompts — do not build the company in one pass:

1. Domain schema (Drizzle) + auth + workspace — **done**
2. Goals — **done**
3. Deterministic financial engine (`lib/money`) + tests — **done**
4. Knowledge + Rules — **done** (seeded catalog; no authoring UI)
5. Recommendation engine + evidence — **done**
6. Journey home + PWA baseline — **done**

## Knowledge seeding

Founder writes 8–15 paraphrased principles with citations. No copyrighted PDF ingestion.

## Trust / privacy in M1

- No balances, income, or goals in analytics events
- Export/delete designed and implemented at a basic level
- All money queries scoped by `workspaceId`

## Related docs

- [STATUS.md](./STATUS.md)
- [THESIS.md](./THESIS.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DOMAIN-MODEL.md](./DOMAIN-MODEL.md)
- [PLATFORM-AND-SCALE.md](./PLATFORM-AND-SCALE.md)
- [AUDIT.md](./AUDIT.md)
