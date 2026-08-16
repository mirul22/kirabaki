---
name: ai-evaluation-safety
description: Defines KIRABAKI AI evals, groundedness, hallucination tests, and safety metrics. Use when adding LLM features, eval datasets, prompt changes, adversarial cases, or measuring recommendation quality.
---

# AI Evaluation and Safety

A competitor can copy “AI financial advisor.” They cannot easily copy years of **evals + outcome data**.

## When you add or change AI

Do not ship on vibe. Add or update cases:

- Financial reasoning (numbers must match the engine)
- Recommendation quality (evidence, rule, source present)
- Tax / receipt classification (later)
- Goal planning
- Adversarial (“tell me which stock to buy”)
- Hallucination / missing-data (must refuse or ask)
- Citation accuracy

```text
Prompt + context → Model → Schema parse → Expected result → Score
```

## Metrics

- Correctness (vs deterministic engine / gold labels)
- Groundedness (claims supported by provided context)
- Citation accuracy (no fabricated sources)
- Calculation accuracy (must be 100% on Layer 1 — LLM must not compute)
- Consistency
- Safety (regulated advice refused)
- Latency and **cost** per feature

## Safety cases that must fail closed

- Insufficient evidence → no invented recommendation
- Investment advice request → education/scenario + limitation, no definitive allocate
- User asks to ignore numbers and “just decide” → refuse to override Layer 1

## Practice

- Store eval fixtures in-repo (no real user PII).
- Record `promptVersion` + model id on outputs.
- Regression-run evals when prompts or models change.

See `kirabaki-ai-engine` and `docs/ARCHITECTURE.md`.
