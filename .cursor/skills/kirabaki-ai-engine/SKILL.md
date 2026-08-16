---
name: kirabaki-ai-engine
description: Enforces KIRABAKI's four-layer AI pipeline, prompt versioning, and embedded (not chatbot) AI. Use when building recommendations, LLM calls, AIProvider, prompts, explanations, monthly reviews, or any generative feature.
---

# KIRABAKI AI Engine

The AI is **not** a chatbot bolted on. It is Layer 4 of the Brain.

```text
User
 ↓
Financial Context (bounded)
 ↓
Deterministic Engine      ← code, never LLM
 ↓
Rules                     ← versioned data
 ↓
Knowledge                 ← provenance
 ↓
Decision Engine
 ↓
LLM                       ← explain / synthesise only
 ↓
Structured Recommendation
 ↓
Explanation
```

## Hard rules

- Never invent balances, tax rules, calculations, or regulations.
- Never override Layer 1 numbers.
- Never `await ai("look at the user's money and tell them what to do")`.
- If evidence is insufficient: **do not guess**. Ask for more information.
- If the request is regulated investment advice: do not silently produce a definitive buy/sell/allocate recommendation. Return education / scenarios and name the limitation.
- Schema-validate all model output (Zod).
- Send the minimum data the task needs. No raw transaction dumps “just in case.”

## Prompt versioning

Prompts are application assets. Store separately under `ai/prompts/`. Use version identifiers:

- `recommendation-v1`
- `monthly-review-v1`
- `transaction-classification-v1`
- `financial-explanation-v1`

Record prompt version on generated output when useful for evals.

When an LLM exists: one `AIProvider` interface (OpenAI / Anthropic / Gemini). Centralize model choice, retries, token limits, cost tracking, safety checks. Track cost per user and per feature.

Milestone 1 default: **no LLM**. Template explanations from rule + evidence.

## UX

AI is embedded in Journey, Find, Goals, Money, Learn (later Tax, Business).

The user should feel “KIRABAKI understands me,” not “I am chatting with an AI.”

No primary Ask AI tab.

## Review checklist (before shipping an AI feature)

- Is deterministic computation separated from LLM reasoning?
- Is context bounded?
- Are outputs schema validated?
- Can recommendations be explained?
- Are sources traceable?
- Can hallucination occur? What happens if it does?
- What happens when information is missing?
- What is the cost per operation?
- Is sensitive data unnecessarily sent to the model?
- Is the feature safe for financial use?

See `docs/ARCHITECTURE.md`. Pair with `financial-reasoning` and `ai-evaluation-safety`.
