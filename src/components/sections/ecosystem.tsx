import { Plus } from "lucide-react";
import { featuredProducts, localizeProduct } from "@/config/products";
import { Container } from "../ui/container";
import { SectionHeading } from "./section-heading";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

export function Ecosystem({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return <section className="section overflow-hidden bg-ink text-white"><Container><SectionHeading eyebrow={dictionary.ecosystem.eyebrow} title={dictionary.ecosystem.title} description={dictionary.ecosystem.copy} light /><div className="ecosystem mt-12 lg:mt-16"><div className="ecosystem-lines" aria-hidden="true"><span /><span /><span /><span /></div><div className="ecosystem-center"><span className="text-[10px] uppercase tracking-[.2em] text-white/45">{dictionary.ecosystem.builtBy}</span><strong>SADANI</strong></div><div className="ecosystem-products">{featuredProducts.map((product, i) => { const content = localizeProduct(product, locale); return <a href={localizePath(locale, `/products/${product.slug}`)} key={product.slug} className={`ecosystem-node ecosystem-node-${i + 1}`}><span className={`node-dot bg-${product.slug}`} /><span><small>{content.category}</small><b>{product.name}</b></span></a>; })}<div className="ecosystem-node ecosystem-node-4"><span className="node-dot bg-white/15"><Plus size={14} /></span><span><small>{dictionary.ecosystem.exploring}</small><b>{dictionary.ecosystem.next}</b></span></div></div></div></Container></section>;
}
