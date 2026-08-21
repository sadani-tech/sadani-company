import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export function PageShell({ children }: { children: ReactNode }) {
  return <><a href="#main-content" className="skip-link">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></>;
}
