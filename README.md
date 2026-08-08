# RayoExprés

Marketing site for RayoExprés, a 24-hour electrician service in Bilbao and Vizcaya. [Next.js 16](https://nextjs.org) App Router, typed, linted, and formatted.

## Stack

- **Next.js 16** (App Router, stable), Turbopack, React 19
- **TypeScript**, strict mode + `noUncheckedIndexedAccess`
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives, not Radix)
- **pnpm** as the package manager
- **zod** for Server Action input validation
- ESLint, Prettier (with `prettier-plugin-tailwindcss`), Husky, lint-staged, commitlint

## Getting started

```bash
pnpm install
cp .env.example .env.local
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

## Environment variables

See `.env.example`. `NEXT_PUBLIC_APP_URL` is optional — `src/lib/site-url.ts` resolves the production URL automatically from Vercel's environment, falling back to it only as an override.

## Contact form — still needs a real destination

`src/app/contact-action.ts` validates submissions (zod, honeypot field, best-effort per-IP rate limit) but only `console.log`s the result. **Wire this up to a real lead destination — email via Resend/Nodemailer, a CRM webhook, a database — before relying on it.**

## Google Ads conversion tracking

Set `NEXT_PUBLIC_GOOGLE_ADS_ID` (format `AW-XXXXXXXXX`, found in Google Ads →
Tools → Conversions → "Google tag") to turn this on. Leave it empty to skip
it entirely — every piece below no-ops with no console errors when unset, so
it's safe to leave blank in dev/preview environments.

- **`src/components/analytics/google-tag.tsx`** — loads `gtag.js` and sets
  [Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)
  defaults (`denied`) before it runs. This is required, not optional: since
  March 2024 Google silently degrades (models/discards) conversion data for
  EEA/UK traffic from any site that doesn't signal consent state.
- **`src/components/analytics/cookie-consent.tsx`** — the banner that
  updates consent to `granted` once the visitor accepts. Choice is
  remembered in `localStorage`.
- **`src/lib/gtag.ts`** — exports `trackLead(method)`, which fires Google's
  recommended `generate_lead` event. Using a standard event name (rather
  than a hardcoded `AW-.../label` conversion ID we don't have) means it
  works whether you configure the conversion action directly in Google Ads
  or import it from a linked GA4 property — finish that part in the Google
  Ads UI once real traffic is flowing.
- **`src/components/analytics/tracked-link.tsx`** — a `<TrackedLink>`
  drop-in for `<a>` that calls `trackLead` before navigating. Every
  `tel:`/`wa.me` link in the marketing pages already uses it; the contact
  form's success path calls `trackLead("form")` directly.

## SEO

- `src/app/robots.ts`, `src/app/sitemap.ts` — generated, point at the
  auto-resolved production URL.
- `src/components/seo/local-business-jsonld.tsx` — `Electrician` structured
  data (schema.org) on the homepage: phone, service area, hours. This is
  what makes the site eligible for Google's local map-pack / rich results,
  not just a plain link. Deliberately excludes `aggregateRating` — the star
  ratings shown on the page are placeholder content, and marking up
  fabricated review data violates Google's structured data guidelines. Add
  it back once real review counts are available.
- `src/app/opengraph-image.tsx` / `twitter-image.tsx` — generated social
  preview card (`src/lib/og-image.tsx`), built from the real logo.
- A Google Business Profile matters more than any of the above for local
  search — that's outside this repo, but it's the highest-leverage next step.

## Security headers

Set in `next.config.ts`'s `headers()`: HSTS, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a
`Content-Security-Policy`. The CSP's `img-src` is deliberately broad
(`https:`) — Google Ads' remarketing pixels load from unpredictable
per-country domains that can't be enumerated with CSP wildcards, and an
`<img>` can't execute script, so that's a reasonable place to loosen it.
`script-src` stays scoped to known origins, since that's the directive that
actually matters for XSS. If you change what third-party scripts this site
loads, re-check the CSP against them — it's easy to silently break tracking.

## Project structure

```
src/
  app/                 # routes (App Router)
  components/
    analytics/         # Google Ads tag, consent banner, tracked links
    marketing/         # page sections
    seo/                # structured data
    ui/                 # shadcn/ui primitives
  config/              # static app config (site.ts)
  lib/                 # utilities (gtag, og-image, site-url, cn)
  env.client.ts        # client-safe env validation
```

## shadcn/ui

This project uses the `base-nova` style, built on [Base UI](https://base-ui.com) rather than Radix. Composition uses Base UI's `render` prop instead of Radix's `asChild`:

```tsx
<Button nativeButton={false} render={<Link href="/#contacto" />}>
  Ver contacto
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
