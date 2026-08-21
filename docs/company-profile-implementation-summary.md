# Sadani Company Profile — Implementation Summary

Tanggal dokumentasi: 21 Agustus 2026

## Ringkasan

Website company profile PT Sadani Teknologi Indonesia telah dibangun dari awal sebagai aplikasi Next.js production-oriented. Repository sebelumnya kosong, sehingga fondasi proyek, design system, arsitektur halaman, komponen, konten, SEO, contact backend, dan konfigurasi build dibuat secara menyeluruh.

Website memosisikan Sadani sebagai perusahaan teknologi Indonesia yang membangun berbagai produk digital untuk menyederhanakan masalah sehari-hari. Sadani tidak diposisikan sebagai perusahaan yang hanya berfokus pada satu produk.

## Technology Stack

- Next.js 16.3.1 dengan App Router
- React 19.2.8
- TypeScript strict mode
- Tailwind CSS 4.3.3
- Lucide React untuk ikon
- Zod untuk validasi contact form
- Manrope Variable Font yang disimpan secara lokal

Tidak digunakan UI framework besar atau animation library tambahan. Interaksi dan animasi ringan dibuat menggunakan CSS agar JavaScript client tetap minimal.

## Halaman yang Dibuat

### Halaman utama

- `/` — homepage Sadani
- `/products` — daftar produk Sadani
- `/about` — profil, filosofi, dan arah perusahaan
- `/contact` — informasi inquiry dan contact form
- `/careers` — halaman karier tanpa lowongan fiktif

### Halaman produk

- `/products/serahin`
- `/products/money-flow`
- `/products/tuju`

Ketiga halaman produk menggunakan satu reusable product-page architecture. Konten dan metadata masing-masing produk berasal dari konfigurasi terpusat.

### Halaman legal dan sistem

- `/privacy` — draft Privacy Policy untuk legal review
- `/terms` — draft Terms of Use untuk legal review
- Custom 404 dengan pesan Sadani
- Global loading state
- Dynamic Open Graph image
- `sitemap.xml`
- `robots.txt`
- SVG favicon

## Homepage

Homepage berisi:

- Sticky navigation dan responsive mobile menu
- Hero: “Technology for ideas that deserve to exist.”
- Visual product ecosystem dengan Sadani sebagai pusat
- Daftar produk Serahin, Money Flow, dan Tuju
- Kartu “What’s next?” tanpa membuat produk fiktif
- Penjelasan alasan dan prinsip Sadani membangun produk
- Bagian “Built in the age of AI”
- Technology capabilities grid
- Company vision
- Final call-to-action
- Footer lengkap dengan company, product, dan legal navigation

Visual dibuat menggunakan HTML, CSS, dan SVG tanpa stock photography. Product preview diberi label sebagai conceptual preview agar tidak dianggap sebagai representasi fitur yang sudah dirilis.

## Product Content

Data produk disimpan di:

```text
src/config/products.ts
```

Setiap produk memiliki:

- Slug
- Nama
- Kategori
- Deskripsi singkat
- Tagline
- Product introduction
- Problem statement
- Product philosophy
- Status
- Core feature preview

Bahasa produk menggunakan frasa seperti “designed to”, “built to”, dan “aims to” untuk menghindari klaim bisnis atau kemampuan yang belum terverifikasi.

Money Flow dijelaskan secara eksplisit sebagai financial management software, bukan bank, wallet, payment gateway, lender, atau regulated financial institution.

## Design System

Design tokens dan global component styles berada di:

```text
src/app/globals.css
```

Visual direction yang diterapkan:

- Deep green corporate palette
- Warm off-white surfaces
- Identitas warna produk yang tetap terpisah dari identitas korporat
- Strong typography menggunakan Manrope
- Generous whitespace
- Subtle borders dan shadows
- Restrained motion
- Responsive type scale menggunakan `clamp()`
- Visible keyboard focus states
- Reduced-motion support

Temporary Sadani brand mark tersedia di:

```text
public/brand/sadani-mark.svg
```

Mark ini dibuat sederhana agar mudah diganti ketika official branding tersedia.

## Responsive dan Accessibility

Implementasi mencakup:

- Mobile-first responsive layout
- Polished mobile navigation
- Minimum button target sekitar 44px
- Semantic headings dan HTML sections
- Skip-to-content link
- Keyboard-accessible navigation
- Visible focus states
- Accessible labels dan validation messages
- `aria-expanded` dan `aria-controls` pada mobile menu
- `prefers-reduced-motion` handling
- Horizontal overflow protection
- Sufficient text and control contrast

Responsive QA dilakukan menggunakan headless Edge pada mobile dan desktop viewport. Ditemukan dan diperbaiki responsive CSS specificity issue pada navigation serta potensi overflow pada inquiry grid.

## Contact Form

Contact form memiliki field:

- Full name
- Email
- Company/organization — optional
- Inquiry type
- Message

Inquiry type yang tersedia:

- General
- Partnership
- Product
- Career
- Other

Implementasi teknis mencakup:

- Client-side interaction state
- Server-side Zod validation
- Loading state
- Success state
- Error state
- Honeypot field
- Request size limitation
- Simple server-side rate limiting
- `ContactService` interface
- Unconfigured service implementation yang tidak berpura-pura mengirim email

