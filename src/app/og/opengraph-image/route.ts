import { readFile } from "node:fs/promises";
import path from "node:path";

// Preserve the previously published share-image URL while serving the brand kit art.
export async function GET() {
  const image = await readFile(path.join(process.cwd(), "public/brand/sadatech-og-image.jpg"));
  return new Response(image, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400" } });
}
