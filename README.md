# KIRABAKI

**Your financial intelligence system.**

KIRABAKI understands your financial life, learns from trusted financial knowledge, finds problems and opportunities, builds your roadmap, recommends what to do next, and checks whether you are actually improving.

> Tell me what is happening with my money, why it matters, what I should do, and whether I am actually getting better.

Not a tracker. Not a ChatGPT wrapper. Not a tax app.

## Docs (Phase 0)

Product thesis, architecture, UX/brand, agent skills, and Milestone 1 brief:

**→ [docs/README.md](./docs/README.md)**

Start with [docs/THESIS.md](./docs/THESIS.md). Experience: [docs/UX-AND-BRAND.md](./docs/UX-AND-BRAND.md). Locked look: [docs/ux-mockups/IDENTITY.md](./docs/ux-mockups/IDENTITY.md).

## Current status

| Layer | Status |
| --- | --- |
| Phase 0 docs | Done |
| Design System v0.8 | Locked — cream + charcoal + coral |
| Running app | Next.js 16 + React 19 PWA; v2 auth/workspace live; `/budget` is still the v1 list |
| Milestone 1 (SaaS + Brain + Journey) | Slice 1 in progress — auth + workspace |

v2 direction: **SaaS from day 1** (Auth + Postgres + Drizzle + workspaces), **PWA from day 1**, **Journey-first UX** (not a banking dashboard). No native apps until MVP is proven.

## Run locally (Milestone 1)

```bash
cp .env.example .env
# set BETTER_AUTH_SECRET (openssl rand -base64 32)
docker compose up -d
npm install
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The v1 localStorage budget list is still at `/budget`.

## Name

*Kira* (calculate) + *baki* (balance / leftover) — Malay roots, global ambition: a financial intelligence layer for people and small businesses.
