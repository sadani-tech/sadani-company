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
      updated={id ? "Terakhir diperbarui: 11 September 2026" : "Last updated: September 11, 2026"}
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
          ? "Pembayaran otomatis untuk pesanan Serahin dan membership Manifly diproses melalui payment-service Sadani dan halaman hosted penyedia pembayaran pihak ketiga. Rincian sensitif seperti nomor kartu penuh, PIN, password internet banking, dan OTP tidak disimpan oleh aplikasi produk Sadani. Kami menyimpan data terbatas yang diperlukan untuk pesanan, billing, dukungan, audit, dan rekonsiliasi, seperti status, jumlah, mata uang, waktu, referensi produk, serta referensi provider yang tidak sensitif."
          : "Automatic payments for Serahin orders and Manifly memberships are processed through Sadani's payment service and a third-party provider's hosted page. Sensitive details such as full card numbers, PINs, internet-banking passwords, and OTPs are not stored by Sadani product applications. We retain limited data needed for orders, billing, support, audit, and reconciliation, such as status, amount, currency, time, product reference, and non-sensitive provider references."}
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
          ? "Informasi digunakan untuk merespons pertanyaan, memproses dan mendukung pesanan Serahin, billing dan entitlement Manifly, mengevaluasi potensi kolaborasi, memenuhi kewajiban hukum, mencegah penyalahgunaan, serta menjaga keamanan layanan. Informasi tidak dijual."
          : "Information is used to respond to inquiries, process and support Serahin orders, manage Manifly billing and entitlements, evaluate potential collaboration, meet legal obligations, prevent misuse, and keep services secure. Information is not sold."}
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
          ? "Data pesanan, membership, dan pembayaran disimpan selama diperlukan untuk operasi, dukungan, audit, pencegahan fraud, dan kepatuhan. Anda dapat meminta akses, koreksi, atau penghapusan data pribadi dengan menghubungi kami; permintaan penghapusan tunduk pada kewajiban penyimpanan yang berlaku dan tidak selalu menghapus catatan transaksi yang wajib dipertahankan."
          : "Order, membership, and payment data is retained as needed for operations, support, audit, fraud prevention, and compliance. You can request access, correction, or deletion of personal data by contacting us; deletion is subject to applicable retention duties and may not remove transaction records that must be preserved."}
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
