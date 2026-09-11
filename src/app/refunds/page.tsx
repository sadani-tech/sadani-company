import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "id" ? "Kebijakan Pengembalian Dana" : "Refund Policy",
    description:
      locale === "id"
        ? "Panduan pengembalian dana dan pembatalan untuk pesanan Serahin dan membership Manifly."
        : "Refund and cancellation guidance for Serahin orders and Manifly memberships.",
    alternates: { canonical: localizePath(locale, "/refunds"), languages: { id: "/refunds", en: "/en/refunds" } },
  };
}

export default async function RefundsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const dictionary = getDictionary(locale);
  const email = siteConfig.email;
  const manifly = siteConfig.paymentProducts.find((product) => product.slug === "manifly")!;

  return (
    <LegalPage
      locale={locale}
      eyebrow="Legal"
      title={dictionary.refunds.title}
      intro={dictionary.refunds.intro}
      draft={false}
      updated={dictionary.refunds.updated}
    >
      <h2>{id ? "Pilih produk yang terkait" : "Choose the relevant product"}</h2>
      <p>
        {id
          ? "Serahin memproses pembayaran untuk pesanan pre-order, sedangkan Manifly menagih membership software bulanan. Ketentuan pembatalan dan pengembalian dana berbeda karena tujuan transaksinya berbeda."
          : "Serahin processes payments for pre-order purchases, while Manifly bills monthly software memberships. Cancellation and refund terms differ because the transactions serve different purposes."}
      </p>

      <h2>Serahin · {id ? "pesanan pre-order" : "pre-order purchases"}</h2>
      <p>
        {id
          ? "Ketentuan kampanye yang terlihat saat memesan menjadi acuan utama untuk pembatalan, produksi, pengiriman, dan pengembalian dana. Penjual bertanggung jawab atas barang dan pemenuhan kampanyenya. Hubungi penjual terlebih dahulu dengan nomor pesanan dan alasan permintaan."
          : "The campaign terms shown when an order is placed are the primary reference for cancellation, production, fulfilment, and refunds. The seller is responsible for the goods and campaign fulfilment. Contact the seller first with the order number and reason for the request."}
      </p>
      <p>
        {id
          ? "Tagihan ganda, nominal tidak sesuai, atau kegagalan teknis pembayaran dapat dieskalasikan ke Sadani. Payment-service saat ini tidak menyediakan refund otomatis; penyelesaian yang disetujui akan diinformasikan bersama metode dan estimasi waktunya. Jangan mengirim PIN, OTP, password, atau nomor kartu penuh."
          : "Duplicate charges, incorrect amounts, or technical payment failures can be escalated to Sadani. The payment service does not currently provide automated refunds; an approved resolution will include the method and expected timing. Never send a PIN, OTP, password, or full card number."}
      </p>

      <h2>Manifly · {id ? "membership bulanan" : "monthly memberships"}</h2>
      <p>
        {id
          ? "Auto-renew dapat dihentikan dari halaman Membership. Entitlement tetap aktif sampai tanggal paid-through yang ditampilkan dan pembatalan tidak otomatis mengembalikan pembayaran periode berjalan. Upgrade atau add-on ditagih sebagai total bulanan baru tanpa prorata atau kredit otomatis; downgrade berlaku pada siklus berikutnya."
          : "Auto-renew can be stopped from the Membership page. Entitlements remain active until the displayed paid-through date, and cancellation does not automatically refund the current period. Upgrades or add-ons are billed as a new monthly total without automatic proration or credit; downgrades apply on the next cycle."}
      </p>
      <p>
        {id
          ? "Permintaan refund ditinjau manual untuk kasus seperti tagihan ganda, jumlah yang tidak sesuai konfirmasi, atau kegagalan teknis yang membuat layanan berbayar tidak tersedia."
          : "Refund requests are reviewed manually for cases such as duplicate charges, an amount that differs from confirmation, or a technical failure that makes the paid service unavailable."}
        {" "}
        <a href={`${manifly.url}/legal/refund`} target="_blank" rel="noopener noreferrer">
          {id ? "Baca kebijakan billing Manifly" : "Read the Manifly billing policy"}
        </a>.
      </p>

      <h2>{id ? "Cara mengajukan" : "How to submit a request"}</h2>
      <p>
        {id
          ? "Kirim email ke "
          : "Email "}
        <a href={`mailto:${email}`}>{email}</a>
        {id
          ? " dengan nama produk, nomor pesanan Serahin atau referensi billing Manifly, tanggal, jumlah, dan alasan. Kami memberikan respons awal paling lambat 5 hari kerja."
          : " with the product name, the Serahin order number or Manifly billing reference, date, amount, and reason. We provide an initial response within 5 business days."}
      </p>

      <h2>{id ? "Kontak" : "Contact"}</h2>
      <p>
        {siteConfig.legalName} — <a href={`mailto:${email}`}>{email}</a>
        {" · "}
        <a href={`tel:${siteConfig.phone.href}`}>{siteConfig.phone.display}</a>
        {" · "}
        {siteConfig.address.city}, {siteConfig.address.province}, {siteConfig.address.country}.
      </p>
    </LegalPage>
  );
}
