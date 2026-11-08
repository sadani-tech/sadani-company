import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";

/** Keep each page's localized copy and URL in its search and social previews. */
export function createPageMetadata(locale: Locale, metadata: Metadata): Metadata {
  const title = `${typeof metadata.title === "string" ? metadata.title : siteConfig.name} — ${siteConfig.name}`;
  const description = metadata.description ?? siteConfig.longDescription;
  const canonical = metadata.alternates?.canonical;
  const url = typeof canonical === "string" || canonical instanceof URL ? canonical : canonical?.url;
  const images = [{ url: "/brand/sadatech-og-image.jpg", width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.description}` }];

  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "website", siteName: siteConfig.name, locale: locale === "id" ? "id_ID" : "en_ID", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
