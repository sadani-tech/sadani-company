import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "id" ? "Ketentuan Penggunaan" : "Terms of Use",
    description:
      locale === "id"
        ? "Ketentuan penggunaan website Sadani dan pemrosesan pembayaran melalui produk Sadani."
        : "Terms for use of the Sadani website and payment processing across Sadani products.",
    alternates: { canonical: localizePath(locale, "/terms"), languages: { id: "/terms", en: "/en/terms" } },
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const email = siteConfig.email;

  return (
    <LegalPage
      locale={locale}
      eyebrow="Legal"
      title={id ? "Ketentuan penggunaan" : "Terms of use"}
      intro={
        id
          ? "Ketentuan penggunaan website PT Sadani Teknologi Indonesia dan layanan pembayaran yang tersedia melalui produk kami."
          : "Terms for use of the PT Sadani Teknologi Indonesia website and the payment services available through our products."
      }
      draft={false}
      updated={id ? "Terakhir diperbarui: Februari 2026" : "Last updated: February 2026"}
    >
      <h2>{id ? "Tentang Sadani" : "About Sadani"}</h2>
      <p>
        {id
          ? "PT Sadani Teknologi Indonesia (“Sadani”, “kami”) adalah perusahaan teknologi yang berkedudukan di Sukoharjo, Jawa Tengah, Indonesia. Sadani membangun dan mengoperasikan beberapa produk digital, termasuk Serahin, Manifly, Tuju, dan InsuraLab."
          : "PT Sadani Teknologi Indonesia (“Sadani”, “we”) is a technology company based in Sukoharjo, Central Java, Indonesia. Sadani builds and operates several digital products, including Serahin, Manifly, Tuju, and InsuraLab."}
      </p>

      <h2>{id ? "Tujuan website" : "Website purpose"}</h2>
      <p>
        {id
          ? "Website ini memberikan informasi tentang Sadani dan produk-produknya. Deskripsi produk, harga, dan pratinjau konsep dapat berubah seiring perkembangan produk."
          : "This website provides information about Sadani and its products. Product descriptions, pricing, and conceptual previews may change as the products evolve."}
      </p>

      <h2>{id ? "Pembayaran dan pemrosesan pihak ketiga" : "Payments and third-party processing"}</h2>
      <p>
        {id
          ? "Saat ini, pembayaran online dari pelanggan diterima melalui Serahin, platform pre-order kami. Pembayaran diproses oleh penyedia payment gateway pihak ketiga yang berizin. Sadani tidak menyimpan nomor kartu penuh, PIN, atau OTP. Dana dari setiap pesanan diselesaikan kepada penjual yang menjalankan kampanye terkait; Sadani dapat mengenakan biaya platform per pesanan. Sadani bukan bank, bukan penyelenggara jasa pembayaran, dan bukan lembaga keuangan berizin."
          : "Today, online customer payments are accepted through Serahin, our pre-order platform. Payments are processed by a licensed third-party payment-gateway provider. Sadani does not store full card numbers, PINs, or OTPs. Funds from each order are settled to the seller running the relevant campaign; Sadani may charge a per-order platform fee. Sadani is not a bank, not a payment services provider, and not a regulated financial institution."}
        {" "}
        {id ? (
          <>Lihat <a href={localizePath(locale, "/payments")}>Cara Pembayaran</a> dan <a href={localizePath(locale, "/refunds")}>Kebijakan Pengembalian Dana</a>.</>
        ) : (
          <>See <a href={localizePath(locale, "/payments")}>How payments work</a> and the <a href={localizePath(locale, "/refunds")}>Refund policy</a>.</>
        )}
      </p>

      <h2>{id ? "Tanggung jawab penjual dan pembeli" : "Seller and buyer responsibilities"}</h2>
      <p>
        {id
          ? "Penjual yang membuka kampanye di Serahin bertanggung jawab atas keakuratan deskripsi produk, harga, ketersediaan, produksi, dan pengiriman. Pembeli bertanggung jawab memberikan data pemesanan yang benar dan membayar melalui kanal resmi. Sadani menyediakan platform dan alat pembayaran, bukan pihak dalam kontrak jual-beli antara penjual dan pembeli."
          : "Sellers who open campaigns on Serahin are responsible for the accuracy of product descriptions, prices, availability, production, and delivery. Buyers are responsible for providing correct order details and paying through official channels. Sadani provides the platform and payment tooling and is not a party to the sales contract between a seller and a buyer."}
      </p>

      <h2>{id ? "Penggunaan yang dilarang" : "Prohibited use"}</h2>
      <p>
        {id
          ? "Anda tidak boleh menggunakan produk Sadani untuk aktivitas melanggar hukum Indonesia, termasuk penipuan, pencucian uang, penjualan barang atau jasa terlarang, atau pelanggaran hak pihak lain. Sadani dapat menahan penyelesaian dana, menangguhkan kampanye, atau menutup akun jika terdapat indikasi penyalahgunaan."
          : "You may not use Sadani products for activity that violates Indonesian law, including fraud, money laundering, sale of prohibited goods or services, or infringement of others' rights. Sadani may hold settlement, suspend a campaign, or close an account where misuse is indicated."}
      </p>

      <h2>{id ? "Bukan nasihat profesional" : "No professional advice"}</h2>
      <p>
        {id
          ? "Konten website bersifat informasi umum dan bukan nasihat hukum, keuangan, karier, atau profesional lainnya. Manifly adalah software keuangan pribadi, bukan bank, e-wallet, payment gateway, pemberi pinjaman, atau lembaga keuangan berizin. InsuraLab bersifat edukatif dan tidak memberikan nasihat asuransi yang bersifat personal."
          : "Content on this website is general information and is not legal, financial, career, or other professional advice. Manifly is personal finance software—not a bank, e-wallet, payment gateway, lender, or regulated financial institution. InsuraLab is educational and does not provide personalized insurance advice."}
      </p>

      <h2>{id ? "Kekayaan intelektual" : "Intellectual property"}</h2>
      <p>
        {id
          ? "Nama merek, konsep antarmuka, tulisan, dan materi website tetap menjadi milik pemiliknya masing-masing."
          : "Brand names, interface concepts, copy, and other website materials remain the property of their respective owners."}
      </p>

      <h2>{id ? "Hukum yang berlaku dan kontak" : "Governing law and contact"}</h2>
      <p>
        {id
          ? "Ketentuan ini diatur oleh hukum Republik Indonesia. Pertanyaan mengenai ketentuan ini dapat dikirim ke "
          : "These terms are governed by the laws of the Republic of Indonesia. Questions about these terms can be sent to "}
        <a href={`mailto:${email}`}>{email}</a>
        {id ? ", atau melalui " : ", or through the "}
        <a href={localizePath(locale, "/contact")}>{id ? "halaman kontak" : "contact page"}</a>.
      </p>
    </LegalPage>
  );
}
