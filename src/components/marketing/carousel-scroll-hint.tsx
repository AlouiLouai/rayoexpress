"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/components/ui/carousel";

/**
 * Inset "swipe for more" affordance for mobile, where the outside-positioned
 * CarouselNext/Previous buttons don't fit on screen. Desktop keeps the
 * standard shadcn arrows instead (see `sm:hidden` below).
 */
export function CarouselScrollHint({
  fadeFrom = "from-white",
}: {
  /** Tailwind `from-*` class matching the section background behind the fade. */
  fadeFrom?: string;
}) {
  const { scrollNext, canScrollNext } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <button
      type="button"
      onClick={scrollNext}
      aria-label="Ver más fotos"
      className={cn(
        "absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-linear-to-l to-transparent pr-1 sm:hidden",
        fadeFrom,
      )}
    >
      <span className="flex size-8 shrink-0 animate-[brand-float_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-brand-gradient text-white shadow-brand-btn">
        <ChevronRight className="size-4" strokeWidth={2.5} />
      </span>
    </button>
  );
}
