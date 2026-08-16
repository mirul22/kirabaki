# KIRABAKI Design 0.5 — First return

Written before any production UI. Visual exploration history. **Design System v0.8 is now locked** — see [IDENTITY.md](./IDENTITY.md). Tokens are still **not** copied into `app/` until engineering starts.

Open the clickable study: [warm-intelligent/index.html](./warm-intelligent/index.html).

Directions B and C are documented here so the three-way study exists. They are **not** mocked in HTML.

---

## 1. Current UI audit

Inspected: `app/layout.tsx`, `app/(onboarding)/page.tsx`, `app/get_started/page.tsx`, `app/budget/page.tsx`, `components/UserView.tsx`, `components/TransactionView.tsx`, `components/SummaryView.tsx`, `components/AddTransactionView.tsx`, `components/ResetView.tsx`, `app/globals.css`, `components/ui/*`, `lib/utils.ts`.

The running product is a **client-only budget list**. Home is `/budget`. Source of truth is `localStorage`. There is no Journey, Find, Learn, You, recommendation surface, or health language.

### Keep later (not used in this mock pass)

| Asset | Why |
| --- | --- |
| shadcn primitives in `components/ui/` | Rebuild on top after tokens lock |
| `cn` and `formatNumber` in `lib/utils.ts` | Shared helpers |
| Sonner, lucide-react | Toasts and icons |
| PWA foundation | Manifest, Apple web-app meta, `@ducanh2912/next-pwa` |
| Vercel hosting / Analytics | Deploy; events only — never amounts |

### Do not preserve visually

| Pattern | Why it fails v2 |
| --- | --- |
| `bg-neutral-950` / slate-on-black body | Reads as a generic dark banking tool |
| Giant leftover budget as the hero | Dashboard-first, not Journey-first |
| Income / expense as green / red chips | Stock-terminal status language |
| Hover-only pencil / trash | Unusable on a phone PWA |
| Sticky `PlusCircle` add | No primary Next Move |
| Onboarding: “no sign-in / data stays on device” | Conflicts with v2 memory + trust |
| Inter + default shadcn slate tokens | No KIRABAKI identity |
| `ResetView` as a raw icon | Feels like a debug tool, not a product |

v2 is a **product redesign**. Working add/edit/list behaviour can be re-expressed later under Money; the visual language should not be extended.

---

## 2. Current UX problems

1. Home answers “what is left this month?” instead of “where am I, where next, what should I do?”
2. No path, Next Move, findings, lessons, goals, or explainable health.
3. Phone-hostile: hover edit/delete, small reset control, no five-tab IA, no safe-area nav.
4. Red / green is the only status system — easy to read as shame or a terminal.
5. No personality, no progress, no “KIRABAKI found something.”
6. Empty and error states are absent or generic.
7. Month label implies monthly budgeting; the list is unscoped.
8. Feels like a dark admin list, not a smart friend.

---

## 3. KIRABAKI v2 UX principles

1. **Journey is home.** One purpose, one primary visual, one Next Move.
2. **Progress over dashboards.** The loop is KNOW → UNDERSTAND → FIND → PLAN → DECIDE → ACT → CHECK → IMPROVE.
3. **Discovery, not alerts.** KIRABAKI FOUND feels like *I noticed something*. Red is for truly critical issues only.
4. **Never shame.** Health is language (Healthy, Getting stronger, Needs attention, Building momentum, On track, Off track) — not “42/100.”
5. **Numbers come from the engine.** UI never invents live recommendations. Mock copy is labeled **Preview data**.
6. **Mobile-first.** 44px-class targets, no hover-only actions, PWA safe areas.
7. **Personality without Duo.** Kira is geometric and sparing. Momentum is not XP. Streaks are meaningful actions, never app opens.
8. **Every screen answers:** Why am I seeing this? What should I do? What happens next?

---

## 4. Brand direction recommendations

**Personality:** intelligent, friendly, optimistic, curious, playful, trustworthy, modern, calm. Never childish, never patronizing, never judgmental.

**Spoken promise:** *Don’t worry. We’ll figure this out together.*

**Avoid:** navy banking blue, generic fintech green, Duolingo green, gray terminals, stock-art people, cute-overload, credit-score rings.

**Type (pass 3):** Bricolage Grotesque for UI (modern, a bit of character). Fraunces italic only for health words. Jakarta / Inter / all-serif journal are out.

**Shape:** Soft product radii, not lined paper and not 999px AI pills.

**Color philosophy (pass 3):** Warm white `#FFF7F0`, clay `#E85A3C`, tide `#0E4A48`. Indigo dropped (Stripe / Finpersona). Manila + chili dropped (too stationery).

**Passes so far:** 1 = generic AI-finance. 2 = too paper. 3 = clay + tide (two accents). 4 = Izuddin method — see [STUDY-TAUBAT.md](./STUDY-TAUBAT.md).

