import type { Dictionary } from "@/i18n/dictionaries";
import { SplitText } from "./split-text";

/** Locked scene: scrolling scrubs the computer video between four resting frames, one per step. */
export function HomeBuild({ home }: { home: Dictionary["home"] }) {
  const steps = [{ title: home.buildTitle, body: home.buildBody }, ...home.steps.map(([title, body]) => ({ title, body }))];
  return (
    <section className="pin build" id="approach" data-scene="build" aria-label={home.buildTitle.replace("\n", " ")}>
      <div className="pin__stage">
        <div className="build__vbox" data-vbox>
          <video className="build__video" data-video muted playsInline preload="none" poster="/home/video/computer-poster.jpg" aria-hidden="true" disablePictureInPicture>
            <source src="/home/video/computer-scrub.mp4" type='video/mp4; codecs="avc1.64001F"' />
            <source src="/home/video/computer-scrub.webm" type='video/webm; codecs="vp9"' />
          </video>
        </div>

        <div className="frame build__steps">
          {steps.map((step, i) => {
            const Heading = i === 0 ? "h2" : "h3";
            return (
              <div className={`bstep bstep--${i % 2 ? "right" : "left"} ${i === 0 ? "is-active" : ""}`} data-step={i} aria-hidden={i !== 0} key={i}>
                {i > 0 && <span className="bstep__num"><SplitText text={`0${i}`} /></span>}
                <Heading className="h2 bstep__title"><SplitText text={step.title} /></Heading>
                <p className="bstep__body"><SplitText text={step.body} /></p>
              </div>
            );
          })}
        </div>

        <ol className="build__dots" aria-hidden="true">
          {steps.map((_, i) => <li className={i === 0 ? "is-active" : ""} key={i} />)}
        </ol>
      </div>
    </section>
  );
}
