import type { NextConfig } from "next";

// No nonce here on purpose: a nonce-based CSP requires every page to render
// dynamically (no static optimization/ISR), which isn't worth it for this
// mostly-static marketing site. 'unsafe-inline' on script-src is the
// tradeoff — this CSP still meaningfully blocks loading script/frame/connect
// from any origin outside the ones this app actually uses (its main real
// value against a compromised or typosquatted dependency), it just can't
// stop pure inline-script XSS the way a nonce could.
//
// img-src is deliberately broad (any https:). This was tested against a live
// Google Ads conversion, not guessed: Google's remarketing pixels load from
// per-country domains (google.tn, google.de, ...) that change unpredictably
// and can't be enumerated with CSP wildcards. An <img> tag can't execute
// script, so the risk of allowing any https: source there is low — much
// lower than the cost of silently degrading conversion tracking on a site
// actively spending on ads. script-src stays scoped to known origins since
// that's the directive that actually matters for XSS.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.doubleclick.net https://*.googlesyndication.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com https://*.doubleclick.net https://*.googlesyndication.com;
  frame-src https://www.openstreetmap.org;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: cspHeader },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
