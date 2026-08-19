# Milestone 2 — Monthly memory

**Status:** Closed — Journey shows month closes. Living board: [STATUS.md](./STATUS.md).

Objective: the user can **see the months**. Each remembered month has a close — in, out, kept — from Layer 1 numbers, plus one sentence vs last month. Not a spreadsheet. Not a new tab.

## In scope

- Persist a cashflow close for every month that has dated lines (and the current month), scoped by `workspaceId`
- Journey section **The months**: statement rows (In / Out / Kept)
- One Layer-1 sentence for this month vs last (`monthAgainstLast`)
- Latest three closes open; older months in **Earlier months**
- Thicker Hafiz tester story (four month shapes) so the fold and the closes are visible
- Playwright smoke as Hafiz

## Out of scope

- Recurring / bills engine
- Calendar grid, spend charts
- Net worth per past month (stated balances are not historical openings)
- LLM monthly review (Phase 4 Advisor)
- Bank connect, tax, native apps, Momentum, password UI

## Definition of done

A user who already has dated lines can open Journey and:

1. See this month and recent months as In / Out / Kept
2. Read one calm sentence vs last month (or nothing, if there is only one month)
3. Open earlier months without a dump of old rule titles
4. Still add and change lines on Money — those lines stay the source of truth

Numbers in the UI come from `periodCashflow` / stored snapshots. The sentence invents no amounts.

## Related docs

- [STATUS.md](./STATUS.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
- [DOMAIN-MODEL.md](./DOMAIN-MODEL.md)
