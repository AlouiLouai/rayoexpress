"use server";

import { headers } from "next/headers";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Indica tu nombre"),
  phone: z.string().min(9, "Indica un teléfono válido"),
  locality: z.string().min(2, "Indica tu localidad"),
  message: z.string().min(10, "Cuéntanos un poco más sobre el trabajo"),
});

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

/**
 * Best-effort, in-memory only — a serverless instance can be recycled or
 * scaled out at any time, so this doesn't guarantee a hard cap across all
 * traffic. It's here to blunt naive scripted spam, not to replace a real
 * rate limiter (Upstash Redis, Vercel KV) if this ever needs to be bulletproof.
 */
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionsByIp.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return false;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never fill this (it's hidden from view). Bots
  // filling every field in a form usually do, so pretend success without
  // actually processing the lead.
  if (formData.get("company")) {
    return { success: true };
  }

  const ip = await getClientIp();
  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.",
    };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    locality: formData.get("locality"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: z.prettifyError(parsed.error) };
  }

  // TODO: wire this up to a real lead destination (email via Resend/Nodemailer,
  // a CRM webhook, or a database table) before going live.
  console.log("New RayoExprés lead:", parsed.data);

  return { success: true };
}
