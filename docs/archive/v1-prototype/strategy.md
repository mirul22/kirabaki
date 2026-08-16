# Strategy and plan

## Thesis

Kirabaki should stay a **fast, private, offline calculator of leftover money**.

Most budget apps fail this user by asking for an account, a bank connection, or a complicated category system. Kirabaki’s advantage is the opposite: open it, add a few lines, see the *baki*.

Do not add a backend until there is a feature that truly cannot live on the device (for example optional encrypted sync). The current architecture matches the marketing copy. Keep it that way.

## Current strategy (what the code already commits to)

1. **Local-only trust** — `account_name` + `transactions` in localStorage.
2. **Installable phone app** — PWA, portrait, dark UI, home-screen metadata.
3. **Tiny surface area** — three routes, one money object, two transaction types.
4. **Hosted as a static-ish Next app on Vercel** — analytics for funnels, not for balances.

That is a coherent v1. The product is a working prototype of that idea, not an unfinished backend app.

## What is working

- Clear first-run story (privacy + offline).
- End-to-end loop: name → add income/expense → see remaining budget → edit/delete → reset.
- Mobile-oriented layout and PWA wiring.
- No env, no auth, no deploy complexity.

## What is incomplete or misleading

These are the highest-leverage fixes if the goal is “make the current product honest and usable”:

1. **Monthly budget is fake.** The heading says “Available budget in {month} {year}” but every transaction is global. Either add a `date` (or `monthKey`) and filter, or change the copy to “Available budget”.
2. **Mobile edit/delete is broken.** Hover-only pencil/trash does not work on touch. Use a tap menu, swipe, or always-visible icons.
3. **Offline fallback page is missing.** `next.config.mjs` points to `/offline`.
4. **PWA icons are missing** from `public/` in this repo, while `manifest.json` and Open Graph tags expect them.
5. **State is duplicated.** `UserView` and `TransactionView` both own the same localStorage list. Lift state once (or a small hook) so add/edit/delete cannot drift.
6. **Amount typing is sloppy.** Store a number, validate input, reject `NaN`.
7. **Name is unused** on the main screen after setup.

## Recommended plan

Work in three layers. Do not skip layer 1.

### Layer 1 — Make v1 solid (do this first)

Goal: the app that already exists should be correct on a phone, offline, and truthful.

- Add `/offline` fallback page.
- Restore or generate PWA icons in `public/`.
- Replace hover actions with touch-friendly edit/delete.
- Shared `useTransactions()` hook + shared `Transaction` type.
- Validate amount; store `number`.
- Either implement month scoping or remove the month claim from the UI.
- Show the account name on `/budget`.
- Confirm before delete (same pattern as reset).

### Layer 2 — Real monthly budgeting (the natural product step)

Goal: Kirabaki becomes a *monthly* companion, which the UI already pretends to be.

- Add `createdAt` (ISO string) on each transaction.
- Filter the dashboard to the current month; keep older months in a simple history.
- Optional: carry leftover *baki* into the next month, or start each month at zero. Pick one and say it in the UI.
- Optional categories later (`needs` / `wants` / `savings` is enough). Do not start with 20 categories.

### Layer 3 — Trust features that still stay local

Goal: users can keep data without a server.

- Export / import JSON (or CSV).
- Optional PIN lock (still local).
- Better empty states and first-transaction hints.
- Fix PWA config (`reactStrictMode`, minify) once offline behavior is verified.

**Do not do yet** unless the product goal changes:

- User accounts / cloud sync
- Bank APIs
- Multi-user households
- Recurring bills engine
- Native iOS/Android rewrite

Those fight the “no sign-in, data on your device” promise.

## Suggested build order

```text
1. Docs (this folder)     ← current step
2. Touch UX + data hook   ← layer 1
3. Offline page + icons   ← layer 1
4. Dates + month filter   ← layer 2
5. Export / import        ← layer 3
```

## Decision rule

If a feature needs a server, ask: “Does this still let someone use Kirabaki with zero account and full offline?”

- Yes → consider it.
- No → it is a different product. Keep it out of this codebase.
