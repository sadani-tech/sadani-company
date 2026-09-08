# Sadani company profile

Production-oriented corporate website for PT Sadani Teknologi Indonesia, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

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

Copy `.env.example` to `.env.local` when configuring a production URL or contact delivery. The contact endpoint intentionally returns an unavailable response until an approved `ContactService` provider is implemented in `src/lib/contact.ts`.

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
| `RESEND_API_KEY` | Optional — only when a real contact-delivery provider is wired into `src/lib/contact.ts`. |
| `NEXT_PUBLIC_GA_ID` | Optional analytics id. |

## Languages

Bahasa Indonesia is the default language and uses routes without a locale prefix. English uses the `/en` prefix:

```text
/                 Indonesian homepage
/products         Indonesian products
/en               English homepage
/en/products      English products
```

Requests using `/id` are permanently redirected to the equivalent default URL to avoid duplicate indexed pages. Translation dictionaries live in `src/i18n/dictionaries.ts`.
