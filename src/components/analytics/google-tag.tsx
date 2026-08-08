import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/gtag";

/**
 * Google Ads tag + Consent Mode v2. Order matters and mirrors Google's own
 * snippet exactly: the dataLayer/gtag stub and default-denied consent state
 * must exist *before* the gtag.js loader runs, so the first hits it queues
 * are already consent-aware instead of firing unconditionally.
 * https://developers.google.com/tag-platform/security/guides/consent
 *
 * All three use `afterInteractive`, not `beforeInteractive` — Next.js
 * scripts execute in document order within the same strategy tier, so the
 * consent default is still guaranteed to run before the config call fires.
 * `beforeInteractive` is reserved for Pages Router's `_document.js` and
 * triggers a lint warning when used from an App Router component.
 */
export function GoogleTag() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
