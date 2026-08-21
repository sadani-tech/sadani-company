import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { FinalCta } from "@/components/sections/final-cta";
import { Container } from "@/components/ui/container";
import { products } from "@/config/products";

export const metadata: Metadata = { title: "Products", description: "Explore digital products being built by PT Sadani Teknologi Indonesia.", alternates: { canonical: "/products" } };

export default function ProductsPage() { return <><section className="page-hero"><Container><p className="eyebrow text-green">Sadani products</p><h1>Different problems.<br /><em>One drive to build.</em></h1><p>Our products explore commerce, financial clarity, career direction, and the useful ideas still ahead.</p></Container></section><section className="pb-24 sm:pb-32"><Container><div className="grid gap-5 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div><div className="future-card mt-5"><span className="future-mark">+</span><div><h2 className="text-lg font-semibold text-ink">The portfolio keeps evolving.</h2><p className="mt-1 text-sm leading-6 text-muted">New products will appear here when they are ready to be shared.</p></div></div></Container></section><FinalCta /></>; }
