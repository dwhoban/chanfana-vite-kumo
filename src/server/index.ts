import { OpenAPIRoute, contentJson, fromHono } from "chanfana";
import { Hono, type Context } from "hono";
import { z } from "zod";

type AppContext = Context<{ Bindings: Env }>;

class HealthEndpoint extends OpenAPIRoute {
  schema = {
    responses: {
      "200": {
        description: "API health check",
        ...contentJson(
          z.object({
            name: z.string(),
          }),
        ),
      },
    },
  };

  async handle(_c: AppContext) {
    console.log(JSON.stringify({ message: "health check" }));
    return { name: "Cloudflare" };
  }
}

const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
  console.error(
    JSON.stringify({
      message: "unhandled error",
      error: err instanceof Error ? err.message : String(err),
      path: new URL(c.req.url).pathname,
    }),
  );
  return c.json({ error: "Internal server error" }, 500);
});

const openapi = fromHono(app, {
  docs_url: "/api/docs",
  openapi_url: "/api/openapi.json",
});

openapi.get("/api/", HealthEndpoint);

export default app;
