---
name: malaysia-tax-compliance
description: Requires versioned Malaysian tax and regulatory facts from official sources only. Use when implementing tax rules, reliefs, LHDN guidance, e-Invoice concepts, SC/BNM references, or any MY tax copy.
---

# Malaysia Tax and Compliance

Malaysian tax information must come from **authoritative sources** and must be **versioned**.

Never: “I remember Malaysian tax is…”

## Official sources (priority)

- LHDN (Inland Revenue Board)
- Ministry of Finance
- Securities Commission Malaysia
- Bank Negara Malaysia
- Official government gazettes / guidelines

Do not treat blogs, forums, or model memory as law.

## Every tax rule must carry

| Field | Why |
| --- | --- |
| Source | URL or official document id |
| Effective date | When it started |
| Expiry / replacement | When it stopped or was superseded |
| Jurisdiction | `MY` (and state if relevant) |
| Version | `TaxRuleVersion` |
| Applicability | Who it applies to |
| Exceptions | Who it does not |
| Confidence | Official vs interpretive |

LHDN specifications change (e.g. e-Invoice guideline updates). **Version, do not hardcode forever.**

## Product rules

- AI **suggests** tax category / relevance. Rules **validate**. **User confirms.**
- Never present AI interpretation as authoritative.
- Education and organisation are in-scope later; automated filing advice is not M1.
- Specific investment advice remains out of scope (SC licensing). See `docs/VISION.md`.

## Do not mix

MyInvois API workflows belong in a future `lhdn-myinvois` skill (Phase 8), not this file.

M1: do not implement tax automation. You may name versioned fields in docs/schema comments only.

See `docs/ARCHITECTURE.md` (Tax / MyInvois future contract) and `docs/ROADMAP.md` Phase 7–8.
