import { ButtonLink } from "../ui/button-link";
import { Container } from "../ui/container";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizePath, type Locale } from "@/i18n/config";

export function FinalCta({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return <section className="bg-green py-20 text-white sm:py-28"><Container><div className="grid items-end gap-9 lg:grid-cols-[1fr_auto]"><div className="max-w-3xl"><p className="eyebrow text-mint">{dictionary.common.buildUseful}</p><h2 className="section-title mt-4 text-white">{dictionary.common.finalTitle}</h2><p className="section-copy mt-5 max-w-2xl text-white/70">{dictionary.common.finalCopy}</p></div><div className="flex flex-wrap gap-3"><ButtonLink href={localizePath(locale, "/products")} variant="light">{dictionary.nav.explore}</ButtonLink><ButtonLink href={localizePath(locale, "/contact")} variant="secondary" className="border-white/25 text-white hover:bg-white/10">{dictionary.common.talk}</ButtonLink></div></div></Container></section>;
}
