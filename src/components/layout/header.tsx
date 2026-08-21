"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, stripLocale, type Locale } from "@/i18n/config";
import { Logo } from "./logo";

export function Header({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cleanPath = stripLocale(pathname);
  const labels = [dictionary.nav.home, dictionary.nav.products, dictionary.nav.about, dictionary.nav.careers, dictionary.nav.contact];
  const idPath = cleanPath;
  const enPath = localizePath("en", cleanPath);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo href={localizePath(locale, "/")} />
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map((item, index) => {
            const active = item.href === "/" ? cleanPath === "/" : cleanPath.startsWith(item.href);
            return <Link key={item.href} href={localizePath(locale, item.href)} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "nav-link-active" : ""}`}>{labels[index]}</Link>;
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <div className="language-switch" role="group" aria-label={locale === "id" ? "Pilih bahasa" : "Choose language"}>
            <a href={idPath} hrefLang="id" lang="id" aria-current={locale === "id" ? "page" : undefined} className={locale === "id" ? "language-active" : ""}>ID</a>
            <a href={enPath} hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "language-active" : ""}>EN</a>
          </div>
          <Link href={localizePath(locale, "/products")} className="button button-primary hidden lg:inline-flex">{dictionary.nav.explore}</Link>
        </div>
        <button type="button" className="icon-button md:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation" className="flex flex-col px-5 pb-6 pt-2">
          {navigation.map((item, index) => <Link key={item.href} href={localizePath(locale, item.href)} tabIndex={open ? 0 : -1} className="mobile-nav-link" onClick={() => setOpen(false)}>{labels[index]}</Link>)}
          <div className="mobile-language-row"><span>{locale === "id" ? "Bahasa" : "Language"}</span><div className="language-switch" role="group" aria-label={locale === "id" ? "Pilih bahasa" : "Choose language"}><a href={idPath} hrefLang="id" lang="id" tabIndex={open ? 0 : -1} aria-current={locale === "id" ? "page" : undefined} className={locale === "id" ? "language-active" : ""}>ID</a><a href={enPath} hrefLang="en" lang="en" tabIndex={open ? 0 : -1} aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "language-active" : ""}>EN</a></div></div>
          <Link href={localizePath(locale, "/products")} tabIndex={open ? 0 : -1} className="button button-primary mt-4 justify-center" onClick={() => setOpen(false)}>{dictionary.nav.explore}</Link>
        </nav>
      </div>
    </header>
  );
}
