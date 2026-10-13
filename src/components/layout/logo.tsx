import Image from "next/image";
import Link from "next/link";

export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} aria-label="Sadani home" className={`nav__brand ${className}`}>
      <Image src="/brand/sadani-logo-full.svg" alt="" width={3648} height={1080} unoptimized priority />
    </Link>
  );
}
