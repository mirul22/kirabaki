# Repository Audit (v1 → v2)

Snapshot of the existing KIRABAKI prototype before the SaaS rebuild. Prototype docs archived at [archive/v1-prototype/](./archive/v1-prototype/).

## Summary

Current KIRABAKI is a **client-only Next.js 14 PWA**. No API, no database, no auth. Source of truth is `localStorage`.

```text
Browser pages → localStorage
                  ├── account_name
                  └── transactions[]
```

No migration of localStorage data into v2. The prototype has no history worth keeping.

## Routes

| Path | File | Role |
| --- | --- | --- |
| `/` | `app/(onboarding)/page.tsx` | 3-slide onboarding; redirects to `/budget` if `account_name` exists |
| `/get_started` | `app/get_started/page.tsx` | Capture display name |
| `/budget` | `app/budget/page.tsx` | Summary + transaction list |
| `/offline` | **Missing** | Referenced in `next.config.mjs` PWA fallback |

## Data model (v1)

Transaction: `{ id, type, name, amount }`

- No date, category, account, or month
- Amount stored as string (`toFixed(2)`) but typed as number
- “Available budget in {month} {year}” is cosmetic — list is unscoped

## Component tree (`/budget`)

```text
BudgetPage
  ├── ResetView          (localStorage.clear)
  └── UserView
        └── TransactionView
              ├── SummaryView
              ├── rows (hover-only edit/delete)
              └── AddTransactionView
```

`UserView` and `TransactionView` both reload the same `transactions` key — duplicated state.

## Current UX problems (v1)

- Minimal budget number + income/expense rows — no journey, no next action
- Dark near-black UI reads as a generic finance/banking tool, not a companion
- Hover-only edit/delete — unusable on a phone PWA
- No personality, no progress path, no findings, no lessons
- Onboarding promises “no sign-in” (conflicts with v2 SaaS memory)
- Month label implies monthly budgeting but data is unscoped
- Inter + slate/neutral tokens — no distinct KIRABAKI brand

v2 must **not** preserve this visual language. Keep shadcn primitives; replace the product feel. See [UX-AND-BRAND.md](./UX-AND-BRAND.md).

## Reuse (keep)

| Asset | Why |
| --- | --- |
| shadcn primitives under `components/ui/` | Rebuild on top; do not keep the dark banking look |
| Tailwind setup | Restyle with new tokens after Design 0.5 |
| `lib/utils.ts` (`cn`, `formatNumber`) | Helpers |
| Sonner toasts, lucide-react | UX |
| PWA foundation | Repair and keep as mobile product: `public/manifest.json`, `@ducanh2912/next-pwa`, Apple web-app meta in `app/layout.tsx` |
| Vercel hosting | Deploy |
| Vercel Analytics | **Events only** — never balances, income, or goals |

## Replace (do not extend)

| Asset | Why |
| --- | --- |
| All `localStorage` persistence | No financial memory / multi-device |
| `UserView`, `TransactionView`, `AddTransactionView`, `SummaryView`, `ResetView` | Prototype budget UI |
| Onboarding copy promising “no sign-in” | Conflicts with SaaS trust contract |
| Client-only source of truth | Brain + snapshots need Postgres |

## Technical debt to leave behind

- Hover-only edit/delete (unusable on phones)
- Duplicated transaction state
- Amount as string
- Missing `/offline` page
- Missing PWA icons in `public/` (manifest references files not present)
- `reactStrictMode` / `swcMinify` disabled in PWA wrapper
- No shared TypeScript domain types
- Analytics event `Add Transaction` reused for updates

## Identity change (product)

| v1 sold | v2 sells |
| --- | --- |
| No account; data never leaves the device | Account for financial memory and decision history |
| Privacy = local-only | Privacy = tenant isolation, no money in logs, export/delete |

Document this honestly in onboarding when M1 ships.

## Stack today vs target

| | v1 | v2 (M1) |
| --- | --- | --- |
| Auth | None | Better Auth |
| DB | localStorage | Postgres + Drizzle (Neon) |
| Math | Inline in views | `lib/money` pure functions |
| Advice | None | Rules + knowledge + recommendations |
| Mobile | Broken PWA intent | PWA baseline required |
| Native apps | N/A | Forbidden until MVP + native gate |

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
- [archive/v1-prototype/](./archive/v1-prototype/)
