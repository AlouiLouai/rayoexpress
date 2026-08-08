import { clientEnv } from "@/env.client";

export const GOOGLE_ADS_ID = clientEnv.NEXT_PUBLIC_GOOGLE_ADS_ID;

type ConsentState = "granted" | "denied";

export type ConsentSettings = {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

export function updateConsent(settings: ConsentSettings) {
  gtag("consent", "update", settings);
}

/**
 * Fires Google's recommended `generate_lead` event so it's usable as a
 * Google Ads conversion action (directly, or via a linked GA4 property)
 * without hardcoding a conversion label we don't have.
 * See: https://support.google.com/google-ads/answer/14094088
 */
export function trackLead(method: "phone" | "whatsapp" | "form") {
  if (!GOOGLE_ADS_ID) return;
  gtag("event", "generate_lead", { method });
}
