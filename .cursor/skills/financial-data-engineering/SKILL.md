---
name: financial-data-engineering
description: Designs KIRABAKI financial memory, snapshots, Twin, transactions, and idempotent imports. Use when modeling accounts, transactions, balances, cashflow history, reconciliation, bank imports, or FinancialSnapshot.
---

# Financial Data Engineering

Do not only store `balance = 10000`. Preserve history so KIRABAKI can learn the journey.

```text
Transaction + Transaction + …
        ↓
Derived current position
        ↓
FinancialSnapshot / NetWorthSnapshot (monthly+)
        ↓
Behaviour and Twin analysis
```

## Tenancy

Every money row has `workspaceId`. Never select without it. Default currency `MYR`, `jurisdiction: MY`.

## Core ideas

- **Transactions** are facts (dated). Balances are derived or reconciled, not a lone magic number.
- **FinancialSnapshot** / **NetWorthSnapshot** enable memory (income, expenses, savings, net worth, goal progress, cash).
- **Financial Twin** eventually: income, expenses, assets, liabilities, cashflow, goals, tax, recurring, behaviour, scenarios.
- Categories and recurring: add when needed; do not block M1 on a 40-category taxonomy.

## Imports (later)

- Idempotency keys (external id + account + posted date + amount)
- Duplicate detection
- Normalization (amount as number, timezone, MYR)
- Reconciliation vs stated balance
- Never treat an import as tax-authoritative without user confirmation

## Indexes (when coding)

`workspaceId` + date on transactions. Partition/archive only after a real size problem.

Receipts later: object storage, not `bytea` in Postgres.

See `docs/DOMAIN-MODEL.md` and `docs/PLATFORM-AND-SCALE.md`.
