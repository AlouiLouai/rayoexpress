import { siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/site-url";

/**
 * schema.org structured data so Google can show this as a rich local-search
 * result (knowledge panel / map pack eligibility) instead of a plain blue
 * link. `Electrician` is the most specific applicable type — it inherits
 * LocalBusiness fields.
 *
 * Deliberately omits `aggregateRating`/`review`: the star ratings shown on
 * the page are placeholder content, and marking up fabricated review data
 * violates Google's structured data guidelines (and can trigger a manual
 * action). Add it back once real review counts are available — e.g. pulled
 * from the Google Business Profile.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: siteConfig.shortName,
    description: siteConfig.description,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-icon.png`,
    image: `${SITE_URL}/images/brand/logo-icon.png`,
    telephone: siteConfig.phone.tel,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bilbao",
      addressRegion: "Bizkaia",
      addressCountry: "ES",
    },
    areaServed: siteConfig.zones.map((zone) => ({
      "@type": "City",
      name: zone,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
