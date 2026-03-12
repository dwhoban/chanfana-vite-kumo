import { OpenAPIRoute, contentJson, fromHono } from "chanfana";
import { Hono, type Context } from "hono";
import { z } from "zod";

type Bindings = Env & {
  DB: D1Database;
};

type AppContext = Context<{ Bindings: Bindings }>;

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
    return { name: "Cloudflare" };
  }
}

const app = new Hono<{ Bindings: Bindings }>();
const openapi = fromHono(app, {
  docs_url: "/api/docs",
  openapi_url: "/api/openapi.json",
});

openapi.get("/api/", HealthEndpoint);

export default app;
