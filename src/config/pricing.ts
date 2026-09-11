import type { Locale } from "@/i18n/config";

export interface Plan {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  items: readonly string[];
  featured?: boolean;
}

export interface PricingGroup {
  product: string;
  slug: string;
  audience: string;
  note: string;
  plans: readonly Plan[];
}

const en: readonly PricingGroup[] = [
  {
    product: "Serahin",
    slug: "serahin",
    audience: "For sellers running pre-order campaigns",
    note: "Public seller pricing has not been published. Buyers pay the price set for an order; checkout shows the available payment route and payable amount before confirmation.",
    plans: [
      {
        name: "Seller access",
        price: "Contact us",
        cadence: "before onboarding",
        summary: "Commercial terms are confirmed with each seller before Serahin is activated for their operation.",
        items: [
          "Public catalog and campaign checkout",
          "Multi-variant campaign and vendor management",
          "Order, payment, and fulfilment tracking",
          "Imports, exports, and campaign duplication",
        ],
      },
    ],
  },
  {
    product: "Manifly",
    slug: "manifly",
    audience: "For individuals tracking personal finances",
    note: "Core web features remain available on every plan. Paid memberships increase WhatsApp numbers and monthly usage limits. Checkout is enabled only when the live payment release gates are complete.",
    plans: [
      {
        name: "Free",
        price: "Rp 0",
        cadence: "per month",
        summary: "Core web features and entry-level WhatsApp access.",
        items: ["1 WhatsApp number", "100 chat actions / month", "10 voice-note minutes / month"],
      },
      {
        name: "Lite",
        price: "Rp 9.900",
        cadence: "per month",
        summary: "More room for regular WhatsApp-based recording.",
        items: ["1 WhatsApp number", "500 chat actions / month", "10 voice-note minutes / month", "10 proactive deliveries / month"],
      },
      {
        name: "Plus",
        price: "Rp 29.000",
        cadence: "per month",
        summary: "For people who record every day from chat.",
        featured: true,
        items: ["2 WhatsApp numbers", "2,000 chat actions / month", "60 voice-note minutes / month", "30 proactive deliveries / month"],
      },
      {
        name: "Pro",
        price: "Rp 49.000",
        cadence: "per month",
        summary: "The highest WhatsApp capacity and multi-number proactive delivery.",
        items: ["3 WhatsApp numbers", "5,000 chat actions / month", "300 voice-note minutes / month", "150 proactive deliveries / month"],
      },
    ],
  },
];

const id: readonly PricingGroup[] = [
  {
    product: "Serahin",
    slug: "serahin",
    audience: "Untuk penjual yang menjalankan kampanye pre-order",
    note: "Harga publik untuk penjual belum diterbitkan. Pembeli membayar harga yang ditetapkan untuk pesanan; checkout menampilkan jalur pembayaran yang tersedia dan jumlah yang harus dibayar sebelum konfirmasi.",
    plans: [
      {
        name: "Akses penjual",
        price: "Hubungi kami",
        cadence: "sebelum onboarding",
        summary: "Ketentuan komersial dikonfirmasi bersama setiap penjual sebelum Serahin diaktifkan untuk operasionalnya.",
        items: [
          "Katalog publik dan checkout kampanye",
          "Pengelolaan kampanye multi-varian dan vendor",
          "Pelacakan pesanan, pembayaran, dan pemenuhan",
          "Impor, ekspor, dan duplikasi kampanye",
        ],
      },
    ],
  },
  {
    product: "Manifly",
    slug: "manifly",
    audience: "Untuk individu yang mencatat keuangan pribadi",
    note: "Fitur inti web tetap tersedia di semua paket. Membership berbayar menaikkan jumlah nomor dan batas penggunaan WhatsApp bulanan. Checkout hanya diaktifkan setelah release gate pembayaran live terpenuhi.",
    plans: [
      {
        name: "Free",
        price: "Rp 0",
        cadence: "per bulan",
        summary: "Fitur inti web dan akses WhatsApp tingkat awal.",
        items: ["1 nomor WhatsApp", "100 chat action / bulan", "10 menit voice note / bulan"],
      },
      {
        name: "Lite",
        price: "Rp 9.900",
        cadence: "per bulan",
        summary: "Kapasitas lebih besar untuk pencatatan rutin lewat WhatsApp.",
        items: ["1 nomor WhatsApp", "500 chat action / bulan", "10 menit voice note / bulan", "10 pengiriman proaktif / bulan"],
      },
      {
        name: "Plus",
        price: "Rp 29.000",
        cadence: "per bulan",
        summary: "Untuk pengguna yang mencatat setiap hari lewat chat.",
        featured: true,
        items: ["2 nomor WhatsApp", "2.000 chat action / bulan", "60 menit voice note / bulan", "30 pengiriman proaktif / bulan"],
      },
      {
        name: "Pro",
        price: "Rp 49.000",
        cadence: "per bulan",
        summary: "Kapasitas WhatsApp tertinggi dan pengiriman proaktif ke beberapa nomor.",
        items: ["3 nomor WhatsApp", "5.000 chat action / bulan", "300 menit voice note / bulan", "150 pengiriman proaktif / bulan"],
      },
    ],
  },
];

export function getPricing(locale: Locale): readonly PricingGroup[] {
  return locale === "id" ? id : en;
}
