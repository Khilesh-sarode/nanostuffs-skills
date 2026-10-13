---
name: incident-rca
description: Writes a root cause analysis (RCA) for a production incident from logs, chat threads, emails or notes — timeline, impact, root cause, fix, and prevention actions with owners. Use when asked for an RCA, post-mortem, incident report, or an explanation of a production outage or failure.
---

# Incident RCA

Produces a clear, blameless RCA that a client stakeholder and an engineer can both read.

## Workflow

1. **Collect facts.** From the material provided, extract every timestamped event. Convert all times to IST unless the user says otherwise.
2. **Build the timeline.** Detection → investigation → mitigation → resolution. One line per event.
3. **Quantify impact.** Duration, affected users or transactions, affected modules. Use "unknown" rather than guessing.
4. **Find the root cause with 5 Whys.** Keep asking "why" until you reach a cause that, if fixed, prevents recurrence. Separate:
   - **Trigger** — what started it (e.g. a Salesforce OAuth policy change)
   - **Root cause** — why the system was vulnerable (e.g. no token-refresh handling)
   - **Contributing factors** — what made it worse or slower to detect
5. **Actions.** Immediate fix (done) and preventive actions (to do), each with an owner role and a target date if known.
6. Fill `templates/rca-template.md`.

## Rules

- Blameless: describe systems and processes, not individuals.
- Plain language in the summary; technical detail in the root-cause section.
- If the cause is external (third-party API change, cloud provider), still list what we will change on our side.
- If information is missing, list it under "Open items" instead of assuming.
