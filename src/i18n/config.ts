export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export function localizePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

export function stripLocale(pathname: string) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}
