import { ArrowDownRight, MousePointer2, Sparkles } from "lucide-react";
import { HeroExperience } from "@/components/home/hero-experience";
import { featuredProducts, localizeProduct } from "@/config/products";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";

const sceneColors = ["#dd7a31", "#27785b", "#6558a6"];

export function Hero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const titleParts = dictionary.hero.title.split(" ");
  const emphasis = locale === "id" ? titleParts.slice(-2).join(" ") : titleParts.slice(-3).join(" ");
  const lead = titleParts.slice(0, locale === "id" ? -2 : -3).join(" ");
  const sceneLinks = featuredProducts.map((product, index) => ({
    href: localizePath(locale, `/products/${product.slug}`),
    color: sceneColors[index],
  }));

  return (
    <section className="hero">
      <div className="hero-aurora hero-aurora-one" />
      <div className="hero-aurora hero-aurora-two" />
      <Container className="relative">
        <div className="hero-layout">
          <div className="hero-copy-column">
            <div className="hero-badge">
              <span className="hero-badge-pulse" />
              <Sparkles size={14} />
              <span className="hero-badge-copy">{dictionary.hero.badge}</span>
            </div>
            <h1 className="hero-title mt-7">{lead} <em>{emphasis}</em></h1>
            <p className="hero-copy mt-7 max-w-xl">{dictionary.hero.copy}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={localizePath(locale, "/products")}>{dictionary.nav.explore}</ButtonLink>
              <ButtonLink href={localizePath(locale, "/about")} variant="secondary">{dictionary.hero.about}</ButtonLink>
            </div>
            <div className="hero-proof">
              <div><strong>{featuredProducts.length}</strong><span>{locale === "id" ? "produk dalam ekosistem" : "products in the ecosystem"}</span></div>
              <div><strong>01</strong><span>{locale === "id" ? "fondasi teknologi bersama" : "shared technology foundation"}</span></div>
              <div><strong>ID</strong><span>{locale === "id" ? "dibangun dari Indonesia" : "built from Indonesia"}</span></div>
            </div>
            <a href="#products" className="hero-scroll-link"><ArrowDownRight size={16} /> {dictionary.hero.scroll}</a>
          </div>

          <div className="hero-composition" aria-label="Sadani product ecosystem">
            <HeroExperience links={sceneLinks} />
            <div className="hero-live-chip"><span /><MousePointer2 size={13} /> {locale === "id" ? "Gerakkan untuk menjelajah" : "Move to explore"}</div>
            <div className="hero-core-label"><small>{dictionary.ecosystem.builtBy}</small><strong>SADANI</strong><span>TECHNOLOGY / IDEAS / IMPACT</span></div>
            {featuredProducts.map((product, index) => {
              const content = localizeProduct(product, locale);
              return (
                <a href={localizePath(locale, `/products/${product.slug}`)} key={product.slug} className={`hero-product hero-product-${index + 1}`}>
                  <span className={`hero-product-icon bg-${product.slug}`}>{product.name.charAt(0)}</span>
                  <span><small>{content.category}</small><b>{product.name}</b></span>
                  <i>0{index + 1}</i>
                </a>
              );
            })}
            <div className="hero-future"><span className="hero-product-icon bg-ink/8 text-ink">+</span><span><small>{dictionary.ecosystem.exploring}</small><b>{dictionary.ecosystem.next}</b></span></div>
          </div>
        </div>
      </Container>
      <div className="hero-ticker" aria-hidden="true"><div><span>DIGITAL PRODUCTS</span><i>✦</i><span>INTELLIGENT SYSTEMS</span><i>✦</i><span>USEFUL TECHNOLOGY</span><i>✦</i><span>BUILT IN INDONESIA</span><i>✦</i><span>DIGITAL PRODUCTS</span><i>✦</i><span>INTELLIGENT SYSTEMS</span><i>✦</i><span>USEFUL TECHNOLOGY</span><i>✦</i><span>BUILT IN INDONESIA</span></div></div>
    </section>
  );
}
