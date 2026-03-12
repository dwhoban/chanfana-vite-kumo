# Chanfana + React + Vite + Kumo + Cloudflare Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dwhoban/chanfana-vite-kumo)

This template provides a full-stack setup for building a React application with Vite and an API powered by Hono + Chanfana, designed to run on Cloudflare Workers.

![React + TypeScript + Vite + Cloudflare Workers](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fc7b4b62-442b-4769-641b-ad4422d74300/public)

<!-- dash-content-start -->

Build quickly with a modern Cloudflare-first stack:

- [**React**](https://react.dev/) for the frontend UI
- [**Vite**](https://vite.dev/) for fast local development and builds
- [**@cloudflare/kumo**](https://www.npmjs.com/package/@cloudflare/kumo) for UI primitives and styles
- [**Hono**](https://hono.dev/) for the API router
- [**Chanfana**](https://www.chanfana.pages.dev/) for OpenAPI-first endpoint definitions
- [**Cloudflare Workers**](https://developers.cloudflare.com/workers/) for global deployment

### Key Features

- TypeScript across client and server
- OpenAPI docs and schema generation under `/api`
- SPA assets served by Workers with `/api/*` routed to the Worker first
- Built-in observability configuration for logs and traces
- `pnpm`-based development and deployment workflow

<!-- dash-content-end -->

## Getting Started

Clone this repository and install dependencies:

```bash
pnpm install
```

Start local development:

```bash
pnpm dev
```

The app is available at `http://localhost:5173`.

## API and OpenAPI Routes

- Health endpoint: `GET /api/`
- OpenAPI JSON: `GET /api/openapi.json`
- OpenAPI docs UI: `GET /api/docs`

## D1 Setup (DB Binding)

Create a D1 database:

```bash
pnpm wrangler d1 create your-database-name
```

Then update `wrangler.jsonc` with the generated `database_name` and `database_id` for the `DB` binding, and regenerate Worker types:

```bash
pnpm cf-typegen
```

## Build, Check, and Deploy

Build for production:

```bash
pnpm build
```

Run full project checks (type-check, build, deploy dry-run):

```bash
pnpm check
```

Preview production build locally:

```bash
pnpm preview
```

Deploy to Cloudflare Workers:

```bash
pnpm deploy
```

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Vite Documentation](https://vite.dev/guide/)
- [React Documentation](https://react.dev/)
- [Hono Documentation](https://hono.dev/)
