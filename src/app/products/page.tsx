import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { products } from "@/config/products";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPageMetadata(locale, {
    title: locale === "id" ? "Produk & Proyek" : "Products & Projects",
    description: locale === "id" ? "Kenali produk aplikasi dan proyek website Sadatech, fitur, masalah yang diselesaikan, dan status pengembangannya." : "Explore Sadatech applications and website projects, their features, the problems they address and their development status.",
    alternates: { canonical: localizePath(locale, "/products"), languages: { id: "/products", en: "/en/products" } },
  });
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const groups = [
    { kind: "product", title: locale === "id" ? "Aplikasi & platform" : "Applications & platforms" },
    { kind: "project", title: locale === "id" ? "Proyek operasional & website" : "Operations & website projects" },
  ];
  return <>
    <section className="page-hero"><Container><p className="eyebrow text-gold">{dictionary.productsPage.eyebrow}</p><h1>{dictionary.productsPage.title}</h1><p>{dictionary.productsPage.copy}</p></Container></section>
    <section className="pb-24 sm:pb-32"><Container>
      {groups.map(group => <div key={group.kind} className="portfolio-group"><h2 className="mb-7 text-2xl font-semibold tracking-tight">{group.title}</h2><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.filter(product => product.kind === group.kind).map(product => <ProductCard key={product.slug} product={product} locale={locale} dictionary={dictionary} />)}</div></div>)}
    </Container></section>
    <FinalCta locale={locale} dictionary={dictionary} />
  </>;
}
