"use client";

import { useActionState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { submitContactAction, type ContactState } from "@/app/contact-action";

const initialState: ContactState = null;

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-3.05%2C43.15%2C-2.75%2C43.35&layer=mapnik&marker=43.263%2C-2.935";

const fieldClassName =
  "h-auto rounded-[11px] border-[1.5px] border-brand-ink/15 px-3.5 py-3 text-sm focus-visible:border-brand focus-visible:ring-0";

export function Contact() {
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialState,
  );

  return (
    <section id="contacto" className="bg-brand-soft px-6 py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-6 md:grid-cols-2 md:gap-12">
        <div className="rounded-2xl bg-white p-5 shadow-brand-soft sm:p-8 md:rounded-3xl md:p-10">
          <h2 className="mb-1.5 font-heading text-xl font-extrabold tracking-tight text-brand-ink md:mb-2 md:text-[28px]">
            Pide presupuesto sin compromiso
          </h2>
          <p className="mb-4 text-sm text-brand-ink-soft md:mb-5 md:text-[15.5px]">
            Cuéntanos qué necesitas y te respondemos lo antes posible.
          </p>

          <div className="mb-4 flex flex-wrap gap-4 md:mb-6 md:gap-6">
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="flex items-center gap-2 text-sm font-bold text-brand"
            >
              <Phone className="size-4" strokeWidth={2.3} />
              {siteConfig.phone.display}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm font-bold text-brand"
            >
              <Mail className="size-4" strokeWidth={2.3} />
              {siteConfig.email}
            </a>
          </div>

          {state?.success ? (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 md:gap-3.5 md:p-6">
              <CheckCircle2
                className="size-[22px] shrink-0 text-emerald-700"
                strokeWidth={2.4}
              />
              <div>
                <div className="mb-1 font-bold text-emerald-900">
                  ¡Solicitud recibida!
                </div>
                <div className="text-sm text-emerald-800">
                  Te responderemos lo antes posible. Gracias por confiar en
                  RayoExprés.
                </div>
              </div>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="name"
                    className="mb-1.5 text-[13.5px] font-bold text-brand-ink"
                  >
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className={fieldClassName}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="mb-1.5 text-[13.5px] font-bold text-brand-ink"
                  >
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="600 000 000"
                    required
                    className={fieldClassName}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="locality"
                  className="mb-1.5 text-[13.5px] font-bold text-brand-ink"
                >
                  Localidad
                </Label>
                <Input
                  id="locality"
                  name="locality"
                  placeholder="Bilbao, Getxo, Durango..."
                  required
                  className={fieldClassName}
                />
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="mb-1.5 text-[13.5px] font-bold text-brand-ink"
                >
                  ¿Qué necesitas?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe la avería o el trabajo a realizar"
                  rows={4}
                  required
                  className={fieldClassName}
                />
              </div>
              {state?.error ? (
                <p role="alert" className="text-sm text-destructive">
                  {state.error}
                </p>
              ) : null}
              <Button
                type="submit"
                disabled={isPending}
                className="h-auto rounded-[13px] bg-brand-gradient py-4 text-[15px] font-bold text-white shadow-brand-btn hover:brightness-105"
              >
                <Send className="size-4" strokeWidth={2.3} />
                {isPending ? "Enviando…" : "Solicitar presupuesto"}
              </Button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <div className="h-48 overflow-hidden rounded-2xl shadow-brand-soft md:h-65 md:rounded-[20px]">
            <iframe
              title="Zona de cobertura de RayoExprés en Bilbao y Vizcaya"
              src={MAP_SRC}
              className="size-full border-0"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl border border-brand-ink/10 bg-white p-5 md:rounded-[20px] md:p-6">
            <div className="mb-1.5 flex items-center gap-2 text-sm font-bold text-brand-ink md:text-[15px]">
              <MapPin className="size-4 text-brand" strokeWidth={2.3} />
              Zona de trabajo
            </div>
            <p className="mb-3 text-[13px] text-brand-ink-soft md:mb-3.5 md:text-sm">
              Bilbao y toda Vizcaya, incluyendo:
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.zones.map((zone) => (
                <span
                  key={zone}
                  className="rounded-full bg-brand-tint px-3 py-1.5 text-[13px] font-semibold text-brand-dark"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
