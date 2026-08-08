"use client";

import type { ComponentProps } from "react";
import { trackLead } from "@/lib/gtag";

type TrackedLinkProps = ComponentProps<"a"> & {
  method: "phone" | "whatsapp";
};

/** A plain `<a>` that also reports a `generate_lead` conversion event before navigating. */
export function TrackedLink({ method, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackLead(method);
        onClick?.(e);
      }}
    />
  );
}
