# Audit brand identity Sadani

Tanggal: 8 November 2026.

## Lingkup dan batas pemeriksaan

Audit repository `sadani-company`: aset merek, CSS, komponen halaman, pesan Indonesia/Inggris, metadata, dan dokumentasi implementasi. Tidak ada perubahan aplikasi atau penetapan identitas resmi melalui audit ini.

Pemeriksaan visual browser belum terlaksana: browser access host dan native desktop pipe tidak tersedia. Penilaian komposisi visual di bawah merupakan interpretasi dari implementasi, bukan hasil screenshot. Keterbacaan ukuran kecil, jarak aktual, dan tampilan mobile masih memerlukan verifikasi visual. Kondisi deployment dan produk lain tidak diverifikasi.

## Identitas yang saat ini tersampaikan

- Nama publik: Sadani; nama legal: PT Sadani Teknologi Indonesia.
- Posisi: perusahaan teknologi Indonesia yang membangun dan mengoperasikan portofolio produk digital untuk masalah sehari-hari.
- Nilai: kegunaan, kesederhanaan, pembelajaran melalui produk, dan penggunaan teknologi secara praktis.
- Karakter yang terbaca dari kode dan copy: tenang, rasional, ingin tahu, dan berorientasi pada pembangunan produk.
- Arsitektur merek: Sadani sebagai perusahaan induk; Serahin, Manifly, Tuju, dan InsuraLab memiliki nama dan warna masing-masing.

Fondasi ini sudah koheren. Kesenjangan terbesar ada pada konsistensi simbol, kekhasan pesan, dan kelengkapan aturan pemakaian merek.

## Sistem visual saat ini

| Peran | Implementasi |
| --- | --- |
| Ink / dasar gelap | `#0D1712` |
| Surface | `#F6F8F3` |
| Hijau korporat | `#246B45` |
| Mint | `#D5F0C6` |
| Teks muted | `#647069` |
| Serahin | `#DD7A31` |
| Manifly | `#27785B` |
| Tuju | `#6558A6` |
| InsuraLab | `#2F6FED` |
| Font website | Manrope Variable, disimpan lokal |
| Motif | Grid, orbit, node ekosistem, kartu membulat |

Sumber: `src/app/globals.css`. Warna di atas adalah token dasar; beberapa teks dan permukaan produk menggunakan variasi tersendiri.

## Temuan dan prioritas

### 1. Prioritas tinggi — simbol merek belum memiliki satu sumber

Header/footer memakai simbol S dalam heksagon dari SVG inline di `src/components/layout/logo.tsx`. Aset `public/brand/sadani-mark.svg` adalah versi terpisah dan judul SVG menyebutnya sebagai temporary brand mark. Favicon di `src/app/icon.svg` memakai S dalam persegi membulat. Hero dan halaman About memakai huruf S biasa; Open Graph juga memakai huruf S dalam persegi membulat.

Perbedaan ini bisa menjadi variasi yang disengaja, tetapi tidak ditemukan aturan yang menjelaskan hubungan atau penggunaannya. Aset SVG publik juga tidak menjadi sumber logo komponen.

Tindakan: tetapkan master mark dan wordmark, lalu turunkan versi terang, gelap, favicon, dan simbol ilustrasi dari geometri yang sama. Dokumentasikan clear space, ukuran minimum, serta penggunaan yang dilarang. Status logo resmi masih perlu keputusan pemilik merek; dokumentasi implementasi menyatakan logo saat ini sementara.

### 2. Prioritas tinggi — pesan utama memiliki beberapa arah

Hero memakai “Teknologi untuk ide yang layak diwujudkan.” / “Technology for ideas that deserve to exist.” Konfigurasi situs dan gambar Open Graph memakai “Building digital products for everyday possibilities.” Footer Indonesia memakai “Membangun dan mengoperasikan produk digital untuk berbagai kemungkinan sehari-hari.”

Semua searah, tetapi belum terlihat hierarki antara tagline tetap, deskripsi perusahaan, dan headline editorial. Kata ide, berguna, nyata, dan sederhana berulang pada banyak bagian tanpa selalu menambahkan informasi baru. Ini membuat positioning terasa luas dan mudah digunakan perusahaan teknologi lain.

Tindakan: tetapkan satu janji merek beserta padanan Indonesia/Inggris; gunakan satu deskripsi perusahaan yang faktual; biarkan headline halaman bervariasi dengan peran yang jelas. Tonjolkan contoh masalah dan produk sebagai bukti.

Usulan positioning untuk dibahas: “Sadani membangun dan mengoperasikan produk digital dari Indonesia untuk membuat urusan sehari-hari lebih sederhana.” Kalimat ini merupakan usulan editorial, bukan tagline yang telah disetujui.

Sumber: `src/i18n/dictionaries.ts`, `src/config/site.ts`, `src/components/layout/footer.tsx`, `src/app/og/opengraph-image.tsx`.

