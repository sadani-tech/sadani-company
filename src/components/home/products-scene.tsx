import Image from "next/image";
import Link from "next/link";
import { localizeProduct, products } from "@/config/products";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { ActionLink } from "../ui/action-link";
import { SplitText } from "./split-text";

/**
 * Locked scene: scrolling steps through every product (image wipe, title swap,
 * rolling counter), then dissolves into the "next product could be yours" layer.
 * HomeMotion drives the classes; the first product is the server-rendered state.
 */
export function HomeProductsScene({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const home = dictionary.home;
  const items = products.map((product) => localizeProduct(product, locale));
  const count = (n: number) => home.productCount.replace("{n}", String(n)).replace("{total}", String(items.length));
  const active = (i: number) => (i === 0 ? "is-active" : "");

  return (
    <section className="pin projects" id="products" data-scene="projects" aria-label={dictionary.nav.products}>
      <div className="pin__stage">
        <div className="proj" data-proj data-dir="down">
          <div className="proj__card">
            <div className="proj__card-bg" aria-hidden="true">
              {items.map((item, i) => <Image key={item.slug} src={item.cover} alt="" width={1200} height={800} className={active(i)} data-i={i} unoptimized />)}
            </div>
            <div className="proj__titles">
              {items.map((item, i) => (
                <div className={`swap ${active(i)}`} data-i={i} key={item.slug}>
                  <p className="proj__cat"><SplitText text={item.category} /></p>
                  <h3 className="proj__name"><SplitText text={item.name} /></h3>
                </div>
              ))}
            </div>
            <div className="proj__count" aria-live="polite">
              <span className="sr-only" data-proj-sr data-template={home.productCount.replace("{total}", String(items.length))}>{count(1)}</span>
              <span className="proj__count-now" aria-hidden="true">
                <span>0</span>
                <span className="proj__roll"><span data-roll>{items.map((item, i) => <b key={item.slug}>{i + 1}</b>)}</span></span>
              </span>
              <span className="proj__count-total" aria-hidden="true">/ {String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="proj__progress" aria-hidden="true"><i data-proj-bar /></div>
          </div>

          <div className="proj__media" aria-hidden="true">
            {items.map((item, i) => <Image key={item.slug} src={item.cover} alt="" width={1200} height={800} className={active(i)} data-i={i} unoptimized priority={i === 0} />)}
          </div>

          <div className="proj__info">
            <div className="proj__lead">
              <div className="proj__descs">
                {items.map((item, i) => <p className={`swap ${active(i)}`} data-i={i} key={item.slug}><SplitText text={item.shortDescription} /></p>)}
              </div>
              <div className="proj__more" data-proj-more>
                {items.map((item, i) => (
                  <Link key={item.slug} href={localizePath(locale, `/products/${item.slug}`)} className={`btn btn--light proj__btn ${active(i)}`}>
                    {home.more}<span className="sr-only"> — {item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <span className="scroll-pill">
              <span>{home.scroll}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
            </span>
          </div>
        </div>

        <div className="proj__veil" data-veil aria-hidden="true" />

        <div className="next" data-next>
          <span className="next__glow next__glow--l" data-glow-l aria-hidden="true" />
          <span className="next__glow next__glow--r" data-glow-r aria-hidden="true" />
          <div className="frame next__inner">
            <h2 className="h2 next__title"><SplitText text={home.nextTitle} /></h2>
            <div className="next__side">
              <p>{home.nextBody}</p>
              <ActionLink href={localizePath(locale, "/contact")}>{home.start}</ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
