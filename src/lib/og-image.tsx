import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

let cachedLogoDataUrl: string | null = null;

function getLogoDataUrl() {
  if (cachedLogoDataUrl) return cachedLogoDataUrl;
  const file = readFileSync(
    join(process.cwd(), "public/images/brand/logo-icon.png"),
  );
  cachedLogoDataUrl = `data:image/png;base64,${file.toString("base64")}`;
  return cachedLogoDataUrl;
}

export function generateOgImage() {
  const logoDataUrl = getLogoDataUrl();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(120deg, #0f2136, #1c3654)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUrl} width={72} height={72} alt="" />
        <span
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Rayo<span style={{ color: "#f0aa0c" }}>Exprés</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 800,
          color: "white",
          lineHeight: 1.15,
          marginTop: 48,
          maxWidth: 900,
        }}
      >
        Electricista 24 horas en Bilbao y Vizcaya
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#c9d4de",
          marginTop: 28,
        }}
      >
        Averías, cuadros, iluminación LED y boletines ·{" "}
        {siteConfig.phone.display}
      </div>
    </div>,
    { ...OG_IMAGE_SIZE },
  );
}
