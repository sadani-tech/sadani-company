import { Fragment, type CSSProperties } from "react";

/**
 * Renders copy word by word for the homepage animations. "\n" marks a line break.
 * - "mask":  each word rises out of a mask (.w > .w__i, staggered with --i)
 * - "color": each word is a .cw span that the About scene turns from grey to ink
 * Screen readers get the plain sentence once; the animated copy is aria-hidden.
 */
export function SplitText({ text, mode = "mask" }: { text: string; mode?: "mask" | "color" }) {
  let index = 0;
  const lines = text.split("\n").map((line) => line.split(/\s+/).filter(Boolean).map((word) => ({ word, i: index++ })));
  return (
    <>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((words, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {words.map(({ word, i }, wi) => (
              <Fragment key={i}>
                {wi > 0 && " "}
                {mode === "color"
                  ? <span className="cw">{word}</span>
                  : <span className="w"><span className="w__i" style={{ "--i": i } as CSSProperties}>{word}</span></span>}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </>
  );
}

/** Plain copy with "\n" rendered as line breaks. */
export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>);
}
