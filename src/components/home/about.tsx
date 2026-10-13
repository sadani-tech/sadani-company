import type { CSSProperties } from "react";
import { products } from "@/config/products";
import type { Dictionary } from "@/i18n/dictionaries";
import { Lines, SplitText } from "./split-text";

const revealDelay = (d: string) => ({ "--rd": d }) as CSSProperties;

export function HomeAbout({ home }: { home: Dictionary["home"] }) {
  const numbers = [String(products.length).padStart(2, "0"), "01", "ID"];
  return (
    <>
      {/* Locked scene: the sentence turns from grey to ink word by word, then the card rises. */}
      <section className="pin about" id="company" data-scene="about" aria-labelledby="about-title">
        <div className="pin__stage">
          <div className="about__grid" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="frame about__inner">
            <p className="kicker about__eyebrow">{home.aboutEyebrow}</p>
            <h2 className="about__big" id="about-title"><SplitText text={home.aboutTitle} mode="color" /></h2>
            <div className="about__card" data-about-card>
              <p>{home.aboutCard}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="scale" aria-labelledby="scale-title">
        <div className="frame">
          <h2 className="h2 scale__title reveal" id="scale-title" data-split><SplitText text={home.scaleTitle} /></h2>
          <div className="scale__row">
            <p className="scale__lead reveal">{home.scaleLead}</p>
            <div className="stats">
              {home.stats.map(([title, copy], index) => (
                <article className="stat reveal" style={revealDelay(`${0.05 + index * 0.1}s`)} key={title}>
                  <div className="stat__head"><span className="stat__num">{numbers[index]}</span><h3><Lines text={title} /></h3></div>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
