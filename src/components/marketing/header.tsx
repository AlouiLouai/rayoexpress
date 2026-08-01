"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-brand-ink/10 bg-white/85 px-6 py-3 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/logo-icon.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 shrink-0 object-contain"
          />
          <span className="font-heading text-[19px] leading-none tracking-tight">
            <span className="font-extrabold text-brand-ink">Rayo</span>
            <span className="font-semibold text-brand-ink-soft">Exprés</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-brand-ink-soft hover:text-brand-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="flex items-center gap-2 rounded-full bg-brand-gradient px-4.5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-brand-btn transition hover:brightness-110"
          >
            <Phone className="size-[15px]" />
            <span className="hidden sm:inline">{siteConfig.phone.display}</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-brand-ink/15 bg-white md:hidden"
          >
            {menuOpen ? (
              <X className="size-[18px]" />
            ) : (
              <Menu className="size-[18px]" />
            )}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="sticky top-[65px] z-40 flex flex-col gap-1 border-b border-brand-ink/10 bg-white px-6 py-4 shadow-lg md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-brand-ink/5 py-3 font-semibold last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
