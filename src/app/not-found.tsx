import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
export default async function NotFound() { const locale = await getLocale(); const dictionary = getDictionary(locale); return <section className="not-found"><Container><span>404</span><h1>{dictionary.notFound.title}</h1><p>{dictionary.notFound.copy}</p><ButtonLink href={localizePath(locale, "/")} className="mt-8"><ArrowLeft size={17} /> {dictionary.notFound.back}</ButtonLink></Container></section>; }
