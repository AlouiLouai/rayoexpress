import "server-only";
import { z } from "zod";

/**
 * Server-only environment variables. Importing this file from a Client
 * Component throws at build time (via the `server-only` package) instead of
 * silently shipping `undefined` secrets to the browser.
 */
const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
});

const parsed = serverSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid server environment variables:",
    z.treeifyError(parsed.error),
  );
  throw new Error("Invalid server environment variables");
}

export const env = parsed.data;
