---
name: project-handover-brief
description: Creates a handover brief for a codebase, POC or project so another developer or a coding agent can continue the work without a walkthrough — purpose, architecture, setup, key files, decisions, known issues and next tasks. Use when asked for a handover document, onboarding notes, a project brief for a new developer, or context for Claude Code or another agent.
---

# Project Handover Brief

Writes the document you would want on day one of joining a project.

## Workflow

1. **Read the project.** Scan README, package.json / requirements, folder structure, env examples, main entry points, and recent git history if available.
2. **Identify the essentials:**
   - What the project does and for whom (2–3 lines)
   - Architecture: components and how they talk to each other
   - How to run it locally (exact commands)
   - Environment variables (names only, never values)
   - Key files and what each one owns
   - Important decisions and why (look at comments, commit messages, docs)
   - Known issues, tech debt, TODOs
   - Next 3–5 tasks in priority order
3. **Write two outputs:**
   - `HANDOVER.md` — for a human developer, using the section order above
   - `CLAUDE.md` — a short version for coding agents: build/test commands, code conventions, files not to touch, and how to verify a change

## Rules

- Never copy secrets, keys or tokens into the brief — list variable names only.
- Prefer exact commands and file paths over descriptions.
- If you cannot verify something by reading the code, mark it "to confirm".
- Keep `CLAUDE.md` under 150 lines; agents read it on every task.
