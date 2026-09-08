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
    note: "Customers pay per order at checkout in Indonesian Rupiah (IDR). Payment-gateway fees for each transaction follow the provider's published rates and are shown before payment.",
    plans: [
      {
        name: "Starter",
        price: "Rp 0",
        cadence: "to open a campaign",
        summary: "Run pre-order campaigns and collect payments online.",
        items: [
          "Unlimited pre-order campaigns",
          "Online checkout (bank transfer, virtual account, e-wallet, QRIS)",
          "Order & payment tracking",
          "Platform fee applied per paid order",
        ],
      },
      {
        name: "Growth",
        price: "From Rp 149.000",
        cadence: "per month",
        summary: "For sellers who run pre-orders regularly and want a lower per-order fee.",
        featured: true,
        items: [
          "Everything in Starter",
          "Reduced per-order platform fee",
          "Campaign analytics and exports",
          "Priority support",
        ],
      },
      {
        name: "Business",
        price: "Custom",
        cadence: "contact us",
        summary: "For teams and shops with high pre-order volume.",
        items: [
          "Everything in Growth",
          "Volume pricing",
          "Multiple seller accounts",
          "Onboarding assistance",
        ],
      },
    ],
  },
  {
    product: "Manifly",
    slug: "manifly",
    audience: "For individuals tracking personal finances",
    note: "The web app is free. Paid tiers only raise WhatsApp usage limits (numbers, chat actions, voice-note minutes). Final prices for Plus and Pro are being confirmed.",
    plans: [
      {
        name: "Free",
        price: "Rp 0",
        cadence: "forever",
        summary: "All web features, one WhatsApp number, 100 chat actions per month.",
        items: ["Dashboards, analytics, budgets, export", "1 WhatsApp number", "100 chat actions / month"],
      },
      {
        name: "Plus",
        price: "Indicative",
        cadence: "per month",
        summary: "For people who record every day from chat.",
        featured: true,
        items: ["2 WhatsApp numbers", "1,000 chat actions / month", "60 voice-note minutes / month"],
      },
      {
        name: "Pro",
        price: "Indicative",
        cadence: "per month",
        summary: "Shared wallets and notifications to multiple numbers.",
        items: ["3 WhatsApp numbers", "5,000 chat actions / month", "300 voice-note minutes / month"],
      },
    ],
  },
];

const id: readonly PricingGroup[] = [
  {
    product: "Serahin",
    slug: "serahin",
    audience: "Untuk penjual yang menjalankan kampanye pre-order",
    note: "Pelanggan membayar per pesanan saat checkout dalam Rupiah (IDR). Biaya payment gateway untuk setiap transaksi mengikuti tarif resmi penyedia dan ditampilkan sebelum pembayaran.",
    plans: [
      {
        name: "Starter",
        price: "Rp 0",
        cadence: "untuk membuka kampanye",
        summary: "Jalankan kampanye pre-order dan terima pembayaran online.",
        items: [
          "Kampanye pre-order tanpa batas",
          "Checkout online (transfer bank, virtual account, e-wallet, QRIS)",
          "Pelacakan pesanan & pembayaran",
          "Biaya platform per pesanan berbayar",
        ],
      },
      {
        name: "Growth",
        price: "Mulai Rp 149.000",
        cadence: "per bulan",
        summary: "Untuk penjual yang rutin pre-order dan ingin biaya per pesanan lebih rendah.",
        featured: true,
        items: [
          "Semua di Starter",
          "Biaya platform per pesanan lebih rendah",
          "Analitik kampanye dan ekspor",
          "Dukungan prioritas",
        ],
      },
      {
        name: "Business",
        price: "Custom",
        cadence: "hubungi kami",
        summary: "Untuk tim dan toko dengan volume pre-order tinggi.",
        items: [
          "Semua di Growth",
          "Harga berdasarkan volume",
          "Beberapa akun penjual",
          "Bantuan onboarding",
        ],
      },
    ],
  },
  {
    product: "Manifly",
    slug: "manifly",
    audience: "Untuk individu yang mencatat keuangan pribadi",
    note: "Aplikasi web gratis. Paket berbayar hanya menaikkan batas pemakaian WhatsApp (nomor, chat action, menit voice note). Harga final Plus dan Pro masih dikonfirmasi.",
    plans: [
      {
        name: "Free",
        price: "Rp 0",
        cadence: "selamanya",
        summary: "Semua fitur web, satu nomor WhatsApp, 100 chat action per bulan.",
        items: ["Dashboard, analitik, anggaran, ekspor", "1 nomor WhatsApp", "100 chat action / bulan"],
      },
      {
        name: "Plus",
        price: "Indikatif",
        cadence: "per bulan",
        summary: "Untuk yang mencatat tiap hari lewat chat.",
        featured: true,
        items: ["2 nomor WhatsApp", "1.000 chat action / bulan", "60 menit voice note / bulan"],
      },
      {
        name: "Pro",
        price: "Indikatif",
        cadence: "per bulan",
        summary: "Dompet bersama dan notifikasi ke banyak nomor.",
        items: ["3 nomor WhatsApp", "5.000 chat action / bulan", "300 menit voice note / bulan"],
      },
    ],
  },
];

export function getPricing(locale: Locale): readonly PricingGroup[] {
  return locale === "id" ? id : en;
}
