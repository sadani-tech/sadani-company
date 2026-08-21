export type ProductTone = "serahin" | "money-flow" | "tuju";

export interface Product {
  slug: ProductTone;
  name: string;
  category: string;
  shortDescription: string;
  tagline: string;
  introduction: string;
  problem: string;
  philosophy: string;
  status: string;
  features: readonly { title: string; description: string }[];
  id: {
    category: string;
    shortDescription: string;
    tagline: string;
    introduction: string;
    problem: string;
    philosophy: string;
    status: string;
    features: readonly { title: string; description: string }[];
  };
}

export const products: readonly Product[] = [
  {
    slug: "serahin",
    name: "Serahin",
    category: "Commerce",
    shortDescription: "A pre-order platform designed to make ordering ahead simpler for customers and sellers.",
    tagline: "Pre-orders, made easier to manage.",
    introduction: "Serahin is designed around a clearer way to organize products that are ordered before they are ready or available.",
    problem: "Pre-orders can become scattered across chats, forms, and manual records. That makes quantities, deadlines, and order progress harder to follow.",
    philosophy: "Give sellers a more organized workflow and give customers a clearer view of what they ordered and what happens next.",
    status: "Product development is ongoing. Availability and capabilities may evolve.",
    features: [
      { title: "Pre-order windows", description: "Designed to make ordering periods and deadlines easier to understand." },
      { title: "Order visibility", description: "Aims to keep quantities and order progress in one coherent flow." },
      { title: "Seller workflow", description: "Built to reduce the manual work behind collecting pre-orders." },
    ],
    id: {
      category: "Perdagangan",
      shortDescription: "Platform pre-order yang dirancang untuk membuat pemesanan lebih sederhana bagi pelanggan dan penjual.",
      tagline: "Pre-order, lebih mudah dikelola.",
      introduction: "Serahin dirancang sebagai cara yang lebih jelas untuk mengatur produk yang dipesan sebelum siap atau tersedia.",
      problem: "Pre-order dapat tersebar di chat, formulir, dan catatan manual. Jumlah, tenggat, dan progres pesanan pun menjadi lebih sulit diikuti.",
      philosophy: "Memberi penjual alur kerja yang lebih teratur dan pelanggan gambaran yang lebih jelas tentang pesanan serta langkah berikutnya.",
      status: "Pengembangan produk masih berjalan. Ketersediaan dan kemampuan dapat terus berkembang.",
      features: [
        { title: "Periode pre-order", description: "Dirancang agar periode pemesanan dan tenggat lebih mudah dipahami." },
        { title: "Visibilitas pesanan", description: "Bertujuan menyatukan jumlah dan progres pesanan dalam satu alur." },
        { title: "Alur kerja penjual", description: "Dibangun untuk mengurangi pekerjaan manual dalam mengumpulkan pre-order." },
      ],
    },
  },
  {
    slug: "money-flow",
    name: "Money Flow",
    category: "Finance Tools",
    shortDescription: "A simple way to understand income, expenses, and everyday cash flow.",
    tagline: "See where your money is moving.",
    introduction: "Money Flow is financial management software designed to make personal and business records easier to understand.",
    problem: "When income and expenses live in different notes or go unrecorded, it becomes difficult to see a reliable picture of everyday cash flow.",
    philosophy: "Financial records should feel approachable. Clear information can help people make more considered decisions without adding complexity.",
    status: "Money Flow is a software product. It is not a bank, wallet, payment gateway, lender, or regulated financial institution.",
    features: [
      { title: "Income & expenses", description: "Designed for recording the money coming in and going out." },
      { title: "Cash-flow view", description: "Aims to present financial movement in a clear dashboard." },
      { title: "Budget awareness", description: "Built to make everyday plans and records easier to review." },
    ],
    id: {
      category: "Alat Finansial",
      shortDescription: "Cara sederhana untuk memahami pemasukan, pengeluaran, dan arus kas sehari-hari.",
      tagline: "Lihat ke mana uang Anda bergerak.",
      introduction: "Money Flow adalah software pengelolaan keuangan yang dirancang agar catatan pribadi dan bisnis lebih mudah dipahami.",
      problem: "Ketika pemasukan dan pengeluaran tersebar atau tidak tercatat, gambaran arus kas sehari-hari menjadi sulit dipercaya.",
      philosophy: "Catatan keuangan seharusnya terasa mudah didekati. Informasi yang jelas membantu orang membuat keputusan lebih matang tanpa menambah kerumitan.",
      status: "Money Flow adalah produk software. Bukan bank, dompet, payment gateway, pemberi pinjaman, atau lembaga keuangan berizin.",
      features: [
        { title: "Pemasukan & pengeluaran", description: "Dirancang untuk mencatat uang yang masuk dan keluar." },
        { title: "Tampilan arus kas", description: "Bertujuan menyajikan pergerakan keuangan melalui dashboard yang jelas." },
        { title: "Kesadaran anggaran", description: "Dibangun agar rencana dan catatan sehari-hari lebih mudah ditinjau." },
      ],
    },
  },
  {
    slug: "tuju",
    name: "Tuju",
    category: "Career",
    shortDescription: "Career guidance designed to help people understand where they are, where they want to go, and how to get there.",
    tagline: "A clearer path toward your next chapter.",
    introduction: "Tuju is designed to help people explore career direction, understand possible pathways, and identify skills worth developing.",
    problem: "Career choices can feel abstract. People often see a destination without a useful map of the roles, skills, and learning steps between here and there.",
    philosophy: "Career guidance should turn uncertainty into a practical path while leaving room for each person’s own goals and circumstances.",
    status: "Product development is ongoing. Guidance is designed to support—not replace—personal judgment.",
    features: [
      { title: "Career direction", description: "Designed to help people explore roles and possible next steps." },
      { title: "Skill pathways", description: "Aims to connect target roles with skills worth developing." },
      { title: "Learning guidance", description: "Built to organize relevant development recommendations." },
    ],
    id: {
      category: "Karier",
      shortDescription: "Panduan karier untuk membantu orang memahami posisi saat ini, tujuan, dan langkah untuk mencapainya.",
      tagline: "Arah yang lebih jelas menuju babak berikutnya.",
      introduction: "Tuju dirancang untuk membantu orang mengeksplorasi arah karier, memahami jalur yang mungkin, dan mengenali keterampilan yang layak dikembangkan.",
      problem: "Pilihan karier dapat terasa abstrak. Sering kali orang melihat tujuan tanpa peta peran, keterampilan, dan langkah belajar untuk mencapainya.",
      philosophy: "Panduan karier seharusnya mengubah ketidakpastian menjadi jalur praktis sambil tetap memberi ruang bagi tujuan dan keadaan setiap orang.",
      status: "Pengembangan produk masih berjalan. Panduan dirancang untuk mendukung, bukan menggantikan, pertimbangan pribadi.",
      features: [
        { title: "Arah karier", description: "Dirancang untuk membantu orang mengeksplorasi peran dan langkah berikutnya." },
        { title: "Jalur keterampilan", description: "Bertujuan menghubungkan peran tujuan dengan keterampilan yang layak dikembangkan." },
        { title: "Panduan belajar", description: "Dibangun untuk mengatur rekomendasi pengembangan yang relevan." },
      ],
    },
  },
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function localizeProduct(product: Product, locale: "id" | "en") {
  if (locale === "en") return product;
  return { ...product, ...product.id };
}
