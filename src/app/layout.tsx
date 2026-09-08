import type { Metadata, Viewport } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import "@fontsource-variable/manrope";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const id = locale === "id";
  const title = id ? "Sadani Teknologi Indonesia — Membangun Produk Digital" : "Sadani Teknologi Indonesia — Building Digital Products";
  const description = id ? "PT Sadani Teknologi Indonesia membangun produk digital, platform software, dan solusi teknologi untuk menyederhanakan masalah sehari-hari." : siteConfig.longDescription;
  const canonical = localizePath(locale, "/");
  return { metadataBase: new URL(siteConfig.url), title: { default: title, template: "%s — Sadani" }, description, alternates: { canonical, languages: { id: "/", en: "/en" } }, openGraph: { type: "website", locale: id ? "id_ID" : "en_ID", url: canonical, siteName: siteConfig.name, title, description, images: [{ url: "/og/opengraph-image", width: 1200, height: 630, alt: id ? "Sadani — Membangun produk digital" : "Sadani — Building digital products" }] }, twitter: { card: "summary_large_image", title, description, images: ["/og/opengraph-image"] }, icons: { icon: "/icon.svg" } };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d1712" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.longDescription,
    email: siteConfig.email,
    telephone: siteConfig.phone.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      telephone: siteConfig.phone.href,
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
  };
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return <html lang={locale}><body><PageShell locale={locale} dictionary={dictionary}>{children}</PageShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} /></body></html>;
}
