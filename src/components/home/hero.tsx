import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";
import { ActionLink } from "../ui/action-link";
import { Aurora } from "./aurora";
import { SplitText } from "./split-text";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;
const star = "M10 0l2.2 6.2L18.7 5l-4.3 5 4.3 5-6.5-1.2L10 20l-2.2-6.2L1.3 15l4.3-5-4.3-5 6.5 1.2z";

export function HomeHero({ locale, home }: { locale: Locale; home: Dictionary["home"] }) {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__top">
          <div className="frame hero__head">
            <h1 className="hero__title" id="hero-title">
              <span className="hero__l1"><SplitText text={home.heroL1} /></span>
              <span className="hero__l2"><SplitText text={home.heroL2} /></span>
            </h1>
            <div className="hero__side">
              <div className="btn-row intro-fade" style={delay("1.1s")}>
                <ActionLink href={localizePath(locale, "/contact")}>{home.start}</ActionLink>
                <ActionLink href="#company" variant="light">{home.about}</ActionLink>
              </div>
              <p className="hero__copy intro-fade" style={delay("1.25s")}>©Copyright {new Date().getFullYear()} - Sadani Tech.</p>
            </div>
          </div>
        </div>

        <div className="hero__stage">
          <Aurora />
          <div className="frame hero__stage-inner">
            <p className="hero__note intro-fade" style={delay("1.4s")}>{home.note}</p>
          </div>
        </div>

        <div className="hero__logo" data-hero-logo>
          <div className="hero__logo-tilt" data-tilt>
            <Image src="/brand/sadani-logo-3d.webp" alt={locale === "id" ? "Logo 3D Sadani berwarna perak dan emas" : "Sadani 3D logo mark in brushed silver and gold"} width={1162} height={1272} unoptimized priority />
          </div>
        </div>

        <a className="scroll-pill scroll-pill--glass hero__scroll intro-fade" style={delay("1.7s")} href="#company">
          <span>{home.scroll}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
        </a>
      </section>

      {/* Four identical groups so the loop always covers the screen; HomeMotion sets the exact shift. */}
      <div className="marquee">
        <p className="sr-only">{home.marquee.join(", ")}</p>
        <div className="marquee__track" aria-hidden="true">
          {[0, 1, 2, 3].map((group) => (
            <div className="marquee__group" key={group}>
              {home.marquee.map((item) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  <svg className="star" viewBox="0 0 20 20"><path d={star} /></svg>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
