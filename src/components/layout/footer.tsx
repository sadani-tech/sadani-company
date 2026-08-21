import Link from "next/link";
import { products } from "@/config/products";
import { siteConfig } from "@/config/site";
import { Container } from "../ui/container";
import { Logo } from "./logo";

const companyLinks = [
  { label: "About", href: "/about" }, { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" }, { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo inverse />
            <p className="mt-5 text-sm font-medium text-white">{siteConfig.legalName}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">{siteConfig.description}</p>
            <address className="mt-5 text-xs not-italic leading-5 text-white/50">
              {siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}
            </address>
            <a className="mt-3 inline-flex text-xs text-white/65 transition-colors hover:text-white" href={`tel:${siteConfig.phone.href}`}>
              {siteConfig.phone.display}
            </a>
          </div>
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Products" links={products.map((p) => ({ label: p.name, href: `/products/${p.slug}` }))} />
          <FooterColumn title="Legal" links={[{ label: "Privacy policy", href: "/privacy" }, { label: "Terms of use", href: "/terms" }]} />
        </div>
        <p className="pt-7 text-xs text-white/50">© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{title}</h2><ul className="mt-4 space-y-3">{links.map((link) => <li key={link.href}><Link className="text-sm text-white/70 transition-colors hover:text-white" href={link.href}>{link.label}</Link></li>)}</ul></div>;
}
