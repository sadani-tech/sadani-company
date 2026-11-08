# Sadatech rebrand — synchronized with latest main

Tanggal: 8 November 2026.

## Basis integrasi dan pemulihan

Branch `main` telah di-fetch dan di-fast-forward ke **`d367581`** (`Merge pull request #3 from sadani-tech/sadani/ui-revamp`). Tiga commit upstream yang sebelumnya belum ada di lokal kini sudah menjadi basis implementasi, termasuk revamp landing page dan perbaikan kontak/pricing.

Perubahan rebrand sebelum sinkronisasi diamankan menggunakan stash lengkap dengan file untracked dan brand kit: **`f42c4149f54716c9801054eedd7e90af657721f0`**, berlabel `backup: Sadatech rebrand before syncing latest main`. Stash dipertahankan sebagai backup, bukan dihapus setelah apply. Backup ZIP awal tracked website juga tersedia di `C:\Users\surya\AppData\Local\Temp\sadani-company-before-sadatech-20261108-153127.zip`.

PDF brand kit dipertahankan dalam byte original dan offset xref diverifikasi. `.gitattributes` menandainya sebagai binary agar konversi line ending Git di Windows tidak merusaknya.

Konflik stash terhadap upstream diselesaikan dengan **desain terbaru sebagai dasar**, lalu perubahan brand diterapkan kembali. Tidak ada commit baru, push, atau deployment dalam pekerjaan ini.

## Desain dan perilaku upstream yang dipertahankan

- Homepage baru berbasis `src/components/home/`, termasuk hero, aurora, section About/scale, product showcase, build/video, AI, capabilities, dan direction.
- `HomeMotion`, tilt logo, scene scroll/pinning, counter/wipe produk, video scrub, dan no-JavaScript/reduced-motion behavior dari upstream.
- Navbar pill dan responsive menu terbaru; footer dan CTA aurora terbaru.
- Pemindahan/integrasi pricing pada detail produk dan navigasi empat tautan. Data dan media portofolio kemudian diperbarui dari website publik serta source proyek sebenarnya; lihat [review konten produk](product-content-review.md).
- Perbaikan formulir kontak: jika provider email tidak tersedia, API membuat URL WhatsApp berisi pesan dan client mengarahkan pengguna ke sana. Alur ini dipertahankan; hanya nama tim dan pesan merek diganti menjadi Sadatech.

`src/app/page.tsx`, `src/components/home/home-motion.tsx`, `build.tsx`, `capabilities.tsx`, dan `src/config/navigation.ts` tetap mengikuti HEAD upstream. `products-scene.tsx` menyesuaikan dimensi gambar ke cover editorial baru; struktur scene/motion tetap dipertahankan. Komponen hero/ecosystem lama yang telah dihapus upstream tidak diperkenalkan kembali.

## Perubahan brand

Sumber aset: `docs/Sadatech Modern Brand Kit/01_logo/`, `02_favicon/`, `03_social/`, dan pedoman di `04_guidelines/BRAND_GUIDELINES.md`.

