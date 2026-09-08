import Link from "next/link";
import { products } from "@/config/products";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { Container } from "../ui/container";
import { Logo } from "./logo";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const id = locale === "id";
  const companyLinks = [
    { label: dictionary.nav.about, href: "/about" },
    { label: dictionary.nav.products, href: "/products" },
    { label: dictionary.nav.pricing, href: "/pricing" },
    { label: dictionary.nav.payments, href: "/payments" },
    { label: dictionary.nav.contact, href: "/contact" },
    { label: dictionary.nav.careers, href: "/careers" },
  ];
  const legalLinks = [
    { label: id ? "Kebijakan privasi" : "Privacy policy", href: "/privacy" },
    { label: id ? "Ketentuan penggunaan" : "Terms of use", href: "/terms" },
    { label: id ? "Kebijakan pengembalian dana" : "Refund policy", href: "/refunds" },
  ];

  return (
    <footer className="bg-ink text-white">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo inverse href={localizePath(locale, "/")} />
            <p className="mt-5 text-sm font-medium text-white">{siteConfig.legalName}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {id ? "Membangun dan mengoperasikan produk digital untuk berbagai kemungkinan sehari-hari." : siteConfig.longDescription}
            </p>
            <address className="mt-5 grid gap-1 text-xs not-italic leading-5 text-white/55">
              <span>{siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}</span>
              <a className="transition-colors hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a className="transition-colors hover:text-white" href={`tel:${siteConfig.phone.href}`}>{siteConfig.phone.display}</a>
            </address>
          </div>
          <FooterColumn title={id ? "Perusahaan" : "Company"} links={companyLinks.map((link) => ({ label: link.label, href: localizePath(locale, link.href) }))} />
          <FooterColumn title={dictionary.nav.products} links={products.map((p) => ({ label: p.name, href: localizePath(locale, `/products/${p.slug}`) }))} />
          <FooterColumn title="Legal" links={legalLinks.map((link) => ({ label: link.label, href: localizePath(locale, link.href) }))} />
        </div>
        <p className="pt-7 text-xs text-white/50">© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="text-sm text-white/70 transition-colors hover:text-white" href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
