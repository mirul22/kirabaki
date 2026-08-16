# Product overview

Kirabaki is a **privacy-first personal budget companion**. The name reads naturally in Malay: *kira* (calculate) + *baki* (balance / leftover). The product promise is simple: show how much money is still available after income and expenses.

It is a Progressive Web App (PWA) with **no sign-in, no server, and no cloud sync**. Money data never leaves the device.

Live site (from app metadata): [https://kirabaki.vercel.app](https://kirabaki.vercel.app)

## Who it is for

People who want a lightweight money tracker they can install on a phone, use offline, and trust because nothing is uploaded.

It is not a bank, not a multi-user household ledger, and not a full accounting tool.

## What the app does today

1. Walks a first-time user through a 3-step onboarding.
2. Asks for a display name and stores it locally.
3. Lets the user add income and expense transactions.
4. Shows remaining budget as `income - expenses`.
5. Lets the user edit or delete a transaction.
6. Lets the user wipe all local data and start over.

## Product principles (already in the UI)

These are the ideas the onboarding screens sell, and the codebase actually follows:

- **Your data, your control** — no account, no login.
- **Offline first** — PWA + localStorage, so it can work without a network.
- **Simple** — only name, type (income/expense), and amount.

## What it does not do yet

- No dates on transactions, so the “Available budget in March 2026” label is cosmetic. All transactions are treated as one running list.
- No categories, budgets, goals, or charts.
- No backup / export / import.
- No multi-account or multi-currency support.
- Edit and delete actions are hover-only, which is awkward on phones even though the PWA is mobile-first.

See [strategy.md](./strategy.md) for how to grow this without breaking the original promise.
