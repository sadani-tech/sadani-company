import Link from "next/link";

export function Logo({ inverse = false, href = "/" }: { inverse?: boolean; href?: string }) {
  return (
    <Link href={href} aria-label="Sadani home" className={`logo ${inverse ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 34 34" aria-hidden="true" className="h-8 w-8">
        <path d="M17 2.25 29.77 9.6v14.8L17 31.75 4.23 24.4V9.6L17 2.25Z" fill="currentColor" />
        <path d="M22.8 11.2c-1.1-1.15-2.92-1.9-5.14-1.9-3.14 0-5.34 1.56-5.34 3.86 0 2.42 1.84 3.25 4.9 3.87 2.34.48 3.13.86 3.13 1.8 0 .91-1 1.55-2.68 1.55-1.93 0-3.5-.7-4.77-2.05l-1.65 2.1c1.47 1.62 3.7 2.55 6.3 2.55 3.55 0 5.78-1.62 5.78-4.27 0-2.38-1.66-3.3-5-4-2.23-.47-3.03-.8-3.03-1.68 0-.78.84-1.3 2.25-1.3 1.52 0 2.8.55 3.78 1.55l1.47-2.08Z" fill={inverse ? "#0d1712" : "#f7f8f5"} />
      </svg>
      <span>SADANI</span>
    </Link>
  );
}
