# Review konten portofolio Sadatech

Tanggal pemeriksaan: 8 November 2026. Perubahan hanya ditulis ke repository `sadani-company`; repository produk dibaca sebagai sumber.

## Dasar penulisan

Konten Indonesia dan Inggris di `src/config/products.ts` mencakup pengenalan, target pengguna, masalah, penyelesaian, keunggulan, fitur, status, dan deskripsi gambar. Halaman produk, detail, showcase homepage, footer, sitemap, dan metadata memakai daftar yang sama. Lima aplikasi/platform dan dua proyek operasional/website ditampilkan dalam kelompok berbeda di halaman portofolio.

Halaman publik diperiksa lewat respons HTTP dan HTML. Source lokal dipakai untuk membedakan implementasi dari rencana; README atau PRD yang tertinggal tidak menjadi satu-satunya dasar. Keberadaan kode bukan bukti bahwa semua layanan produksi atau integrasi pihak ketiga sedang aktif. Tidak ada login, transaksi nyata, atau pengiriman WhatsApp selama review.

## Sumber dan batas tiap entri

| Entri | Sumber | Hasil yang digunakan |
|---|---|---|
| Serahin | [Website publik](https://serahin.suraise.com), `../serahin-web`, `../serahin-backend` | Pre-order berbasis kampanye, varian/kuota, DP nominal/persentase, pelunasan dari pembayaran terverifikasi, timeline produksi, portal buyer tanpa pendaftaran, katalog, vendor dan laporan. Pilihan pembayaran mengikuti checkout dan konfigurasi seller. |
| Manifly | [Halaman masuk](https://manifly.suraise.com/login), `../manifly-web/app`, `../manifly-backend/src` | Pencatatan WhatsApp/voice/struk, akun dan pocket, budget, utang, planning, net worth dan smart rules. Root domain mengembalikan halaman 404 di dalam respons HTTP 200 ketika diperiksa; CTA menggunakan `/login` yang dapat diakses. |
| Tuju | [Website publik](https://tuju.suraise.com), `../tuju-web/src`, `../tuju-backend/app` | Profil akademik/minat/kepribadian/tujuan, Life Path Report, katalog profesi, roadmap, chat AI per profesi, poin dan evolusi. Tidak mengklaim jaminan penerimaan studi atau pekerjaan. |
| InsuraLab | [Repository](https://github.com/sadani-tech/insuralab), `../insuralab/docs/ROADMAP.md`, source frontend dan backend | Artikel, glossary, studi provider/produk dengan sumber/status tinjauan, CMS, serta asesmen kebutuhan proteksi deterministik. README tahap 0–2 tertinggal dari roadmap dan source asesmen. Penilaian kuis dan Protection Universe 3D masih rencana. Deployment publik belum terverifikasi. |
| RentAja | `../rentaja-backend`, `../rentaja-mobile` | Aset/status/tarif/kalender, penyewa dan sopir, kontrak multi-unit, inspeksi keluar/kembali dengan foto, penyimpanan lokal dan sinkronisasi aplikasi native. Inspeksi foto bukan fitur web; GPS/Traccar di luar implementasi v1.0. Rilis publik belum terverifikasi. |
| Djotos Laundry | [Repository](https://github.com/sadani-tech/djotos-laundry), [deployment development](https://djotos-laundry.suraise.com), `../djotos-laundry` | Kasir, nota, status, pencatatan metode Cash/QRIS, arus kas, antrean WhatsApp, loyalitas sembilan cuci satu gratis, dan bonus staf. Pencatatan QRIS bukan klaim integrasi payment gateway. Pengiriman pesan tergantung provider. Rilis produksi belum terverifikasi. |
| Pranaja Ashari | [Repository paarchitect](https://github.com/sadani-tech/paarchitect), [demo website](https://paarchitect.vercel.app) | Implementasi website portofolio arsitektur/interior: galeri, kategori, layanan/studio, gambar responsif, motion/fallback dan konsultasi WhatsApp/email. Data proyek/klien masih contoh; tidak dijadikan bukti bangunan, klien, statistik atau hasil bisnis nyata. |

Snapshot HEAD lokal saat pemeriksaan: Manifly web `d915d2e`, backend `2222745`; Serahin web `8403875`, backend `91ae55b`; Tuju web `6448ea6`, backend `70a7234`; InsuraLab `1fa897c`; RentAja mobile `af6ff64`, backend `753702b`; Djotos Laundry `0296616`. Review juga membaca working tree yang tersedia, sehingga snapshot ini bukan klaim bahwa seluruh bahan hanya berasal dari commit tersebut.

Detail Manifly ditelusuri ke modul `transactions`, `whatsapp`, `shared-wallet`, `planning`, dan `smart-rules`. Voice/struk mempunyai alur preview dan konfirmasi. Harga dan batas paket di `src/config/pricing.ts` mengikuti migrasi `../manifly-backend/src/database/migrations/1789171200000-ManiflyV19.ts` beserta entitlement WhatsApp yang dipertahankan dari versi sebelumnya. Katalog aktif di aplikasi tetap acuan sebelum pembayaran.

Asesmen InsuraLab ditelusuri ke `frontend/src/components/assessment`, `backend/app/Actions/Assessments/EvaluateProtectionNeedsAssessment.php`, seeder dan route/controller asesmen. Copy menjelaskan tujuan edukasi dan topik belajar sesuai implementasi tersebut.

## Asal gambar

### Cover aktif setelah revisi visual

Semua tujuh cover pada homepage, kartu, dan hero detail kini memakai `public/products/<slug>/editorial-v2.webp`. SVG sumbernya berada di lokasi yang sama. Komposisi memakai ivory, charcoal, champagne gold, pencahayaan lembut, dan objek tanpa teks agar selaras dengan website dan tetap terbaca pada ukuran kecil. Cover adalah ilustrasi konseptual, bukan screenshot aplikasi, foto produk, atau bukti proyek bangunan.

| Produk | Metafora visual |
|---|---|
| Serahin | Paket pre-order dan kartu konfirmasi pesanan |
| Manifly | Dompet, struk, dan koin |
| Tuju | Tangga menuju tujuan emas |
| InsuraLab | Buku terbuka dan perisai |
| RentAja | Kendaraan sewa dan kunci |
| Djotos Laundry | Mesin cuci dan handuk terlipat |
| Pranaja Ashari | Maket arsitektur |

[Lembar review tujuh cover](portfolio-visuals-v2.webp). Generator `scripts/build-editorial-covers.mjs` memakai vektor native, tanpa menimpa identitas logo masing-masing produk. Caption ilustrasi tetap tersedia untuk pembaca layar; tidak ada lagi panel informasi atau teks kecil yang dibakar ke cover. Tampilan mobile showcase menggunakan `object-fit: contain` agar objek tidak terpotong di panel yang pendek.

### Bahan sumber dan cover sebelumnya

Cover lama di bawah tidak lagi ditampilkan. Gambar kampanye dan pembayaran Serahin tetap tersedia sebagai galeri detail.

| Aset website ini | Sumber dan perlakuan |
|---|---|
| `public/products/serahin/cover.webp` | Salinan artwork resmi `../serahin-web/public/revamp/etalase-katalog.webp`. |
| `public/products/serahin/campaign.webp`, `payments.webp` | Salinan `fitur-seller-kampanye.webp` dan `fitur-seller-dp-pelunasan.webp` dari folder revamp Serahin; galeri detail. |
| `public/products/manifly/wordmark.png` | `../manifly-web/public/brand/manifly-wordmark-color.png`; identitas asli pada ilustrasi fitur. |
| `public/products/djotos-laundry/logo.png` | `../djotos-laundry/frontend/public/brand/djotos-logo-640.png`; identitas asli pada ilustrasi fitur. |
| `public/products/pranaja-ashari/project.webp` | Gambar dari `paarchitect/main/public/projects/rumah-tinggal-dua-lantai/01-1200.webp` di repository resmi; tidak diklaim sebagai proyek konstruksi yang sudah diverifikasi. Versi PNG dipakai untuk embedding SVG. |
| `cover.svg` / `cover.webp` Manifly, Tuju, InsuraLab, RentAja, Djotos Laundry | Infografik versi sebelumnya; tidak lagi dirujuk UI atau generator aktif. |
| `cover.svg` / `cover.webp` Pranaja Ashari | Komposisi studi website menggunakan gambar dari repository aslinya. |

`node scripts/build-brand-assets.mjs` mengekspor ulang ikon serta cover editorial baru menjadi SVG/WebP. Source SVG dipertahankan agar dapat direview dan disesuaikan. Tidak memakai foto stok atau dashboard rekaan yang diberi label screenshot.

## Logo dan favicon

- Hero dan mask sheen kembali memakai aset original `/brand/sadani-logo-3d.webp`, dimensi intrinsik 1096 × 1200. Nama file legacy dipertahankan; nama publik tetap Sadatech.
- Navbar memakai simbol flat kit, garis vertikal, dan nama Sadatech dalam Montserrat. Footer tetap memakai lockup flat kit.
- Favicon memakai bidang charcoal penuh dengan sudut membulat 112/512 dan simbol ivory/gold. Bentuk tile mengikuti pendekatan ikon produk Jira/Atlassian, sementara warna dan simbol tetap Sadatech.
- SVG, PNG 16/32/48/64/180/192/512, ICO multiukuran, Apple touch icon, dan ikon Android menggunakan desain tile yang sama. Sudut luar gambar tetap transparan agar radius terlihat di tab browser dan launcher.
- Generator menetapkan SVG sebagai sumber; Safari/Apple, Android, dan browser mengambil PNG/ICO hasil ekspor. `src/app/layout.tsx` memberi parameter `v=4` pada URL icon agar cache favicon transparan versi sebelumnya tersingkir.
- Smoke lokal sebelumnya membandingkan alpha setiap export dengan sumber SVG. Setelah tile membulat aktif, pemeriksaan ini sekaligus memastikan sudut luar transparan dan bidang tengah sisi ikon terisi.
- Kit asli dalam `docs/Sadatech Modern Brand Kit` tidak ditimpa oleh ekspor aplikasi.

## Validasi

- Lint, TypeScript, dan production build lulus.
- Smoke HTTP lulus untuk 34 halaman bilingual dan 49 aset, termasuk semua detail portofolio, tujuh cover baru, metadata, routing, hero original, divider, legal entity, sitemap, serta kesamaan alpha ikon dengan simbol SVG.
- Build preview memakai `NEXT_DIST_DIR=.next-brand-check` agar tidak bertabrakan dengan cache `.next` server dev yang sedang berjalan.
- Gambar hasil ekspor ditinjau sebagai file raster. Pemeriksaan layout/animasi desktop dan mobile melalui browser belum selesai: Computer Use melaporkan `Computer Use native pipe is unavailable` dan browser host tidak tersedia pada sesi ini. HTTP smoke bukan pengganti uji interaksi browser atau E2E produk terautentikasi.
- Tidak ada commit, push, deployment, transaksi, atau perubahan di repository produk lain.
