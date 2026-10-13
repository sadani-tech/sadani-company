import type { Dictionary } from "@/i18n/dictionaries";
import { SplitText } from "./split-text";

const path = "M370 25 C240 55 60 120 58 185 C56 240 170 250 270 200 C370 150 500 95 590 102 C660 108 665 200 600 225 C520 255 340 240 250 255 C170 270 170 340 270 360 C380 382 495 420 488 490 C484 530 440 565 410 600";

/** Locked scene: a gold dot travels the winding path while the copy fades in word by word. */
export function HomeDirection({ home }: { home: Dictionary["home"] }) {
  return (
    <section className="pin direction" data-scene="direction" aria-labelledby="dir-title">
      <div className="pin__stage">
        <svg className="direction__path" viewBox="0 0 700 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="pathFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="620">
              <stop offset="0" stopColor="#F2F2F2" stopOpacity="0" />
              <stop offset=".12" stopColor="#F2F2F2" />
              <stop offset=".86" stopColor="#F2F2F2" />
              <stop offset="1" stopColor="#F2F2F2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trailFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="620">
              <stop offset="0" stopColor="#E9D38A" stopOpacity="0" />
              <stop offset=".14" stopColor="#E9D38A" />
              <stop offset="1" stopColor="#E9D38A" />
            </linearGradient>
            <linearGradient id="dotGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8C8C8C" />
              <stop offset="1" stopColor="#F2C94C" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#pathFade)" strokeWidth="30" strokeLinecap="round" />
          <path data-trail d={path} fill="none" stroke="url(#trailFade)" strokeWidth="5" strokeLinecap="round" opacity=".9" />
          <g data-dot>
            <circle r="28" fill="#EBEBEB" />
            <circle r="18" fill="url(#dotGold)" />
          </g>
        </svg>
        <div className="frame direction__inner">
          <div className="direction__content" data-dir-content>
            <p className="kicker" data-split><SplitText text={home.dirEyebrow} /></p>
            <h2 className="direction__title" id="dir-title"><SplitText text={home.dirTitle} /></h2>
            <p className="direction__body"><SplitText text={home.dirBody} /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
