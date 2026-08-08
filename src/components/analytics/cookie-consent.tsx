"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GOOGLE_ADS_ID, updateConsent } from "@/lib/gtag";

const STORAGE_KEY = "cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GOOGLE_ADS_ID) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      updateConsent({
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    } else if (stored !== "denied") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage isn't available during SSR/render, so the banner's visibility can only be resolved after mount
      setVisible(true);
    }
  }, []);

  if (!GOOGLE_ADS_ID || !visible) return null;

  function respond(granted: boolean) {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    if (granted) {
      updateConsent({
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 border-t border-brand-ink/10 bg-white p-4 shadow-brand-panel md:inset-x-auto md:bottom-4 md:left-4 md:max-w-sm md:rounded-2xl md:border">
      <p className="mb-3 text-[13px] leading-relaxed text-brand-ink-soft">
        Usamos cookies para medir el rendimiento de nuestros anuncios. Puedes
        aceptarlas o rechazarlas.
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 text-sm"
          onClick={() => respond(false)}
        >
          Rechazar
        </Button>
        <Button
          type="button"
          className="flex-1 bg-brand-gradient text-sm text-white"
          onClick={() => respond(true)}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
}
