import Image from "next/image";
import { getProduct, localizeProduct, type ProductTone } from "@/config/products";
import type { Locale } from "@/i18n/config";

export function ProductVisual({ product: slug, compact = false, locale = "id" }: { product: ProductTone; compact?: boolean; locale?: Locale }) {
  const product = getProduct(slug);
  if (!product) return null;
  const content = localizeProduct(product, locale);
  const label = locale === "id" ? `Ilustrasi editorial ${product.name}` : `${product.name} editorial illustration`;

  return (
    <figure className={`product-visual product-visual-${slug} product-visual--verified ${compact ? "product-visual-compact" : ""}`}>
      <Image src={product.cover} alt={content.coverAlt} width={1200} height={1000} sizes={compact ? "(max-width: 1023px) 90vw, 390px" : "(max-width: 1023px) 90vw, 600px"} unoptimized />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
