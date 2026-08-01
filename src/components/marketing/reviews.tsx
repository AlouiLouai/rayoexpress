import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselScrollHint } from "./carousel-scroll-hint";

const reviews = [
  {
    initial: "A",
    quote:
      "Se me fue la luz de toda la casa un domingo por la noche y en 30 minutos estaban aquí. Arreglado y explicado todo con claridad.",
    name: "Ainhoa G.",
    place: "Deusto, Bilbao",
  },
  {
    initial: "I",
    quote:
      "Cambiaron el cuadro eléctrico del piso y me hicieron el boletín. Trabajo muy limpio y el precio fue el presupuestado.",
    name: "Iker M.",
    place: "Barakaldo",
  },
  {
    initial: "M",
    quote:
      "Instalación de iluminación LED en todo el local. Se nota muchísimo en la factura y quedó impecable.",
    name: "Marta L.",
    place: "Getxo",
  },
  {
    initial: "J",
    quote:
      "Puntuales, serios y con buen trato. Ya son los electricistas de nuestra comunidad de vecinos.",
    name: "Jon A.",
    place: "Basauri",
  },
] as const;

export function Reviews() {
  return (
    <section
      id="opiniones"
      className="mx-auto w-full max-w-7xl px-6 py-12 md:py-20"
    >
      <div className="mx-auto mb-6 max-w-xl text-center md:mb-11">
        <div className="mb-2 text-[13px] font-extrabold tracking-[0.08em] text-brand md:mb-2.5">
          OPINIONES
        </div>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl md:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        className="w-full min-w-0 px-1"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review.name}
              className="basis-[88%] sm:basis-1/2 lg:basis-1/3"
            >
              <div className="relative h-full overflow-hidden rounded-[20px] border border-brand-ink/10 p-6 md:p-7">
                <Quote className="absolute top-3.5 right-4 size-11 rounded-full bg-brand-tint p-2.5 text-brand/70" />
                <div className="relative mb-3.5 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="relative mb-4.5 text-[15px] leading-relaxed text-brand-ink/90">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[13px] font-bold text-white">
                    {review.initial}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-ink">
                      {review.name}
                    </div>
                    <div className="text-[12.5px] text-brand-ink-soft">
                      {review.place}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
        <CarouselScrollHint fadeFrom="from-white" />
      </Carousel>
    </section>
  );
}
