# Oppy

STOP. Load the relevant **Skill** before starting any task. Always commit using **conventional commits** after completing work.

## Skills by Use Case

**Cloudflare Platform:** `cloudflare`, `wrangler`, `workers-best-practices`, `hono`, `chanfana`, `kumo-ui`, `durable-objects`, `agents-sdk`, `building-ai-agent-on-cloudflare`, `building-mcp-server-on-cloudflare`, `sandbox-sdk`

**Frontend & UI:** `tanstack-router`, `tanstack-query`, `tanstack-table`, `tanstack-form`, `web-perf`

**Planning & Architecture:** `prd`, `breakdown-epic-pm`, `breakdown-epic-arch`, `breakdown-feature-prd`, `breakdown-feature-implementation`, `breakdown-plan`, `breakdown-test`, `create-implementation-plan`, `create-architectural-decision-record`

**Documentation:** `documentation-writer`, `conventional-commit`, `code-exemplars-blueprint-generator`, `folder-structure-blueprint-generator`, `technology-stack-blueprint-generator`, `architecture-blueprint-generator`, `readme-blueprint-generator`, `project-workflow-analysis-blueprint-generator`

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TanStack Router, Tailwind CSS v4, @cloudflare/kumo |
| Backend | Hono, chanfana (OpenAPI), Zod v4 |
| Runtime | Cloudflare Workers (nodejs_compat) |
| Build | Vite 6, @cloudflare/vite-plugin |
| Icons | @phosphor-icons/react |
| Package manager | **pnpm** |

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite dev server (localhost:5173) |
| `pnpm build` | Type-check + Vite production build |
| `pnpm check` | Full check: tsc + build + deploy dry-run |
| `pnpm lint` | Run oxlint |
| `pnpm lint:fix` | Run oxlint with auto-fix |
| `pnpm fmt` | Format with oxfmt |
| `pnpm fmt:check` | Check formatting without writing |
| `pnpm preview` | Build + preview production locally |
| `pnpm deploy` | Deploy to Cloudflare Workers |
| `pnpm cf-typegen` | Regenerate `worker-configuration.d.ts` |

### Testing

```bash
pnpm vitest                  # Run all tests (watch mode)
pnpm vitest run              # Run once (CI mode)
pnpm vitest run src/path     # Run tests in directory
pnpm vitest run path/file    # Run single test file
pnpm vitest -t "test name"   # Run by test name pattern
```

Place test files as `*.test.ts` or `*.test.tsx` next to source.

## Code Style

### Formatting (oxfmt)
- Formatter is **oxfmt** (NOT Prettier). Config in `.oxfmtrc.json`.
- Tailwind class sorting enabled in `clsx()` and `cn()` calls
- Never install/configure Prettier

### Linting (oxlint)
Key enforced rules:
- `no-explicit-any` — **error**. Never use `any`. Use `unknown` or proper types.
- `no-unused-vars`, `prefer-const`, `no-var` — **error**
- `no-debugger`, `no-empty` — **error**
- `react-hooks/rules-of-hooks` — **error**
- `@typescript-eslint/ban-ts-comment` — **error** (no `@ts-ignore`)

### TypeScript
- **Strict mode** enabled across all tsconfigs
- `noUnusedLocals`, `noUnusedParameters` — enabled
- Three tsconfig scopes: `tsconfig.app.json` (client), `tsconfig.server.json` (server), `tsconfig.node.json` (build)
- Target: ES2020 (client), ES2022 (server/node)
- Module resolution: `bundler`
- JSX: `react-jsx`

### Imports
- ES modules only (`"type": "module"`)
- Use `.tsx` extensions in relative imports (e.g., `import App from "./App.tsx"`)
- External packages: no extensions
- Order: external packages → relative imports → CSS

### Naming Conventions
- **Components**: PascalCase (`HomePage.tsx`)
- **Routes**: PascalCase with `Page` suffix (`AboutPage.tsx`)
- **Non-component files**: camelCase (`router.tsx`)
- **CSS classes**: kebab-case (`app-shell`)
- **Variables/functions**: camelCase
- **Types/interfaces**: PascalCase
- **Constants**: camelCase (not SCREAMING_CASE)

### React Patterns
- Function components only (no class components)
- Default export for root `App`; named exports for pages
- TanStack Router for routing — define routes in `src/client/router.tsx`
- `StrictMode` wrapping at root

### Server Patterns (Hono)
- Type Hono app with `Hono<{ Bindings: Env }>` for Cloudflare bindings
- Default export the Hono app instance
- API routes prefixed with `/api/`
- `Env` interface generated in `worker-configuration.d.ts`

### Styling
- **Tailwind CSS v4** with Kumo design system (`@cloudflare/kumo`)
- Import order in `index.css`: Kumo source → Kumo styles → Tailwindcss
- Use `clsx()` or `cn()` for conditional class merging

## Project Structure

```
src/
  client/          # React frontend
    main.tsx       # Entry — StrictMode + RouterProvider
    router.tsx     # TanStack Router definitions
    App.tsx        # Root layout with nav
    routes/        # Page components
    index.css      # Tailwind + Kumo imports
  server/          # Hono API
    index.ts       # Hono app — default export
```

## Cloudflare Workers

- Config: `wrangler.jsonc` (JSONC, not JSON)
- Worker name: `oppy`
- Entry: `src/server/index.ts`
- Compatibility date: `2025-03-09`
- Flags: `nodejs_compat`
- Observability: enabled, source maps uploaded
- Assets: `./dist/client` with SPA fallback

### Committing

**Always use conventional commits.** Load the `conventional-commit` skill for detailed guidance.

Format: `type(scope): subject`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`

Examples:
```
feat(auth): add OAuth login flow
fix(api): handle null response from D1
refactor(router): extract auth middleware
```

## MCPs

- **cloudflare-docs** — Search Cloudflare documentation
- **cloudflare-api** — Search/execute Cloudflare API
- **cloudflare-bindings** — Manage KV, R2, D1, Hyperdrive
- **cloudflare-builds** — Inspect Workers builds and logs
- **cloudflare-observability** — Query worker logs and metrics
- **chrome-devtools** — Browser automation, performance traces

## Docs

- Workers: https://developers.cloudflare.com/workers/
- Node.js compat: https://developers.cloudflare.com/workers/runtime-apis/nodejs/
- Errors: https://developers.cloudflare.com/workers/observability/errors/
