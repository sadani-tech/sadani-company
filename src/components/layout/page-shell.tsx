import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function PageShell({ children, locale, dictionary }: { children: ReactNode; locale: Locale; dictionary: Dictionary }) {
  return <><a href="#main-content" className="skip-link">{locale === "id" ? "Lewati ke konten" : "Skip to content"}</a><Header locale={locale} dictionary={dictionary} /><main id="main-content">{children}</main><Footer locale={locale} dictionary={dictionary} /></>;
}
