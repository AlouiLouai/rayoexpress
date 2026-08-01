"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "@/lib/session";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: z.prettifyError(parsed.error) };
  }

  // Demo only: replace with a real credential + database lookup. Never trust
  // the client — this is exactly the kind of check Proxy should NOT perform,
  // since it only ever sees the optimistic cookie, not your database.
  const userId = `demo-user:${parsed.data.email}`;

  await createSession(userId);
  redirect("/dashboard");
}
