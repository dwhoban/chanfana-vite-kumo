# AGENTS Guide (Current Project State)

This file is for autonomous coding agents working in this repository.

## First Principles

1. Load the most relevant local skill before making changes.
2. Prefer repository truth over assumptions.
3. After each completed task/todo, commit edited files automatically.
4. Use conventional commits for every commit.

## Required Discovery Order (Do This Before Web Search)

Use this order every time:

1. Skills in `.agents/skills/` and `.opencode/skills/`
2. MCP tools (Cloudflare, bindings, observability, browser, etc.)
3. Local CLI tools (`pnpm`, `wrangler`, `vitest`, `eslint`, `tsc`, `rg`)
4. Local code search (`rg`, project grep/glob tools)
5. `webfetch` / external web search only as a last resort

If docs are needed for Cloudflare, use Cloudflare docs MCP before external sites.

## Repo Snapshot

- Runtime: Cloudflare Workers
- Frontend: React 19 + TanStack Router + TanStack Query + Kumo UI
- Backend: Hono + Chanfana (OpenAPI) + Zod v4
- Build: Vite 6 + `@cloudflare/vite-plugin`
- Package manager: `pnpm`
- Worker entry: `src/server/index.ts`
- API docs routes: `/api/docs`, `/api/openapi.json`

## Commands

### Core

- `pnpm dev` - start Vite dev server
- `pnpm build` - type-check + production build
- `pnpm preview` - build then preview production bundle
- `pnpm check` - `tsc` + `vite build` + `wrangler deploy --dry-run`
- `pnpm deploy` - deploy Worker
- `pnpm cf-typegen` - regenerate `worker-configuration.d.ts`

### Lint / Type / Format

- `pnpm lint` - run ESLint
- `pnpm exec tsc -b` - run project references type-check
- `pnpm exec oxfmt .` - format (if needed; no npm script yet)
- `pnpm exec oxlint .` - optional secondary linting

### Tests (Vitest)

- `pnpm exec vitest` - run tests in watch mode
- `pnpm exec vitest run` - run once (CI style)
- `pnpm exec vitest run src/client/components/kumo/resource-list/resource-list.test.tsx` - run a single test file
- `pnpm exec vitest -t "should be defined"` - run a single test by name

## Commit Policy (Automatic)

When a task/todo is complete:

1. Stage only intended files.
2. Commit immediately.
3. Use Conventional Commits: `type(scope): subject`.

Recommended types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`.

## Source Layout

```text
src/
  client/
    main.tsx
    router.tsx
    routeTree.gen.ts
    routes/
      __root.tsx
      index.tsx
      forms.tsx
      tables.tsx
    components/kumo/
    lib/
  server/
    index.ts
```

## Style and Conventions

### TypeScript

- Keep strict typing; avoid `any`.
- Prefer explicit types for shared contracts and component props.
- Use `type` for simple object/union aliases unless interface extension is needed.
- Do not leave unused locals/params.

### Imports

- Use ESM imports only.
- Group imports: external packages, then internal relative imports.
- Keep import style consistent with neighboring files.
- In this repo, relative imports commonly include extension suffixes (e.g. `./routeTree.gen.ts`).

### Naming

- Route files: file-based, lowercase (`index.tsx`, `forms.tsx`, `tables.tsx`, `__root.tsx`).
- Components/types: PascalCase (`ResourceListPage`, `NavigationItem`).
- Variables/functions: camelCase.
- Directory and utility filenames: kebab-case or camelCase as already established.

### React / UI

- Function components only.
- Router setup lives in `src/client/router.tsx` and `src/client/routes/*`.
- Use Kumo + Tailwind utility classes; keep classes readable and grouped logically.
- Use `cn` from Kumo for conditional class composition.

### API / Server

- Define API in `src/server/index.ts` using Hono + Chanfana.
- Keep endpoints under `/api/*`.
- Provide OpenAPI schema for routes (responses at minimum).
- Prefer Zod schemas for request/response validation.
- Keep Worker bindings typed (e.g. `DB: D1Database`).

### Error Handling

- Do not throw raw strings.
- Throw typed errors/exceptions with actionable messages.
- Return consistent JSON error shapes for API responses.
- Validate input early and fail fast.

### Testing

- Place tests near code as `*.test.ts` or `*.test.tsx`.
- Test public behavior, not implementation details.
- Keep tests deterministic; avoid hidden network/time dependencies.

## Cloudflare Configuration Notes

- Config file: `wrangler.jsonc`
- Assets are served from `./dist/client`
- Worker-first routing is configured for `/api/*`
- Placeholder D1 binding exists: `DB`

## Cursor and Copilot Rules

At the time of writing, no project-specific Cursor or Copilot instruction files were found:

- `.cursor/rules/` (not present)
- `.cursorrules` (not present)
- `.github/copilot-instructions.md` (not present)

If these files appear later, read and apply them before coding.
