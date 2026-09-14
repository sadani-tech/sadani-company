import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/products/product-visual";
import { FinalCta } from "@/components/sections/final-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getProduct, localizeProduct, products } from "@/config/products";
import { getPricing } from "@/config/pricing";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const locale = await getLocale();
  const content = localizeProduct(product, locale);
  return {
    title: product.name,
    description: content.shortDescription,
    alternates: {
      canonical: localizePath(locale, `/products/${product.slug}`),
      languages: { id: `/products/${product.slug}`, en: `/en/products/${product.slug}` },
    },
    openGraph: {
      title: `${product.name} — Sadani`,
      description: content.shortDescription,
      url: localizePath(locale, `/products/${product.slug}`),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const content = localizeProduct(product, locale);
  const pricing = getPricing(locale).find((group) => group.slug === product.slug);
  const paymentSteps = product.slug === "serahin" ? dictionary.payments.serahinSteps : product.slug === "manifly" ? dictionary.payments.maniflySteps : null;
  const paymentTitle = product.slug === "serahin" ? dictionary.payments.serahinFlowTitle : product.slug === "manifly" ? dictionary.payments.maniflyFlowTitle : null;

  return (
    <>
      <section className={`product-detail-hero tone-${product.slug}`}>
        <Container>
          <ButtonLink href={localizePath(locale, "/products")} variant="secondary" className="mb-10 border-ink/10 bg-white/60">
            <ArrowLeft size={16} /> {dictionary.common.allProducts}
          </ButtonLink>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className={`eyebrow text-${product.slug}`}>
                {content.category} · {locale === "id" ? "Produk Sadani" : "A Sadani product"}
              </p>
              <h1>{content.tagline}</h1>
              <p>{content.shortDescription}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {product.website && (
                  <ButtonLink href={product.website} target="_blank" rel="noopener noreferrer">
                    {locale === "id" ? `Buka ${product.name}` : `Open ${product.name}`} <ArrowRight size={16} />
                  </ButtonLink>
                )}
                <ButtonLink href={localizePath(locale, "/contact")} variant={product.website ? "secondary" : "primary"}>
                  {locale === "id" ? `Bicara tentang ${product.name}` : `Talk to us about ${product.name}`} <ArrowRight size={16} />
                </ButtonLink>
              </div>
            </div>
            <ProductVisual product={product.slug} locale={locale} />
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <p className={`eyebrow text-${product.slug}`}>{dictionary.common.product}</p>
              <h2 className="section-title mt-4">
                {locale === "id" ? "Dibangun di atas jalan ke depan yang lebih jelas." : "Built around a clearer way forward."}
              </h2>
            </div>
            <div className="detail-copy">
              <p>{content.introduction}</p>
              <h3>{dictionary.common.problem}</h3>
              <p>{content.problem}</p>
              <h3>{dictionary.common.philosophy}</h3>
              <p>{content.philosophy}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-surface">
        <Container>
          <p className={`eyebrow text-${product.slug}`}>{dictionary.common.corePreview}</p>
          <h2 className="section-title mt-4 max-w-2xl">
            {locale === "id" ? "Fondasi yang terfokus untuk produk." : "A focused foundation for the product."}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {content.features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <CheckCircle2 size={22} className={`text-${product.slug}`} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
          <div className="status-panel mt-10">
            <span>{dictionary.common.status}</span>
            <p>{content.status}</p>
          </div>
        </Container>
      </section>

      {pricing && paymentSteps && paymentTitle && (
        <section className="section bg-white">
          <Container>
            <p className={`eyebrow text-${product.slug}`}>{locale === "id" ? "Harga & pembayaran" : "Pricing & payments"}</p>
            <h2 className="section-title mt-4">{pricing.audience}</h2>
            <p className="mt-4 max-w-2xl text-muted">{pricing.note}</p>
            <div className="plan-grid mt-10">
              {pricing.plans.map((plan) => (
                <div className={`plan ${plan.featured ? "plan-featured" : ""}`} key={plan.name}>
                  <p className="plan-name">{plan.name}</p>
                  <p className="plan-price">{plan.price}<small>{plan.cadence}</small></p>
                  <p className="plan-summary">{plan.summary}</p>
                  <ul className="plan-list">
                    {plan.items.map((item) => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pricing-note mt-8">
              <strong>{dictionary.pricing.perOrderTitle}. </strong>
              {product.slug === "serahin" ? dictionary.pricing.perOrderCopy : locale === "id" ? "Paket berbayar menggunakan langganan bulanan dan hanya aktif setelah pembayaran terverifikasi." : "Paid plans use monthly subscriptions and activate only after verified payment."}
            </div>
            <h3 className="mt-14 text-2xl">{paymentTitle}</h3>
            <div className="pay-flow mt-8">
              {paymentSteps.map(([title, body], index) => (
                <div className="pay-step" key={title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </div>
              ))}
            </div>
            <div className="pay-panel-grid mt-10">
              <div className="pay-panel"><h3>{dictionary.payments.securityTitle}</h3><p>{dictionary.payments.securityCopy}</p></div>
              <div className="pay-panel"><h3>{dictionary.payments.currencyTitle}</h3><p>{dictionary.payments.currencyCopy}</p></div>
            </div>
            <div className="pay-links mt-8">
              <a href={localizePath(locale, "/refunds")}>{locale === "id" ? "Kebijakan pengembalian dana" : "Refund policy"}<ArrowRight size={14} /></a>
              <a href={localizePath(locale, "/contact")}>{dictionary.payments.contactLink}<ArrowRight size={14} /></a>
            </div>
          </Container>
        </section>
      )}

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
