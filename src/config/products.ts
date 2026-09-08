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
      "A pre-order platform where sellers open ordering campaigns and customers reserve and pay for items online before they are produced.",
    tagline: "Pre-orders, made easier to manage.",
    introduction:
      "Serahin gives sellers a structured way to run pre-order campaigns and gives customers a clear place to review an item, choose a quantity, check the price, pay online, and follow their order until it ships.",
    problem:
      "Pre-orders often get scattered across chats, forms, and manual records, so quantities, deadlines, payment status, and order progress are hard to follow for both sides.",
    philosophy:
      "Give sellers an organized workflow and give customers a clear view of what they ordered, what they paid, and what happens next.",
    status:
      "Serahin is an operating product. Online payments are processed by a licensed third-party payment gateway; funds are settled to the seller running the campaign. Sadani operates the platform and does not store card or bank credentials.",
    features: [
      { title: "Pre-order campaigns", description: "Open an ordering window with a deadline, quota, item list, and price." },
      { title: "Online checkout", description: "Customers reserve a quantity and pay online through a secure payment gateway (bank transfer, virtual account, e-wallet, QRIS)." },
      { title: "Order & payment tracking", description: "Quantities, payment status, and production progress stay in one flow for the seller and the buyer." },
    ],
    id: {
      category: "Perdagangan",
      shortDescription:
        "Platform pre-order tempat penjual membuka kampanye pemesanan dan pelanggan memesan serta membayar barang secara online sebelum diproduksi.",
      tagline: "Pre-order, lebih mudah dikelola.",
      introduction:
        "Serahin memberi penjual cara yang terstruktur untuk menjalankan kampanye pre-order, dan memberi pelanggan tempat yang jelas untuk meninjau barang, memilih jumlah, mengecek harga, membayar online, dan mengikuti pesanan sampai dikirim.",
      problem:
        "Pre-order sering tersebar di chat, formulir, dan catatan manual, sehingga jumlah, tenggat, status pembayaran, dan progres pesanan sulit diikuti kedua pihak.",
      philosophy:
        "Memberi penjual alur kerja yang teratur dan memberi pelanggan gambaran jelas tentang pesanan, pembayaran, serta langkah berikutnya.",
      status:
        "Serahin adalah produk yang beroperasi. Pembayaran online diproses oleh payment gateway pihak ketiga berizin; dana diselesaikan ke penjual yang menjalankan kampanye. Sadani mengoperasikan platform dan tidak menyimpan data kartu atau kredensial bank.",
      features: [
        { title: "Kampanye pre-order", description: "Buka periode pemesanan dengan tenggat, kuota, daftar item, dan harga." },
        { title: "Checkout online", description: "Pelanggan memesan jumlah dan membayar online melalui payment gateway aman (transfer bank, virtual account, e-wallet, QRIS)." },
        { title: "Pelacakan pesanan & pembayaran", description: "Jumlah, status pembayaran, dan progres produksi berada dalam satu alur untuk penjual dan pembeli." },
      ],
    },
  },
  {
    slug: "manifly",
    name: "Manifly",
    featured: true,
    category: "Personal Finance",
    shortDescription:
      "A personal finance tracker that records transactions straight from a WhatsApp chat, a voice note, or a photo of a receipt.",
    tagline: "See where your money is moving.",
    introduction:
      "Manifly is personal finance software designed to make everyday records effortless: type “kopi 15rb” in WhatsApp, send a voice note, or snap a receipt, and it lands in the same dashboard, budgets, and analytics.",
    problem:
      "When income and expenses live in scattered notes or go unrecorded, it becomes difficult to see a reliable picture of everyday cash flow.",
    philosophy:
      "Financial records should feel approachable. Clear information helps people make more considered decisions without adding complexity.",
    status:
      "Manifly is personal finance software. It is not a bank, e-wallet, payment gateway, lender, or regulated financial institution, and it never asks for internet-banking PINs, passwords, or OTPs.",
    features: [
      { title: "Record from WhatsApp", description: "Natural-language chat and voice notes become categorized transactions." },
      { title: "Clear dashboards", description: "Balances, income vs. expense, category breakdowns, and trends in one place." },
      { title: "Budgets & health", description: "Per-category budgets and a transparent financial-health score." },
    ],
    id: {
      category: "Keuangan Pribadi",
      shortDescription:
        "Pelacak keuangan pribadi yang mencatat transaksi langsung dari chat WhatsApp, voice note, atau foto struk.",
      tagline: "Lihat ke mana uang Anda bergerak.",
      introduction:
        "Manifly adalah software keuangan pribadi yang dirancang agar pencatatan sehari-hari terasa mudah: ketik “kopi 15rb” di WhatsApp, kirim voice note, atau foto struk, dan semuanya masuk ke dashboard, anggaran, dan analitik yang sama.",
      problem:
        "Ketika pemasukan dan pengeluaran tersebar atau tidak tercatat, gambaran arus kas sehari-hari menjadi sulit dipercaya.",
      philosophy:
        "Catatan keuangan seharusnya terasa mudah didekati. Informasi yang jelas membantu orang membuat keputusan lebih matang tanpa menambah kerumitan.",
      status:
        "Manifly adalah software keuangan pribadi. Bukan bank, e-wallet, payment gateway, pemberi pinjaman, atau lembaga keuangan berizin, dan tidak pernah meminta PIN, password, atau OTP internet banking.",
      features: [
        { title: "Catat lewat WhatsApp", description: "Chat bahasa natural dan voice note menjadi transaksi yang terkategori." },
        { title: "Dashboard yang jelas", description: "Saldo, pemasukan vs pengeluaran, komposisi kategori, dan tren dalam satu tempat." },
        { title: "Anggaran & kesehatan", description: "Anggaran per kategori dan skor kesehatan finansial yang transparan." },
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
