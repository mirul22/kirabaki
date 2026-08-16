# KIRABAKI UX and Brand

> KIRABAKI should make financial management feel like **personal growth** rather than **financial administration**.

This is the experience source of truth. Engineering Brain rules stay in [ARCHITECTURE.md](./ARCHITECTURE.md). Visual direction is **locked at Design System v0.8** — refine, do not restyle. Spec: [ux-mockups/IDENTITY.md](./ux-mockups/IDENTITY.md).

## Design thesis

Traditional finance apps say: *Here are your numbers. Good luck.*

KIRABAKI says: *Come on, let’s figure out your money together.*

| Traditional finance | KIRABAKI |
| --- | --- |
| Dashboard of balances, bills, reports | **Journey** — where am I, where next |
| “Ugh, I need to manage my finances.” | “Okay, what’s next?” |
| Spreadsheet / bank / Bloomberg | Guided path + one Next Move |
| Shame and red alerts | Calm discovery |

Borrow **Duolingo product psychology**, not Duolingo visuals:

1. **Small progress** — improve one thing this week, not “become wealthy”
2. **Guided path** — here’s what matters next, not 20 dashboards
3. **Visible progress** — you’re here → you’re heading there
4. **Personality** — “Nice. You stayed under your food target.”
5. **Celebration of healthy behaviour** — never celebrate spending
6. **Low fear** — “Hey, we found something worth looking at,” not “WARNING”

**Do not copy** Duo, green branding, XP, hearts, layouts, illustrations, icons, animations, or typography.

## Emotional goal

On open, the user should feel: calm, curious, encouraged, understood, motivated, in control, slightly excited to see what KIRABAKI found.

They must **not** feel: intimidated, judged, overwhelmed, like they opened a bank, an accounting system, or a product that requires finance literacy first.

Spoken promise: *Don’t worry. We’ll figure this out together.*

## Brand personality

Intelligent, friendly, optimistic, curious, playful, trustworthy, modern, calm, occasionally humorous.

Never childish, never patronizing, never judgmental.

Think: **a very smart friend who happens to be excellent with money.**

Friendly ≠ childish. KIRABAKI deals with debt, tax, family, and stress. Tone stays calm and respectful on serious topics.

## Core loop (UX must serve this)

```text
KNOW → UNDERSTAND → FIND → PLAN → DECIDE → ACT → CHECK → IMPROVE
```

Progress and **Next Move** are the center. The dashboard is not.

## Navigation (mobile-first)

Five tabs only:

| Tab | Job |
| --- | --- |
| **Journey** | Home. Path, health language, one Next Move, findings, recent progress, a small lesson |
| **Money** | Accounts, transactions, income, expenses, assets, liabilities, net worth — simple first, detail on drill-in |
| **Find** | KIRABAKI FOUND — discovery, not an alert center |
| **Learn** | 60–180s lessons tied to the user’s situation |
| **You** | Profile, goals, preferences, privacy, data controls |

**No primary “Ask AI” tab.** AI is embedded in Journey, Find, Money, Learn, goals — never the product itself.

Do not promote Dashboard, Analytics, Reports, Statistics, Insights, Budget, Goals, Investments, Tax, or Settings as top-level tabs. Those live inside the five.

## Journey (home)

Answers: Where am I? Where am I going? What should I do next? What progress have I made?

Do **not** show a wall of metrics.

Conceptual path (personalized, not a fixed beginner ladder):

```text
Foundation → Emergency Fund → Financial Stability → Major Goals → Wealth Building → Financial Freedom
```

A wealthy user must not be shown beginner steps.

**Layout:** greeting → current state → main goal → progress visualization → one **Next Move** → KIRABAKI Found → recent progress → small learning moment → optional secondary numbers.

**Next Move** is the most important CTA. It comes from the recommendation engine — never hardcoded in the UI. It answers what, why, evidence, impact if they do nothing, and the next action.

## KIRABAKI FOUND

Signature discovery surface. Feels like *I noticed something*, not *ALERT*.

Show: what changed, why it matters (concrete numbers), a calm suggestion, one CTA (Review / Let’s look).

Avoid red-warning-heavy interfaces. Reserve red for truly critical issues only.

## Learn

Short, visual, interactive. Connect a principle to **this user’s** numbers.

Not a blog. Not a textbook. Goal: learn something useful in 60–180 seconds.

## Money

Approachable progressive disclosure. Simple answer first; tables only when the user asks for detail. No dense financial tables as the default.

After one place exists, **this month (in / out)** is the primary surface. Places sit in a fold — the list can wait. Icon-only actions use quiet Lucide strokes (not cartoon, not a new pack).

## You

Human, not an enterprise settings dump. Profile, financial identity, goals, preferences, commitments, progress, privacy, export/delete.

## Gamification (careful)

Reward healthy behaviour only: reviews, staying within a plan, emergency savings, cutting unused recurring costs, documenting receipts, tax prep, learning, completing goals, deliberate decisions.

**Never reward:** spending, trading more, leverage, risk-taking, “invest more” for its own sake, compulsive checking.

### Momentum (not XP)

**Financial Momentum** = consistent healthy behaviour. Example: “Financial Momentum +12” / “4-week Momentum.” Never tied to money spent or investment risk.

### Streaks

Not “opened the app 14 days.”

A **Financial Streak** is meaningful actions (weekly review, savings commitment, goal action). Never punish a missed day.

**Momentum and streaks are out of Milestone 1 engineering.** Design them here; ship after Journey + Next Move work.

## Presence — not a mascot

