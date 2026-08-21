import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);

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
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|favicon.ico|robots.txt|sitemap.xml|og/).*)"],
};
