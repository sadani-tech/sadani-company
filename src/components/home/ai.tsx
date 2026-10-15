import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { SplitText } from "./split-text";

/** Locked scene: the robot image opens out of a centred window, then a white halo settles behind the copy. */
export function HomeAi({ home }: { home: Dictionary["home"] }) {
  return (
    <section className="pin ai" data-scene="ai" aria-labelledby="ai-title">
      <div className="pin__stage">
        <div className="ai__media" data-ai-media>
          <Image src="/home/ai-robot.webp" alt="" width={2400} height={1340} data-ai-img unoptimized />
          <span className="ai__halo" data-ai-halo aria-hidden="true" />
        </div>
        <div className="frame ai__content" data-ai-content>
          <div className="ai__head">
            <p className="kicker" data-split><SplitText text={home.aiEyebrow} /></p>
            <h2 className="h2 ai__title" id="ai-title">
              <span className="ai__l1"><SplitText text={home.aiL1} /></span>
              <span className="ai__l2"><SplitText text={home.aiL2} /></span>
            </h2>
          </div>
          <p className="ai__body">{home.aiBody}</p>
        </div>
      </div>
    </section>
  );
}
