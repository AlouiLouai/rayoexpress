/**
 * Resolves the canonical site URL without needing a manually-maintained
 * constant. Priority:
 *   1. NEXT_PUBLIC_APP_URL — explicit override (custom domain not yet wired
 *      into Vercel, or a non-Vercel host).
 *   2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel to the
 *      production domain (the default *.vercel.app URL until a custom
 *      domain is attached, then that domain automatically once it is —
 *      no redeploy-time config needed on our side either way).
 *   3. localhost, for local dev.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
