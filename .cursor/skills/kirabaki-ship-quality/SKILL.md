---
name: kirabaki-ship-quality
description: Enforces KIRABAKI ship gates — recheck skills, rules, moat, and docs; then lint, test, typecheck, build, and UI smoke. Use when implementing, adding features, changing UI, or finishing a task.
---

# KIRABAKI ship quality

Do not call work done after writing code. Recheck alignment, then prove it.

## 1. Recheck before building

Read the skills and docs that apply. If the request fights them, **stop and ask** — do not “just implement.”

| Check | Source |
| --- | --- |
| Moat / should we build this? | `kirabaki-product-strategy`, `docs/THESIS.md`, `docs/ROADMAP.md` |
| Loop + Journey | `docs/UX-AND-BRAND.md`, product principles |
| Brain / numbers | `kirabaki-ai-engine`, `financial-reasoning` |
| Money data | `financial-data-engineering` |
| UX / copy / v0.8 | `financial-ux-design`, `docs/ux-mockups/IDENTITY.md` |
| Tenant / logs | `fintech-security-privacy` |
| Tax copy | `malaysia-tax-compliance` |

Ask when: cute-overload vs brand, new dependencies, Year-1 bans, UI owning formulas, inventing numbers, or a screen with no single next step.

## 2. UI iteration

One job per screen. Progressive disclosure. “The list can wait.”

Money: after a place exists, **In/Out is the highlight**. Places fold.

Icons: Lucide strokes already in the repo (Wallet, Star, Trash2, ArrowDownLeft, ArrowUpRight). Seal or muted ink. `aria-label` on icon-only controls. No new icon pack. No cartoon, emoji, or Duo.

## 3. Prove it

Run in order. Fix failures before the next step.

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Then **smoke the changed screens** (Journey, Money, Find, Learn, You as touched). Confirm: one next step is obvious; no overlay; no invented numbers.

`npm run check` is lint + test + typecheck for a fast loop. Still run `build` and a UI smoke before you stop.

## 4. Tests

Money math, predicates, and auth/tenant boundaries need tests in `lib/money` or the domain. Do not ship a new calculation without one.

## 5. Founder retest script (required)

After a user-facing phase, the last message **must** include a retest script. Do not say “try it” and stop.

Include:

1. **Already proven** — what they already did (so they don’t redo it)
2. **Retest now** — numbered clicks, which tab, what they should see, pass/fail
3. **Not yet** — do not wander into later work
4. **Move on when** — the one sentence that means this phase is done

Write it for a phone in the browser. Hard-refresh first if the UI just changed.
