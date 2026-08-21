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

## Languages

Bahasa Indonesia is the default language and uses routes without a locale prefix. English uses the `/en` prefix:

```text
/                 Indonesian homepage
/products         Indonesian products
/en               English homepage
/en/products      English products
```

Requests using `/id` are permanently redirected to the equivalent default URL to avoid duplicate indexed pages. Translation dictionaries live in `src/i18n/dictionaries.ts`.
