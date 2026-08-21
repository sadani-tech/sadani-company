import { products } from "@/config/products";
import { ProductCard } from "../products/product-card";
import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";
import { SectionHeading } from "./section-heading";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

export function HomeProducts({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return <section id="products" className="section bg-surface"><Container><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><SectionHeading eyebrow={dictionary.homeProducts.eyebrow} title={dictionary.homeProducts.title} description={dictionary.homeProducts.copy} /><ButtonLink href={localizePath(locale, "/products")} variant="secondary" className="shrink-0 self-start sm:self-auto">{dictionary.homeProducts.viewAll}</ButtonLink></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{products.map((product) => <ProductCard product={product} locale={locale} dictionary={dictionary} key={product.slug} />)}</div><div className="future-card mt-5"><span className="future-mark">+</span><div><h3 className="text-lg font-semibold text-ink">{dictionary.homeProducts.next}</h3><p className="mt-1 text-sm leading-6 text-muted">{dictionary.homeProducts.nextCopy}</p></div></div></Container></section>;
}
