---
name: hono
description: Guidance for building and reviewing Hono apps using official docs and runtime-specific best practices.
---

# hono

Use this skill to implement, refactor, and review Hono-based services with a docs-first approach grounded in `https://hono.dev/llms.txt` and the linked Hono documentation indexes.

## When to use

- The user asks for Hono API/server work (routing, middleware, validation, context, error handling, or testing).
- The project imports Hono packages (for example `hono`, `@hono/*`) or uses runtime adapters for Workers, Bun, Deno, Node.js, Vercel, Netlify, or AWS Lambda.
- You need to choose or configure Hono middleware/helpers (CORS, JWT, logger, secure headers, streaming, websocket, etc.).
- You are asked to migrate or modernize an HTTP service to Hono.

## Reference documentation

- `./references/core.md` - Hono core patterns (routing, context, validation boundaries, errors).
- `./references/middleware-and-helpers.md` - Built-in middleware and helper selection guide.
- `./references/runtimes-and-testing.md` - Runtime-specific setup notes and request-level testing patterns.

## Instructions

1. Confirm the runtime target first (Cloudflare Workers, Bun, Deno, Node.js, etc.) and follow runtime-specific Hono guidance before writing code.
2. Prefer Web Standards primitives (`Request`, `Response`, `fetch`) and Hono's `Context` APIs over framework-specific abstractions.
3. Keep route trees explicit and composable:
   - Group related routes with sub-app mounting.
   - Keep middleware scope narrow by attaching it at the smallest practical route prefix.
4. Validate inputs at boundaries (params, query, headers, body) and return consistent error responses with clear status codes.
5. Use built-in middleware/helpers before custom implementations when they fit (for auth, CORS, compression, request IDs, security headers, streaming, cookies, etc.).
6. Preserve type safety end-to-end:
   - Type route params and request/response payloads.
   - Keep handler return types predictable.
   - Prefer patterns that improve RPC/client inference when applicable.
7. For performance-sensitive paths:
   - Avoid unnecessary JSON parsing/stringification.
   - Keep middleware chains minimal.
   - Use streaming/caching patterns where helpful.
8. Add or update tests for changed behavior (unit/integration, plus request-level tests using Hono testing helpers where available).
9. When uncertain about API shape or middleware behavior, consult Hono docs from the `llms.txt` index in this order:
   - `llms-small.txt` for quick core recall.
   - `llms-full.txt` for API details.
   - Specific docs pages for runtime or middleware nuances.
10. Match the existing project's style and deployment model; avoid introducing unrelated architecture changes.

## Output expectations

- Provide runnable code aligned to the project's runtime adapter.
- Include minimal setup changes required for local dev/build/deploy.
- Call out any runtime-specific caveats (for example, edge/runtime API constraints).
- Suggest verification steps (`test`, `lint`, local run command) after code changes.
