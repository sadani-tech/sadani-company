import { Container } from "../ui/container";
import type { Locale } from "@/i18n/config";

export function LegalPage({
  eyebrow,
  title,
  intro,
  locale,
  draft = true,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  locale: Locale;
  /** When true, shows the "draft for legal review" notice. */
  draft?: boolean;
  /** Shown instead of the draft notice when `draft` is false. */
  updated?: string;
  children: React.ReactNode;
}) {
  const id = locale === "id";
  return (
    <>
      <section className="page-hero page-hero-compact">
        <Container>
          <p className="eyebrow text-green">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </Container>
      </section>
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="legal-content">
            {draft ? (
              <div className="legal-notice">
                <strong>{id ? "Draf untuk tinjauan hukum" : "Draft for legal review"}</strong>
                <p>
                  {id
                    ? "Halaman ini merupakan draf berbahasa sederhana dan harus ditinjau penasihat hukum yang kompeten sebelum dipublikasikan."
                    : "This page is a plain-language placeholder and must be reviewed by qualified counsel before publication."}
                </p>
              </div>
            ) : updated ? (
              <p className="legal-updated">{updated}</p>
            ) : null}
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
