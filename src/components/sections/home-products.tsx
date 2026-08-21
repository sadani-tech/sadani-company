import { products } from "@/config/products";
import { ProductCard } from "../products/product-card";
import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";
import { SectionHeading } from "./section-heading";

export function HomeProducts() {
  return <section id="products" className="section bg-surface"><Container><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow="Products we’re building" title="Useful ideas, shaped into products." description="Each product begins with a practical problem and a simpler way it could be solved." /><ButtonLink href="/products" variant="secondary" className="shrink-0 self-start sm:self-auto">View all products</ButtonLink></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div><div className="future-card mt-5"><span className="future-mark">+</span><div><h3 className="text-lg font-semibold text-ink">What’s next?</h3><p className="mt-1 text-sm leading-6 text-muted">We’re continuously experimenting with new ideas, technologies, and digital products.</p></div></div></Container></section>;
}
