import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { SplitText } from "./split-text";

const icons = ["web", "mobile", "cloud", "ai", "api", "data"];

/** Heading stays locked on the left while the capability list scrolls past a focus line. */
export function HomeCapabilities({ home }: { home: Dictionary["home"] }) {
  return (
    <section className="caps" id="features" aria-labelledby="caps-title">
      <div className="caps__panel">
        <div className="caps__panel-inner">
          <h2 className="h2 reveal" id="caps-title" data-split><SplitText text={home.capTitle} /></h2>
          <p className="reveal" style={{ "--rd": ".15s" } as CSSProperties}>{home.capLead}</p>
          <div className="caps__meter" aria-hidden="true"><i data-caps-meter /></div>
        </div>
      </div>
      <ul className="caps__list" data-caps>
        {home.capabilities.map(([title, copy], i) => (
          <li className="cap" key={title}>
            <Image src={`/home/icons/${icons[i]}.svg`} alt="" width={48} height={48} unoptimized />
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
