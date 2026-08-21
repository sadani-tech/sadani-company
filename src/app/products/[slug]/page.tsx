import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/products/product-visual";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getProduct, products } from "@/config/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const product = getProduct(slug); if (!product) return {}; return { title: product.name, description: product.shortDescription, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: `${product.name} — Sadani`, description: product.shortDescription, url: `/products/${product.slug}` } }; }

export default async function ProductPage({ params }: Props) {
  const { slug } = await params; const product = getProduct(slug); if (!product) notFound();
  return <><section className={`product-detail-hero tone-${product.slug}`}><Container><ButtonLink href="/products" variant="secondary" className="mb-10 border-ink/10 bg-white/60"><ArrowLeft size={16} /> All products</ButtonLink><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div><p className={`eyebrow text-${product.slug}`}>{product.category} · A Sadani product</p><h1>{product.tagline}</h1><p>{product.shortDescription}</p><ButtonLink href="/contact" className="mt-8">Talk to us about {product.name}<ArrowRight size={16} /></ButtonLink></div><ProductVisual product={product.slug} /></div></Container></section><section className="section bg-white"><Container><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24"><div><p className={`eyebrow text-${product.slug}`}>The product</p><h2 className="section-title mt-4">Built around a clearer way forward.</h2></div><div className="detail-copy"><p>{product.introduction}</p><h3>The problem it addresses</h3><p>{product.problem}</p><h3>Product philosophy</h3><p>{product.philosophy}</p></div></div></Container></section><section className="section bg-surface"><Container><p className={`eyebrow text-${product.slug}`}>Core preview</p><h2 className="section-title mt-4 max-w-2xl">A focused foundation for the product.</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{product.features.map((feature) => <article className="feature-card" key={feature.title}><CheckCircle2 size={22} className={`text-${product.slug}`} /><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div><div className="status-panel mt-10"><span>Status</span><p>{product.status}</p></div></Container></section><FinalCta /></>;
}
