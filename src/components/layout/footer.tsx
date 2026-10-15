import Link from "next/link";
import { products } from "@/config/products";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { Logo } from "./logo";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const id = locale === "id";
  const companyLinks = [
    { label: dictionary.nav.about, href: "/about" },
    { label: dictionary.nav.products, href: "/products" },
    { label: dictionary.nav.pricing, href: "/pricing" },
    { label: dictionary.nav.careers, href: "/careers" },
    { label: dictionary.nav.contact, href: "/contact" },
  ];
  const legalLinks = [
    { label: id ? "Kebijakan privasi" : "Privacy policy", href: "/privacy" },
    { label: id ? "Ketentuan penggunaan" : "Terms of use", href: "/terms" },
    { label: dictionary.nav.payments, href: "/payments" },
    { label: id ? "Kebijakan pengembalian dana" : "Refund policy", href: "/refunds" },
  ];

  return (
    <footer className="footer">
      <div className="frame">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" href={localizePath(locale, "/")} />
            <p>
              {id ? "PT Sadani Teknologi Indonesia membangun dan mengelola produk digital, platform perangkat lunak, dan solusi teknologi untuk menyederhanakan masalah sehari-hari." : siteConfig.longDescription}
            </p>
          </div>
          <div className="footer__cols">
            <FooterColumn title={id ? "Perusahaan" : "Company"} links={companyLinks.map((link) => ({ label: link.label, href: localizePath(locale, link.href) }))} />
            <FooterColumn title={dictionary.nav.products} links={products.map((p) => ({ label: p.name, href: localizePath(locale, `/products/${p.slug}`) }))} />
            <FooterColumn title="Legal" links={legalLinks.map((link) => ({ label: link.label, href: localizePath(locale, link.href) }))} />
            <div className="footer__col footer__contact">
              <h2>{dictionary.nav.contact}</h2>
              <dl>
                <div><dt>E:</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
                <div><dt>P:</dt><dd><a href={`tel:${siteConfig.phone.href}`}>{siteConfig.phone.display}</a></dd></div>
                <div><dt>A:</dt><dd>{siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <p className="footer__legal">© {new Date().getFullYear()} {siteConfig.legalName}. {id ? "Hak cipta dilindungi." : "All rights reserved."}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div className="footer__col">
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
