import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/config/products";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card group"><ProductVisual product={product.slug} compact /><div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className={`product-category text-${product.slug}`}>{product.category}</p><h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{product.name}</h3></div><span className="card-arrow"><ArrowUpRight size={18} /></span></div><p className="mt-4 min-h-[72px] text-[15px] leading-6 text-muted">{product.shortDescription}</p><Link href={`/products/${product.slug}`} className="stretched-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">Discover {product.name}<span aria-hidden="true">→</span></Link></div></article>;
}
