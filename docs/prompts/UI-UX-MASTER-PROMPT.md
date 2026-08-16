# KIRABAKI v2 — UI/UX, Brand & Product Experience Master Prompt

**Archive.** Design System v0.8 is locked (`docs/ux-mockups/IDENTITY.md`). Do not paste this to start a new visual exploration. Use it only to understand how we got here.

---

Historical prompt below. Do not implement the full app from this file.

---

## Role

Act as the lead product designer, UX architect, brand designer, and senior frontend engineer for KIRABAKI.

KIRABAKI is a financial intelligence product being rebuilt from a basic localStorage budgeting PWA into a modern, friendly, intelligent financial operating system. The current app is too basic and dashboard-oriented. The new KIRABAKI must feel like a completely new product.

Read first: `docs/UX-AND-BRAND.md`, `docs/THESIS.md`, `docs/VISION.md`, `docs/AUDIT.md`, `docs/MILESTONE-1.md`. Inspect `app/` and `components/` before proposing UI.

## Core product philosophy

KIRABAKI is NOT a traditional finance/banking application.

Do not design it like: a bank, an accounting system, Bloomberg, a spreadsheet, a traditional budgeting app, a tax portal, or a corporate SaaS dashboard.

The emotional experience should be closer to: Duolingo’s ease and motivation, modern consumer apps, Notion’s clarity, premium wellness/productivity apps, modern educational products.

**DO NOT COPY DUOLINGO’S VISUAL IDENTITY.** Do not copy Duo, green branding, XP, hearts, exact layouts, illustrations, icons, animations, typography, or components.

Borrow only the product principles: guided progression, clear next action, small wins, visible progress, personality, friendly feedback, delightful micro-interactions, approachable learning, habit formation, simplicity, strong visual hierarchy.

KIRABAKI must have its own identity.

Thesis: **financial management should feel like personal growth, not financial administration.**

Spoken promise: “Don’t worry. We’ll figure this out together.”

## Emotional goal

Users should feel: calm, curious, encouraged, understood, motivated, in control, slightly excited to see what KIRABAKI found.

They must NOT feel: intimidated, judged, overwhelmed, like they opened a bank or accounting system, or like they need to understand finance before using the product.

Brand personality: intelligent, friendly, optimistic, curious, playful, trustworthy, modern, calm, occasionally humorous. Never childish, never patronizing, never judgmental.

Think: “A very smart friend who happens to be excellent with money.”

## Core loop

The entire UX supports:

`KNOW → UNDERSTAND → FIND → PLAN → DECIDE → ACT → CHECK → IMPROVE`

Do not make the dashboard the center. Make the user’s progress and **Next Move** the center.

## Primary navigation

Mobile-first. Five tabs only:

1. **Journey** — home / financial path
2. **Money** — accounts, transactions, net worth (simple first, detail on drill-in)
3. **Find** — KIRABAKI FOUND (discovery, not alerts)
4. **Learn** — 60–180s lessons tied to the user’s situation
5. **You** — profile, goals, preferences, privacy

Do not create a primary “Ask AI” tab. AI is embedded in Journey, Find, Money, Learn, and goals.

Do not use Dashboard, Analytics, Reports, Statistics, Insights, Budget, Goals, Investments, Tax, or Settings as separate primary tabs.

## Journey

Answers: Where am I? Where am I going? What should I do next? What progress have I made?

Do NOT show a wall of financial metrics.

Personalized path (adapt to the user; do not force beginner steps on a wealthy user), conceptually:

Foundation → Emergency Fund → Financial Stability → Major Goals → Wealth Building → Financial Freedom

Suggested home structure: friendly greeting, current financial state, main goal, progress visualization, **one** Next Move, KIRABAKI Findings, recent progress, small learning moment, optional secondary information.

**Next Move** is the most important CTA. Example shape: title, why (real numbers from the engine), impact, “Let’s do it”. Recommendations come from the KIRABAKI recommendation engine. **Do not hardcode recommendations. Do not invent financial numbers.**

Financial Health must not look like a credit score. Use language: Healthy, Getting stronger, Needs attention, Building momentum, On track, Off track. The score must be explainable.

## Money

Approachable progressive disclosure. No dense tables as the default.

## Find — KIRABAKI FOUND

Proactive discoveries: spending anomalies, recurring increases, opportunities, goal drift, debt concerns, missing information, positive progress.

Feel like discovery, not an alert center. Avoid red-warning-heavy UI.

Example tone: “Your subscriptions increased RM86/month. That’s RM1,032/year if unchanged. You don’t need to cancel anything. Just review whether these are still useful.” CTA: Review.

## Learn

Connect knowledge to the user’s actual situation. Short, visual, interactive. Large type, simple examples, progressive disclosure, micro-questions. Avoid giant paragraphs and textbook layouts. Goal: useful in 60–180 seconds.

## You

Profile, financial identity, goals, preferences, commitments, progress, settings, privacy, data controls. Not an enterprise settings page.

## Brand direction (exploration values — not final)

Do NOT use generic banking blue, generic fintech green, or Duolingo green.

Starting palette:

- Primary `#635BFF`
- Coral `#FF8066`
- Mint `#55D6BE`
- Cream `#FFF9F0`
- Charcoal `#202124`
- Soft surface `#F4F2EE`

Color communicates emotion and hierarchy. Red = critical issues only. Green = meaningful positive outcomes only. Use brand colors for progress, actions, navigation, learning, discoveries. Financial status must not look like a stock terminal.