- Nama publik **Sadatech** diterapkan di kedua bahasa, metadata, halaman produk/legal, footer, CTA, pesan API, dan pesan WhatsApp.
- Nama legal tetap **PT Sadani Teknologi Indonesia**; footer menjelaskan operator dan JSON-LD membedakan `name` dengan `legalName`.
- Montserrat dan hierarki tipografi terbaru dipertahankan. Primary/reverse SVG menggunakan outlined wordmark dari kit secara langsung.
- Header menggunakan simbol flat kit, divider vertikal, dan nama Sadatech dalam Montserrat. Footer menggunakan outlined lockup flat. Sesuai koreksi pengguna, hero dan mask sheen kembali memakai logo 3D original `/brand/sadani-logo-3d.webp`, dengan dimensi intrinsik 1096 × 1200.
- Palet korporat menjadi charcoal `#28282D`, near black `#161719`, champagne gold `#C99D4B`, light gold `#E2B763`, ivory `#FFF9F0`, dan supporting silver `#A4A6A9`. Dark gold digunakan untuk teks aksen yang terbaca pada latar terang. Warna produk tetap terpisah.
- Aurora dan gradient aksen diselaraskan ke champagne gold; struktur dan animasinya tetap mengikuti upstream.
- Stylesheet homepage/chrome berganti nama dari `sadani.css` menjadi `sadatech.css`. Layout dan breakpoint upstream dipertahankan; simbol navbar 34 × 32 px dan nama 20 px dengan divider 25 px. Lockup footer tetap 180 px.
- Animated CTA wordmark menjadi delapan huruf `Sadatech`. Ukuran font disesuaikan agar nama muat; delay huruf ketujuh/kedelapan ditambahkan.
- Favicon SVG/ICO/PNG, Android, dan Apple touch icon memakai tile charcoal dengan radius 112/512 dan simbol ivory/gold. Sudut tile berada di luar alpha gambar agar radius terlihat. URL metadata memakai `v=4` untuk menyegarkan cache browser. Manifest dan gambar sosial 1200×630 memakai identitas kit. Hero original tetap menjadi satu referensi legacy yang disengaja.

Headline Indonesia dari desain terbaru tetap dilokalkan; signature Inggris tetap “Imagine. Build. Make It Real.”. Domain korporat, kontak, nomor telepon, dan nama direktori repository dipertahankan. Detail/status portofolio dan batas membership diperbarui dari source terverifikasi; CTA Manifly menggunakan halaman `/login` yang tersedia.

## Metadata dan routing

Helper `src/lib/metadata.ts` mempertahankan judul/deskripsi lokal dan URL tiap halaman pada Open Graph/Twitter. Canonical dan ID/EN alternates tetap tersedia. Endpoint share-image lama `/og/opengraph-image` menyajikan gambar brand kit untuk kompatibilitas.

Perbaikan respons 404 produk dari rebrand sebelumnya diterapkan kembali dengan validasi sebelum streaming di middleware, sambil mempertahankan matcher terbaru upstream untuk static assets. Slug produk dibatasi oleh `dynamicParams = false`.

## Verifikasi hasil integrasi

- `npm run lint`: lulus.
- `npm run typecheck`: lulus.
- `npm run build`: lulus dengan Next.js 15.5.23. Preview final memakai `NEXT_DIST_DIR=.next-brand-check` untuk menghindari benturan cache dengan server dev aktif.
- `npm run test:brand`: lulus untuk **34 halaman bilingual dan 49 aset**, scene/video homepage terbaru, tujuh cover editorial aktif, hero original, divider navbar, seluruh alpha ikon PNG/Apple/Android dan tiga resolusi ICO, nama merek, canonical/alternate, metadata sosial, structured data, manifest, redirect `/id`, 404, sitemap, robots, serta fallback kontak lokal.
- Smoke test menggunakan data sintetis `example.invalid`; URL WhatsApp hanya diperiksa dan tidak dibuka, sehingga tidak mengirim pesan eksternal.
- Tidak ada path berstatus unmerged atau conflict marker tersisa di source.
- Git HEAD sama dengan `origin/main` setelah fetch; perubahan rebrand masih berupa perubahan lokal di atas HEAD tersebut.

## Batas verifikasi

Browser access host dan native desktop pipe tidak tersedia. Karena itu animasi aktual, screenshot desktop/mobile, dan interaksi menu langsung di browser **belum diverifikasi secara visual**. Smoke test memverifikasi struktur dan respons HTTP, bukan eksekusi motion di browser.

Audit dependency tree masih melaporkan 13 temuan lama (6 moderate, 6 high, 1 critical). Upgrade dependency tidak dilakukan sebagai bagian integrasi brand. Keterbatasan vector trace dan ekstraksi raster 3D mengikuti catatan kualitas kit. Email provider tetap logging-only dengan fallback WhatsApp dari upstream.
