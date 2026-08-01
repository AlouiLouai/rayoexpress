import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function CtaBand() {
  return (
    <section className="relative mx-auto mb-10 max-w-7xl overflow-hidden rounded-2xl bg-linear-[120deg] from-brand-deep to-brand px-5 py-8 sm:px-11 md:mb-20 md:rounded-[28px] md:py-12">
      <div
        aria-hidden
        className="absolute -top-15 -right-15 size-60 rounded-full bg-gold/20 blur-md"
      />
      <div className="relative flex flex-wrap items-center justify-between gap-4 md:gap-6">
        <div>
          <h2 className="mb-1.5 font-heading text-xl font-extrabold tracking-tight text-white md:mb-2 md:text-[28px]">
            ¿Necesitas un electricista ahora mismo?
          </h2>
          <p className="text-[13.5px] text-white/85 md:text-[15.5px]">
            Atendemos urgencias 24 horas en Bilbao y toda Vizcaya.
          </p>
        </div>
        <a
          href={`tel:${siteConfig.phone.tel}`}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold whitespace-nowrap text-brand-deep transition hover:-translate-y-0.5 md:gap-2.5 md:rounded-2xl md:px-7 md:py-4 md:text-[15.5px]"
        >
          <Phone className="size-4 md:size-[17px]" />
          Llamar ahora
        </a>
      </div>
    </section>
  );
}