Typography: modern highly readable sans; friendly, premium, limited type scale; numbers important but not dominating every screen.

Shapes: generous rounded corners, soft geometry, large touch targets, intentional whitespace. Cards must have purpose. Do not put every fact in a card.

## Visual hierarchy

Every screen: one primary purpose, one primary visual, one primary action. No five competing CTAs.

## Gamification

Reward: reviews, saving goals, commitments, reducing unnecessary expenses, learning, documenting receipts, tax prep, completing plans, improving health.

Do NOT reward: spending, speculative trading, leverage, risk-taking, investing more for its own sake.

Use **Financial Momentum** — not XP. Streaks = meaningful actions (e.g. 4-week review streak), never “opened the app 14 days.” Never punish a missed day.

## Character

Explore a simple geometric companion (working name **Kira**). Memorable, expressive, slightly playful, not childish, not Duo. States: welcoming, thinking, curious, celebrating, concerned, sleeping, discovering, encouraging. Use sparingly — not on every screen.

Illustration: minimal vector, rounded geometry, lots of whitespace. Avoid stock art, corporate 3D, generic fintech people, childish cartoon overload.

## Micro-interactions

Short, purposeful: goal completion, progress, recommendation done, lesson done, discovery, monthly review cards. Never delay the user. Respect `prefers-reduced-motion`. Do not animate everything.

## Sound

Do not implement sound. Design so optional sound can be added later. Always optional.

## Copy

Simple, conversational, short, encouraging, concrete numbers, clear actions.

KIRABAKI **never shames** the user.

- Not “You overspent again.” → “This month went a little differently.”
- Not “Budget failed.” → “Your plan changed. Let’s adjust it.”
- Not “Your finances are unhealthy.” → “There’s one area worth improving.”
- Not “Financial health: 42/100.” → “Your finances need a little attention.”

Tone: smart friend who understands money. Not a bank, accountant, motivational speaker, or annoying AI. Playful is OK; on debt/tax/stress stay calm and respectful.

Empty states: never “No data.” → “Let’s start building your financial picture.” + CTA.

Errors: “Something went wrong while updating this.” + Try again. Optional technical detail for support.

Loading: “Thinking through your numbers…” / “Looking for opportunities…” — not generic “Loading…” everywhere.

Every screen answers: Why am I seeing this? What should I do? What happens next?

## Charts

Only when they answer a question. Prefer simple line, progress path, before/after, sparkline. No pie-chart walls, 3D, or Bloomberg density.

## Mobile-first

Design core experience for phone. Desktop expands context; do not stretch desktop cards onto mobile. Large touch targets. PWA-ready (safe areas, no hover-only actions).

## Accessibility

Contrast, readable text, keyboard, focus states, reduced motion, screen-reader labels, touch targets. Color is never the only indicator.

## Engineering design rule

Do not hardcode visual styles independently in every component. Use centralized design tokens (colors, typography, spacing, radius, shadow, motion, breakpoints) — CSS variables / theme tokens.

Do not invent financial numbers. Do not hardcode Next Move copy as if it were live engine output — use clearly labeled placeholder data that a recommendation engine would supply.

## Before coding

Inspect the existing KIRABAKI application. Identify components worth keeping (shadcn primitives, `cn`, `formatNumber`) vs outdated UI (dark banking budget list, hover-only edit/delete). Do NOT preserve the old visual language merely because it exists. Treat v2 as a product redesign. Do not destroy working functionality without understanding it. Do not implement auth/Postgres in this design pass.

## First return (required before any implementation)

Produce these artifacts in the reply (docs and/or lightweight static previews — founder decides next):

1. Current UI audit
2. Current UX problems
3. KIRABAKI v2 UX principles (short)
4. Brand direction recommendations
5. **Three visual directions** — do not pick a winner:
   - **A — Warm Intelligent:** cream + indigo + coral (friendly, premium, approachable) — founder’s likely favourite
   - **B — Fresh Growth:** soft cream + deep violet + mint + yellow accent
   - **C — Playful Premium:** off-white + dark charcoal + electric violet + coral
6. For each direction demonstrate: landing/home, Journey, Next Move, KIRABAKI Found, goal progress, financial health, lesson, navigation, buttons, empty state, success state
7. Proposed navigation and information architecture
8. Proposed design system outline
9. Implementation sequence after the founder picks

**Do NOT immediately choose one direction. Do NOT implement the entire product. Wait for the founder to pick.**

## After the founder chooses (only then)

1. Complete KIRABAKI Design System (tokens)
2. Implement the primary Journey screen
3. Then reusable components: JourneyPath, ProgressNode, NextMove, FindingCard, FinancialHealth, GoalProgress, MomentumIndicator, LessonCard, LessonProgress, KiraCharacter, ActionButton, CelebrationState, EmptyState, FriendlyError, FinancialSnapshot, BottomNavigation, TopBar, BottomSheet, ProgressRing, Sparkline, RecommendationCard

All components use KIRABAKI design tokens.

## Final quality bar

Before considering the redesign complete, ask:

- Does KIRABAKI feel like a banking app? If yes → redesign.
- Does it feel like an accounting system? If yes → redesign.
- Does it feel like a generic AI dashboard? If yes → redesign.
- Does it feel like a spreadsheet? If yes → redesign.
- Does it feel childish? If yes → redesign.
- Does it feel like a friendly, intelligent product that helps someone grow financially? If no → redesign.

The final emotional reaction should be: **“Oh, this is different.”** then **“Okay, what should I do next?”**
