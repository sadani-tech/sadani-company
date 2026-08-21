import type { Metadata } from "next";
import { ArrowUpRight, Gauge, Lightbulb, RefreshCcw, Shapes } from "lucide-react";
import { FinalCta } from "@/components/sections/final-cta";
import { SectionHeading } from "@/components/sections/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const locale = await getLocale(); return { title: locale === "id" ? "Tentang" : "About", description: locale === "id" ? "Sadani adalah perusahaan teknologi Indonesia yang mengubah ide berguna menjadi produk digital." : "Sadani is an Indonesian technology company turning useful ideas into digital products.", alternates: { canonical: localizePath(locale, "/about"), languages: { id: "/about", en: "/en/about" } } }; }

const values = [
  { icon: Lightbulb, title: "Build useful things", copy: "Technology should solve real problems instead of existing only for novelty." },
  { icon: Shapes, title: "Keep things simple", copy: "Complex technology should result in experiences that feel clear and natural." },
  { icon: RefreshCcw, title: "Learn through products", copy: "Products improve through experimentation, thoughtful observation, and user feedback." },
  { icon: Gauge, title: "Technology as leverage", copy: "Modern software and AI help focused teams turn ambitious ideas into working products efficiently." },
];

export default async function AboutPage() { const locale = await getLocale(); const dictionary = getDictionary(locale); return <><section className="page-hero"><Container><p className="eyebrow text-green">{dictionary.about.eyebrow}</p><h1>{dictionary.about.title}</h1><p>{dictionary.about.copy}</p></Container></section><section className="section bg-white"><Container><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><SectionHeading eyebrow={dictionary.about.belief} title={dictionary.about.beliefTitle} description={dictionary.about.beliefCopy} /><div className="grid gap-4 sm:grid-cols-2">{values.map(({ icon: Icon }, index) => { const [title, copy] = dictionary.about.values[index]; return <article className="value-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{copy}</p></article>; })}</div></div></Container></section><section className="section bg-ink text-white"><Container><div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24"><div className="about-grid" aria-hidden="true"><span>S</span>{[1,2,3,4,5,6,7,8].map((item) => <i key={item} />)}</div><div><SectionHeading eyebrow={dictionary.about.indonesia} title={dictionary.about.global} description={dictionary.about.globalCopy} light /><ButtonLink href={localizePath(locale, "/products")} variant="secondary" className="mt-8 border-white/20 text-white hover:bg-white/10">{locale === "id" ? "Lihat produk kami" : "See our products"} <ArrowUpRight size={16} /></ButtonLink></div></div></Container></section><section className="section bg-surface"><Container><div className="vision-block text-left"><p className="eyebrow text-green">{dictionary.about.road}</p><h2>{dictionary.about.roadTitle}</h2><p>{dictionary.about.roadCopy}</p></div></Container></section><FinalCta locale={locale} dictionary={dictionary} /></>; }
