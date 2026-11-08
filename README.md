# Sadatech company profile

Corporate website for **Sadatech**, operated by **PT Sadani Teknologi Indonesia**, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

The public identity follows [Sadatech Modern Brand Kit](<docs/Sadatech Modern Brand Kit/04_guidelines/BRAND_GUIDELINES.md>): Montserrat, charcoal, champagne gold, and ivory. The navbar pairs the flat symbol with a divider and the Sadatech name; the homepage hero uses the original silver/gold 3D asset. The browser favicon and Apple/Android icons use a rounded charcoal tile with the high contrast ivory and champagne mark. Application assets live in `public/brand/`. The legal entity, contact details, and existing canonical domain are retained.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For the bilingual brand/route smoke test, start the production build with
`npm run start -- --hostname 127.0.0.1 --port 3107`, then run `npm run test:brand`
in another terminal. Set `SMOKE_BASE_URL` to test a different local origin.
The test checks the latest homepage scenes and assets, then submits synthetic data
to the local contact endpoint to verify its WhatsApp fallback. It does not open
WhatsApp, send external messages, or follow external product links.

If a dev server is already running, isolate the production output. In PowerShell:

```powershell
$env:NEXT_DIST_DIR = '.next-brand-check'
npm run build
npm run start -- --hostname 127.0.0.1 --port 3107
```

Use the same `NEXT_DIST_DIR` for build and start. The default remains `.next`.

See [rebrand implementation and verification](docs/sadatech-rebrand-implementation.md) and [product sources and media provenance](docs/product-content-review.md).

Copy `.env.example` to `.env.local` when configuring a production URL or contact delivery. Contact submissions currently use a logging-only `ContactService` and fall back to WhatsApp, preserving the latest `main` behavior. Configure an actual provider in `src/lib/contact.ts` for email delivery.

## Deployment

Deployed on **Vercel** as a standard Next.js App Router project — no framework
config file is required. Vercel runs `next build` automatically; the App Router,
`middleware.ts` (locale handling), and the `/api/contact` route work natively.

Set these environment variables in the Vercel project settings (Production and
Preview), matching `.env.example`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin (e.g. `https://sadani.suraise.com`) — used for metadata, sitemap, robots, JSON-LD. |
| `CONTACT_EMAIL` | Public business inbox shown on the contact page, footer, and policy pages. Falls back to the value in `src/config/site.ts`. |
| `BREVO_API_KEY` | Reserved — only useful after a real contact-delivery provider is wired into `src/lib/contact.ts`. |
| `NEXT_PUBLIC_GA_ID` | Optional analytics id. |

## Design

The visual design keeps the latest landing page structure and motion, with the Sadatech brand palette and typography. Styles live in two files:

- `src/app/sadatech.css` — site chrome, buttons, and homepage scenes.
- `src/app/globals.css` — Tailwind theme tokens and inner-page components.

The homepage (`src/components/home/*`) is server-rendered. `HomeMotion` adds the scroll-locked scenes, the hero intro, and the reveals on the client. Homepage copy lives under `home` in `src/i18n/dictionaries.ts`, and product names, categories, and descriptions come from `src/config/products.ts`. Assets are in `public/brand`, `public/home` (AI image, capability icons, scroll-scrubbed video), and `public/products/<slug>/cover.*`.

The portfolio contains Serahin, Manifly, Tuju, InsuraLab, RentAja, Djotos Laundry and Pranaja Ashari. Product details include audience, background/problem, approach, benefits, features and availability in both languages. All seven covers use text-free editorial object illustrations with the website's ivory, charcoal and champagne palette. They are conceptual imagery, not screenshots. Original Serahin artwork remains in its detail gallery. Run `node scripts/build-brand-assets.mjs` to regenerate icons and covers, or `node scripts/build-editorial-covers.mjs` for covers only. SVG sources and WebP exports live under `public/products/<slug>/editorial-v2.*`. The original brand kit under `docs` is retained separately.

## Languages

Bahasa Indonesia is the default language and uses routes without a locale prefix. English uses the `/en` prefix:

```text
/                 Indonesian homepage
/products         Indonesian products
/en               English homepage
/en/products      English products
```

Requests using `/id` are permanently redirected to the equivalent default URL to avoid duplicate indexed pages. Translation dictionaries live in `src/i18n/dictionaries.ts`.
