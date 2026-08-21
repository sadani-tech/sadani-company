import { ArrowDownRight, Sparkles } from "lucide-react";
import { products } from "@/config/products";
import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";

export function Hero() {
  return <section className="hero"><Container className="relative"><div className="grid min-h-[calc(100svh-72px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20"><div className="relative z-10"><div className="hero-badge"><Sparkles size={14} /> Indonesian ideas, built for real life</div><h1 className="hero-title mt-7">Technology for ideas that <em>deserve to exist.</em></h1><p className="hero-copy mt-7 max-w-xl">PT Sadani Teknologi Indonesia builds digital products, platforms, and technology solutions designed to simplify real-world problems.</p><div className="mt-9 flex flex-wrap gap-3"><ButtonLink href="/products">Explore our products</ButtonLink><ButtonLink href="/about" variant="secondary">About Sadani</ButtonLink></div><a href="#products" className="mt-12 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-muted transition-colors hover:text-ink sm:inline-flex"><ArrowDownRight size={16} /> See what we’re building</a></div><div className="hero-composition" aria-label="Sadani product ecosystem"><div className="hero-orbit" aria-hidden="true" /><div className="hero-core"><span>S</span><small>Sadani</small></div>{products.map((product, i) => <a href={`/products/${product.slug}`} key={product.slug} className={`hero-product hero-product-${i + 1}`}><span className={`hero-product-icon bg-${product.slug}`}>{product.name.charAt(0)}</span><span><small>{product.category}</small><b>{product.name}</b></span></a>)}<div className="hero-future"><PlusIcon /><span><small>Always exploring</small><b>The next idea</b></span></div></div></div></Container></section>;
}

function PlusIcon() { return <span className="hero-product-icon bg-ink/8 text-ink">+</span>; }
