export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return <div className="max-w-2xl">{eyebrow && <p className={`eyebrow ${light ? "text-mint" : "text-green"}`}>{eyebrow}</p>}<h2 className={`section-title mt-4 ${light ? "text-white" : "text-ink"}`}>{title}</h2>{description && <p className={`section-copy mt-5 ${light ? "text-white/65" : "text-muted"}`}>{description}</p>}</div>;
}
