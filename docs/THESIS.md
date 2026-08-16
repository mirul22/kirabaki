# KIRABAKI Product Thesis

> Write this once. Do not lose sight of it.

## Problem

People have financial data — salary, bank balances, EPF, receipts, goals — but they do not know **what to do with it**.

They can see numbers. They cannot see:

- What is happening
- Why it matters
- What to do next
- Whether they are actually getting better

## Existing solutions (fragmented)

| Category | What it does | What it misses |
| --- | --- | --- |
| Trackers | Log expenses | No decision loop |
| Budgets | Cap spending | No memory of outcomes |
| Reports | Charts | No “what should I do?” |
| Tax tools | Forms / receipts | No whole-life context |
| Accounting | Books for SMEs | Tables, not intelligence |
| ChatGPT wrappers | Answers | Invented math, no provenance |

Each solves a slice. None connect **knowledge + data + goals + decisions + actions + outcomes**.

## KIRABAKI

KIRABAKI is a **financial intelligence system**.

It understands a user’s financial life, combines that with structured financial knowledge and deterministic rules, finds problems and opportunities, builds a roadmap, recommends what to do next, and checks whether the user is actually improving.

**Product promise:**

> Tell me what is happening with my money, why it matters, what I should do, and whether I am actually getting better.

**Not:**

- “Track your expenses.”
- “AI financial advisor.”
- “Tax app.”

## Core loop

```text
KNOW → UNDERSTAND → DECIDE → ACT → CHECK → IMPROVE
```

Expanded product loop:

```text
TRACK → UNDERSTAND → FIND → PLAN → DECIDE → ACT → CHECK → LEARN → IMPROVE
```

## North star metric

**Financial Improvement Rate**

Percentage of active users who complete at least one meaningful financial improvement generated or supported by KIRABAKI per month.

Examples of improvements:

- Save RM500 more (and do it)
- Cancel an unused subscription
- Document a tax expense
- Move cash into an emergency fund

Do **not** use as north star: transaction count, AI chat volume, or receipts uploaded.

## First proof (Gate 1)

> Can KIRABAKI make Amirul make one materially better financial decision this month?

If it cannot work for the founder with real data, it does not deserve users.

## Identity change from v1

| v1 prototype | v2 thesis |
| --- | --- |
| No sign-in | Account (financial memory requires identity) |
| Data only in localStorage | Postgres is system of record |
| Budget list | Decision-first Financial Home |
| Privacy = “never leaves device” | Privacy = least privilege, no money in logs, export/delete |

Accounts exist so KIRABAKI can remember the journey, decisions, and outcomes — not to sell ads.

## Risks to the thesis

- **Trust flip:** if accounts are not explained, the brand feels dishonest vs v1
- **LLM gravity:** letting GPT do math kills the moat and creates liability
- **Scope gravity:** tax / MyInvois / business will try to leak into Milestone 1
- **Copyright:** do not ingest book PDFs; paraphrase principles with citation
- **SC licensing:** no specific investment advice in the core product
- **Empty brain:** rules without real founder data produce generic advice
- **PWA vs “real app” temptation:** native before product-market fit delays the Brain
- **Premature scale:** infrastructure before 100 users wastes the RM0–500 budget

## Spend discipline

| Phase | Budget mindset |
| --- | --- |
| Phase 1 / thesis | RM0–500 |
| Alpha | RM500–2,000 |
| Beta | RM2k–5k |
| Serious infra | Only after revenue |

First goal is not “build KIRABAKI.” First goal is **prove KIRABAKI**.

## Related docs

- [VISION.md](./VISION.md) — promise, what it is / is not, flywheels
- [ICP-AND-GTM.md](./ICP-AND-GTM.md) — who we serve first
- [ROADMAP.md](./ROADMAP.md) — phases and gates
- [MILESTONE-1.md](./MILESTONE-1.md) — first build brief
