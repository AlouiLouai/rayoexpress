import { z } from "zod";

/**
 * Client-safe environment variables. Only NEXT_PUBLIC_-prefixed variables are
 * inlined into the browser bundle by Next.js — mirror that constraint here so
 * this file is safe to import from Client Components.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
});

const parsed = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid client environment variables:",
    z.treeifyError(parsed.error),
  );
  throw new Error("Invalid client environment variables");
}

export const clientEnv = parsed.data;
