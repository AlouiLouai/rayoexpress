# Rayo Express

A senior-grade [Next.js 16](https://nextjs.org) App Router boilerplate — typed, linted, formatted, and wired up with a working authentication flow through `proxy.ts`.

## Stack

- **Next.js 16** (App Router, stable), Turbopack, React 19
- **`src/proxy.ts`** — Next 16's replacement for `middleware.ts`, runs on the Node.js runtime by default
- **TypeScript**, strict mode + `noUncheckedIndexedAccess`
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives, not Radix)
- **pnpm** as the package manager
- **zod** for environment validation and Server Action input validation
- **jose** for signed session cookies
- **next-themes** for dark mode
- ESLint, Prettier (with `prettier-plugin-tailwindcss`), Husky, lint-staged, commitlint

## Getting started

```bash
pnpm install
cp .env.example .env.local
# generate a secret and paste it into .env.local:
openssl rand -base64 32
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start the dev server (Turbopack) |
| `pnpm build`        | Production build                 |
| `pnpm start`        | Start the production server      |
| `pnpm lint`         | ESLint                           |
| `pnpm typecheck`    | `tsc --noEmit`                   |
| `pnpm format`       | Prettier, writes changes         |
| `pnpm format:check` | Prettier, check only             |

## `proxy.ts` instead of `middleware.ts`

Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts` (same behavior, clearer name, Node.js runtime by default instead of the Edge runtime). See [`src/proxy.ts`](src/proxy.ts).

It implements the **optimistic auth check** pattern Next.js recommends: it reads the signed session cookie (cheap, no database call — proxy runs on every matched request, including link prefetches) and redirects:

- unauthenticated requests to `/dashboard/*` → `/login`
- authenticated requests to `/login` → `/dashboard`

This is optimistic by design. The real authorization check happens again in `src/app/dashboard/page.tsx` via `getSession()` — never trust proxy alone for anything sensitive; it's a fast pre-filter, not your security boundary.

Static, request-independent headers (`X-Frame-Options`, etc.) are set in `next.config.ts`'s `headers()` instead of in proxy, since they don't need per-request logic and stay cacheable.

## Auth demo

A minimal end-to-end example ships so you can see the pattern working, not just read about it:

- `/login` — a form using a Server Action (`useActionState`, zod-validated) that calls `createSession()`
- `/dashboard` — protected by `proxy.ts`, reads the session server-side
- `src/lib/session.ts` — `jose`-based signed cookie helpers (`createSession`, `deleteSession`, `getSession`, `decrypt`)

Replace the fake credential check in `src/app/login/actions.ts` with a real lookup before shipping.

## Environment variables

Validated eagerly via zod in `src/env.ts` (server-only, guarded by the `server-only` package) — the app fails fast at boot with a clear error instead of shipping `undefined` secrets. See `.env.example`.

## Project structure

```
src/
  app/                # routes (App Router)
  components/
    ui/                # shadcn/ui primitives
  config/              # static app config (site.ts)
  hooks/               # reusable client hooks
  lib/                 # utilities, session helpers
  env.ts               # server-only env validation
  env.client.ts        # client-safe env validation
  proxy.ts             # replaces middleware.ts
```

## shadcn/ui

This project uses the `base-nova` style, built on [Base UI](https://base-ui.com) rather than Radix. Composition uses Base UI's `render` prop instead of Radix's `asChild`:

```tsx
<Button nativeButton={false} render={<Link href="/dashboard" />}>
  View dashboard
</Button>
```

`nativeButton={false}` tells Base UI the rendered element isn't a real `<button>` (e.g. an `<a>` from `next/link`) so it doesn't warn about lost native button semantics.

Add more components with:

```bash
pnpm dlx shadcn@latest add <component>
```

## Git hooks

- **pre-commit** — `lint-staged` (ESLint + Prettier on staged files)
- **commit-msg** — commitlint, enforcing [Conventional Commits](https://www.conventionalcommits.org/)
