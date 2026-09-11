import type { Metadata } from "next";
import { ArrowUpRight, CreditCard, Landmark, Lock, RefreshCw, Wallet } from "lucide-react";
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
        ? "Cara pembayaran pesanan Serahin dan membership Manifly diproses melalui payment-service Sadani."
        : "How Serahin order payments and Manifly memberships are processed through Sadani's payment service.",
    alternates: { canonical: localizePath(locale, "/payments"), languages: { id: "/payments", en: "/en/payments" } },
  };
}

const methodIcons = [Landmark, CreditCard, Wallet, Lock];

export default async function PaymentsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const dictionary = getDictionary(locale);
  const t = dictionary.payments;
  const [serahin, manifly] = siteConfig.paymentProducts;

  const flows = [
    { title: t.serahinFlowTitle, steps: t.serahinSteps, tone: "serahin" },
    { title: t.maniflyFlowTitle, steps: t.maniflySteps, tone: "manifly" },
  ] as const;

  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow text-green">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.copy}</p>
          <div className="pay-hero-meta">
            <a className="pay-badge" href={serahin.url} target="_blank" rel="noopener noreferrer">
              <b>Serahin</b> · {id ? "pembayaran pesanan" : "order payments"} <ArrowUpRight size={15} />
            </a>
            <a className="pay-badge" href={manifly.url} target="_blank" rel="noopener noreferrer">
              <b>Manifly</b> · {id ? "membership bulanan" : "monthly memberships"} <ArrowUpRight size={15} />
            </a>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="space-y-16">
            {flows.map((flow) => (
              <div key={flow.title}>
                <p className={`eyebrow text-${flow.tone}`}>{flow.tone === "serahin" ? "Serahin" : "Manifly"}</p>
                <h2 className="section-title mt-3">{flow.title}</h2>
                <div className="pay-flow mt-10">
                  {flow.steps.map(([title, body], index) => (
                    <div className="pay-step" key={title}>
                      <span aria-hidden="true">{index + 1}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{body}</p>
                      </div>
                    </div>
                  ))}
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
              <h3>{id ? "Metode dan ketersediaan" : "Methods and availability"}</h3>
              <p>
                {id
                  ? "Metode tidak diasumsikan sama untuk setiap produk. Checkout meminta daftar metode dari provider yang aktif dan menampilkan opsi yang benar-benar tersedia. Serahin tetap menyediakan jalur pembayaran manual."
                  : "Methods are not assumed to be identical across products. Checkout requests the active provider's method list and shows only available options. Serahin also retains a manual-payment route."}
              </p>
              <div className="mt-4 flex gap-2" aria-hidden="true">
                {methodIcons.map((Icon, index) => (
                  <span key={index} className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 text-green">
                    <Icon size={16} />
                  </span>
                ))}
              </div>
            </div>
            <div className="pay-panel md:col-span-2">
              <h3 className="flex items-center gap-2"><RefreshCw size={17} /> {id ? "Status aktivasi" : "Activation status"}</h3>
              <p>
                {id
                  ? "Integrasi pembayaran Serahin dan billing Manifly sudah tersedia di kode. Checkout otomatis tetap dikendalikan feature flag dan kesiapan provider. Produk akan menampilkan jalur manual atau menonaktifkan CTA berbayar ketika pemeriksaan produksi belum terpenuhi."
                  : "Serahin payment integration and Manifly billing are implemented in code. Automatic checkout remains controlled by feature flags and provider readiness. Products show the manual route or disable paid calls to action when production checks are not complete."}
              </p>
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
            <a href={`${manifly.url}/legal/refund`} target="_blank" rel="noopener noreferrer">
              {id ? "Kebijakan billing Manifly" : "Manifly billing policy"} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="company-contact mt-10 max-w-md">
            <div>
              <Landmark size={18} />
              <p>
                <strong>{siteConfig.legalName}</strong>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone.href}`}>{siteConfig.phone.display}</a>
                <span>{siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}</span>
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
