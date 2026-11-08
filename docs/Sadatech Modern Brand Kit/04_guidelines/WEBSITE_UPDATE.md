# Sadatech website update - deployment notes

## Fast path
1. Back up current website files.
2. Upload the contents of `05_website_ready/` to your web root (the folder containing `index.html`).
3. Confirm the header and footer lockup, hero 3D, favicon, OG image, and both EN/ID language modes. Note: logos are source-derived concept assets, not mathematically redrawn production-master geometry.
4. Clear CDN/browser cache and verify mobile/retina views.

## Logo paths in the updated site
- Header/footer: `assets/img/sadatech-logo-full.svg`
- Hero: `assets/img/sadatech-logo-3d.webp`
- Classic favicon: `assets/img/favicon.ico` or `assets/img/sadatech-mark.png`
- Apple icon: `assets/img/apple-touch-icon.png`
- OG share: `assets/img/sadatech-og-image.jpg`
- Web manifest: `site.webmanifest`

## Source changes made
- Rebranded visible copy and EN/ID translations: Sadani -> Sadatech.
- Replaced `PT Sadani Teknologi Indonesia` with public brand `Sadatech` to avoid assuming new legal status.
- Updated document title, social metadata, favicon, brand lockup and hero asset references.
- Rebuilt animated CTA wordmark letters for `Sadatech`.
- Kept the original website layout, services, and source portfolio. Updated internal translation API and language event names to Sadatech while preserving saved language preferences with a legacy localStorage fallback.
- Legacy Sadani logo files are not included in the updated webroot to avoid accidental reuse. The original sadani.zip is unchanged and should be kept as your rollback backup.

## QA checklist
- [ ] Navbar logo legible on desktop and mobile.
- [ ] English/Indonesian text shows Sadatech in hero, About, footer and page title.
- [ ] 3D logo remains visible at hero and does not obstruct CTA.
- [ ] Browser icon works in light/dark browser UI.
- [ ] Hero and favicon assets load (no 404) after cache clear.
- [ ] Search/social preview shows Sadatech after indexing/cache refresh.
- [ ] Contact details, company legal details and product status checked manually before production.
- [ ] Confirm final production domain/canonical/og:url after domain chosen.

## Important implementation note
Header image intrinsic dimensions are changed to suit the vector lockup. Existing `.nav__brand img` CSS already sets image height with auto width. The new 3D asset is transparent and follows `.hero__logo img { width: 100%; height: auto; }`.

This pack does not validate your domain/trademark, the company's incorporation status, or external links/emails in the source website.

## Publishing note
The `og:image` meta currently uses a relative link. After choosing the final production domain, change it to an absolute HTTPS URL and add `og:url`/canonical as appropriate. Check social cache after publishing.
