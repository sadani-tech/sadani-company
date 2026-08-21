import "server-only";
import { headers } from "next/headers";
import { defaultLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get("x-sadani-locale");
  return value === "en" ? "en" : defaultLocale;
}
