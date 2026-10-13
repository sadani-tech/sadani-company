import Link from "next/link";
import type { ReactNode } from "react";

/** The landing-page button: dark with an arrow tile, or light with an ink fill on hover. */
export function ActionLink({ href, children, variant = "dark", className = "" }: { href: string; children: ReactNode; variant?: "dark" | "light"; className?: string }) {
  return (
    <Link href={href} className={`btn btn--${variant} ${className}`}>
      {variant === "dark" ? (
        <>
          <span>{children}</span>
          <span className="btn__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 12L12 4M5.5 4H12v6.5" /></svg></span>
        </>
      ) : children}
    </Link>
  );
}
