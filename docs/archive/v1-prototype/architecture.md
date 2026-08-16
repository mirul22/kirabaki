# Architecture

Kirabaki is a **client-only Next.js 14 App Router** app. React components read and write `localStorage` directly. There is no API route, database, or auth layer.

```text
Browser
  └── Next.js pages (client components)
        └── localStorage
              ├── account_name
              └── transactions[]
```

## Stack

| Layer | Choice | Why it fits |
| --- | --- | --- |
| Framework | Next.js 14.1 (App Router) | Routing, metadata, Vercel deploy |
| UI | React 18 + TypeScript | Typed components |
| Styling | Tailwind CSS + shadcn/ui (Radix) | Fast, consistent mobile UI |
| Toasts | Sonner | Confirm reset, success/error |
| IDs | `@paralleldrive/cuid2` | Unique transaction ids without a server |
| PWA | `@ducanh2912/next-pwa` | Installable + offline caching |
| Analytics | Vercel Analytics + Speed Insights | Usage events only, not financial data |
| Hosting | Vercel | Matches the current `kirabaki.vercel.app` metadata |

PWA is **disabled in development** (`disable: process.env.NODE_ENV === "development"`). Production builds register a service worker and cache frontend navigations.

## Folder map

```text
app/
  layout.tsx                 Root shell, fonts, metadata, toasts, analytics
  globals.css                Tailwind + shadcn tokens
  (onboarding)/page.tsx      `/` — first-run walkthrough
  get_started/page.tsx       `/get_started` — name setup
  budget/page.tsx            `/budget` — main money screen
components/
  UserView.tsx               Loads transactions, then renders TransactionView
  TransactionView.tsx        List + edit/delete + add dialog
  AddTransactionView.tsx     Create / update dialog
  SummaryView.tsx            Income, expenses, remaining balance
  ResetView.tsx              Wipe localStorage and return home
  ui/                        shadcn primitives (button, dialog, input, …)
lib/
  utils.ts                   `cn()` and `formatNumber()`
public/
  manifest.json              PWA name, icons, standalone portrait mode
docs/                        Product and engineering docs
```

## Routes

| Path | File | Role |
| --- | --- | --- |
| `/` | `app/(onboarding)/page.tsx` | Onboarding. If `account_name` exists, redirect to `/budget`. |
| `/get_started` | `app/get_started/page.tsx` | Capture name. If already set, redirect to `/budget`. |
| `/budget` | `app/budget/page.tsx` | Dashboard: reset, month label, summary, transactions. |
| `/offline` | **missing** | Referenced in `next.config.mjs` as the PWA document fallback. |

The route group `(onboarding)` does not appear in the URL. It only groups the landing page.

## Component tree on `/budget`

```text
BudgetPage
  ├── ResetView
  ├── month / year heading
  └── UserView
        └── TransactionView
              ├── SummaryView
              ├── transaction rows (edit / delete)
              └── AddTransactionView
```

`UserView` currently reloads `transactions` from localStorage but never passes that list down. `TransactionView` loads the same key again. That duplication is the main state-management smell.

## Persistence

All writes go through `localStorage`:

- `localStorage.setItem("account_name", name)`
- `localStorage.setItem("transactions", JSON.stringify(list))`
- `localStorage.clear()` on reset

There is no shared store (Context, Zustand, etc.). Each view is a small client island.

## PWA and installability

`public/manifest.json` configures:

- standalone display
- portrait orientation
- dark theme (`#0A0A0A`)
- start URL `/`

`app/layout.tsx` also sets Apple web-app metadata so it can be added to an iOS home screen.

`next.config.mjs` points offline document fallback to `/offline`, but that page is not in the repo. A production offline miss will not have a custom fallback screen until that route exists.

## Analytics events

Vercel Analytics is used for product events, not money amounts:

- `Return user` — existing `account_name` on `/`
- `Add Account` — name saved on `/get_started`
- `Add Transaction` — both create and update (the update path reuses the same event name)

## Known technical gaps

- `reactStrictMode` and `swcMinify` are turned off in the PWA wrapper.
- Transaction `amount` is stored as a string (`toFixed(2)`) but typed as `number`.
- `AddTransactionView` has an unused `use` import.
- Manifest icons (`kirabaki-*.png`) are referenced but not present in `public/` in this checkout (only `manifest.json` and `vercel.svg` are).
- Hover-only edit/delete will not work well on touch devices.
