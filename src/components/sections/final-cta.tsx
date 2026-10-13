import type { CSSProperties } from "react";
import { Aurora } from "../home/aurora";
import { SplitText } from "../home/split-text";
import { ActionLink } from "../ui/action-link";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

/** Closing call to action with the aurora and "Sadani" wordmark. On the homepage it reveals on scroll. */
export function FinalCta({ locale, dictionary, home = false }: { locale: Locale; dictionary: Dictionary; home?: boolean }) {
  const title = home ? dictionary.home.buildTitle : dictionary.common.finalTitle;
  const copy = home ? dictionary.home.buildBody : dictionary.common.finalCopy;
  const reveal = home ? "reveal" : "";
  const delay = (d: string) => (home ? ({ "--rd": d } as CSSProperties) : undefined);
  return (
    <section className="cta" id={home ? "contact" : undefined} aria-labelledby="cta-title">
      <div className="frame cta__inner">
        <h2 className={`cta__title ${reveal}`} id="cta-title" data-split={home || undefined}>{home ? <SplitText text={title} /> : title}</h2>
        <p className={`cta__body ${reveal}`} style={delay(".1s")}>{copy}</p>
        <div className={`btn-row cta__btns ${reveal}`} style={delay(".2s")}>
          <ActionLink href={localizePath(locale, "/contact")}>{home ? dictionary.home.start : dictionary.common.talk}</ActionLink>
          <ActionLink href={home ? "#products" : localizePath(locale, "/products")} variant="light">{home ? dictionary.home.explore : dictionary.nav.explore}</ActionLink>
        </div>
      </div>
      <div className="cta__aurora">
        <Aurora wide />
        <p className={`cta__word ${home ? "" : "is-in"}`} data-wordmark={home || undefined} aria-hidden="true">
          {"Sadani".split("").map((letter, i) => <span key={i}>{letter}</span>)}
        </p>
      </div>
    </section>
  );
}
