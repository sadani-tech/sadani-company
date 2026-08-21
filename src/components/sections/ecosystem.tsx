import { Plus } from "lucide-react";
import { products } from "@/config/products";
import { Container } from "../ui/container";
import { SectionHeading } from "./section-heading";

export function Ecosystem() {
  return <section className="section overflow-hidden bg-ink text-white"><Container><SectionHeading eyebrow="The ecosystem" title="One company. Multiple ideas." description="Sadani is the shared foundation behind products made for different parts of everyday life." light /><div className="ecosystem mt-12 lg:mt-16"><div className="ecosystem-lines" aria-hidden="true"><span /><span /><span /><span /></div><div className="ecosystem-center"><span className="text-[10px] uppercase tracking-[.2em] text-white/45">Built by</span><strong>SADANI</strong></div><div className="ecosystem-products">{products.map((product, i) => <a href={`/products/${product.slug}`} key={product.slug} className={`ecosystem-node ecosystem-node-${i + 1}`}><span className={`node-dot bg-${product.slug}`} /><span><small>{product.category}</small><b>{product.name}</b></span></a>)}<div className="ecosystem-node ecosystem-node-4"><span className="node-dot bg-white/15"><Plus size={14} /></span><span><small>Exploring</small><b>What’s next?</b></span></div></div></div></Container></section>;
}
