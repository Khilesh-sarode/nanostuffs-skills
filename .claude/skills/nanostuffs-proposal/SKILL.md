---
name: nanostuffs-proposal
description: Turns discovery-call notes, an RFP or a requirements list into a Nanostuffs proposal or SOW with scope, assumptions, a phased effort estimate, team, timeline and exclusions. Use when asked to write a proposal, SOW, estimate, quotation or pre-sales response for a client.
---

# Nanostuffs Proposal Builder

Produces a proposal in the Nanostuffs house format from whatever the user provides: call notes, an RFP, an email thread or a requirement list.

## Workflow

1. **Extract requirements.** List every requirement as a numbered line (R1, R2 …). Mark each as Functional, Integration, Non-functional or Out of scope.
2. **Flag gaps.** Anything ambiguous goes into an "Open questions" list. Do not guess numbers that the client must supply (user counts, data volumes, SLAs).
3. **Estimate bottom-up.** Follow `reference/estimation-guide.md`. Break each requirement into tasks, estimate in person-days per role, then roll up by phase.
4. **Write the proposal.** Fill `templates/proposal-template.md` section by section. Keep the executive summary under 120 words.
5. **Self-check before returning:**
   - Every requirement R# appears in scope or in exclusions — none silently dropped
   - Phase totals add up to the grand total
   - Assumptions cover hosting, third-party licences, client-side dependencies and UAT duration
   - No internal cost rates or margins appear in the document

## Rules

- Write as Nanostuffs ("we"), never "the vendor".
- Default stack unless the client specifies: React / React Native, Node.js, PostgreSQL or MongoDB, hosted on the client's cloud (Azure, AWS or GCP).
- Express effort in person-days and calendar weeks. Do not add pricing unless the user gives rates.
- Do not add "generated on" dates or timestamps.

## Output

A Markdown proposal following the template. If the user asks for Word or PDF, convert the finished Markdown with the matching document skill.