### 3. Prioritas tinggi — titik kontak belum memperkuat identitas korporat

`siteConfig.email` memiliki fallback Gmail pribadi yang dipakai footer, kontak, dan structured data ketika `CONTACT_EMAIL` tidak diatur. URL bawaan juga masih subdomain `sadani.suraise.com`. Domain tersebut bukan bug, tetapi hubungan nama Sadani dengan Suraise belum dijelaskan di implementasi yang diperiksa.

Dokumentasi lama menyebut Gmail belum dipublikasikan, sedangkan kode saat ini menyiapkannya sebagai fallback publik. Pernyataan dokumentasi itu perlu diperbarui agar tidak menjadi acuan yang keliru.

Tindakan: gunakan inbox perusahaan yang benar-benar dimiliki dan dipantau; pastikan domain publik yang dipilih konsisten pada metadata, kontak, serta materi merek. Jangan mengarang alamat email atau mengganti domain sebelum kepemilikan dan layanan aktif dipastikan.

Sumber: `src/config/site.ts`, `src/components/layout/footer.tsx`, `src/app/layout.tsx`, `docs/company-profile-implementation-summary.md`.

### 4. Prioritas menengah — aturan hubungan merek induk dan produk belum lengkap

Pemisahan warna produk sudah membantu. Namun, hero memakai inisial produk dan diagram ekosistem memakai kotak warna polos; keduanya belum menghadirkan identitas produk yang kuat. Hijau Manifly juga berdekatan dengan hijau korporat Sadani, sehingga warna sebaiknya selalu disertai nama atau simbol.

Tindakan: tetapkan pola endorsement seperti “Produk dari Sadani” / “A product by Sadani”, aturan ukuran relatif logo induk dan produk, serta konteks pemakaiannya. Verifikasi aset resmi produk sebelum mengganti inisial. Perbedaan status produk yang sudah beroperasi dan masih dikembangkan harus mudah dipahami tanpa membaca paragraf teknis panjang.

Sumber: `src/config/products.ts`, `src/components/sections/hero.tsx`, `src/components/sections/ecosystem.tsx`.

### 5. Prioritas menengah — tipografi tidak konsisten di gambar berbagi

Website menggunakan Manrope Variable, sedangkan Open Graph menetapkan `fontFamily: "sans-serif"` tanpa memuat Manrope. Gambar berbagi juga selalu memuat copy Inggris, termasuk ketika dibagikan dari halaman Indonesia.

Tindakan: muat font merek yang didukung renderer Open Graph dan tetapkan kebijakan bahasa gambar berbagi. Periksa hasil render pada ukuran thumbnail, bukan hanya kanvas penuh.

Sumber: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/og/opengraph-image.tsx`.

### 6. Prioritas menengah — bahasa publik bercampur dengan detail implementasi

Halaman pembayaran, pricing, dan status produk memuat istilah `payment-service`, API provider, status `PAID`, konfigurasi v1.8, serta release gate. Transparansi status penting, tetapi sebagian detail tersebut menjelaskan implementasi internal dan tidak membantu pengunjung menentukan langkah berikutnya.

Tindakan: jelaskan apa yang tersedia, biaya, cara membayar, kapan layanan aktif, dan ke mana meminta bantuan. Simpan detail integrasi di dokumentasi teknis. Pada bahasa Indonesia, tinjau istilah seperti membership, hosted, builder, dan software untuk menjaga gaya yang konsisten dan mudah dipahami.

Sumber: `src/i18n/dictionaries.ts`, `src/config/products.ts`.

### 7. Prioritas menengah — token visual belum menjadi panduan merek

Warna dan font sudah memiliki token, tetapi banyak nilai diulang secara literal dalam CSS dan Open Graph. Radius juga memakai banyak ukuran meskipun ada `--radius`. Ini meningkatkan peluang perbedaan saat identitas berubah.

Tindakan: susun panduan ringkas untuk logo, peran warna, tipografi, bentuk, motif, motion, gaya bahasa, dan endorsement produk. Setelah arah disepakati, pusatkan token yang memang dipakai lintas komponen. Hindari meratakan seluruh radius karena setiap komponen dapat memerlukan ukuran berbeda.

## Urutan tindak lanjut

1. Konfirmasi status logo sementara, positioning utama, domain, dan inbox perusahaan.
2. Finalisasi sistem mark/wordmark dan padanan pesan Indonesia/Inggris.
3. Selaraskan header, footer, favicon, hero, About, dan Open Graph.
4. Rapikan copy publik serta aturan hubungan Sadani dengan produk.
5. Lakukan QA visual desktop/mobile, logo ukuran kecil, thumbnail berbagi, dan kontras kombinasi warna yang benar-benar digunakan.

Audit ini tidak menetapkan bahwa kontras, responsivitas, atau keterbacaan telah lulus; ketiganya memerlukan pemeriksaan render aktual.
