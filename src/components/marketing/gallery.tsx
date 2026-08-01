import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselScrollHint } from "./carousel-scroll-hint";

const photos = [
  {
    src: "/images/cuadro-electrico-1.jpg",
    alt: "Cuadro eléctrico completo renovado por RayoExprés",
  },
  {
    src: "/images/solar-detalle.jpg",
    alt: "Detalle de instalación de placas solares",
  },
  {
    src: "/images/nave-industrial.jpg",
    alt: "Instalación eléctrica en nave industrial",
  },
  {
    src: "/images/cuadro-electrico-2.jpg",
    alt: "Cuadro eléctrico montado por RayoExprés",
  },
  {
    src: "/images/reparacion-averia.jpg",
    alt: "Reparación de avería eléctrica",
  },
  {
    src: "/images/conector-industrial.jpg",
    alt: "Conector industrial instalado por RayoExprés",
  },
  {
    src: "/images/diferencial.jpg",
    alt: "Instalación de diferencial y magnetotérmico",
  },
  {
    src: "/images/contador-luz.jpg",
    alt: "Instalación de contador eléctrico",
  },
  {
    src: "/images/cableado-cuadro.jpg",
    alt: "Cableado de cuadro eléctrico",
  },
  {
    src: "/images/cuadro-electrico-3.jpg",
    alt: "Cuadro eléctrico con protecciones instaladas",
  },
  {
    src: "/images/contador-inteligente.jpg",
    alt: "Instalación de contador inteligente",
  },
  {
    src: "/images/punto-recarga.jpg",
    alt: "Instalación de punto de recarga",
  },
  {
    src: "/images/toma-corriente.jpg",
    alt: "Instalación de toma de corriente",
  },
  {
    src: "/images/conexion-senializacion.jpg",
    alt: "Conexión de sistema de señalización",
  },
  {
    src: "/images/barras-distribucion.jpg",
    alt: "Barras de distribución eléctrica",
  },
  {
    src: "/images/magnetotermico.jpg",
    alt: "Instalación de magnetotérmico",
  },
] as const;

export function Gallery() {
  return (
    <section id="trabajos" className="w-full bg-brand-soft px-6 py-12 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-9">
          <div>
            <div className="mb-2 text-[13px] font-extrabold tracking-[0.08em] text-brand md:mb-2.5">
              PROYECTOS
            </div>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl md:text-4xl">
              Nuestros trabajos
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] text-brand-ink-soft">
            Instalaciones y reparaciones reales realizadas en Bilbao y Vizcaya.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          className="px-1"
        >
          <CarouselContent>
            {photos.map((photo) => (
              <CarouselItem
                key={photo.src}
                className="basis-[46%] sm:basis-[30%] lg:basis-[19%]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[18px] shadow-[0_8px_20px_-12px_rgb(15_33_54/0.2)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 19vw, (min-width: 640px) 30vw, 46vw"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
          <CarouselScrollHint fadeFrom="from-brand-soft" />
        </Carousel>
      </div>
    </section>
  );
}