KIRABAKI’s character is a **tiny presence**: a path stroke ending in a seal dot. Not a face. Not Duo. Not a cartoon on every screen.

Later it can shift by context (Journey noticing, Find looking, Learn taking in, Completed settled). Optional animation. Personality, not decoration.

Do not put Kira/Duo-style characters all over the UI. That would ruin the v0.8 foundation.

## Visual direction (locked — v0.8)

**Warm cream + charcoal + coral.** Editorial, human, slightly playful, premium, calm. Does not scream fintech. Do not add indigo, mint, or purple because an earlier exploration mentioned them.

| Token | Hex | Role |
| --- | --- | --- |
| Bone | `#F7EFE4` | Page |
| Night | `#12141A` | Tab bar, deep surfaces |
| Discovery | `#2A2420` | Next Move card — warm, not alert-black |
| Ink | `#16141A` | Text |
| Seal | `#E04A30` | The only saturated brand color |
| Seal-soft | `#FBE0D8` | Quiet highlight |
| Sand | `#E2DDD4` | Quiet surfaces |

Banned: navy banking blue, generic fintech green, Duolingo green, Stripe indigo, gray terminal dashboards, red/green everywhere, cute-overload, “make it more fun” blobs/confetti.

Typography: **Inter** for UI and headlines. **JetBrains Mono** only for amounts. Text is the primary interface — a briefing, not a chart wall.

Layout: generous whitespace + narrow focused column on mobile. Desktop may breathe horizontally (Journey + Found) without becoming a dashboard. Cards only when they earn their keep.

Wordmark: `KIRABAKI` + a quiet descriptor (`financial intelligence` / `your financial companion`). Never `KIRABAKI AI™`. Intelligence is felt, not advertised.

## Motion and sound

Micro-animation with purpose: path filling, presence mark shifting, quiet Moments (“Nice.” / “That’s one step further.”), sequential monthly-review cards. Short, never blocking, never confetti. Respect `prefers-reduced-motion`.

Sound: not MVP. Optional later (action, milestone, discovery, lesson). Always off by default.

## Copy / no-shame rule

KIRABAKI **never shames** the user. Financial shame makes people avoid the app.

| Never | Prefer |
| --- | --- |
| “You overspent again.” | “This month went a little differently.” |
| “Your finances are unhealthy.” | “There’s one area worth improving.” |
| “You failed your goal.” | “Your plan changed. Let’s adjust it.” |
| “Budget violation.” | “This month went differently.” |
| “Financial health: 42/100.” | “Your finances need a little attention.” / Getting stronger / On track |

Health language: Healthy, Getting stronger, Needs attention, Building momentum, On track, Off track — **not** a credit-score vibe.

Tone: smart friend. Not a bank, accountant, motivational speaker, or annoying AI.

Protect this voice. It is part of the brand:

- “Some of it stayed.”
- “That’s the sentence. The list can wait.”
- “The emergency fund grew. That’s why this month feels stronger.”
- “Three things. None of them a warning.”
- “This pace is fine. Not a race.”
- “A buffer, not a score.”
- “Those subscriptions crept up.”

Philosophy in one breath: **a buffer, not a score. The list can wait. None of them a warning. This pace is fine. Not a race.**

Human interpretation of data, not ledger labels. “Where it sits” not “Account balances.” Next Move is **discovery** (“KIRABAKI found…”), not a warning. Sometimes the next move is “Do nothing. You’re okay.”

No giant financial-health score in the UI. The model can exist underneath. The user sees “the emergency fund grew,” not `78/100`.

Empty: never “No data.” → “Let’s start building your financial picture.” + CTA.

Errors: never raw stack traces. “Something went wrong while updating this.” + Try again.

Loading: “Thinking through your numbers…” / “Looking for opportunities…” — not generic “Loading…” everywhere.

Every screen answers: Why am I seeing this? What should I do? What happens next?

## Mobile vs desktop

**Mobile-first.** One primary action, large targets, one thing at a time.

Desktop: more context, side-by-side, deeper analysis later. Do not stretch desktop cards onto a phone.

## Accessibility

Contrast, readable type, keyboard, focus, reduced motion, screen-reader labels, 44px-class touch targets. Color is never the only indicator.

## Charts

Only when they answer a question (“Is net worth improving?”). Simple line, progress path, before/after, sparkline. No pie-chart walls, 3D, or Bloomberg density.

## Quality bar (must pass)

If it feels like a bank, accounting system, generic AI dashboard, spreadsheet, or a children’s app → redesign.

Target reaction: *“Oh, this is different.”* then *“Okay, what should I do next?”*

## Design sequence (v0.8 locked)

Stop exploring new visual directions. Next work is **alive, not colorful**:

1. Next Move loop (explain → Do it / Later / Not relevant)
2. Finding → Keep / Pause / Cancel → remember
3. Goal Twin (path + pace + “what if”)
4. Learn tied to the user’s numbers
5. Monthly reflection
6. Then tokens into `app/` + Journey in Next.js + Milestone 1

Related mockups: [ux-mockups/IDENTITY.md](./ux-mockups/IDENTITY.md), [ux-mockups/warm-intelligent/index.html](./ux-mockups/warm-intelligent/index.html).

## Related

- [prompts/UI-UX-MASTER-PROMPT.md](./prompts/UI-UX-MASTER-PROMPT.md)
- [MILESTONE-1.md](./MILESTONE-1.md)
- [AGENT-SKILLS.md](./AGENT-SKILLS.md)
- Skill: `.cursor/skills/financial-ux-design/`
