import assert from "node:assert/strict";
import { createRequire } from "node:module";
const sharp = createRequire(import.meta.url)("sharp");

// Run against a built, locally started site. External links/WhatsApp are never opened.
const base = process.env.SMOKE_BASE_URL || "http://localhost:3107";
const paths = ["/", "/products", "/products/serahin", "/products/manifly", "/products/tuju", "/products/insuralab", "/products/rentaja", "/products/djotos-laundry", "/products/pranaja-ashari", "/pricing", "/payments", "/about", "/careers", "/contact", "/privacy", "/terms", "/refunds"];
const assets = new Set(["/favicon.ico", "/icon.png", "/site.webmanifest", "/og/opengraph-image"]);
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
}
function metadata(html) {
  return Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag)).map((a) => [a.property || a.name, a.content]));
}
let pageCount = 0;
for (const locale of ["id", "en"]) {
  for (const path of paths) {
    const route = locale === "en" ? `/en${path === "/" ? "" : path}` : path;
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("content-language"), locale, `${route}: response language`);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), `${route}: document language`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one main heading`);
    assert.match(html.match(/<title>(.*?)<\/title>/s)?.[1] || "", /Sadatech/, `${route}: title`);
    assert.match(html, /sadatech-symbol-primary\.svg/, `${route}: navbar symbol`);
    assert.match(html, /brand__divider/, `${route}: navbar divider`);
    assert.match(html, /class="[^"]*\bfooter__logo\b[^"]*"/, `${route}: latest footer retained`);
    assert.doesNotMatch(html, /\/brand\/sadani-(?:logo-full|mark)/, `${route}: no legacy wordmark references`);
    if (path === "/") {
      for (const scene of ["about", "projects", "build", "ai", "direction"]) assert.ok(html.includes(`data-scene="${scene}"`), `${route}: latest ${scene} scene retained`);
      assert.match(html, /data-tilt/, `${route}: hero tilt hook retained`);
      assert.match(html, /data-video/, `${route}: scroll video retained`);
      assert.match(html, /\/brand\/sadani-logo-3d\.webp/, `${route}: existing hero asset restored`);
      for (const slug of ["serahin", "manifly", "tuju", "insuralab", "rentaja", "djotos-laundry", "pranaja-ashari"]) {
        assert.ok(html.includes(`/products/${slug}/editorial-v2.webp`), `${route}: refreshed ${slug} cover`);
      }
      assert.doesNotMatch(html, /\/products\/[^/]+\/cover\.(?:svg|webp)/, `${route}: retired covers are not displayed`);
      const wordmark = html.match(/<p[^>]*data-wordmark[^>]*>(.*?)<\/p>/s)?.[1].replace(/<[^>]*>/g, "");
      assert.equal(wordmark, "Sadatech", `${route}: animated CTA wordmark`);
    }
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, " ").replaceAll("PT Sadani Teknologi Indonesia", "");
    assert.doesNotMatch(visible, /\bSadani\b|\bSADANI\b|PT Sadatech/, `${route}: public brand and legal entity`);
    const meta = metadata(html);
    assert.equal(meta["og:site_name"], "Sadatech", `${route}: social brand`);
    assert.match(meta["og:image"] || "", /\/brand\/sadatech-og-image\.jpg$/, `${route}: social art`);
    assert.equal(meta["og:locale"], locale === "id" ? "id_ID" : "en_ID", `${route}: social locale`);
    assert.equal(new URL(meta["og:url"]).pathname, route, `${route}: social URL`);
    assert.match(meta["twitter:title"] || "", /Sadatech/, `${route}: Twitter title`);
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
    const canonical = links.find((link) => link.rel === "canonical");
    assert.equal(new URL(canonical.href).pathname, route, `${route}: canonical URL`);
    for (const alternate of ["id", "en"]) assert.ok(links.some((link) => link.rel === "alternate" && link.hrefLang === alternate), `${route}: ${alternate} alternate`);
    const jsonld = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1];
    const organization = JSON.parse(jsonld);
    assert.equal(organization.name, "Sadatech");
    assert.equal(organization.legalName, "PT Sadani Teknologi Indonesia");
    assert.match(organization.logo, /sadatech-symbol-primary\.svg$/);
    for (const [, raw] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      const target = decode(raw);
      if (target.startsWith("/brand/") || target.startsWith("/home/") || /^\/products\/[^/]+\/[^/]+\.(?:svg|webp|png|jpg)/.test(target) || target.startsWith("/_next/static/") || target.startsWith("/_next/image?")) assets.add(target);
    }
    for (const [, set] of html.matchAll(/srcSet="([^"]+)"/g)) {
      for (const image of set.split(",")) assets.add(decode(image.trim().split(/\s+/)[0]));
    }
    pageCount += 1;
  }
}
const manifestResponse = await fetch(new URL("/site.webmanifest", base));
const manifest = await manifestResponse.json();
assert.equal(manifest.name, "Sadatech");
assert.equal(manifest.theme_color, "#161719");
for (const icon of manifest.icons) assets.add(icon.src);
for (const asset of assets) {
  const response = await fetch(new URL(asset, base));
  assert.equal(response.status, 200, `asset ${asset}`);
}
const symbolSvg = Buffer.from(await (await fetch(new URL("/brand/icons/favicon.svg", base))).arrayBuffer());
assert.match(symbolSvg.toString(), /<rect width="512" height="512" rx="112" fill="#28282D"\/>/, "SVG icon has a rounded charcoal tile");
assert.match(symbolSvg.toString(), /fill="#FFF9F0" d="M 345,37/, "SVG icon uses a high-contrast ivory mark");
async function checkSymbolAlpha(buffer, name) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const expected = await sharp(symbolSvg).resize(info.width, info.height).ensureAlpha().extractChannel(3).raw().toBuffer();
  const alpha = Buffer.from(Array.from({ length: info.width * info.height }, (_, i) => data[i * 4 + 3]));
  assert.deepEqual(alpha, expected, `${name}: alpha matches the rounded icon tile`);
  assert.equal(alpha[0], 0, `${name}: rounded outer corner stays transparent`);
  assert.equal(alpha[info.width * Math.floor(info.height / 2)], 255, `${name}: background fills the rounded tile edge`);
}
for (const icon of ["/brand/icons/favicon-16.png", "/brand/icons/favicon-32.png", "/icon.png", "/brand/icons/apple-touch-icon.png", "/brand/icons/android-chrome-192x192.png", "/brand/icons/android-chrome-512x512.png"]) {
  const response = await fetch(new URL(icon, base));
  await checkSymbolAlpha(Buffer.from(await response.arrayBuffer()), icon);
}
const ico = Buffer.from(await (await fetch(new URL("/favicon.ico?v=4", base))).arrayBuffer());
  assert.equal(ico.readUInt16LE(4), 3, "ICO includes three resolutions");
for (let i = 0; i < 3; i += 1) {
  const entry = 6 + i * 16;
  const length = ico.readUInt32LE(entry + 8);
  const offset = ico.readUInt32LE(entry + 12);
  await checkSymbolAlpha(ico.subarray(offset, offset + length), `ICO entry ${i}`);
}
for (const locale of ["", "/en"]) {
  for (const path of ["/brand-check-missing", "/products/brand-check-missing"]) {
    const response = await fetch(new URL(locale + path, base));
    assert.equal(response.status, 404, `${locale}${path}: missing page`);
    assert.match(await response.text(), /Sadatech/, "Branded missing page");
  }
}
const redirect = await fetch(new URL("/id/about", base), { redirect: "manual" });
assert.equal(redirect.status, 308);
assert.equal(new URL(redirect.headers.get("location")).pathname, "/about");
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
for (const path of paths) {
  assert.ok(sitemap.includes(path === "/" ? "/en</loc>" : `/en${path}</loc>`), `sitemap: English ${path}`);
}
assert.equal((await fetch(new URL("/robots.txt", base))).status, 200);
// Verify main's contact fallback locally with synthetic data; do not visit the returned WhatsApp URL.
for (const locale of ["id", "en"]) {
  const response = await fetch(new URL("/api/contact", base), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Brand QA", email: "brand-smoke@example.invalid", company: "", inquiryType: "general", message: "Local regression check for the Sadatech rebrand.", website: "", locale }),
  });
  assert.equal(response.status, 200, "Local contact fallback");
  const result = await response.json();
  const whatsapp = new URL(result.whatsappUrl);
  assert.equal(whatsapp.hostname, "wa.me");
  assert.match(whatsapp.searchParams.get("text"), /Sadatech/);
  assert.doesNotMatch(whatsapp.searchParams.get("text"), /Sadani/);
}
console.log(`PASS: ${pageCount} bilingual pages, ${assets.size} assets, latest homepage scenes/video, social metadata, legal entity, manifest, redirects, 404s, sitemap, robots and local WhatsApp fallback.`);
