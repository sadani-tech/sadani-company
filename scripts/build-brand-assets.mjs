import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

// Export the rounded charcoal tile and high-contrast ivory/gold mark as designed.
const iconSource = fs.readFileSync("public/brand/icons/favicon.svg", "utf8");
if (!iconSource.includes('rx="112"') || !iconSource.includes('fill="#FFF9F0" d="M 345,37')) {
  throw new Error("favicon.svg must contain the rounded charcoal tile and ivory mark");
}
const icon = Buffer.from(iconSource);
const iconBuffers = [];
for (const size of [16, 32, 48, 64, 180, 192, 512]) {
  const png = await sharp(icon).resize(size, size).png().toBuffer();
  fs.writeFileSync(`public/brand/icons/favicon-${size}.png`, png);
  if ([16, 32, 48].includes(size)) iconBuffers.push({ size, png });
  if (size === 512) fs.writeFileSync("src/app/icon.png", png);
  if ([192, 512].includes(size)) fs.writeFileSync(`public/brand/icons/android-chrome-${size}x${size}.png`, png);
}
// Apple and Android use the same rounded, branded tile as the browser favicon.
fs.writeFileSync("public/brand/icons/apple-touch-icon.png", await sharp(icon).resize(180, 180).png().toBuffer());
const header = Buffer.alloc(6 + iconBuffers.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(iconBuffers.length, 4);
let offset = header.length;
iconBuffers.forEach(({ size, png }, i) => {
  const entry = 6 + i * 16;
  header[entry] = size; header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...iconBuffers.map(i => i.png)]));

await import("./build-editorial-covers.mjs");
console.log("Exported rounded-tile browser, Apple and Android icons.");
