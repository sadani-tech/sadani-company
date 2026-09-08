import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "id" ? "Kebijakan Privasi" : "Privacy Policy",
    description:
      locale === "id"
        ? "Bagaimana website Sadani menangani informasi, termasuk data terkait pembayaran."
        : "How the Sadani website handles information, including payment-related data.",
    alternates: { canonical: localizePath(locale, "/privacy"), languages: { id: "/privacy", en: "/en/privacy" } },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const email = siteConfig.email;

  return (
    <LegalPage
      locale={locale}
      eyebrow="Legal"
      title={id ? "Kebijakan privasi" : "Privacy policy"}
      intro={
        id
          ? "Gambaran tentang cara website ini dan layanan pembayaran Sadani menangani informasi."
          : "An overview of how this website and Sadani's payment services handle information."
      }
      draft={false}
      updated={id ? "Terakhir diperbarui: Februari 2026" : "Last updated: February 2026"}
    >
      <h2>{id ? "Informasi yang Anda berikan" : "Information you choose to provide"}</h2>
      <p>
        {id
          ? "Formulir kontak mengumpulkan nama, alamat email, organisasi, jenis pertanyaan, dan pesan Anda. Informasi ini digunakan untuk menanggapi permintaan Anda."
          : "The contact form collects your name, email address, organization, inquiry type, and message. This information is used to respond to your request."}
      </p>

      <h2>{id ? "Informasi pembayaran" : "Payment information"}</h2>
      <p>
        {id
          ? "Pembayaran online untuk pesanan di Serahin diproses oleh penyedia payment gateway pihak ketiga yang berizin. Rincian pembayaran sensitif seperti nomor kartu penuh, PIN, dan OTP dimasukkan pada halaman penyedia pembayaran dan tidak disimpan oleh Sadani. Sadani menyimpan data terbatas yang diperlukan untuk mengelola pesanan, seperti status pembayaran, jumlah, mata uang (IDR), waktu transaksi, dan referensi pesanan."
          : "Online payments for orders on Serahin are processed by a licensed third-party payment-gateway provider. Sensitive payment details such as full card numbers, PINs, and OTPs are entered on the payment provider's pages and are not stored by Sadani. Sadani retains the limited data needed to manage an order, such as payment status, amount, currency (IDR), transaction time, and order reference."}
      </p>

      <h2>{id ? "Informasi teknis" : "Technical information"}</h2>
      <p>
        {id
          ? "Website dapat memproses informasi teknis terbatas yang diperlukan untuk keamanan dan operasi yang andal, seperti metadata permintaan dan informasi pembatasan sementara. Analytics tidak aktif secara default."
          : "The website may process limited technical information needed for security and reliable operation, such as request metadata and short-lived rate-limiting information. Analytics are not enabled by default."}
      </p>

      <h2>{id ? "Cara informasi digunakan" : "How information is used"}</h2>
      <p>
        {id
          ? "Informasi digunakan untuk merespons pertanyaan, memproses dan mendukung pesanan serta pembayaran, mengevaluasi potensi kolaborasi, memenuhi kewajiban hukum, dan menjaga keamanan layanan. Informasi tidak dijual."
          : "Information is used to respond to inquiries, process and support orders and payments, evaluate potential collaboration, meet legal obligations, and keep the services secure. Information is not sold."}
      </p>

      <h2>{id ? "Berbagi dengan pihak ketiga" : "Sharing with third parties"}</h2>
      <p>
        {id
          ? "Informasi dapat dibagikan dengan penyedia layanan yang menjalankan fungsi penting untuk kami, seperti payment gateway, penyedia hosting, dan layanan email, sebatas yang diperlukan untuk fungsi tersebut, atau bila diwajibkan oleh hukum."
          : "Information may be shared with service providers that perform essential functions for us, such as the payment gateway, hosting providers, and email services, only as needed for those functions, or where required by law."}
      </p>

      <h2>{id ? "Penyimpanan dan hak Anda" : "Retention and your rights"}</h2>
      <p>
        {id
          ? "Data pesanan dan pembayaran disimpan selama diperlukan untuk operasi, dukungan, dan kepatuhan. Anda dapat meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi kami; permintaan penghapusan tunduk pada kewajiban penyimpanan yang berlaku."
          : "Order and payment data is retained for as long as needed for operations, support, and compliance. You can request access, correction, or deletion of your personal data by contacting us; deletion requests are subject to applicable retention obligations."}
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
