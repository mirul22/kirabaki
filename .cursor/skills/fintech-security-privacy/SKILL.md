---
name: fintech-security-privacy
description: Enforces KIRABAKI data classification, tenant isolation, logging bans, and minimal LLM payloads. Use when touching auth, workspaces, logs, analytics, file uploads, export/delete, or sending data to AI providers.
---

# Fintech Security and Privacy

Financial information is **HIGHLY_SENSITIVE**. This is boring until someone loses data.

## Classification

| Class | Examples |
| --- | --- |
| PUBLIC | Marketing copy, public docs |
| INTERNAL | Architecture, non-user metrics |
| SENSITIVE | Email, workspace membership |
| HIGHLY_SENSITIVE | Balances, transactions, goals, receipts, tax IDs, bank data |

## Rules

- Encryption in transit; secrets in env only.
- Authorization + **tenant isolation** on every read/write (`workspaceId`).
- Audit who/what/when — no raw secrets or full ledgers in the audit row.
- **Never put financial information into logs** or analytics payloads.
- **Never send more user data to an LLM than the task requires.**
- Signed URLs for receipt files (when that phase exists). Least privilege.
- Export and delete: user can leave with their data and erase the workspace.
- Backups exist; deletion must be honored in product policy (document retention).
- Client must not receive other tenants’ data. Do not expose unused financial fields “for convenience.”

## AI providers

Treat the model vendor as a subprocesser. Minimize fields. No account numbers, IC numbers, or full statement dumps unless a later feature explicitly requires them and the user consented.

See `.cursor/rules/security-baseline.mdc` and `docs/ARCHITECTURE.md`.
