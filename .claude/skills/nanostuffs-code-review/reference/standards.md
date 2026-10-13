# Nanostuffs engineering standards (React, React Native, Node.js)

## Security — Blocker if violated
- No secrets, API keys or tokens in code or committed `.env` files
- All SQL / MongoDB queries parameterised; no string-built queries
- Validate and sanitise all request input (zod, joi or express-validator)
- Auth middleware on every non-public route; check authorisation, not only authentication
- JWT: verify signature and expiry; never trust decoded payload without verification
- Salesforce / third-party OAuth: handle token refresh and revoked tokens
- React Native: sensitive data in Keychain/Keystore (e.g. react-native-keychain), not AsyncStorage

## Correctness and error handling
- Every `async` call awaited or deliberately handled; no floating promises
- Express: errors passed to a central error handler; no swallowed `catch {}` blocks
- External API calls have timeouts and retry/backoff where safe
- API responses use a consistent shape and correct HTTP status codes

## Performance
- No N+1 queries; batch or join instead
- Pagination on list endpoints
- React: avoid unnecessary re-renders (stable keys, memo for heavy lists); FlatList, not ScrollView, for long lists in React Native
- Images optimised and cached in mobile apps

## Structure
- Business logic in services, not in route handlers or React components
- Components under ~200 lines; extract hooks for reusable logic
- One responsibility per module; no circular imports

## Naming and style
- camelCase for variables/functions, PascalCase for components/classes, UPPER_SNAKE for constants
- Meaningful names; no single-letter names outside short loops
- TypeScript: no `any` without a comment explaining why
