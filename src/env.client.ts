import { z } from "zod";

/**
 * Client-safe environment variables. Only NEXT_PUBLIC_-prefixed variables are
 * inlined into the browser bundle by Next.js — mirror that constraint here so
 * this file is safe to import from Client Components.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  /** Google Ads tag ID, e.g. "AW-123456789". Conversion tracking is skipped
   * entirely when unset — see src/lib/gtag.ts. */
  NEXT_PUBLIC_GOOGLE_ADS_ID: z
    .string()
    .regex(/^AW-\d+$/, "Expected a Google Ads ID like AW-123456789")
    .optional(),
});

const parsed = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || undefined,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid client environment variables:",
    z.treeifyError(parsed.error),
  );
  throw new Error("Invalid client environment variables");
}

export const clientEnv = parsed.data;
