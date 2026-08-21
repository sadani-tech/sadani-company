import type { Metadata } from "next";
import { Code2, DraftingCompass, Hammer, Lightbulb } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const locale = await getLocale(); return { title: locale === "id" ? "Karier" : "Careers", description: locale === "id" ? "Pelajari peluang masa depan untuk membangun produk digital berguna bersama Sadani." : "Learn about future opportunities to build useful digital products with Sadani.", alternates: { canonical: localizePath(locale, "/careers"), languages: { id: "/careers", en: "/en/careers" } } }; }
const people = [{ icon: Code2, label: "Engineers" }, { icon: DraftingCompass, label: "Designers" }, { icon: Lightbulb, label: "Product thinkers" }, { icon: Hammer, label: "Builders" }];

export default async function CareersPage() { const locale = await getLocale(); const dictionary = getDictionary(locale); return <><section className="page-hero"><Container><p className="eyebrow text-green">{dictionary.careers.eyebrow}</p><h1>{dictionary.careers.title}</h1><p>{dictionary.careers.copy}</p></Container></section><section className="pb-24 sm:pb-32"><Container><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{people.map(({ icon: Icon }, index) => <div className="career-type" key={dictionary.careers.people[index]}><Icon size={24} /><span>{dictionary.careers.people[index]}</span></div>)}</div><div className="empty-state mt-8"><span className="status-dot" /><div><p className="eyebrow text-green">{dictionary.careers.openings}</p><h2>{dictionary.careers.none}</h2><p>{dictionary.careers.noneCopy}</p><ButtonLink href={`${localizePath(locale, "/contact")}?type=career`} className="mt-7">{dictionary.careers.share}</ButtonLink></div></div></Container></section></>; }
