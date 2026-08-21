import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { products } from "@/config/products";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const locale = await getLocale(); return { title: locale === "id" ? "Produk" : "Products", description: locale === "id" ? "Jelajahi produk digital yang dibangun PT Sadani Teknologi Indonesia." : "Explore digital products being built by PT Sadani Teknologi Indonesia.", alternates: { canonical: localizePath(locale, "/products"), languages: { id: "/products", en: "/en/products" } } }; }

export default async function ProductsPage() { const locale = await getLocale(); const dictionary = getDictionary(locale); return <><section className="page-hero"><Container><p className="eyebrow text-green">{dictionary.productsPage.eyebrow}</p><h1>{dictionary.productsPage.title}</h1><p>{dictionary.productsPage.copy}</p></Container></section><section className="pb-24 sm:pb-32"><Container><div className="grid gap-5 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.slug} product={product} locale={locale} dictionary={dictionary} />)}</div><div className="future-card mt-5"><span className="future-mark">+</span><div><h2 className="text-lg font-semibold text-ink">{dictionary.productsPage.portfolio}</h2><p className="mt-1 text-sm leading-6 text-muted">{dictionary.productsPage.portfolioCopy}</p></div></div></Container></section><FinalCta locale={locale} dictionary={dictionary} /></>; }
