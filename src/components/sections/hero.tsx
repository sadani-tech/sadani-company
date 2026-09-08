import { ArrowDownRight, Sparkles } from "lucide-react";
import { featuredProducts, localizeProduct } from "@/config/products";
import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

export function Hero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const titleParts = dictionary.hero.title.split(" ");
  const emphasis = locale === "id" ? titleParts.slice(-2).join(" ") : titleParts.slice(-3).join(" ");
  const lead = titleParts.slice(0, locale === "id" ? -2 : -3).join(" ");
  return <section className="hero"><Container className="relative"><div className="grid min-h-[calc(100svh-72px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr] lg:py-20"><div className="relative z-10"><div className="hero-badge"><Sparkles size={14} /> {dictionary.hero.badge}</div><h1 className="hero-title mt-7">{lead} <em>{emphasis}</em></h1><p className="hero-copy mt-7 max-w-xl">{dictionary.hero.copy}</p><div className="mt-9 flex flex-wrap gap-3"><ButtonLink href={localizePath(locale, "/products")}>{dictionary.nav.explore}</ButtonLink><ButtonLink href={localizePath(locale, "/about")} variant="secondary">{dictionary.hero.about}</ButtonLink></div><a href="#products" className="mt-12 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-muted transition-colors hover:text-ink sm:inline-flex"><ArrowDownRight size={16} /> {dictionary.hero.scroll}</a></div><div className="hero-composition" aria-label="Sadani product ecosystem"><div className="hero-orbit" aria-hidden="true" /><div className="hero-core"><span>S</span><small>Sadani</small></div>{featuredProducts.map((product, i) => { const content = localizeProduct(product, locale); return <a href={localizePath(locale, `/products/${product.slug}`)} key={product.slug} className={`hero-product hero-product-${i + 1}`}><span className={`hero-product-icon bg-${product.slug}`}>{product.name.charAt(0)}</span><span><small>{content.category}</small><b>{product.name}</b></span></a>; })}<div className="hero-future"><PlusIcon /><span><small>{dictionary.ecosystem.exploring}</small><b>{dictionary.ecosystem.next}</b></span></div></div></div></Container></section>;
}

function PlusIcon() { return <span className="hero-product-icon bg-ink/8 text-ink">+</span>; }
