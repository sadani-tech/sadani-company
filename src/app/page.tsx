import { HomeAbout } from "@/components/home/about";
import { HomeAi } from "@/components/home/ai";
import { HomeBuild } from "@/components/home/build";
import { HomeCapabilities } from "@/components/home/capabilities";
import { HomeDirection } from "@/components/home/direction";
import { HomeHero } from "@/components/home/hero";
import { HomeMotion } from "@/components/home/home-motion";
import { HomeProductsScene } from "@/components/home/products-scene";
import { FinalCta } from "@/components/sections/final-cta";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

// Without JavaScript the intro never starts and in-view reveals never fire, so show the copy as-is.
const noScript = "html:not(.is-loaded) .hero__stage .aurora,html:not(.is-loaded) .nav__pill,html:not(.is-loaded) .hero__logo img,html:not(.is-loaded) .intro-fade,.reveal,.ai__body,.about__eyebrow,.about__card{opacity:1!important;transform:none!important;filter:none!important}.w__i,.reveal[data-split] .w__i{transform:none!important}.cta__word span{opacity:1;transform:none}";

export default async function Home() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const home = dictionary.home;
  return (
    <div className="home" data-home>
      <noscript><style>{noScript}</style></noscript>
      <HomeMotion />
      <HomeHero locale={locale} home={home} />
      <HomeAbout home={home} />
      <HomeProductsScene locale={locale} dictionary={dictionary} />
      <HomeBuild home={home} />
      <HomeAi home={home} />
      <HomeCapabilities home={home} />
      <HomeDirection home={home} />
      <FinalCta locale={locale} dictionary={dictionary} home />
    </div>
  );
}
