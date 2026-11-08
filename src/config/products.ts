export type ProductTone = "serahin" | "manifly" | "tuju" | "insuralab" | "rentaja" | "djotos-laundry" | "pranaja-ashari";

interface LocalizedProduct {
  category: string;
  shortDescription: string;
  tagline: string;
  introduction: string;
  audience: string;
  problem: string;
  philosophy: string;
  status: string;
  benefits: readonly string[];
  features: readonly { title: string; description: string }[];
  coverAlt: string;
}

export interface Product extends LocalizedProduct {
  slug: ProductTone;
  name: string;
  kind: "product" | "project";
  cover: string;
  visualType: "editorial";
  website?: string;
  repository?: string;
  gallery?: readonly { src: string; title: string; titleId: string }[];
  id: LocalizedProduct;
}

// Reviewed against live public pages and implementation source on 2026-11-08.
// See docs/product-content-review.md for evidence, media provenance and availability limits.
export const products: readonly Product[] = [
  {
    slug: "serahin", name: "Serahin", kind: "product", cover: "/products/serahin/editorial-v2.webp", visualType: "editorial",
    website: "https://serahin.suraise.com", repository: "https://github.com/sadani-tech/serahin-web",
    gallery: [
      { src: "/products/serahin/campaign.webp", title: "Campaign and quota setup", titleId: "Pengaturan kampanye dan kuota" },
      { src: "/products/serahin/payments.webp", title: "Deposit and settlement workflow", titleId: "Alur DP dan pelunasan" },
    ],
    category: "Pre-order Operations", tagline: "From an open campaign to a completed order.",
    shortDescription: "Run pre-orders with campaign quotas, multi-variant orders, deposits, payment verification and a private buyer portal.",
    introduction: "Serahin brings the seller and buyer sides of pre-order selling into one workflow. Sellers publish campaigns with variants, quotas and payment terms; buyers order without creating an account, then follow payment and fulfilment from their personal order link.",
    audience: "Fashion, merchandise, crafts and other sellers working with batches or pre-orders.",
    problem: "Orders arrive through chats and forms, transfer receipts get lost, and spreadsheets cannot reliably answer how much quota remains, who still owes a balance or which batch is ready to ship.",
    philosophy: "One campaign holds the products, orders, verified payments and production timeline together. A shared buyer portal makes the current status visible without asking the seller for every update.",
    status: "The public site and catalog are accessible. Campaigns, buyer orders, deposits and fulfilment are implemented; payment methods depend on the seller and the options shown at checkout.",
    benefits: ["Buyers can order without registering", "Deposit and remaining balance follow verified payments", "One order link carries progress updates"],
    features: [
      { title: "Campaigns & quotas", description: "Set periods, variants, prices, images and quotas; keep availability alongside the campaign." },
      { title: "Centralized orders", description: "Manage multiple variants, buyer details, status changes, filters and bulk actions from one place." },
      { title: "Deposits & settlement", description: "Offer full payment, a percentage deposit or a fixed deposit, with the remaining amount calculated from verified payments." },
      { title: "Production timeline", description: "Publish progress from campaign closing through production, ready-to-ship and completion." },
      { title: "Buyer portal", description: "Let buyers check their order, payment and progress through a private link without creating an account." },
      { title: "Catalog & operations", description: "Combine a searchable public catalog with vendor management, reports and reusable campaign operations." },
    ],
    coverAlt: "Editorial illustration of a pre-order parcel and a confirmed order card",
    id: {
      category: "Operasional Pre-order", tagline: "Dari kampanye dibuka sampai pesanan diserahkan.",
      shortDescription: "Kelola pre-order dengan kuota kampanye, pesanan multi-varian, DP, verifikasi pembayaran, dan portal pribadi buyer.",
      introduction: "Serahin menyatukan sisi seller dan buyer dalam satu alur pre-order. Seller menerbitkan kampanye beserta varian, kuota, dan skema pembayaran; buyer memesan tanpa membuat akun, lalu memantau pembayaran dan pemenuhan melalui tautan pesanannya.",
      audience: "Seller fesyen, merchandise, kerajinan, dan bisnis lain yang menjual secara batch atau pre-order.",
      problem: "Pesanan masuk lewat chat dan formulir, bukti transfer tercecer, dan spreadsheet sulit menjawab sisa kuota, tagihan yang belum lunas, serta batch yang sudah siap dikirim.",
      philosophy: "Produk, pesanan, pembayaran terverifikasi, dan timeline produksi berada dalam satu kampanye. Portal buyer menampilkan status yang sama sehingga setiap perkembangan tidak harus ditanyakan lewat chat.",
      status: "Website publik dan katalog dapat diakses. Kampanye, pesanan buyer, DP, dan pemenuhan sudah diimplementasikan; metode pembayaran mengikuti seller dan pilihan yang tampil pada checkout.",
      benefits: ["Buyer bisa memesan tanpa mendaftar", "DP dan sisa tagihan mengikuti pembayaran terverifikasi", "Satu tautan pesanan untuk memantau progres"],
      features: [
        { title: "Kampanye & kuota", description: "Atur periode, varian, harga, gambar, dan kuota; pantau ketersediaan dari kampanye yang sama." },
        { title: "Pesanan terpusat", description: "Kelola multi-varian, data buyer, perubahan status, filter, dan aksi massal dari satu tempat." },
        { title: "DP & pelunasan", description: "Pilih lunas langsung, DP persentase, atau DP nominal. Sisa tagihan dihitung dari pembayaran yang terverifikasi." },
        { title: "Timeline produksi", description: "Bagikan progres dari PO ditutup, produksi, siap kirim, sampai pesanan selesai." },
        { title: "Portal buyer", description: "Buyer memeriksa pesanan, pembayaran, dan progres lewat tautan pribadi tanpa membuat akun." },
        { title: "Katalog & operasional", description: "Katalog publik yang dapat dicari dilengkapi pengelolaan vendor, laporan, dan kampanye yang dapat digunakan ulang." },
      ],
      coverAlt: "Ilustrasi editorial paket pre-order dan kartu pesanan terkonfirmasi",
    },
  },
  {
    slug: "manifly", name: "Manifly", kind: "product", cover: "/products/manifly/editorial-v2.webp", visualType: "editorial",
    website: "https://manifly.suraise.com/login", repository: "https://github.com/sadani-tech/manifly-web",
    category: "Personal Finance", tagline: "Keep your money from flying away unnoticed.",
    shortDescription: "Record through WhatsApp, voice or receipts, then manage accounts, budgets, debts and financial plans in one web app.",
    introduction: "Manifly reduces the effort of keeping personal financial records. Natural-language WhatsApp messages such as “coffee 15k” connect to a web workspace for transactions, accounts, shared pockets, spending analysis and planning.",
    audience: "Individuals, couples and households who want to understand daily cash flow without maintaining scattered notes.",
    problem: "Small expenses are easy to forget. Cash, bank balances, shared spending and debt records become fragmented, so even diligent saving can lack a clear picture of where the money goes.",
    philosophy: "Make capture fit everyday habits, then organize it into account-based records. Bring budgets, debts, recurring entries and planning into the same context so the records can guide practical decisions.",
    status: "The login page is publicly accessible. Account, transaction, WhatsApp, budget, debt and planning modules are present in the application. WhatsApp capacity and paid checkout follow the active membership and service configuration.",
    benefits: ["Capture in the same place you already chat", "Separate account transfers from income and expenses", "Review records and plans in a shared pocket context"],
    features: [
      { title: "WhatsApp, voice & receipts", description: "Capture natural-language messages, review voice transcription and extract receipt details before recording." },
      { title: "Accounts & shared pockets", description: "Organize cash, bank and e-wallet records, transfers and collaboration in a selected pocket." },
      { title: "Budgets & recurring records", description: "Track category budgets and scheduled transactions with analytics and financial-health views." },
      { title: "Debts & receivables", description: "Maintain who owes what, due dates and settlement status alongside everyday transactions." },
      { title: "Goals & cash-flow planning", description: "Use the implemented planning workspace for savings goals, tracked subscriptions and forecast scenarios." },
      { title: "Net worth & smart rules", description: "Review asset/liability records and apply explicit categorization rules to repeated transactions." },
    ],
    coverAlt: "Editorial illustration of a wallet, receipt and coins for personal financial records",
    id: {
      category: "Keuangan Pribadi", tagline: "Biar uang nggak asal terbang.",
      shortDescription: "Catat lewat WhatsApp, suara, atau struk, lalu kelola akun, anggaran, utang, dan rencana keuangan dalam satu aplikasi web.",
      introduction: "Manifly mengurangi usaha untuk mencatat keuangan pribadi. Pesan WhatsApp bahasa sehari-hari seperti “kopi 15rb” terhubung dengan ruang kerja web untuk transaksi, akun, pocket bersama, analisis pengeluaran, dan perencanaan.",
      audience: "Individu, pasangan, dan rumah tangga yang ingin memahami arus kas tanpa catatan yang tersebar.",
      problem: "Pengeluaran kecil mudah terlupa. Saldo tunai, rekening, belanja bersama, serta catatan utang tersebar sehingga arah uang tetap sulit dipahami walaupun sudah berusaha berhemat.",
      philosophy: "Pencatatan mengikuti kebiasaan sehari-hari, kemudian dirapikan menjadi catatan per akun. Anggaran, utang, transaksi berulang, dan perencanaan berada dalam konteks yang sama agar catatan membantu mengambil keputusan praktis.",
      status: "Halaman masuk dapat diakses publik. Modul akun, transaksi, WhatsApp, anggaran, utang, dan perencanaan tersedia di implementasi aplikasi. Kapasitas WhatsApp dan checkout berbayar mengikuti membership serta konfigurasi layanan aktif.",
      benefits: ["Catat dari tempat yang sudah dipakai untuk chat", "Transfer antar akun terpisah dari pemasukan dan pengeluaran", "Tinjau catatan dan rencana dalam konteks pocket bersama"],
      features: [
        { title: "WhatsApp, suara & struk", description: "Catat pesan bahasa natural, tinjau hasil transkripsi suara, dan ambil detail struk sebelum menyimpan." },
        { title: "Akun & pocket bersama", description: "Atur catatan tunai, rekening, e-wallet, transfer, dan kolaborasi dalam pocket yang dipilih." },
        { title: "Anggaran & transaksi berulang", description: "Pantau budget kategori dan jadwal transaksi, dilengkapi analitik serta kesehatan finansial." },
        { title: "Utang & piutang", description: "Kelola pihak terkait, jatuh tempo, dan status pelunasan bersama catatan transaksi harian." },
        { title: "Goal & rencana arus kas", description: "Ruang perencanaan memuat tujuan tabungan, pelacak langganan, dan skenario proyeksi saldo." },
        { title: "Net worth & smart rules", description: "Tinjau aset serta kewajiban dan terapkan aturan kategorisasi eksplisit untuk transaksi berulang." },
      ],
      coverAlt: "Ilustrasi editorial dompet, struk, dan koin untuk pencatatan keuangan pribadi",
    },
  },
  {
    slug: "tuju", name: "Tuju", kind: "product", cover: "/products/tuju/editorial-v2.webp", visualType: "editorial",
    website: "https://tuju.suraise.com", repository: "https://github.com/sadani-tech/tuju-web",
    category: "Education & Career Direction", tagline: "Find your direction. Build your life.",
    shortDescription: "Turn an academic and interest profile into a Life Path Report, profession exploration, an actionable roadmap and AI expert conversations.",
    introduction: "Tuju supports decisions across school, university and career transitions. It combines academic information, interests, personality and goals with a rule engine and AI to present possible education and profession paths.",
    audience: "School pupils, university students, graduates, career switchers and parents supporting education choices.",
    problem: "Education and career choices are often driven by peer pressure or fragmented information. A person may see an attractive destination without understanding the study path, skills or practical next steps.",
    philosophy: "Build a profile first, explain possible matches in a Life Path Report, then connect exploration to a personal roadmap. Profession-specific AI chats help users ask focused questions while keeping the final decision their own.",
    status: "The public site is accessible. Profile/onboarding, report generation, profession exploration, roadmap, AI chat and points have implementation routes. Recommendations support personal judgment and do not guarantee admission or employment.",
    benefits: ["Education and career choices share one profile", "Recommendations connect to practical next steps", "Explore profession questions through focused AI conversations"],
    features: [
      { title: "A multidimensional profile", description: "Collect academic background, interests, personality, work preferences and life goals." },
      { title: "Life Path Report", description: "Present matching profession, study and school-track suggestions with an explained profile context." },
      { title: "Profession exploration", description: "Browse roles, education paths and skill requirements through a searchable profession catalog." },
      { title: "Personal roadmap", description: "Organize next steps in a layered task roadmap and track progress." },
      { title: "AI Expert Chat", description: "Ask questions through profession-specific conversations and revisit chat history." },
      { title: "Points & evolution", description: "Follow profile completion, activity history, points and progression across the journey." },
    ],
    coverAlt: "Editorial illustration of steps and a golden destination for education and career direction",
    id: {
      category: "Arah Pendidikan & Karier", tagline: "Temukan jalanmu. Bangun hidupmu.",
      shortDescription: "Ubah profil akademik dan minat menjadi Life Path Report, eksplorasi profesi, roadmap langkah nyata, serta percakapan AI expert.",
      introduction: "Tuju mendukung keputusan dari sekolah, kuliah, hingga perpindahan karier. Informasi akademik, minat, kepribadian, dan tujuan dipadukan dengan rule engine serta AI untuk menampilkan kemungkinan jalur pendidikan dan profesi.",
      audience: "Pelajar, mahasiswa, fresh graduate, career switcher, dan orang tua yang mendampingi pilihan pendidikan.",
      problem: "Pilihan pendidikan dan karier sering mengikuti teman atau informasi yang terpotong. Tujuan terlihat menarik, tetapi jalur studi, keterampilan, dan langkah untuk mencapainya belum jelas.",
      philosophy: "Bangun profil terlebih dahulu, jelaskan kemungkinan kecocokan melalui Life Path Report, lalu hubungkan eksplorasi dengan roadmap pribadi. Chat AI per profesi membantu pertanyaan lebih terarah, dengan keputusan akhir tetap pada pengguna.",
      status: "Website publik dapat diakses. Profil/onboarding, pembuatan report, eksplorasi profesi, roadmap, AI chat, dan poin memiliki rute implementasi. Rekomendasi mendukung pertimbangan pribadi dan tidak menjamin penerimaan studi atau pekerjaan.",
      benefits: ["Pilihan pendidikan dan karier berangkat dari satu profil", "Rekomendasi terhubung dengan langkah nyata", "Pertanyaan profesi dieksplorasi lewat percakapan AI terarah"],
      features: [
        { title: "Profil multidimensi", description: "Isi latar akademik, minat, kepribadian, preferensi kerja, dan tujuan hidup." },
        { title: "Life Path Report", description: "Tinjau saran profesi, jurusan, dan jalur sekolah dalam konteks profil yang dijelaskan." },
        { title: "Eksplorasi profesi", description: "Jelajahi peran, jalur pendidikan, dan keterampilan melalui katalog profesi yang dapat dicari." },
        { title: "Roadmap pribadi", description: "Susun langkah berikutnya dalam lapisan tugas dan pantau progresnya." },
        { title: "AI Expert Chat", description: "Ajukan pertanyaan lewat percakapan per profesi dan buka kembali riwayat chat." },
        { title: "Poin & evolusi", description: "Ikuti kelengkapan profil, riwayat aktivitas, poin, dan perkembangan perjalanan." },
      ],
      coverAlt: "Ilustrasi editorial tangga dan tujuan emas untuk arah pendidikan dan karier",
    },
  },
  {
    slug: "insuralab", name: "InsuraLab", kind: "product", cover: "/products/insuralab/editorial-v2.webp", visualType: "editorial",
    repository: "https://github.com/sadani-tech/insuralab",
    category: "Insurance Education", tagline: "Understand insurance before you buy it.",
    shortDescription: "Learn risk and protection through articles, a glossary, sourced provider studies and a protection-needs learning assessment.",
    introduction: "InsuraLab is an independent insurance education platform. Its implemented learning experience connects risk, protection concepts, terminology and provider/product case studies, with sources and review status kept visible.",
    audience: "People learning insurance concepts or preparing to understand an existing policy before making a decision.",
    problem: "Sales material and dense policy language can make insurance hard to understand. Readers need to distinguish a general concept from provider-specific terms, historical information and material still awaiting review.",
    philosophy: "Teach concepts first, provide a searchable glossary and source-backed case studies, then help readers identify topics to learn through a deterministic educational assessment. It does not choose an insurance product for them.",
    status: "The repository implements the public learning pages, glossary, provider/product studies and protection-needs assessment. Quiz scoring and 3D Protection Universe remain on the roadmap. A public deployment was not verified.",
    benefits: ["General education stays distinct from provider details", "Source and review labels provide context", "Assessment leads to learning topics, without requiring an account"],
    features: [
      { title: "Articles & protection concepts", description: "Learn risk, coverage categories and policy concepts through structured educational content." },
      { title: "Searchable glossary", description: "Look up insurance terminology and follow related explanations." },
      { title: "Provider & product studies", description: "Review educational case studies with sources, reference periods and review-status notices." },
      { title: "Protection-needs assessment", description: "Answer a short questionnaire to find relevant learning topics across five educational dimensions." },
      { title: "Learning links & methodology", description: "Read the assessment method and continue to concept-first articles from the results." },
      { title: "Editorial review workflow", description: "Maintain content, sources and assessment definitions through an administrative CMS." },
    ],
    coverAlt: "Editorial illustration of an open book and shield for insurance education",
    id: {
      category: "Edukasi Asuransi", tagline: "Pahami asuransi sebelum membelinya.",
      shortDescription: "Pelajari risiko dan proteksi melalui artikel, glossary, studi provider bersumber jelas, dan asesmen topik kebutuhan proteksi.",
      introduction: "InsuraLab adalah platform edukasi asuransi independen. Pengalaman belajarnya menghubungkan risiko, konsep proteksi, istilah, serta studi provider dan produk, dengan sumber serta status tinjauan yang tetap terlihat.",
      audience: "Orang yang ingin memahami konsep asuransi atau membaca polis yang dimiliki sebelum mengambil keputusan.",
      problem: "Materi penjualan dan bahasa polis yang padat membuat asuransi sulit dipahami. Pembaca perlu membedakan konsep umum, ketentuan provider, informasi historis, dan materi yang belum selesai ditinjau.",
      philosophy: "Mulai dari konsep, sediakan glossary dan studi bersumber jelas, lalu bantu pembaca mengenali topik belajar melalui asesmen edukatif deterministik. Hasilnya mengarahkan pembelajaran tanpa memilihkan produk asuransi.",
      status: "Repository mengimplementasikan halaman belajar, glossary, studi provider/produk, dan asesmen kebutuhan proteksi. Penilaian kuis dan Protection Universe 3D masih roadmap. Deployment publik belum terverifikasi.",
      benefits: ["Edukasi umum terpisah dari detail provider", "Sumber dan label tinjauan memberi konteks", "Asesmen mengarahkan topik belajar tanpa harus membuat akun"],
      features: [
        { title: "Artikel & konsep proteksi", description: "Pelajari risiko, kategori perlindungan, dan konsep polis melalui materi edukasi terstruktur." },
        { title: "Glossary yang dapat dicari", description: "Kenali istilah asuransi dan telusuri penjelasan terkait." },
        { title: "Studi provider & produk", description: "Baca studi edukatif beserta sumber, periode referensi, dan pemberitahuan status tinjauan." },
        { title: "Asesmen kebutuhan proteksi", description: "Jawab pertanyaan singkat untuk mengenali topik belajar dalam lima dimensi edukatif." },
        { title: "Materi lanjutan & metodologi", description: "Pahami cara kerja asesmen dan lanjutkan ke artikel konsep dari hasil yang ditampilkan." },
        { title: "Alur tinjauan editorial", description: "CMS administratif mengelola konten, sumber, serta definisi asesmen." },
      ],
      coverAlt: "Ilustrasi editorial buku terbuka dan perisai untuk edukasi asuransi",
    },
  },
  {
    slug: "rentaja", name: "RentAja", kind: "product", cover: "/products/rentaja/editorial-v2.webp", visualType: "editorial",
    category: "Rental Operations", tagline: "Know every rental. Document every handover.",
    shortDescription: "Manage assets, renters, rental contracts and photo-based handovers through an API and a mobile operations app.",
    introduction: "RentAja organizes the operational foundation of an asset-rental business: which unit is available, who holds it, when it is due and what condition was recorded at handover and return.",
    audience: "Owners and staff renting vehicles, equipment or other individually tracked assets.",
    problem: "Rental records scattered across chats and notebooks make availability difficult to confirm. Without dated handover evidence, damage disputes and late returns become harder to resolve.",
    philosophy: "Keep assets and multi-unit rental contracts in one workflow, then record outgoing and incoming inspections with photos. The native app stores inspection work locally before synchronizing it when a connection is available.",
    status: "API and Expo Android/web implementations are in development. Photo inspections are native-only. GPS/Traccar tracking is outside the implemented v1.0 scope; a public release was not verified.",
    benefits: ["Each rental has an asset and renter context", "Outgoing and return conditions can be compared", "Inspection work can be saved locally before syncing"],
    features: [
      { title: "Assets & availability", description: "Maintain individual units, status and rate cards with an availability calendar." },
      { title: "Multi-unit rentals", description: "Record renter, driver, dates and multiple rented units under one contract." },
      { title: "Photo handovers", description: "Capture outgoing/return inspections and compare recorded asset conditions." },
      { title: "Native offline inspection", description: "Save forms and photos to local storage, then synchronize from the mobile app." },
    ],
    coverAlt: "Editorial illustration of a vehicle and key for rental operations",
    id: {
      category: "Operasional Penyewaan", tagline: "Sewa tercatat. Serah-terima terdokumentasi.",
      shortDescription: "Kelola aset, penyewa, kontrak sewa, dan serah-terima berbukti foto melalui API serta aplikasi operasional mobile.",
      introduction: "RentAja merapikan fondasi operasional penyewaan: unit yang tersedia, siapa yang memegangnya, kapan jatuh tempo, serta kondisi yang dicatat saat keluar dan kembali.",
      audience: "Owner dan staf penyewaan kendaraan, peralatan, atau barang lain yang dilacak per unit.",
      problem: "Catatan di chat dan buku membuat ketersediaan sulit dipastikan. Tanpa bukti kondisi saat serah-terima, sengketa kerusakan serta keterlambatan pengembalian lebih sulit diselesaikan.",
      philosophy: "Aset dan kontrak multi-unit berada dalam satu alur, dilengkapi inspeksi keluar/kembali berbukti foto. Aplikasi native menyimpan pekerjaan inspeksi secara lokal sebelum menyinkronkannya ketika koneksi tersedia.",
      status: "API dan aplikasi Expo Android/web sedang dikembangkan. Inspeksi foto tersedia di native. GPS/Traccar berada di luar cakupan v1.0 yang diimplementasikan; rilis publik belum terverifikasi.",
      benefits: ["Setiap sewa memiliki konteks unit dan penyewa", "Kondisi keluar dan kembali dapat dibandingkan", "Pekerjaan inspeksi dapat tersimpan sebelum tersinkron"],
      features: [
        { title: "Aset & ketersediaan", description: "Kelola unit, status, dan rate card beserta kalender ketersediaan." },
        { title: "Sewa multi-unit", description: "Catat penyewa, sopir, tanggal, dan beberapa unit dalam satu kontrak." },
        { title: "Serah-terima berbukti foto", description: "Rekam inspeksi keluar/kembali dan bandingkan kondisi aset yang tercatat." },
        { title: "Inspeksi native offline", description: "Simpan formulir dan foto secara lokal, lalu sinkronkan melalui aplikasi mobile." },
      ],
      coverAlt: "Ilustrasi editorial kendaraan dan kunci untuk operasional penyewaan",
    },
  },
  {
    slug: "djotos-laundry", name: "Djotos Laundry", kind: "project", cover: "/products/djotos-laundry/editorial-v2.webp", visualType: "editorial",
    website: "https://djotos-laundry.suraise.com", repository: "https://github.com/sadani-tech/djotos-laundry",
    category: "Laundry Operations", tagline: "Keep the counter, order status and cash flow together.",
    shortDescription: "A laundry point-of-sale and operations project for orders, payments, WhatsApp status updates and customer loyalty.",
    introduction: "Djotos Laundry brings the everyday work of staff and owners into a mobile-friendly cashier system, connecting the order receipt to processing status, payment and customer history.",
    audience: "Laundry counter staff and owners supervising daily transactions and repeat customers.",
    problem: "Paper receipts, separate payment records and manual customer updates make it easy to lose track of unfinished laundry, unpaid orders and repeat-customer benefits.",
    philosophy: "Use the order as the shared record for service items, processing status and payments, then connect it to WhatsApp updates, cash-flow reporting and loyalty records.",
    status: "The repository implements cashier and operations modules, with a development deployment available. WhatsApp sending depends on the configured provider; production release was not verified.",
    benefits: ["Counter orders and processing status share one record", "Owners can review cash flow and customer history", "Loyalty and staff records stay connected to operations"],
    features: [
      { title: "Orders & receipts", description: "Record services, quantities, order progress and customer details from a mobile-friendly counter." },
      { title: "Payments & cash flow", description: "Record cash/QRIS payment methods and review operational income and expenses." },
      { title: "WhatsApp updates", description: "Queue order-status messages through the configured messaging provider." },
      { title: "Customers & loyalty", description: "Track repeat visits, the nine-washes-to-one-free program and staff bonus records." },
    ],
    coverAlt: "Editorial illustration of a washing machine and folded towels for laundry operations",
    id: {
      category: "Operasional Laundry", tagline: "Kasir, progres cucian, dan arus kas dalam satu alur.",
      shortDescription: "Proyek aplikasi kasir dan operasional laundry untuk nota, pembayaran, update WhatsApp, serta loyalitas pelanggan.",
      introduction: "Djotos Laundry menyatukan pekerjaan staf dan owner dalam aplikasi kasir yang nyaman di ponsel, menghubungkan nota dengan progres pengerjaan, pembayaran, serta riwayat pelanggan.",
      audience: "Staf kasir laundry dan owner yang memantau transaksi harian serta pelanggan berulang.",
      problem: "Nota kertas, catatan pembayaran terpisah, dan update pelanggan manual membuat cucian belum selesai, order belum lunas, serta benefit pelanggan mudah terlewat.",
      philosophy: "Nota menjadi catatan bersama untuk layanan, progres pengerjaan, dan pembayaran, lalu terhubung dengan update WhatsApp, rekapan arus kas, serta catatan loyalitas.",
      status: "Repository mengimplementasikan modul kasir dan operasional, dengan deployment development yang tersedia. Pengiriman WhatsApp mengikuti provider yang dikonfigurasi; rilis produksi belum terverifikasi.",
      benefits: ["Nota kasir dan progres cucian memakai catatan yang sama", "Owner dapat meninjau arus kas serta riwayat pelanggan", "Loyalitas dan catatan staf terhubung ke operasional"],
      features: [
        { title: "Order & nota", description: "Catat layanan, jumlah, progres, dan pelanggan dari kasir yang nyaman di ponsel." },
        { title: "Pembayaran & arus kas", description: "Catat metode Cash/QRIS dan tinjau pemasukan serta pengeluaran operasional." },
        { title: "Update WhatsApp", description: "Antrekan pesan status pesanan melalui provider pesan yang dikonfigurasi." },
        { title: "Pelanggan & loyalitas", description: "Pantau kunjungan ulang, program sembilan cuci satu gratis, dan catatan bonus staf." },
      ],
      coverAlt: "Ilustrasi editorial mesin cuci dan handuk terlipat untuk operasional laundry",
    },
  },
  {
    slug: "pranaja-ashari", name: "Pranaja Ashari", kind: "project", cover: "/products/pranaja-ashari/editorial-v2.webp", visualType: "editorial",
    website: "https://paarchitect.vercel.app", repository: "https://github.com/sadani-tech/paarchitect",
    category: "Architecture Portfolio Website", tagline: "Give architectural work a considered digital home.",
    shortDescription: "An architecture and interior portfolio website with responsive project galleries, service pages and direct consultation links.",
    introduction: "The Pranaja Ashari website project presents architecture, interior and visualization work through an editorial layout, photographic galleries and a clear path from viewing a project to starting a conversation.",
    audience: "Architecture and interior studios presenting work and handling early consultation inquiries.",
    problem: "Project photographs scattered across social feeds do not explain a studio's approach or give prospective visitors a clear way to explore services and make an inquiry.",
    philosophy: "Bring project images, narratives, service information and a consultation form into a responsive static website, with motion and optional 3D accents supported by simpler fallbacks.",
    status: "A public website demonstration is available. Repository project/client descriptions are sample content; this entry describes the website implementation, not verified construction projects or client outcomes.",
    benefits: ["Work can be explored by project and category", "Photo delivery adapts to viewport size", "Consultation links carry visitor context to WhatsApp or email"],
    features: [
      { title: "Project portfolio", description: "Browse categories, project pages and photographic galleries in an editorial layout." },
      { title: "Studio & service pages", description: "Explain the studio approach, service scope and consultation journey." },
      { title: "Responsive imagery & motion", description: "Serve generated image sizes with motion, reduced-motion handling and non-WebGL fallbacks." },
      { title: "Direct consultation", description: "Prepare a WhatsApp inquiry in the visitor's browser with an email fallback." },
    ],
    coverAlt: "Editorial illustration of an architectural model for an architecture portfolio website",
    id: {
      category: "Website Portofolio Arsitektur", tagline: "Ruang digital yang matang untuk karya arsitektur.",
      shortDescription: "Website portofolio arsitektur dan interior dengan galeri proyek responsif, halaman layanan, serta jalur konsultasi langsung.",
      introduction: "Proyek website Pranaja Ashari menyajikan karya arsitektur, interior, dan visualisasi melalui layout editorial, galeri fotografi, serta alur yang jelas dari melihat karya menuju konsultasi.",
      audience: "Studio arsitektur dan interior yang ingin menyajikan karya serta menampung pertanyaan konsultasi awal.",
      problem: "Foto proyek yang tersebar di media sosial belum menjelaskan pendekatan studio atau memberi calon pengunjung alur yang jelas untuk mengenali layanan dan menghubungi tim.",
      philosophy: "Gabungkan foto, narasi proyek, informasi layanan, dan formulir konsultasi dalam website statis responsif, dengan motion serta aksen 3D opsional yang memiliki tampilan cadangan lebih sederhana.",
      status: "Demonstrasi website dapat diakses publik. Deskripsi proyek/klien pada repository masih berupa contoh; entri ini menjelaskan implementasi website, bukan verifikasi proyek bangunan atau hasil klien.",
      benefits: ["Karya dapat dijelajahi per proyek dan kategori", "Gambar menyesuaikan ukuran layar", "Tautan konsultasi membawa konteks ke WhatsApp atau email"],
      features: [
        { title: "Portofolio proyek", description: "Jelajahi kategori, halaman detail, dan galeri fotografi dalam layout editorial." },
        { title: "Halaman studio & layanan", description: "Jelaskan pendekatan, cakupan layanan, dan perjalanan konsultasi." },
        { title: "Gambar responsif & motion", description: "Gunakan ukuran gambar hasil pipeline, motion, reduced-motion, dan fallback tanpa WebGL." },
        { title: "Konsultasi langsung", description: "Susun pesan WhatsApp di browser pengunjung, dengan email sebagai jalur cadangan." },
      ],
      coverAlt: "Ilustrasi editorial maket arsitektur untuk website portofolio studio",
    },
  },
];

export function getProduct(slug: string) { return products.find(product => product.slug === slug); }
export function localizeProduct(product: Product, locale: "id" | "en"): Product {
  return locale === "en" ? product : { ...product, ...product.id };
}
