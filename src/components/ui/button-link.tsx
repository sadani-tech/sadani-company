import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "light" };

export function ButtonLink({ className = "", variant = "primary", ...props }: Props) {
  return <Link className={`button button-${variant} ${className}`} {...props} />;
}
