# Platform and Scale

PWA is the mobile product from day one. Native apps wait until the personal MVP is proven **and** a gate says the PWA is the bottleneck.

If a future idea is not on this map, add it here **before** writing code for it.

## Why PWA first

- ICP #1 already lives in Chrome/Safari on a phone
- One codebase: web + installable app + desktop
- Matches RM0–500 and “prove the thesis”
- v1 already chose PWA; v2 keeps that surface and fixes it
- Account + server become the sync layer (phone and laptop, same workspace)

## Distribution path

```text
Now through MVP
  → PWA on HTTPS
      → Android install prompt
      → iOS Add to Home Screen
      → Desktop install

After MVP + real wall
  → Android TWA (Play listing) if GTM needs it
  → Capacitor only if a store/OS API is required

Last resort
  → True native apps
```

## Native / store gate

All must be true before native or store wrappers:

1. Personal PWA MVP is done (Financial Home + Brain loop + founder uses weekly)
2. Gate 4 or Gate 5 (people keep it or pay)
3. A **written** PWA limitation is blocking retention (iOS install friction, push reliability, store distribution) — not “apps feel more real”

Until then, store listings and native code are distractions.

## PWA maturity ladder

Do **not** build the whole ladder in Milestone 1.

| Stage | What |
| --- | --- |
| **M1 baseline** | Valid manifest (`standalone`, theme `#0A0A0A`, maskable 192/512 icons in `public/`), service worker, `/offline` page, Apple web-app meta, touch-first UI, safe-area padding, installable on Android; iOS via Add to Home Screen. Mutations require network. Honest “you’re offline” state. |
| **After Gate 1** | Cache last Financial Home snapshot for offline *read*. Still no offline writes. |
| **After Discipline** | Optional Web Push for check-ins (VAPID). iOS 16.4+ only; best-effort; never the only reminder path. |
| **After paid / multi-device pain** | Queue small writes with background sync; last-write-wins is enough. |
| **Never in year 1 unless forced** | CRDTs, offline-first as source of truth, custom sync protocol. Server remains source of truth. |

## SaaS + PWA contract

- Postgres is the system of record (memory, decisions, snapshots)
- The PWA is the client: installable, fast, works on bad train Wi-Fi
- Offline = last snapshot + queued intent later — **not** a second database of record
- Replaces v1 “everything in localStorage” without giving up “app in my pocket”

## Known PWA limits

- iOS: no automatic install prompt; storage can be evicted; Web Push limited
- Hover patterns fail on touch — fatal bug in v1; never ship hover-only actions
- Service worker can serve stale shells — version the SW
- Auth cookies must survive “Add to Home Screen” / standalone
- Do **not** promise “works fully offline like v1” — v2 needs the server for memory

Onboarding must teach iOS Add to Home Screen. Do not “fix” this with an App Store build in month 2.

---

## Possibility and scale map

Each axis: **now** / **next gate** / **later**. Design for extensibility; build only what the current gate needs.

### 1. Users

| Now | Next | Later | Much later |
| --- | --- | --- | --- |
| 1 founder | 20 → 100 (Vercel + Neon free/low) | 1k–10k (Neon paid, pooling, cron for FIND/reviews) | 10k+ (replicas, worker for OCR/MyInvois, still modular monolith) |

Do not split microservices for user count. Split a **worker** when a job is slow or independently failing (OCR, e-Invoice).

### 2. Product surface (six products, one identity)

| Now | Next | Later |
| --- | --- | --- |
| Personal + thin Brain | Advisor, Discipline, FIND | Tax → MyInvois → Business → Professional → Intelligence API |

Same `User`, many `Workspace`s. Professional = membership on client workspaces.

### 3. Data and memory

| Now | Next | Later |
| --- | --- | --- |
| Monthly snapshots; transactions indexed by `workspaceId` + date | Recurring, categories, stored goal projections | Receipts in object storage (never bytea); pgvector only if retrieval is proven slow |

Partition/archive old transactions only after a real size problem. **Financial memory is the retention moat.**

### 4. Compute and AI

| Now | Next | Later |
| --- | --- | --- |
| Deterministic engine in-request; rules in Postgres; no LLM | Scheduled monthly review (one queue abstraction) | AI gateway (OpenAI/Anthropic/Gemini), cost per user/feature, prompt versions |

FIND must not recompute the universe on every home load at 1k users — incremental + snapshot.

### 5. Devices and distribution

| Now | Next | Later | Last |
| --- | --- | --- | --- |
| Responsive PWA (phone primary) | Install prompts, offline read | Android TWA / Capacitor if proven need | Native rewrite if measured retention gap |

### 6. Multi-device and sync

| Now | Later |
| --- | --- |
| Account = sync; last-write-wins; no fancy conflict UI | Simple conflict UI if two devices edit same row; still no CRDT |

### 7. Tenancy and professional scale

| Now | Later |
| --- | --- |
| One user, one personal workspace, `owner` | Personal + business workspaces; `advisor` role; always filter by `workspaceId` |

### 8. Geography and regulation

| Now | Next | Later |
| --- | --- | --- |
| `jurisdiction: MY`, MYR, PDPA-minded (export/delete designed) | Versioned tax/knowledge rows | New country = rule pack + currency, not a fork |

Red line: no licensed investment advice in the core app.

### 9. Money and billing

| Now | Next | Later |
| --- | --- | --- |
| Free, founder-only | Prices stay unvalidated | Stripe + plan entitlements after Gate 5; AI cost caps before paid LLM |

### 10. Reliability and security

| Day-1 design | Later |
| --- | --- |
| Tenant isolation, Zod, no money in logs/analytics, audit, secrets, export/delete | Rate limits, backups, SOC-ish hygiene for Professional/Enterprise; signed URLs for receipts |

### 11. Knowledge moat

| Now | Later |
| --- | --- |
| 8–15 founder-written principles | Versioned sources, more rules, outcome feedback into which rules work |

Do not start Neo4j or a custom graph DB.

---

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ROADMAP.md](./ROADMAP.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
