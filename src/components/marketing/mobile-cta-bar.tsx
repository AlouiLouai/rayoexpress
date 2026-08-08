import { Phone } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "./whatsapp-icon";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-brand-ink/10 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-brand-panel md:hidden">
      <TrackedLink
        method="phone"
        href={`tel:${siteConfig.phone.tel}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-[14.5px] font-bold text-white active:brightness-90"
      >
        <Phone className="size-4" strokeWidth={2.3} />
        Llamar
      </TrackedLink>
      <TrackedLink
        method="whatsapp"
        href={`https://wa.me/${siteConfig.phone.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 text-[14.5px] font-bold text-white active:brightness-90"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp
      </TrackedLink>
    </div>
  );
}
