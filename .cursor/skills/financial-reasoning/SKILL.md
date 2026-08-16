---
name: financial-reasoning
description: Keeps KIRABAKI finance math in deterministic code and testable scenarios. Use when implementing net worth, cashflow, savings rate, projections, goal math, lib/money, or any advice that depends on numbers.
---

# Financial Reasoning

Finance logic belongs in **deterministic code**. The LLM must not do arithmetic.

```text
Financial facts
      ↓
Calculations          ← lib/money, tested
      ↓
Rules                 ← versioned if/then
      ↓
Scenario A / B / C
      ↓
Decision + evidence
```

## Forbidden

```ts
const advice = await ai("Look at user's money and tell them what to do")
```

Also forbidden: computing balances, percentages, or “months of runway” inside a prompt.

## Required

- All important calculations are pure functions in `lib/money` (or domain equivalents) with unit tests.
- Inputs are typed numbers (not display strings). Currency default `MYR`.
- Outputs include enough refs for a recommendation to cite the calculation.
- Scenarios (“Can I afford X?”, “What if income −10%?”, “What if I save RM500 more?”) use the same engine — not LLM math.
- Rules consume calculated facts (`emergency_fund_months`, `monthly_cashflow`, `savings_rate`), they do not re-derive them in English.

## Typical functions (M1+)

- period income / expenses / savings / savings rate
- net worth (assets − liabilities + account balances)
- cashflow
- goal progress and projected date given contribution + assumptions
- emergency-fund months (cash / essential monthly expenses)

## Recommendation quality

Bad: “Save more money.”

Good: “Savings rate fell from 42% to 31% over three months. The RM1m goal is ~X months behind. Largest driver: recurring discretionary. Review the three highest recurring increases.”

Every number in that sentence must come from the engine or stored snapshots.

See `docs/DOMAIN-MODEL.md` and `docs/ARCHITECTURE.md`.
