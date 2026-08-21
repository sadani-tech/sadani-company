"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "nav-link-active" : ""}`}>{item.label}</Link>;
          })}
        </nav>
        <Link href="/products" className="button button-primary hidden lg:inline-flex">Explore our products</Link>
        <button type="button" className="icon-button md:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation" className="flex flex-col px-5 pb-6 pt-2">
          {navigation.map((item) => <Link key={item.href} href={item.href} tabIndex={open ? 0 : -1} className="mobile-nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/products" tabIndex={open ? 0 : -1} className="button button-primary mt-4 justify-center" onClick={() => setOpen(false)}>Explore our products</Link>
        </nav>
      </div>
    </header>
  );
}
