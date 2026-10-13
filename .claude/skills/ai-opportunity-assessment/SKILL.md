---
name: ai-opportunity-assessment
description: Produces a prioritised AI opportunity assessment for a company or department — use cases scored on business impact, feasibility and data readiness, with quick wins and a phased roadmap. Use when asked to find AI use cases, assess AI opportunities, prepare for an AI discovery call, or write an AI brief for a prospect.
---

# AI Opportunity Assessment

Turns research or discovery notes about a company into a scored, prioritised list of AI use cases.

## Workflow

1. **Profile the company.** Industry, size, business model, key departments, systems in use (ERP, CRM, Salesforce, SAP …). If web tools are available, research the company's website, annual report and recent news. Cite sources.
2. **Map the value chain.** List the main departments or processes (e.g. Sales, Field force, Supply chain, Finance, HR, Customer support, Engineering).
3. **Generate use cases.** For each process, propose 2–5 use cases. Each needs: title, problem today, AI approach (RAG, agent, document extraction, forecasting, computer vision, conversational/WhatsApp, etc.), systems touched, users.
4. **Score each use case** with `reference/scoring-rubric.md`.
5. **Prioritise.** Sort by total score. Label the top 3–5 with Impact ≥ 4 and Feasibility ≥ 4 as **Quick wins**.
6. **Roadmap.** Group into Phase 1 (0–3 months, quick wins), Phase 2 (3–6 months), Phase 3 (6–12 months).

## Output format

1. Company snapshot (5 lines max)
2. Use-case table: # · Use case · Department · AI approach · Impact · Feasibility · Data readiness · Total
3. Quick wins — one paragraph each: problem, solution, expected outcome
4. Phased roadmap
5. Questions to ask in the next call

## Rules

- Be specific to the company. "Chatbot for customers" is not a use case; "WhatsApp order-status assistant for dealers, reading from SAP" is.
- Do not invent metrics about the company. Mark estimates as estimates.
- Where Nanostuffs has a ready asset (Nano AI RAG, WhatsApp BSP, React Native field apps), note it as an accelerator.
