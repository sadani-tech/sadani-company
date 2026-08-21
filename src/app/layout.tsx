import type { Metadata, Viewport } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Sadani Teknologi Indonesia — Building Digital Products", template: "%s — Sadani" },
  description: siteConfig.longDescription,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_ID", url: "/", siteName: siteConfig.name, title: "Sadani Teknologi Indonesia — Building Digital Products", description: siteConfig.longDescription, images: [{ url: "/og/opengraph-image", width: 1200, height: 630, alt: "Sadani — Building digital products" }] },
  twitter: { card: "summary_large_image", title: "Sadani Teknologi Indonesia — Building Digital Products", description: siteConfig.longDescription, images: ["/og/opengraph-image"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d1712" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.longDescription,
    telephone: siteConfig.phone.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.province,
      addressCountry: "ID",
    },
  };
  return <html lang="en"><body><PageShell>{children}</PageShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} /></body></html>;
}
