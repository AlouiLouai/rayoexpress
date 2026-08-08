import Image from "next/image";
import { Check, Clock, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "./whatsapp-icon";

const trustItems = [
  { icon: Clock, title: "Respuesta en 30 min", sub: "En Bilbao y alrededores" },
  { icon: MapPin, title: "Toda Vizcaya", sub: "Cobertura completa" },
  {
    icon: ShieldCheck,
    title: "Instaladores autorizados",
    sub: "Trabajos garantizados",
  },
  { icon: Star, title: "4,9 / 5", sub: "Más de 120 opiniones" },
];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pt-8 md:pt-18">
      <div
        aria-hidden
        className="absolute -top-35 -right-30 size-120 rounded-full bg-[radial-gradient(circle,oklch(0.75_0.1_255/0.2),transparent_70%)] blur-xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-35 size-95 rounded-full bg-gold/10 blur-xl"
      />

      <div className="relative grid items-center gap-6 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-tint px-3 py-1.5 text-[12px] font-bold text-brand-dark md:mb-5.5 md:px-3.5 md:text-[13px]">
            <span className="relative size-2">
              <span className="absolute inset-0 animate-[brand-pulse_1.8s_ease-in-out_infinite] rounded-full bg-gold" />
            </span>
            URGENCIAS 24 HORAS
          </div>

          <h1 className="mb-3 font-heading text-[32px] leading-[1.1] font-black tracking-tight text-balance text-brand-ink sm:text-4xl md:mb-5.5 md:text-[54px] md:leading-[1.08]">
            Electricista <span className="text-gold-dark">24 horas</span> en
            Bilbao y toda Vizcaya
          </h1>

          <p className="mb-4 max-w-[480px] text-base leading-relaxed text-brand-ink-soft md:mb-7.5 md:text-lg">
            Averías eléctricas, cuadros, iluminación LED y boletines. Atendemos
            tu incidencia con rapidez y presupuesto cerrado antes de empezar.
          </p>

          <div className="mb-4 flex flex-wrap gap-3 md:mb-7.5 md:gap-3.5">
            <TrackedLink
              method="phone"
              href={`tel:${siteConfig.phone.tel}`}
              className="flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand-btn-lg transition hover:-translate-y-0.5 md:gap-2.5 md:rounded-2xl md:px-6.5 md:py-4 md:text-[15.5px]"
            >
              <Phone className="size-4 md:size-[17px]" />
              Llamar ahora
            </TrackedLink>
            <TrackedLink
              method="whatsapp"
              href={`https://wa.me/${siteConfig.phone.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-[1.5px] border-whatsapp/40 bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition hover:border-whatsapp hover:bg-emerald-50 md:gap-2.5 md:rounded-2xl md:px-6.5 md:py-4 md:text-[15.5px]"
            >
              <WhatsAppIcon className="size-4 text-whatsapp-dark md:size-[17px]" />
              WhatsApp
            </TrackedLink>
          </div>

          <p className="flex items-center gap-1.5 text-[12.5px] text-brand-ink-soft md:text-[13.5px]">
            <Check className="size-3.5" strokeWidth={2.4} />
            Sin cuota de desplazamiento · Presupuesto antes de empezar
          </p>
        </div>

        <div className="relative grid h-[300px] grid-cols-2 grid-rows-2 gap-2 sm:h-[380px] md:h-[460px] md:gap-3">
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl shadow-brand-panel md:rounded-[24px]">
            <Image
              src="/images/solar-placas.jpg"
              alt="Instalación de placas solares realizada por RayoExprés"
              fill
              priority
              sizes="(min-width: 768px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-brand-panel md:rounded-[24px]">
            <Image
              src="/images/nave-industrial.jpg"
              alt="Instalación eléctrica industrial de RayoExprés"
              fill
              sizes="(min-width: 768px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-brand-panel md:rounded-[24px]">
            <Image
              src="/images/cuadro-electrico-1.jpg"
              alt="Cuadro eléctrico renovado por RayoExprés"
              fill
              sizes="(min-width: 768px) 22vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 animate-[brand-float_4s_ease-in-out_infinite] items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 shadow-brand-float md:bottom-4 md:gap-3 md:rounded-2xl md:px-5 md:py-3.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-gold text-gold" />
              ))}
            </div>
            <div className="font-heading text-[12.5px] font-extrabold text-brand-ink md:text-sm">
              4,9/5{" "}
              <span className="font-heading text-[11px] font-medium text-brand-ink-soft md:text-[12.5px]">
                · 120+ opiniones
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mx-auto mt-6 -mb-px grid max-w-5xl grid-cols-2 gap-x-2 gap-y-3 rounded-2xl bg-white p-4 shadow-brand-panel max-md:mx-2 md:mt-14 md:grid-cols-4 md:gap-2 md:rounded-3xl md:p-8">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-2.5 md:gap-3.5"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint md:size-10.5 md:rounded-[11px]">
              <item.icon
                className="size-4 text-brand md:size-5"
                strokeWidth={2.2}
              />
            </div>
            <div>
              <div className="font-heading text-[12.5px] leading-tight font-extrabold text-brand-ink md:text-[15px]">
                {item.title}
              </div>
              <div className="text-[10.5px] leading-tight text-brand-ink-soft md:text-[12.5px]">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
