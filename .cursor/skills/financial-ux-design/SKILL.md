---
name: financial-ux-design
description: Applies KIRABAKI Journey-first UX, no-shame copy, Momentum, and Warm Intelligent brand. Use when designing or implementing UI, navigation, Journey, Find, Learn, copy, design tokens, or components.
---

# Financial UX Design

KIRABAKI is **not** a banking dashboard.

Thesis: financial management feels like **personal growth**, not financial administration.

Full spec: `docs/UX-AND-BRAND.md`. Locked look: `docs/ux-mockups/IDENTITY.md` (Design System **v0.8**).

## Enforce

- Nav: **Journey | Money | Find | Learn | You**
- Screen jobs: Journey = where am I going? Money = where is my money? Find = what should I know? Learn = what should I understand? You = what am I working toward?
- Journey is home. One **Next Move**. KIRABAKI FOUND is **discovery**, not alerts. Cue: “KIRABAKI found…”
- **Find shows the open finding only.** Do not dump old rule titles (“Nothing stayed”, “Add a bank or wallet”) as a list — those read as homework. What they already did lives on Journey.
- No primary Ask AI tab. AI is embedded. Never advertise `KIRABAKI AI™`.
- Mobile-first, touch-first, no hover-only actions. Desktop may breathe sideways — not a dashboard.
- Progressive disclosure on Money: the **Picture** is always visible once a place exists — own, owe, net, this month in/out/kept. That is the living statement, not an Excel grid.
- **Read first.** Hairline statement rows (name left, amount right). The only card that earns a dark fill is Next Move.
- **Mutations stay behind Edit / Done** (remove, change, star, add own/owe, goal fields). Do not put trash, pencil, or Save on every row in view mode.
- One next step may stay visible: Next Move, or a single “Add in or out” text on Money. Never a column of icons.
- Hide Save when nothing changed. `quiet_good` has no Okay button — a quiet link to the picture is enough.
- Do not hide own/owe in a fold. “No spreadsheet-first UI” means no 40-column grid. It does not mean hide the financial life.
- After a place exists, a single **Add in or out** text expands the form. The statement stays above.
- Icons: Lucide strokes already in the repo. Seal or muted. Labeled. No new pack, no cartoon, no emoji.
- Learn: 60–180s, tied to user data.
- Momentum (not XP). Streaks = meaningful actions, not app opens. Out of M1 scope.
- Presence: path + seal-dot only. Not a mascot. Not Duo. Not on every surface.
- **v0.8 is locked.** Refine (alive, not colorful). Do not restyle from scratch.

## Voice to protect

These lines are brand. Prefer this register over ledger language:

- Some of it stayed.
- That’s the sentence. The list can wait.
- The emergency fund grew. That’s why this month feels stronger.
- Three things. None of them a warning.
- This pace is fine. Not a race.
- A buffer, not a score.
- Those subscriptions crept up.

Human categories on Find (Recurring, Quiet good, Incomplete) — not database labels. Sometimes the smartest next move is “Do nothing. You’re okay.”

## Product copy (check every screen)

Write like a calm professional. Not a pitch deck. Not a model talking about itself.

**Never put in the UI:**

- Positioning slogans: “not a tracker”, “not a chat window”, “not a ChatGPT wrapper”
- Engineering: slice, engine, prototype, tenant, workspaceId
- Thesis dumps of the full company promise
- Cute/AI phrasing: “What should we call you?”, “One moment…”, “start your picture”, “left the picture”
- Roadmap on screen: “not in this version”, “for now”, “more later”, “we’ll add password next”

Those lines belong in docs. On screen, say the useful thing in plain language.

Do not show a primary action that does nothing. If nothing changed, hide Save — do not leave a dead button.

## Never shame

| Never | Prefer |
| --- | --- |
| “You overspent.” | “This month went a little differently.” |
| “Budget failed.” | “Your plan changed. Let’s adjust it.” |
| “Financial health: 42/100.” | “Your finances need a little attention.” / “The emergency fund grew.” |

Health language: Healthy, Getting stronger, Needs attention, Building momentum, On track, Off track. **No giant health score in the UI.**

## Visual lock (v0.8)

Warm cream `#F7EFE4` + night `#12141A` + seal `#E04A30`. Discovery card `#2A2420` (warm, not alert-black). Inter everywhere; mono only for amounts. Amounts always use grouping and two decimals (`1,000.00`, `10,000.00`, `100,000.00`, `1,000,000.00`) in the statement and in forms.

Do **not** add indigo, mint, or purple. Do **not** “make it more fun” with gradients, blobs, confetti, badges, or cartoon Kira.

## Visual bans

Navy banking blue, generic fintech green, Duolingo green, gray terminal dashboards, red/green everywhere, cute-overload, credit-score rings.

## Quality bar

If it feels like a bank, accounting system, AI dashboard, spreadsheet, children’s app, or a magazine with no companion → fix the *life*, not the palette.

Target: “Oh, this is different.” then “Okay, what should I do next?”

Do not invent financial numbers in UI. Next Move comes from the recommendation engine.
