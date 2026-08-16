# KIRABAKI Agent Skills

Cursor **Rules** stay always-on and short. **Skills** load when the work is in that domain. Do not dump the entire thesis into every chat.

```text
.cursor/rules/          always-on principles
.cursor/skills/         domain workflows (auto-discovered)
docs/                   human source of truth
```

The moat is not “we have AI.” It is this combination, which skills must preserve:

1. Structured financial knowledge
2. Deterministic financial reasoning
3. Longitudinal financial memory / Twin
4. Decision → action → outcome history
5. Evaluation datasets over time
6. Malaysia regulatory / tax knowledge
7. UX people actually return to
8. Security / privacy for highly sensitive money data

## Rules (always on)

| Rule | Path |
| --- | --- |
| Architecture | `.cursor/rules/architecture.mdc` |
| Coding standards | `.cursor/rules/coding-standards.mdc` |
| Security baseline | `.cursor/rules/security-baseline.mdc` |
| Product principles | `.cursor/rules/product-principles.mdc` |

## Skills now (P0 + P1)

| Priority | Skill | When to use |
| --- | --- | --- |
| P0 | `kirabaki-product-strategy` | New features, scope, “should we build X?”, roadmap, feature creep |
| P0 | `kirabaki-ai-engine` | LLM, prompts, recommendations, AIProvider, explanations |
| P0 | `financial-reasoning` | Calculations, net worth, cashflow, scenarios, `lib/money` |
| P0 | `knowledge-engineering` | Books, principles, rules from knowledge, citations, RAG |
| P1 | `financial-data-engineering` | Snapshots, Twin, transactions, imports, idempotency |
| P1 | `financial-ux-design` | Journey, Find, Learn, copy, design system, brand |
| P1 | `ai-evaluation-safety` | Evals, hallucination, groundedness, adversarial cases |
| P1 | `fintech-security-privacy` | Authz, PII, logs, LLM payloads, export/delete |
| P1 | `malaysia-tax-compliance` | LHDN, tax rules, reliefs, official sources, versioning |

Agents should auto-invoke from context. You can also `@` a skill by name.

## Deferred (P2 — no SKILL.md yet)

| Skill | When to add |
| --- | --- |
| `sme-accounting-intelligence` | Phase 9 — Business Health, P&L explanation |
| `lhdn-myinvois` | Phase 8 — own skill, do not mix into tax |

## How layers map

```text
KNOWLEDGE          → knowledge-engineering
REASONING          → financial-reasoning
DATA / TWIN        → financial-data-engineering
AI ENGINE          → kirabaki-ai-engine + ai-evaluation-safety
UX                 → financial-ux-design
STRATEGY           → kirabaki-product-strategy
TRUST              → fintech-security-privacy + malaysia-tax-compliance
```

## Authoring rules

- Project skills only under `.cursor/skills/<name>/SKILL.md`
- Keep each skill focused (~80–200 lines). Deep thesis stays in `docs/`
- Do not add generic React/Next skills
- Do not create 20 skills — context noise
- New skill only if a phase actually starts (MyInvois, SME)

## Related

- [THESIS.md](./THESIS.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [UX-AND-BRAND.md](./UX-AND-BRAND.md)
