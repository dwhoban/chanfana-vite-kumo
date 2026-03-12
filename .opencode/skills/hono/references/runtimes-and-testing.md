# Hono Runtimes and Testing Reference

## Runtime-First Decisions

Confirm runtime before coding because adapter details differ.

Targets commonly include:

- Cloudflare Workers / Pages
- Bun
- Deno
- Node.js
- AWS Lambda / Lambda@Edge
- Vercel / Netlify

Use the corresponding Hono getting-started docs for setup, entrypoints, and deploy config.

## Runtime Caveats Checklist

- Edge runtimes: avoid Node-only APIs unless polyfilled.
- Node runtimes: ensure fetch/Web API compatibility assumptions hold.
- Serverless targets: keep cold-start cost and bundle size in mind.
- Platform bindings: type environment/bindings explicitly when used.

## Testing Patterns

Start with request-level tests against the app instance.

```ts
import { Hono } from "hono";
import { describe, expect, it } from "vitest";

const app = new Hono();
app.get("/health", (c) => c.json({ ok: true }));

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await app.request("/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
```

- Test both success and failure paths.
- Add middleware-specific tests when behavior depends on auth, headers, or context vars.
- Prefer deterministic unit tests for route logic plus a few integration tests per feature.

## Verification Commands

After changes, run project-standard checks:

- test suite
- lint/format checks
- local runtime command matching target adapter
