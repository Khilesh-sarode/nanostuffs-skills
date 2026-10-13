# Estimation guide

Estimate bottom-up: requirement → tasks → person-days per role. Never estimate a whole module in one number.

## Baseline effort (person-days, one developer)

| Item | Simple | Medium | Complex |
|---|---|---|---|
| CRUD screen (web or mobile) | 1 | 2 | 4 |
| Dashboard / report screen | 2 | 4 | 7 |
| REST API endpoint with validation | 0.5 | 1 | 2 |
| Third-party integration (REST, documented) | 3 | 5 | 10 |
| Salesforce integration (OAuth/JWT, objects) | 5 | 8 | 15 |
| SSO (SAML / Azure AD) | 3 | 5 | 8 |
| LLM / RAG feature (prompting, retrieval, evals) | 5 | 10 | 20 |
| Offline sync (React Native) | 5 | 10 | 15 |

## Overheads to add on top of build effort

| Activity | Add |
|---|---|
| Project management | 10–15% |
| QA and test cases | 20–25% |
| UI/UX design | 10–20% (more for consumer apps) |
| DevOps, environments, CI/CD | 5–10% |
| Contingency | 10–15% |

## Calendar time

Calendar weeks = (total person-days ÷ team size ÷ 5) + 1 week UAT buffer per phase. Round up.
