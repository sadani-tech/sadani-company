export type ProductTone = "serahin" | "manifly" | "tuju" | "insuralab";

interface LocalizedProduct {
  category: string;
  shortDescription: string;
  tagline: string;
  introduction: string;
  problem: string;
  philosophy: string;
  status: string;
  features: readonly { title: string; description: string }[];
}

export interface Product extends LocalizedProduct {
  slug: ProductTone;
  name: string;
  /** Shown in the homepage orbit + ecosystem diagram (exactly three slots). */
  featured: boolean;
  /** Live product site, when one is publicly accessible. */
  website?: string;
  id: LocalizedProduct;
}

export const products: readonly Product[] = [
  {
    slug: "serahin",
    name: "Serahin",
    featured: true,
    website: "https://serahin.suraise.com",
    category: "Commerce",
    shortDescription:
      "A pre-order platform that brings public catalogs, multi-variant checkout, payments, and order progress into one flow.",
    tagline: "Pre-orders, made easier to manage.",
    introduction:
      "Serahin gives sellers a structured way to publish and duplicate pre-order campaigns, manage products and vendors, and track orders. Customers can browse the public catalog, order multiple variants, choose an available payment route, and follow fulfilment from one portal.",
    problem:
      "Pre-orders often get scattered across chats, forms, and manual records, so quantities, deadlines, payment status, and order progress are hard to follow for both sides.",
    philosophy:
      "Give sellers an organized workflow and give customers a clear view of what they ordered, what they paid, and what happens next.",
    status:
      "Serahin's public storefront, campaign operations, order tracking, and payment-service integration are implemented. Manual payment remains available; automatic gateway checkout is shown only when it is enabled for the relevant environment and campaign.",
    features: [
      { title: "Public storefront", description: "Browse active campaigns across the catalog, then check out within the selected campaign." },
      { title: "Campaign operations", description: "Manage multi-variant products, vendors, quotas, deadlines, imports, exports, and reusable campaign copies." },
      { title: "Orders & payments", description: "Track manual or gateway payments and keep buyers informed through a self-service order portal." },
    ],
    id: {
      category: "Perdagangan",
      shortDescription:
        "Platform pre-order yang menyatukan katalog publik, checkout multi-varian, pembayaran, dan progres pesanan dalam satu alur.",
      tagline: "Pre-order, lebih mudah dikelola.",
      introduction:
        "Serahin memberi penjual cara terstruktur untuk menerbitkan dan menduplikasi kampanye pre-order, mengelola produk dan vendor, serta melacak pesanan. Pelanggan dapat menjelajahi katalog publik, memesan beberapa varian, memilih jalur pembayaran yang tersedia, dan mengikuti pemenuhan pesanan dari satu portal.",
      problem:
        "Pre-order sering tersebar di chat, formulir, dan catatan manual, sehingga jumlah, tenggat, status pembayaran, dan progres pesanan sulit diikuti kedua pihak.",
      philosophy:
        "Memberi penjual alur kerja yang teratur dan memberi pelanggan gambaran jelas tentang pesanan, pembayaran, serta langkah berikutnya.",
      status:
        "Storefront publik, operasional kampanye, pelacakan pesanan, dan integrasi payment-service Serahin sudah diimplementasikan. Pembayaran manual tetap tersedia; checkout gateway otomatis hanya ditampilkan ketika aktif untuk environment dan kampanye terkait.",
      features: [
        { title: "Storefront publik", description: "Jelajahi kampanye aktif dari katalog, lalu checkout di dalam kampanye yang dipilih." },
        { title: "Operasional kampanye", description: "Kelola produk multi-varian, vendor, kuota, tenggat, impor, ekspor, dan salinan kampanye yang dapat digunakan ulang." },
        { title: "Pesanan & pembayaran", description: "Lacak pembayaran manual atau gateway dan informasikan progres melalui portal pesanan mandiri pembeli." },
      ],
    },
  },
  {
    slug: "manifly",
    name: "Manifly",
    featured: true,
    website: "https://app.manifly.id",
    category: "Personal Finance",
    shortDescription:
      "A personal finance tracker that records transactions straight from a WhatsApp chat, a voice note, or a photo of a receipt.",
    tagline: "See where your money is moving.",
    introduction:
      "Manifly is personal finance software designed to make everyday records easier: type “coffee 15k” in WhatsApp, send a voice note, scan a receipt, or use the web app, and review the result through the same accounts, budgets, analytics, and shared pockets.",
    problem:
      "When income and expenses live in scattered notes or go unrecorded, it becomes difficult to see a reliable picture of everyday cash flow.",
    philosophy:
      "Financial records should feel approachable. Clear information helps people make more considered decisions without adding complexity.",
    status:
      "Manifly v1.8 has implemented its public product site, WhatsApp membership limits, and subscription billing flow. Paid checkout availability is shown inside Manifly and may remain disabled until payment-provider release checks are complete. Manifly is not a bank, e-wallet, lender, or payment gateway.",
    features: [
      { title: "Web & WhatsApp capture", description: "Record from the web, natural-language chat, voice notes, or receipt scans." },
      { title: "A complete money view", description: "Review accounts, transactions, budgets, recurring items, analytics, and financial health." },
      { title: "Pockets & memberships", description: "Collaborate through shared pockets and choose a plan for the WhatsApp capacity you need." },
    ],
    id: {
      category: "Keuangan Pribadi",
      shortDescription:
        "Pelacak keuangan pribadi yang mencatat transaksi langsung dari chat WhatsApp, voice note, atau foto struk.",
      tagline: "Lihat ke mana uang Anda bergerak.",
      introduction:
        "Manifly adalah software keuangan pribadi yang membuat pencatatan sehari-hari lebih mudah: ketik “kopi 15rb” di WhatsApp, kirim voice note, pindai struk, atau gunakan aplikasi web, lalu tinjau hasilnya melalui akun, anggaran, analitik, dan pocket bersama yang sama.",
      problem:
        "Ketika pemasukan dan pengeluaran tersebar atau tidak tercatat, gambaran arus kas sehari-hari menjadi sulit dipercaya.",
      philosophy:
        "Catatan keuangan seharusnya terasa mudah didekati. Informasi yang jelas membantu orang membuat keputusan lebih matang tanpa menambah kerumitan.",
      status:
        "Manifly v1.8 sudah mengimplementasikan website produk publik, batas membership WhatsApp, dan alur billing langganan. Ketersediaan checkout berbayar ditampilkan di Manifly dan dapat tetap dinonaktifkan sampai pemeriksaan rilis penyedia pembayaran selesai. Manifly bukan bank, e-wallet, pemberi pinjaman, atau payment gateway.",
      features: [
        { title: "Pencatatan web & WhatsApp", description: "Catat lewat web, chat bahasa natural, voice note, atau pindai struk." },
        { title: "Gambaran uang menyeluruh", description: "Tinjau akun, transaksi, anggaran, transaksi berulang, analitik, dan kesehatan finansial." },
        { title: "Pocket & membership", description: "Berkolaborasi melalui pocket bersama dan pilih paket sesuai kapasitas WhatsApp yang dibutuhkan." },
      ],
    },
  },
  {
    slug: "tuju",
    name: "Tuju",
    featured: true,
    category: "Career",
    shortDescription:
      "Career guidance designed to help people understand where they are, where they want to go, and how to get there.",
    tagline: "A clearer path toward your next chapter.",
    introduction:
      "Tuju is designed to help people explore career direction, understand possible pathways, and identify skills worth developing.",
    problem:
      "Career choices can feel abstract. People often see a destination without a useful map of the roles, skills, and learning steps between here and there.",
    philosophy:
      "Career guidance should turn uncertainty into a practical path while leaving room for each person’s own goals and circumstances.",
    status: "Product development is ongoing. Guidance is designed to support—not replace—personal judgment.",
    features: [
      { title: "Career direction", description: "Designed to help people explore roles and possible next steps." },
      { title: "Skill pathways", description: "Aims to connect target roles with skills worth developing." },
      { title: "Learning guidance", description: "Built to organize relevant development recommendations." },
    ],
    id: {
      category: "Karier",
      shortDescription:
        "Panduan karier untuk membantu orang memahami posisi saat ini, tujuan, dan langkah untuk mencapainya.",
      tagline: "Arah yang lebih jelas menuju babak berikutnya.",
      introduction:
        "Tuju dirancang untuk membantu orang mengeksplorasi arah karier, memahami jalur yang mungkin, dan mengenali keterampilan yang layak dikembangkan.",
      problem:
        "Pilihan karier dapat terasa abstrak. Sering kali orang melihat tujuan tanpa peta peran, keterampilan, dan langkah belajar untuk mencapainya.",
      philosophy:
        "Panduan karier seharusnya mengubah ketidakpastian menjadi jalur praktis sambil tetap memberi ruang bagi tujuan dan keadaan setiap orang.",
      status: "Pengembangan produk masih berjalan. Panduan dirancang untuk mendukung, bukan menggantikan, pertimbangan pribadi.",
      features: [
        { title: "Arah karier", description: "Dirancang untuk membantu orang mengeksplorasi peran dan langkah berikutnya." },
        { title: "Jalur keterampilan", description: "Bertujuan menghubungkan peran tujuan dengan keterampilan yang layak dikembangkan." },
        { title: "Panduan belajar", description: "Dibangun untuk mengatur rekomendasi pengembangan yang relevan." },
      ],
    },
  },
  {
    slug: "insuralab",
    name: "InsuraLab",
    featured: false,
    category: "Insurance Education",
    shortDescription:
      "An independent, provider-agnostic platform that helps people understand risk and how insurance protection works before they decide.",
    tagline: "Understand insurance before you buy it.",
    introduction:
      "InsuraLab explains financial risk, protection concepts, and how policies work, using interactive visualization and clearly-sourced provider information.",
    problem:
      "Insurance information is often either a sales pitch or dense policy language, so people make decisions without really understanding what they are protecting.",
    philosophy:
      "Education before selling. InsuraLab does not tell people which product to buy; it helps them understand what they are protecting.",
    status:
      "In foundation development. InsuraLab is an educational platform—not an insurance broker, agent, or financial adviser—and does not provide personalized financial, legal, or tax advice.",
    features: [
      { title: "Risk & protection basics", description: "Plain-language explanations of common risks and how coverage responds." },
      { title: "Provider-agnostic", description: "General insurance knowledge stays distinct from provider-specific details, with sources and review dates." },
      { title: "Interactive visualization", description: "3D and interactive views used as an educational tool, not decoration." },
    ],
    id: {
      category: "Edukasi Asuransi",
      shortDescription:
        "Platform independen dan provider-agnostic yang membantu orang memahami risiko dan cara kerja proteksi asuransi sebelum memutuskan.",
      tagline: "Pahami asuransi sebelum membelinya.",
      introduction:
        "InsuraLab menjelaskan risiko finansial, konsep proteksi, dan cara kerja polis menggunakan visualisasi interaktif dan informasi provider yang bersumber jelas.",
      problem:
        "Informasi asuransi sering berupa promosi jualan atau bahasa polis yang padat, sehingga orang mengambil keputusan tanpa benar-benar memahami apa yang mereka lindungi.",
      philosophy:
        "Edukasi sebelum menjual. InsuraLab tidak menyuruh orang membeli produk tertentu; ia membantu mereka memahami apa yang sedang dilindungi.",
      status:
        "Dalam tahap pengembangan fondasi. InsuraLab adalah platform edukasi—bukan broker asuransi, agen, atau penasihat keuangan—dan tidak memberikan nasihat finansial, hukum, atau pajak yang bersifat personal.",
      features: [
        { title: "Dasar risiko & proteksi", description: "Penjelasan bahasa sederhana tentang risiko umum dan bagaimana proteksi merespons." },
        { title: "Provider-agnostic", description: "Pengetahuan asuransi umum tetap terpisah dari detail spesifik provider, lengkap dengan sumber dan tanggal tinjauan." },
        { title: "Visualisasi interaktif", description: "Tampilan 3D dan interaktif dipakai sebagai alat edukasi, bukan dekorasi." },
      ],
    },
  },
] as const;

export const featuredProducts = products.filter((product) => product.featured);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function localizeProduct(product: Product, locale: "id" | "en"): Product {
  if (locale === "en") return product;
  return { ...product, ...product.id };
}
