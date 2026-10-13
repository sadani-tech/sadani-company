"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";
import { Logo } from "./logo";

export function Header({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cleanPath = stripLocale(pathname);
  const labels = [dictionary.nav.home, dictionary.nav.products, dictionary.nav.about, dictionary.nav.contact];
  const idPath = cleanPath;
  const enPath = localizePath("en", cleanPath);
  const isHome = cleanPath === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // nav--intro: on the homepage the pill drops in with the hero intro (see sadani.css).
  return (
    <header className={`nav ${isHome ? "nav--intro" : ""} ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__pill">
        <Logo href={localizePath(locale, "/")} />
        <nav className="nav__links" id="nav-links" aria-label={locale === "id" ? "Navigasi utama" : "Primary navigation"}>
          {navigation.map((item, index) => {
            const active = item.href === "/" ? isHome : cleanPath.startsWith(item.href);
            return <Link key={item.href} href={localizePath(locale, item.href)} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{labels[index]}</Link>;
          })}
        </nav>
        <div className="nav__right">
          <div className="lang" role="group" aria-label={locale === "id" ? "Pilih bahasa" : "Choose language"} data-active={locale}>
            <span className="lang__thumb" aria-hidden="true" />
            <a className="lang__btn" href={idPath} hrefLang="id" lang="id" aria-current={locale === "id" ? "page" : undefined}>ID</a>
            <a className="lang__btn" href={enPath} hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</a>
          </div>
          <button type="button" className="nav__burger" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((value) => !value)}>
            <span className="sr-only">{open ? (locale === "id" ? "Tutup menu" : "Close menu") : (locale === "id" ? "Buka menu" : "Open menu")}</span>
            <i /><i />
          </button>
        </div>
      </div>
    </header>
  );
}
