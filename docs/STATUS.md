# KIRABAKI status

**Last updated:** 19 August 2026

This is the living board. Roadmap and briefs do not change every week. This file does.

| Question | Answer |
| --- | --- |
| **Phase now** | Personal loop is live: thin Brain + Journey + money picture (Phases 1–3, not the whole of each) |
| **Milestone now** | **Milestone 5 — Saving / Income bottleneck** (ready to retest) |
| **Gate now** | **Gate 1 passed** — founder used it for a week (16 Aug 2026) |
| **Do not start** | Tax, MyInvois, Business, native apps, LLM, bank connect |

---

## How to read this

Three different clocks. Do not mix them.

| Clock | What it is | Where |
| --- | --- | --- |
| **Phase** | Product arc (Brain → Journey → money → advisor → tax…) | [ROADMAP.md](./ROADMAP.md) |
| **Milestone** | What we actually build next | [MILESTONE-1.md](./MILESTONE-1.md), [MILESTONE-2.md](./MILESTONE-2.md), [MILESTONE-3.md](./MILESTONE-3.md), [MILESTONE-4.md](./MILESTONE-4.md), [MILESTONE-5.md](./MILESTONE-5.md) |
| **Gate** | When we are allowed to advance | [ROADMAP.md](./ROADMAP.md) |

Advance because a **gate** is hit, not because the screen is boring.

---

## Now

The five-tab PWA is the product: **Journey · Money · Find · Learn · You**.

- Sign-in, personal workspace, Postgres, tenant isolation
- Own / owe / net, this month in / out / kept, lines with dates
- One goal, Next Move from versioned rules (including last month vs this month)
- Read first. **Edit** for change/remove. Amounts like `1,000.00`
- Find shows **one** finding. A recovered month is **Hold what stayed**, with last keep vs this keep — not a generic okay
- Test story: `npm run db:seed-tester` → `hafiz.kirabaki@gmail.com`

v1 `/budget` (localStorage) is leftover. Ignore it.

---

## Done

### Phase 0 — thesis
Docs, ICP, architecture, domain, UX, skills. Closed.

### Design 0.5
v0.8 locked: cream `#F7EFE4` + night `#12141A` + seal `#E04A30`. Refine, do not restyle.

### Milestone 1 — closed

| Slice | Status |
| --- | --- |
| 1. Schema, Better Auth, workspace | Done |
| 2. Goals | Done |
| 3. `lib/money` + tests | Done |
| 4. Knowledge + versioned rules (seeded catalog) | Done |
| 5. Recommendation + evidence + action/outcome | Done |
| 6. Journey home + five tabs + PWA baseline | Done |
| Money as a living statement | Done |
| Edit mode — no trash/Save until asked | Done |
| Find = one thing | Done |
| Grouped amounts | Done |
| Hafiz travel seed | Done |

### Milestone 2 — closed

Month closes on Journey: In / Out / Kept, one Layer-1 sentence vs last, Hafiz four-month story.

### Milestone 3 — closed

Last month vs this month changes the Next Move. After a loud month, a quiet one is **Hold what stayed**, with last keep next to this keep.

### Milestone 4 — closed

Source tiers on the catalog. KCLau *Millionaire Roadmap* as four paraphrased principles. See [FOUNDATION-V1.md](./FOUNDATION-V1.md).

---

## Milestone 1 definition of done

From [MILESTONE-1.md](./MILESTONE-1.md).

| # | A user can… | Status |
| --- | --- | --- |
| 1 | Create a financial profile | Yes |
| 2 | Define a financial goal | Yes |
| 3 | Add accounts | Yes |
| 4 | Add income | Yes |
| 5 | Add expenses | Yes |
| 6 | Add assets | Yes |
| 7 | Add liabilities | Yes |
| 8 | See net worth | Yes |
| 9 | See monthly cashflow | Yes |
| 10 | Add a financial principle | Catalog seeded — no authoring UI |
| 11 | Define a financial rule | Catalog seeded — no authoring UI |
| 12 | Get a recommendation from real numbers | Yes |
| 13 | See why (rule + knowledge + evidence) | Partial — Learn + Next Move copy |
| 14 | Record an action | Yes |
| 15 | Record an outcome | Yes |
| 16 | Come back and see history | Yes — month closes on Journey |

**Holy shit moment:** real (or Hafiz) data → one explainable Next Move → remember it. Path exists. Founder used it for a week.

---

## Not yet (do not wander)

| Item | When |
| --- | --- |
| Recurring / bills engine | Only if the month is lying without it |
| Bank connect, OCR, receipts | After personal loop is proven |
| LLM explanations | Layer 4 — templates are enough |
| Momentum, streaks, Kira motion | After Journey + Next Move hold |
| Tax, MyInvois, Business, Professional | Phases 7–10 |
| Native apps, crypto, trading, Ask AI tab | Year-1 ban |

---

## Next

**Milestone 5 — Saving / Income bottleneck** (ready to retest): [MILESTONE-5.md](./MILESTONE-5.md).

When the picture is quiet, name the lever — saving vs income — from Layer 1. No score. No Return. Loud-month memory still wins.

---

## Gates (progress)

| Gate | Condition | Status |
| --- | --- | --- |
| 1 | Founder uses it every week | **Passed** — 16 Aug 2026 |
| 2 | 20 users for 30+ days | Not started |
| 3 | ≥30% complete recommended actions | Not started |
| 4 | People ask to keep using it | Not started |
| 5 | People pay | Not started |
| 6 | Users refer | Not started |
| 7 | Businesses pay | Not started |

---

## Where else to look

| Need | Doc |
| --- | --- |
| Why KIRABAKI exists | [THESIS.md](./THESIS.md) |
| Phases 0–11, bans | [ROADMAP.md](./ROADMAP.md) |
| M1 build brief | [MILESTONE-1.md](./MILESTONE-1.md) |
| M2 build brief | [MILESTONE-2.md](./MILESTONE-2.md) |
| M3 build brief | [MILESTONE-3.md](./MILESTONE-3.md) |
| M4 build brief | [MILESTONE-4.md](./MILESTONE-4.md) |
| M5 build brief | [MILESTONE-5.md](./MILESTONE-5.md) |
| Foundation v1 | [FOUNDATION-V1.md](./FOUNDATION-V1.md) |
| Screens and voice | [UX-AND-BRAND.md](./UX-AND-BRAND.md) |
| How the Brain is layered | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| v1 leftover notes | [AUDIT.md](./AUDIT.md) (historical) |
| Docs index | [README.md](./README.md) |
