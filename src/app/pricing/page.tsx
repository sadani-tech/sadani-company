import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FinalCta } from "@/components/sections/final-cta";
import { getPricing } from "@/config/pricing";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "id" ? "Harga" : "Pricing",
    description:
      locale === "id"
        ? "Cara setiap produk Sadani dikenakan biaya, dan bagaimana pelanggan membayar. Semua harga dalam Rupiah."
        : "How each Sadani product is charged, and how customers pay. All prices in Indonesian Rupiah.",
    alternates: { canonical: localizePath(locale, "/pricing"), languages: { id: "/pricing", en: "/en/pricing" } },
  };
}

export default async function PricingPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const dictionary = getDictionary(locale);
  const t = dictionary.pricing;
  const groups = getPricing(locale);

  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow text-green">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.copy}</p>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          {groups.map((group) => (
            <div className="pricing-group" key={group.slug}>
              <div className="pricing-group-head">
                <p className={`eyebrow text-${group.slug}`}>{group.product}</p>
                <h2 className="mt-3">{group.audience}</h2>
                <p>{group.note}</p>
              </div>
              <div className="plan-grid">
                {group.plans.map((plan) => (
                  <div className={`plan ${plan.featured ? "plan-featured" : ""}`} key={plan.name}>
                    <p className="plan-name">{plan.name}</p>
                    <p className="plan-price">
                      {plan.price}
                      <small>{plan.cadence}</small>
                    </p>
                    <p className="plan-summary">{plan.summary}</p>
                    <ul className="plan-list">
                      {plan.items.map((item) => (
                        <li key={item}>
                          <Check size={15} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {group.slug === "serahin" && (
                <div className="pricing-note">
                  <strong>{t.perOrderTitle}. </strong>
                  {t.perOrderCopy}{" "}
                  <a className="font-semibold text-green" href={localizePath(locale, "/payments")}>
                    {t.seePayments} →
                  </a>
                </div>
              )}
            </div>
          ))}
          <p className="pricing-disclaimer">{t.disclaimer}</p>
          <div className="pay-links">
            <a href={localizePath(locale, "/payments")}>{dictionary.nav.payments} <ArrowUpRight size={14} /></a>
            <a href={localizePath(locale, "/refunds")}>{dictionary.payments.refundLink} <ArrowUpRight size={14} /></a>
            <a href={localizePath(locale, "/contact")}>{dictionary.payments.contactLink} <ArrowUpRight size={14} /></a>
          </div>
          <ButtonLink href={localizePath(locale, "/products")} variant="secondary" className="mt-8">
            {id ? "Lihat produk" : "See products"}
          </ButtonLink>
        </Container>
      </section>

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
