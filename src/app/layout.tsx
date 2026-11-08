import type { Metadata, Viewport } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import "@fontsource-variable/montserrat";
import "./globals.css";
import "./sadatech.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = `${siteConfig.name} — ${siteConfig.description}`;
  const description = locale === "id"
    ? "Sadatech membangun dan mengoperasikan produk digital, platform software, dan solusi teknologi untuk menyederhanakan masalah sehari-hari."
    : siteConfig.longDescription;
  const canonical = localizePath(locale, "/");
  const images = [{ url: "/brand/sadatech-og-image.jpg", width: 1200, height: 630, alt: title }];

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: { default: title, template: `%s — ${siteConfig.name}` },
    description,
    alternates: { canonical, languages: { id: "/", en: "/en" } },
    openGraph: { type: "website", locale: locale === "id" ? "id_ID" : "en_ID", url: canonical, siteName: siteConfig.name, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
    icons: {
      icon: [
        { url: "/brand/icons/favicon.svg?v=4", type: "image/svg+xml" },
        { url: "/favicon.ico?v=4", sizes: "any" },
        { url: "/brand/icons/favicon-32.png?v=4", type: "image/png", sizes: "32x32" },
        { url: "/brand/icons/favicon-16.png?v=4", type: "image/png", sizes: "16x16" },
      ],
      apple: [{ url: "/brand/icons/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#161719" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: new URL("/brand/sadatech-symbol-primary.svg", siteConfig.url).toString(),
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
