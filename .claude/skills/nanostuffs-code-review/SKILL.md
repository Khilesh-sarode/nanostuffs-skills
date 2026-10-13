---
name: nanostuffs-code-review
description: Reviews React, React Native and Node.js code changes against Nanostuffs engineering standards — security, error handling, performance, structure and naming — and returns findings ranked by severity with suggested fixes. Use when asked to review code, a pull request, a diff or a branch in a React, React Native or Node.js project.
allowed-tools: Read Grep Glob Bash(git diff *) Bash(git log *)
---

# Nanostuffs Code Review

## Workflow

1. **Get the change.** If no files are named, run `git diff main...HEAD` (or the base branch the user gives). Read each changed file in full, not only the diff.
2. **Check against `reference/standards.md`,** in this order: Security → Correctness → Error handling → Performance → Structure → Style.
3. **Verify before reporting.** For every finding, re-read the code and confirm it is real. Drop anything speculative.
4. **Report.**

## Report format

For each finding:

- **Severity:** Blocker / Major / Minor / Nit
- **File:line**
- **Problem** — one sentence
- **Fix** — a code snippet when helpful

End with a one-line verdict: *Approve*, *Approve with minor changes*, or *Changes required*.

## Rules

- Rank by severity; Blockers first.
- Do not report formatting issues that a linter or Prettier would catch.
- Praise is optional and goes in one line at the end, not between findings.
