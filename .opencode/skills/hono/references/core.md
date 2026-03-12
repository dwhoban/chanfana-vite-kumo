# Hono Core Reference

## App and Route Composition

```ts
import { Hono } from "hono";

const app = new Hono();
const api = new Hono();

api.get("/health", (c) => c.json({ ok: true }));
api.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id });
});

app.route("/api", api);

export default app;
```

- Prefer sub-app composition with `app.route('/prefix', subApp)`.
- Keep route modules focused by domain (`users`, `billing`, `admin`).

## Request Data Boundaries

- `c.req.param()` for path params.
- `c.req.query()` for query strings.
- `await c.req.json()` for JSON body.
- Validate all external input at route boundaries before business logic.

```ts
app.post("/users", async (c) => {
  const body = await c.req.json<{ email?: string }>();
  if (!body.email) return c.json({ error: "email is required" }, 400);
  return c.json({ created: true }, 201);
});
```

## Response Patterns

- Use `c.json(data, status?)` for APIs.
- Use `c.text(message, status?)` for simple responses.
- Return explicit status codes for success and failure paths.

## Error Handling

Centralize fallback behavior with `onError` and `notFound`:

```ts
app.notFound((c) => c.json({ error: "Not Found" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal Server Error" }, 500);
});
```

- Keep public error payloads stable and non-sensitive.
- Log detailed internals server-side only.

## Context and Variables

Use context variables for request-scoped values set by middleware.

```ts
type Vars = { userId: string };
const app = new Hono<{ Variables: Vars }>();

app.use("*", async (c, next) => {
  c.set("userId", "123");
  await next();
});

app.get("/me", (c) => c.json({ userId: c.get("userId") }));
```
