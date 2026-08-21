import { ArrowUpRight, Bot, Boxes, Braces, CloudCog, Database, Smartphone, Workflow } from "lucide-react";
import { Ecosystem } from "@/components/sections/ecosystem";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HomeProducts } from "@/components/sections/home-products";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

const capabilityIcons = [Braces, Smartphone, CloudCog, Bot, Workflow, Database];

export default async function Home() {
  const locale = await getLocale(); const dictionary = getDictionary(locale);
  return <><Hero locale={locale} dictionary={dictionary} /><Ecosystem locale={locale} dictionary={dictionary} /><HomeProducts locale={locale} dictionary={dictionary} /><section className="section bg-white"><Container><div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><SectionHeading eyebrow={dictionary.why.eyebrow} title={dictionary.why.title} description={dictionary.why.copy} /><div className="principle-list">{dictionary.why.items.map(([title, copy], index) => <Principle key={title} number={`0${index + 1}`} title={title} copy={copy} />)}</div></div></Container></section><section className="section bg-surface"><Container><div className="ai-panel"><div className="ai-symbol" aria-hidden="true"><Boxes size={54} strokeWidth={1.25} /></div><div><p className="eyebrow text-green">{dictionary.ai.eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-ink sm:text-4xl">{dictionary.ai.title}</h2><p className="section-copy mt-5">{dictionary.ai.copy}</p></div></div></Container></section><section className="section bg-ink text-white"><Container><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><SectionHeading eyebrow={dictionary.technology.eyebrow} title={dictionary.technology.title} description={dictionary.technology.copy} light /><ButtonLink href={localizePath(locale, "/about")} variant="secondary" className="self-start border-white/20 text-white hover:bg-white/10">{dictionary.technology.approach} <ArrowUpRight size={16} /></ButtonLink></div><div className="capability-grid mt-12">{dictionary.technology.capabilities.map(([title, copy], index) => { const Icon = capabilityIcons[index]; return <div className="capability" key={title}><Icon size={23} strokeWidth={1.6} /><h3>{title}</h3><p>{copy}</p></div>; })}</div></Container></section><section className="section bg-white"><Container><div className="vision-block"><p className="eyebrow text-green">{dictionary.vision.eyebrow}</p><h2>{dictionary.vision.title}</h2><p>{dictionary.vision.copy}</p></div></Container></section><FinalCta locale={locale} dictionary={dictionary} /></>;
}

function Principle({ number, title, copy }: { number: string; title: string; copy: string }) { return <div className="principle"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>; }
