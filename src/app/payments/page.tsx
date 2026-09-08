import type { Metadata } from "next";
import { ArrowUpRight, CreditCard, Landmark, Lock, Wallet } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "id" ? "Pembayaran" : "Payments",
    description:
      locale === "id"
        ? "Cara pelanggan membayar di produk Sadani: alur checkout Serahin, siapa yang menerima dana, keamanan, dan mata uang."
        : "How customers pay across Sadani products: the Serahin checkout flow, who receives funds, security, and currency.",
    alternates: { canonical: localizePath(locale, "/payments"), languages: { id: "/payments", en: "/en/payments" } },
  };
}

const methodIcons = [Landmark, CreditCard, Wallet, Lock];

export default async function PaymentsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const dictionary = getDictionary(locale);
  const t = dictionary.payments;
  const pay = siteConfig.paymentsProduct;

  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow text-green">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.copy}</p>
          <div className="pay-hero-meta">
            <span className="pay-badge">
              {t.productLabel}: <b>{pay.name}</b>
            </span>
            <a className="pay-badge" href={pay.url} target="_blank" rel="noopener noreferrer">
              {t.liveSite} <ArrowUpRight size={15} />
            </a>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <h2 className="section-title">{t.flowTitle}</h2>
          <div className="pay-flow mt-10">
            {t.steps.map(([title, body], i) => (
              <div className="pay-step" key={title}>
                <span aria-hidden="true">{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section bg-surface">
        <Container>
          <div className="pay-panel-grid">
            <div className="pay-panel">
              <h3>{t.fundsTitle}</h3>
              <p>{t.fundsCopy}</p>
            </div>
            <div className="pay-panel">
              <h3>{t.securityTitle}</h3>
              <p>{t.securityCopy}</p>
            </div>
            <div className="pay-panel">
              <h3>{t.currencyTitle}</h3>
              <p>{t.currencyCopy}</p>
            </div>
            <div className="pay-panel">
              <h3>{id ? "Metode pembayaran" : "Payment methods"}</h3>
              <p>
                {id
                  ? "Transfer bank, virtual account, e-wallet, dan QRIS melalui payment gateway pihak ketiga. Metode yang tersedia dapat berbeda per kampanye."
                  : "Bank transfer, virtual account, e-wallet, and QRIS via a third-party payment gateway. Available methods can vary per campaign."}
              </p>
              <div className="mt-4 flex gap-2" aria-hidden="true">
                {methodIcons.map((Icon, i) => (
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 text-green">
                    <Icon size={16} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <h2 className="section-title">{t.policiesTitle}</h2>
          <div className="pay-links">
            <a href={localizePath(locale, "/refunds")}>{t.refundLink} <ArrowUpRight size={14} /></a>
            <a href={localizePath(locale, "/terms")}>{t.termsLink} <ArrowUpRight size={14} /></a>
            <a href={localizePath(locale, "/pricing")}>{dictionary.nav.pricing} <ArrowUpRight size={14} /></a>
            <a href={localizePath(locale, "/contact")}>{t.contactLink} <ArrowUpRight size={14} /></a>
          </div>
          <div className="company-contact mt-10 max-w-md">
            <div>
              <Landmark size={18} />
              <p>
                <strong>{siteConfig.legalName}</strong>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone.href}`}>{siteConfig.phone.display}</a>
                <span>
                  {siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}
                </span>
              </p>
            </div>
          </div>
          <ButtonLink href={localizePath(locale, "/pricing")} className="mt-8">
            {id ? "Lihat harga" : "See pricing"} <ArrowUpRight size={16} />
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
