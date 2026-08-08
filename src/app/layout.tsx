import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Manrope } from "next/font/google";
import { CookieConsentBanner } from "@/components/analytics/cookie-consent";
import { GoogleTag } from "@/components/analytics/google-tag";
import { siteConfig } from "@/config/site";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s · ${siteConfig.shortName}` },
  description: siteConfig.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "electricista Bilbao",
    "electricista urgente Bilbao",
    "electricista 24 horas",
    "electricista Vizcaya",
    "averías eléctricas Bilbao",
    "boletín eléctrico Bilbao",
    "instalador eléctrico autorizado",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: siteConfig.shortName,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c3654",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTag />
      <body className="flex min-h-full flex-col">
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