**Recommendation:** Confirmed. Locked as Design System v0.8 — [IDENTITY.md](./IDENTITY.md). Refine from here.

---

## 5. Three visual directions

Only **A** is built as HTML. B and C stay as a written comparison so the founder can still reject A.

### A — Warm Intelligent (mocked, pass 3)

Warm white `#FFF7F0` + clay `#E85A3C` + tide `#0E4A48`. A living product, not a notebook and not an AI twin.

**How it should feel on each surface**

| Surface | Intent |
| --- | --- |
| Landing / home | Dated like a letter. Stamp, not a mascot. |
| Journey | Drawn trail + one weekly note |
| Next Move | Margin note + “Take a look” — not a feature card |
| KIRABAKI Found | Numbered notices, no alert icons |
| Goal progress | Thin ink fill, not a KPI widget |
| Financial health | Italic sentence, not a pill or score |
| Lesson | Short essay, 60–180s, one question |
| Navigation | Five words. Chili when active. No sparkle icons. |
| Buttons | Ink / chili rectangles, not pills |
| Empty | “Let’s start building your financial picture.” + CTA |
| Success | “You looked. That’s the work.” |

### B — Fresh Growth (not mocked)

Soft cream + **deep violet** + mint + a **yellow** accent. More “morning light / new growth.” Risk: yellow + mint can slide toward generic wellness or fintech-green adjacent if overused. Use if A feels too indigo-product.

### C — Playful Premium (not mocked)

Off-white + dark charcoal + **electric violet** + coral. Higher contrast, more night-editorial. Risk: can read as a consumer brand splash or a crypto card if charcoal dominates. Use if A feels too soft.

---

## 6. Proposed navigation and information architecture

Mobile-first. **Five tabs only.**

| Tab | Job | Not this |
| --- | --- | --- |
| **Journey** | Home. Path, health language, one Next Move, findings preview, recent progress, a small lesson | Dashboard, Insights |
| **Money** | Accounts, this-month story, net worth — simple first, detail on drill-in | Spreadsheet, Reports |
| **Find** | KIRABAKI FOUND — ranked discoveries | Alert center, Analytics |
| **Learn** | 60–180s lessons tied to the user’s situation | Blog, textbook |
| **You** | Profile, identity, goals, preferences, privacy, export/delete | Enterprise Settings |

No primary Ask AI, Budget, Goals, Investments, Tax, or Statistics tab. Those live inside the five.

```text
Journey ──► Next Move ──► Act (Money / commitment)
   │              └──► Find (review)
   └──► Learn (60–180s)

Money ──► account / month detail (later)
You   ──► goals, preferences, export, delete
```

---

## 7. Proposed design system outline

Preview tokens live only in [warm-intelligent/tokens.css](./warm-intelligent/tokens.css). Do not copy into `app/globals.css` until the founder confirms.

| Token group | Role |
| --- | --- |
| Color | Cream canvas, indigo action, coral energy, mint outcome, charcoal text, surface cards |
| Typography | Plus Jakarta Sans; display / title / body / caption / tabular numbers |
| Spacing | 4px base; 16 / 24 / 32 page rhythm |
| Radius | 12 / 20 / 28 / full |
| Shadow | Warm, low, rare |
| Motion | ~180ms; respect `prefers-reduced-motion` |
| Breakpoints | Phone-first (390); desktop = studio frame, not stretched cards |
| Components (later) | JourneyPath, ProgressNode, NextMove, FindingCard, FinancialHealth, GoalProgress, MomentumIndicator, LessonCard, KiraCharacter, ActionButton, CelebrationState, EmptyState, FriendlyError, FinancialSnapshot, BottomNavigation, TopBar, BottomSheet, ProgressRing, Sparkline, RecommendationCard |

All future production components must consume these tokens — no one-off hex in screens.

---

## 8. Implementation sequence (after mockups are confirmed)

1. **Lock tokens** from `tokens.css` into the real theme (CSS variables). Still no Brain work.
2. **Journey screen** in Next.js against placeholder recommendation props (Zod-shaped, labeled preview until the engine exists).
3. **Reusable components** listed above, token-only.
4. **Milestone 1 engineering** — auth, workspace, `lib/money`, rules, recommendations — per [MILESTONE-1.md](../MILESTONE-1.md).

Out of this design pass: auth, Postgres, live engine, Momentum as a shipped system, sound, directions B/C HTML, replacing `/budget`.

---

## How to try the mockups

1. Open [warm-intelligent/index.html](./warm-intelligent/index.html) in a browser (desktop studio + phone frame).
2. Or open `journey.html` / `find.html` / `learn.html` / `money.html` / `you.html` full-bleed on a phone.
3. On Journey, use **Preview states**: Filled / Empty / After Next Move.

Numbers and Next Move copy are **preview data**. A recommendation engine would supply them later. Do not treat them as live KIRABAKI output.
