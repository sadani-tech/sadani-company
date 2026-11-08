import { NextResponse, type NextRequest } from "next/server";
import { getProduct } from "@/config/products";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);

  // Reject unknown products before the async layout can stream a 200 response.
  const productPath = pathname.replace(/^\/en(?=\/|$)/, "");
  if (productPath.startsWith("/products/") && !getProduct(productPath.slice("/products/".length))) {
    const locale = pathname.startsWith("/en/") || request.headers.get("x-sadani-locale") === "en" ? "en" : "id";
    headers.set("x-sadani-locale", locale);
    const response = NextResponse.rewrite(new URL("/404", request.url), { status: 404, request: { headers } });
    response.headers.set("Content-Language", locale);
    return response;
  }

  if (request.headers.get("x-sadani-locale") === "en") {
    const response = NextResponse.next({ request: { headers } });
    response.headers.set("Content-Language", "en");
    return response;
  }

  if (pathname === "/id" || pathname.startsWith("/id/")) {
    const target = pathname === "/id" ? "/" : pathname.slice(3);
    return NextResponse.redirect(new URL(target || "/", request.url), 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    headers.set("x-sadani-locale", "en");
    const target = pathname === "/en" ? "/" : pathname.slice(3);
    const response = NextResponse.rewrite(new URL(target || "/", request.url), { request: { headers } });
    response.headers.set("Content-Language", "en");
    return response;
  }

  headers.set("x-sadani-locale", "id");
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Language", "id");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.png|favicon.ico|robots.txt|sitemap.xml|og/|.*\\..*).*)"],
};