Endpoint contact:

```text
POST /api/contact
```

Abstraksi contact service berada di:

```text
src/lib/contact.ts
```

Saat provider email belum dikonfigurasi, endpoint mengembalikan status `503` dan UI menjelaskan bahwa delivery belum tersedia.

## SEO dan Metadata

SEO implementation mencakup:

- Homepage metadata
- Unique product metadata
- Canonical URLs
- Open Graph metadata
- Twitter/X card metadata
- Generated Open Graph image
- Organization structured data
- Sitemap
- Robots configuration
- Favicon

Structured data tidak berisi founding year, social link, tax ID, atau data bisnis lain yang belum tersedia. Setelah dokumen perusahaan ditinjau, registered address dan business phone yang telah dikonfirmasi ditambahkan ke structured data.

## Project Architecture

Struktur utama:

```text
src/
  app/
    api/contact/
    about/
    careers/
    contact/
    og/
    privacy/
    products/
    terms/
  components/
    contact/
    layout/
    legal/
    products/
    sections/
    ui/
  config/
  lib/

public/
  brand/
  icons/
  og/
  products/
    serahin/
    money-flow/
    tuju/
```

Konfigurasi perusahaan berada di:

```text
src/config/site.ts
```

Navigation berada di:

```text
src/config/navigation.ts
```

Produk baru dapat ditambahkan melalui `src/config/products.ts`. Product cards, product routes, dan metadata menggunakan data konfigurasi yang sama untuk meminimalkan duplikasi.

## Environment Variables

Template tersedia di `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=
RESEND_API_KEY=
NEXT_PUBLIC_GA_ID=
```

Tidak ada secret yang diekspos ke browser. Analytics belum dipasang dan hanya disiapkan melalui environment configuration untuk integrasi di masa mendatang.

## Validasi yang Dilakukan

Perintah berikut telah dijalankan dan lulus:

```bash
npm run lint
npm run typecheck
npm run build
```

Hasil production build:

- Build berhasil menggunakan Next.js 16.3.1 dan Turbopack
- 17 halaman dan endpoint berhasil diproses
- Halaman publik diprerender secara static atau SSG
- Hanya contact API yang bersifat dynamic
- Dependency audit melaporkan 0 vulnerability

HTTP verification yang dilakukan:

- Semua halaman utama mengembalikan status `200`
- Semua product detail mengembalikan status `200`
- Sitemap dan robots mengembalikan status `200`
- Route tidak dikenal mengembalikan status `404`
- Contact payload tidak valid mengembalikan status `400`
- Contact payload valid tanpa configured provider mengembalikan status `503`

## Keputusan Penting

- Official company data yang tidak tersedia tidak dibuat-buat.
- Tidak dibuat fake statistics, customer, testimonial, investor, partner, award, atau social profile. Alamat terdaftar dan nomor bisnis hanya ditambahkan setelah dikonfirmasi dari dokumen resmi dan disetujui untuk penggunaan bisnis.
- Careers tidak memuat lowongan fiktif.
- Legal content diberi label sebagai draft yang memerlukan legal review.
- Contact form tidak memberikan success delivery palsu.
- Google Fonts runtime dependency dihapus dan diganti self-hosted Manrope agar production build tetap deterministic saat offline.
- Visual produk dibuat sebagai conceptual interface preview, bukan klaim mengenai released functionality.

## Informasi yang Masih Diperlukan

Sebelum production launch, Sadani perlu menyediakan atau menyetujui:

1. Deployment dan DNS untuk domain sementara `https://sadani.suraise.com` yang telah ditetapkan sebagai `NEXT_PUBLIC_SITE_URL` default.
2. Official contact email.
3. Email delivery provider seperti Resend, SendGrid, atau SMTP.
4. Official Sadani logo dan brand assets jika tersedia.
5. Official social media URLs jika ingin ditampilkan.
6. Legal review untuk Privacy Policy dan Terms of Use.
7. Final review atas seluruh company dan product copy.
8. Hosting/deployment target dan production environment variables.

## Pembaruan Informasi Legal dan Kontak

Setelah implementasi awal, dokumen pendirian dan perpajakan perusahaan ditinjau secara read-only. Data yang relevan kemudian diverifikasi tanpa menyalin tax ID, data identitas pemilik, tanda tangan, atau dokumen mentah ke dalam repository.

Pembaruan website yang dilakukan:

- Lokasi publik `Sukoharjo, Jawa Tengah, Indonesia` ditambahkan ke halaman Contact dan footer. Alamat rumah lengkap tidak disimpan atau ditampilkan di website.
- Business phone ditambahkan sebagai tautan telepon pada halaman Contact dan footer.
- Lokasi tingkat kabupaten/provinsi dan telephone ditambahkan ke Organization structured data tanpa alamat jalan atau kode pos.
- Gmail pemilik belum dipublikasikan dan menunggu konfigurasi email perusahaan setelah deployment.
- Tax ID/NPWP, identitas pemilik, dan dokumen perusahaan tetap tidak dipublikasikan.

## Menjalankan Project

Development:

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```
