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
        ? "Kebijakan pengembalian dana untuk pembayaran melalui kampanye pre-order Serahin."
        : "Refund policy for payments made through Serahin pre-order campaigns.",
    alternates: { canonical: localizePath(locale, "/refunds"), languages: { id: "/refunds", en: "/en/refunds" } },
  };
}

export default async function RefundsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const dictionary = getDictionary(locale);
  const email = siteConfig.email;

  return (
    <LegalPage
      locale={locale}
      eyebrow="Legal"
      title={dictionary.refunds.title}
      intro={dictionary.refunds.intro}
      draft={false}
      updated={dictionary.refunds.updated}
    >
      <h2>{id ? "Cakupan" : "Scope"}</h2>
      <p>
        {id
          ? "Kebijakan ini berlaku untuk pembayaran yang dilakukan pelanggan secara online melalui Serahin untuk kampanye pre-order. Serahin dioperasikan oleh PT Sadani Teknologi Indonesia. Setiap kampanye dijalankan oleh seorang penjual yang bertanggung jawab atas produksi dan pengiriman barang."
          : "This policy applies to payments customers make online through Serahin for pre-order campaigns. Serahin is operated by PT Sadani Teknologi Indonesia. Each campaign is run by a seller who is responsible for producing and shipping the item."}
      </p>

      <h2>{id ? "Kapan pengembalian dana diberikan" : "When a refund is provided"}</h2>
      <p>
        {id
          ? "Pengembalian dana penuh diberikan jika: (a) kampanye pre-order dibatalkan atau gagal mencapai syarat minimum sehingga produksi tidak dilanjutkan; (b) pembayaran terpotong dua kali atau terjadi kelebihan bayar akibat kesalahan teknis; atau (c) barang tidak pernah dikirim dalam jangka waktu yang dijanjikan pada kampanye dan penjual tidak dapat menyelesaikannya."
          : "A full refund is provided when: (a) a pre-order campaign is cancelled or fails to meet its minimum threshold so production does not proceed; (b) a payment is charged twice or overcharged due to a technical error; or (c) the item is never shipped within the timeframe stated on the campaign and the seller cannot fulfil it."}
      </p>
      <p>
        {id
          ? "Pengembalian dana sebagian atau penggantian dapat diberikan jika barang yang diterima cacat atau berbeda secara material dari deskripsi kampanye, sesuai kesepakatan dengan penjual."
          : "A partial refund or replacement may be provided when a delivered item is defective or materially different from the campaign description, as agreed with the seller."}
      </p>

      <h2>{id ? "Kapan pengembalian dana tidak berlaku" : "When refunds do not apply"}</h2>
      <p>
        {id
          ? "Pengembalian dana umumnya tidak berlaku setelah produksi dimulai atas permintaan pelanggan, untuk barang yang sudah dikirim dan sesuai deskripsi, untuk barang custom yang dibuat sesuai permintaan, atau untuk keterlambatan wajar yang sudah dikomunikasikan penjual. Pembatalan sebelum produksi dimulai mengikuti ketentuan yang tercantum pada masing-masing kampanye."
          : "Refunds generally do not apply once production has started at the customer's request, for items already shipped that match their description, for made-to-order custom items, or for reasonable delays the seller has communicated. Cancellations before production starts follow the terms stated on each campaign."}
      </p>

      <h2>{id ? "Cara mengajukan" : "How to request a refund"}</h2>
      <p>
        {id
          ? "Hubungi penjual kampanye melalui Serahin terlebih dahulu. Jika tidak terselesaikan dalam 7 hari kerja, ajukan ke Sadani di "
          : "Contact the campaign seller through Serahin first. If it is not resolved within 7 business days, escalate to Sadani at "}
        <a href={`mailto:${email}`}>{email}</a>
        {id
          ? " dengan menyertakan nomor pesanan, nama kampanye, dan alasan permintaan."
          : " with your order number, the campaign name, and the reason for the request."}
      </p>

      <h2>{id ? "Metode dan waktu" : "Method and timing"}</h2>
      <p>
        {id
          ? "Pengembalian dana yang disetujui dikirim ke metode pembayaran asal melalui payment gateway yang memproses transaksi. Dana biasanya diterima dalam 7–14 hari kerja setelah persetujuan, tergantung bank atau penyedia dompet digital pelanggan. Semua transaksi dan pengembalian dana diproses dalam Rupiah (IDR)."
          : "Approved refunds are returned to the original payment method through the payment gateway that processed the transaction. Funds usually arrive within 7–14 business days of approval, depending on the customer's bank or e-wallet provider. All transactions and refunds are processed in Indonesian Rupiah (IDR)."}
      </p>

      <h2>{id ? "Pembatalan" : "Cancellations"}</h2>
      <p>
        {id
          ? "Pelanggan dapat membatalkan pesanan yang belum dibayar kapan saja. Untuk pesanan yang sudah dibayar, pembatalan sebelum produksi dimulai memenuhi syarat pengembalian dana penuh kecuali kampanye menyatakan lain."
          : "Customers may cancel an unpaid order at any time. For a paid order, a cancellation before production begins qualifies for a full refund unless the campaign states otherwise."}
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
