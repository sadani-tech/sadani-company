import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/", className = "", inverse = false, separated = false }: { href?: string; className?: string; inverse?: boolean; separated?: boolean }) {
  return (
    <Link href={href} aria-label="Sadatech home" className={`nav__brand ${separated ? "nav__brand--separated" : ""} ${className}`}>
      {separated ? <>
        <Image src={`/brand/sadatech-symbol-${inverse ? "light" : "primary"}.svg`} alt="" width={395} height={351} className="brand__symbol" unoptimized priority />
        <span className="brand__divider" aria-hidden="true" />
        <span className="brand__name">Sadatech</span>
      </> : <Image src={`/brand/sadatech-logo-horizontal-${inverse ? "light" : "primary"}.svg`} alt="" width={1050} height={270} unoptimized priority />}
    </Link>
  );
}
