import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { localizeProduct, type Product } from "@/config/products";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product, locale, dictionary }: { product: Product; locale: Locale; dictionary: Dictionary }) {
  const content = localizeProduct(product, locale);
  return <article className="product-card group"><ProductVisual product={product.slug} compact locale={locale} /><div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className={`product-category text-${product.slug}`}>{content.category}</p><h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{product.name}</h3></div><span className="card-arrow"><ArrowUpRight size={18} /></span></div><p className="mt-4 min-h-[72px] text-[15px] leading-6 text-muted">{content.shortDescription}</p><Link href={localizePath(locale, `/products/${product.slug}`)} className="stretched-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">{dictionary.common.discover} {product.name}<span aria-hidden="true">→</span></Link></div></article>;
}
