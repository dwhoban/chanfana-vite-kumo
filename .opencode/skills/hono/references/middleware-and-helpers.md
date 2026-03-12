# Hono Middleware and Helpers Reference

## Middleware Selection

Prefer official middleware before custom implementations when possible.

Common built-ins:

- `cors` for cross-origin controls.
- `logger` for request logging.
- `secureHeaders` for baseline security headers.
- `requestId` for traceability.
- `timeout` for long-running handler control.
- `compress` and `etag` for response optimization.

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());
app.use("*", secureHeaders());
```

## Middleware Scope

- Prefer narrow scope (`/api/*`) over global (`*`) unless truly cross-cutting.
- Apply auth and rate limits to protected prefixes only.
- Order middleware intentionally (request ID/logging first, auth before handlers).

## Auth Options

- Use `basicAuth` for simple internal endpoints.
- Use `bearerAuth` or `jwt` for token-based APIs.
- Keep secret material in environment bindings, not inline constants.

## Useful Helpers

- `cookie` helper for consistent cookie read/write.
- `stream` helpers for streaming responses.
- `proxy` helper for upstream passthrough patterns.
- `testing` helpers for request-level tests.

## Anti-Patterns

- Re-implementing CORS/auth manually when built-ins satisfy requirements.
- Attaching expensive middleware globally without need.
- Returning inconsistent error shapes across routes.
