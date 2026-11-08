# SADATECH / OPTION B - SCULPTED MODERN

Paket ini dibuat dari konsep logo B yang kamu pilih dan source website Sadani yang telah tersedia. Nama brand publik diubah menjadi **Sadatech**; tidak ada asumsi bahwa nama legal badan usaha ikut berubah.

## File paling penting

- `04_guidelines/Sadatech_Brand_Identity_Concept.pdf` - brand identity deck (7 halaman).
- `04_guidelines/Sadatech_Brand_Board.png` - ringkasan visual.
- `01_logo/sadatech-logo-horizontal-primary.svg` - navbar/footer di latar terang.
- `01_logo/sadatech-logo-horizontal-light.svg` - latar gelap.
- `01_logo/sadatech-symbol-primary.svg` - ikon tanpa teks.
- `01_logo/sadatech-logo-3d.webp` - 3D hero transparan.
- `02_favicon/` - favicon + ikon aplikasi.
- `03_social/sadatech-og-image.jpg` - preview tautan 1200 x 630.
- `04_guidelines/brand-tokens.css` - token warna.
- `05_website_ready/` - versi source website lama dengan logo dan nama Sadatech.

## Cara update situs

1. **Backup** semua file situs sekarang sebelum mengganti apa pun.
2. Untuk mengganti **logo saja**, upload file dari `01_logo/` ke folder `assets/img/` situs dan sesuaikan nama/path image di HTML. Jangan mengubah layout atau copy.
3. Untuk rebrand seluruh tampilan teks + aset, upload isi `05_website_ready/` ke webroot sebagai **kandidat versi baru**, lalu uji di staging dulu. Folder ini berisi HTML, CSS, JS, gambar, dan video bawaan yang diperlukan.
4. Periksa logo navbar/footer, logo 3D hero, favicon, kedua bahasa EN dan ID, dan tampilan mobile.
5. Setelah punya domain produksi final, ubah `og:image` menjadi URL HTTPS absolut, tambah `og:url`/canonical, dan cek preview sosial.
6. Konfirmasi ulang info legal, kontak, tautan social media, serta klaim/status produk pada source lama sebelum publikasi. Placeholder `href="#"` dari website asal belum otomatis menjadi halaman resmi.

## Status aset dan catatan kualitas

- SVG logo datar adalah **vector trace dari konsep Option B**, bukan file vektor asli hasil desain manual di Figma/Illustrator. Cocok untuk konsep, staging, dan integrasi awal; lakukan optical refinement sebelum final cetak skala besar/trademark.
- Logo 3D transparan merupakan ekstraksi grafis dari concept board Option B, **bukan** model 3D Blender/FBX/GLB. Versi 2x hasil upscale, bukan render 3D baru.
- Warna dan aturan visual adalah usulan v1, bukan spesifikasi merek legal yang terdaftar.
- Aset preview merek di `06_reference/` adalah referensi; jangan unggah sebagai logo primary.

Baca `04_guidelines/WEBSITE_UPDATE.md` dan `04_guidelines/BRAND_GUIDELINES.md` untuk detail.
