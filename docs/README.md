# KIRABAKI Docs

Source of truth for product thesis, architecture, and build briefs.

**KIRABAKI is a financial intelligence system** — not a tracker, not a ChatGPT wrapper, not a tax app.

Promise: *Tell me what is happening with my money, why it matters, what I should do, and whether I am actually getting better.*

## Start here

| Doc | What it covers |
| --- | --- |
| **[STATUS.md](./STATUS.md)** | **Living board — done, current phase, milestone, gate, next** |
| [THESIS.md](./THESIS.md) | Problem, KIRABAKI, north star, first proof, risks |
| [VISION.md](./VISION.md) | Promise, Brain, moats, flywheels, Journey-first experience |
| [UX-AND-BRAND.md](./UX-AND-BRAND.md) | UX thesis, nav, no-shame copy, Momentum, v0.8 lock |
| [ux-mockups/IDENTITY.md](./ux-mockups/IDENTITY.md) | Design System v0.8 — locked look and voice |
| [prompts/UI-UX-MASTER-PROMPT.md](./prompts/UI-UX-MASTER-PROMPT.md) | Paste-ready Cursor design exploration prompt |
| [AGENT-SKILLS.md](./AGENT-SKILLS.md) | Rules vs skills, P0/P1 map, deferred MyInvois/SME |
| [ICP-AND-GTM.md](./ICP-AND-GTM.md) | ICP 1–3, positioning, unvalidated pricing, KPIs |
| [ROADMAP.md](./ROADMAP.md) | Phases 0–11, Design 0.5, gates, do-not-build |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, modular monolith, 4-layer Brain, security |
| [DOMAIN-MODEL.md](./DOMAIN-MODEL.md) | Entities, tenancy, recommendations, memory |
| [PLATFORM-AND-SCALE.md](./PLATFORM-AND-SCALE.md) | PWA-first, native gate, scale ladders |
| [MILESTONE-1.md](./MILESTONE-1.md) | First coding brief — five-tab PWA loop |
| [MILESTONE-2.md](./MILESTONE-2.md) | Monthly memory — see the months |
| [AUDIT.md](./AUDIT.md) | v1 prototype snapshot (historical) |

## Archive

v1 prototype docs (localStorage budget list): [archive/v1-prototype/](./archive/v1-prototype/)

## Current codebase status

See **[STATUS.md](./STATUS.md)**. Short version: Milestone 1 is closed. Milestone 2 is monthly memory on Journey. Gate 1 passed. v1 `/budget` is leftover.

```bash
npm install
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Tester: `npm run db:seed-tester`.
