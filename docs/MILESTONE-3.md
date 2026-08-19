# Milestone 3 — Memory changes the Next Move

**Status:** Closed — last month vs this month changes the Next Move. Living board: [STATUS.md](./STATUS.md). v0.8 stays locked.

Objective: last month vs this month must change **what KIRABAKI asks you to do**. Seeing the months (M2) is not enough.

## In scope

- Layer 1 facts include last month’s keep from dated lines (`lastSavingsCents`)
- Versioned rules: `kept_after_out`, `out_after_kept` — templates, no LLM
- Hafiz in August: Next Move is **Hold what stayed**, with last month’s keep next to this month’s — not generic “You’re okay”
- Quiet CTA (See the picture) for a recovered month; Money for a flip the other way
- Playwright asserts the new Next Move

## Out of scope

- LLM monthly review (Phase 4 Advisor)
- Recurring engine, charts, tax, bank connect, Momentum
- Net worth per past month

## Definition of done

1. After a month that went out, a month that kept something asks you to hold what stayed — names the last month, and shows last keep vs this keep.
2. After a month that kept something, a month that did not is not the generic “Nothing stayed” with no history.
3. Every amount in that copy comes from `formatMoney` on engine cents.
4. Find still shows one finding.

## Related docs

- [STATUS.md](./STATUS.md)
- [MILESTONE-2.md](./MILESTONE-2.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
