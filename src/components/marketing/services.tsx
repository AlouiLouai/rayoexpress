import {
  FileText,
  Lightbulb,
  LayoutGrid,
  Phone,
  Plug,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "./whatsapp-icon";

const services = [
  {
    icon: Zap,
    title: "Electricista 24 horas",
    desc: "Servicio de urgencias todos los días del año, con llegada rápida a cualquier punto de Vizcaya.",
  },
  {
    icon: Wrench,
    title: "Reparación de averías eléctricas",
    desc: "Localizamos y solucionamos cortocircuitos, saltos de diferencial y pérdidas de corriente.",
  },
  {
    icon: Plug,
    title: "Enchufes e interruptores",
    desc: "Instalación, sustitución y ampliación de puntos de luz y tomas de corriente.",
  },
  {
    icon: LayoutGrid,
    title: "Cuadros eléctricos",
    desc: "Renovación y ampliación de cuadros según normativa vigente, con protecciones adecuadas.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación LED",
    desc: "Cambio a LED en viviendas, comercios y naves para reducir tu factura de la luz.",
  },
  {
    icon: FileText,
    title: "Boletines eléctricos",
    desc: "Certificados CIE para altas de suministro y cambios de potencia, tramitados rápido.",
  },
  {
    icon: ShieldCheck,
    title: "Mantenimiento eléctrico",
    desc: "Planes de mantenimiento preventivo para comunidades, locales y empresas.",
  },
] as const;

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-6 py-12 md:py-24">
      <div className="mx-auto mb-6 max-w-xl text-center md:mb-11">
        <div className="mb-2 text-[13px] font-extrabold tracking-[0.08em] text-brand md:mb-2.5">
          SERVICIOS
        </div>
        <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl md:mb-3 md:text-4xl">
          Electricidad para toda Vizcaya
        </h2>
        <p className="text-sm text-brand-ink-soft md:text-base">
          Trabajamos para viviendas, comunidades, comercios e industria.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-brand-ink/10 p-4 transition hover:-translate-y-1 hover:border-brand/25 hover:shadow-brand-card md:rounded-[20px] md:p-7"
          >
            <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand-tint md:mb-4.5 md:size-11.5 md:rounded-xl">
              <service.icon
                className="size-4 text-brand-dark md:size-[22px]"
                strokeWidth={2.2}
              />
            </div>
            <h3 className="mb-1 font-heading text-[13.5px] leading-snug font-bold text-brand-ink md:mb-2 md:text-[17.5px]">
              {service.title}
            </h3>
            <p className="text-[12px] leading-normal text-brand-ink-soft md:text-[14.5px] md:leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}

        <div className="relative col-span-2 flex flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-brand-gradient-deep p-4 sm:col-span-1 md:gap-4 md:rounded-[20px] md:p-7">
          <div
            aria-hidden
            className="absolute -top-7.5 -right-7.5 size-35 rounded-full bg-white/8"
          />
          <div className="relative">
            <h3 className="mb-1 font-heading text-[15px] font-extrabold text-gold md:mb-1.5 md:text-lg">
              ¿Tienes una urgencia?
            </h3>
            <p className="text-[13px] text-white/90 md:text-[14.5px]">
              Llámanos y te atendemos ahora mismo.
            </p>
          </div>
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="relative flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[13px] font-bold text-brand-dark md:py-3.5 md:text-sm"
          >
            <Phone className="size-[15px]" strokeWidth={2.3} />
            {siteConfig.phone.display}
          </a>
          <a
            href={`https://wa.me/${siteConfig.phone.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-[13px] font-bold text-white md:py-3.5 md:text-sm"
          >
            <WhatsAppIcon className="size-[15px]" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
