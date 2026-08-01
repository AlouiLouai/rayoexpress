"use server";

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

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
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
