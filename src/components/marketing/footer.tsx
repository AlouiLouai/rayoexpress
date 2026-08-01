import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

export function MarketingFooter() {
  return (
    <footer className="bg-brand-deep px-6 pt-8 pb-5 md:pt-12 md:pb-7">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 md:gap-6 md:pb-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/logo-icon.png"
            alt=""
            width={34}
            height={34}
            className="size-[34px] shrink-0 object-contain"
          />
          <span className="font-heading text-[17px] leading-none font-extrabold text-white">
            Rayo<span className="text-gold">Exprés</span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/75 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-1.5 pt-4 text-[12.5px] text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:pt-5 sm:text-[13.5px]">
        <div>{siteConfig.shortName} · Electricistas en Bilbao y Vizcaya</div>
        <div>
          {siteConfig.phone.display} · {siteConfig.email} · Urgencias 24&nbsp;h
        </div>
      </div>
    </footer>
  );
}
