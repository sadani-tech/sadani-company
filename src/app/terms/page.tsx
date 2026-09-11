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
      updated={id ? "Terakhir diperbarui: 11 September 2026" : "Last updated: September 11, 2026"}
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
          ? "Serahin mendukung pembayaran pesanan pre-order, sedangkan Manifly menyediakan membership software bulanan. Checkout otomatis dibuat melalui payment-service Sadani dan diselesaikan pada halaman hosted penyedia pembayaran pihak ketiga. Sadani tidak meminta atau menyimpan nomor kartu penuh, PIN, password internet banking, atau OTP. Ketersediaan checkout, metode, jumlah, biaya, dan penerima pembayaran yang berlaku ditampilkan oleh produk sebelum konfirmasi. Sadani bukan bank, e-wallet, atau penyelenggara payment gateway."
          : "Serahin supports pre-order payments, while Manifly offers monthly software memberships. Automatic checkout is created through Sadani's payment service and completed on a third-party provider's hosted page. Sadani does not ask for or store full card numbers, PINs, internet-banking passwords, or OTPs. The product shows applicable checkout availability, methods, amount, fees, and payment recipient before confirmation. Sadani is not a bank, e-wallet, or payment-gateway provider."}
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
          ? "Penjual yang membuka kampanye di Serahin bertanggung jawab atas keakuratan deskripsi produk, harga, ketersediaan, produksi, pengiriman, dan ketentuan kampanye. Pembeli bertanggung jawab memberikan data pemesanan yang benar dan membayar melalui kanal resmi. Sadani menyediakan platform Serahin dan bukan pihak dalam kontrak jual-beli antara penjual dan pembeli."
          : "Sellers who open campaigns on Serahin are responsible for the accuracy of product descriptions, prices, availability, production, delivery, and campaign terms. Buyers are responsible for providing correct order details and paying through official channels. Sadani provides the Serahin platform and is not a party to the sales contract between a seller and a buyer."}
      </p>

      <h2>{id ? "Membership Manifly" : "Manifly memberships"}</h2>
      <p>
        {id
          ? "Paket berbayar Manifly menambah entitlement WhatsApp sesuai katalog versi aktif. Langganan diperpanjang otomatis sampai dibatalkan. Pembatalan mempertahankan akses sampai tanggal paid-through, downgrade berlaku pada siklus berikutnya, dan upgrade atau add-on tidak menerima prorata otomatis pada versi saat ini. Aktivasi hanya terjadi setelah status pembayaran terverifikasi."
          : "Paid Manifly plans add WhatsApp entitlements according to the active catalog version. Subscriptions renew automatically until cancelled. Cancellation retains access until the paid-through date, downgrades apply on the next cycle, and upgrades or add-ons do not receive automatic proration in the current version. Activation occurs only after verified payment status."}
      </p>

      <h2>{id ? "Penggunaan yang dilarang" : "Prohibited use"}</h2>
      <p>
        {id
          ? "Anda tidak boleh menggunakan produk Sadani untuk aktivitas melanggar hukum Indonesia, termasuk penipuan, pencucian uang, penjualan barang atau jasa terlarang, atau pelanggaran hak pihak lain. Sadani dapat membatasi akses, menangguhkan kampanye, atau menutup akun jika terdapat indikasi penyalahgunaan, sesuai hukum dan ketentuan produk terkait."
          : "You may not use Sadani products for activity that violates Indonesian law, including fraud, money laundering, sale of prohibited goods or services, or infringement of others' rights. Sadani may restrict access, suspend a campaign, or close an account where misuse is indicated, subject to applicable law and product terms."}
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
