import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, resolvePreferredLocale } from "@/libs/i18n";

function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCodePoint(...array));
}

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https://va.vercel-scripts.com`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const nonce = generateNonce();
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const firstSegment = pathname.split("/").find(Boolean);
  if (firstSegment && isValidLocale(firstSegment)) {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    response.cookies.set("app-language", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const cookieLocale = req.cookies.get("app-language")?.value;
  const headerLocale = req.headers.get("accept-language");
  const resolvedLocale = resolvePreferredLocale({
    cookieLocale,
    acceptLanguage: headerLocale,
  });

  const url = req.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${resolvedLocale}` : `/${resolvedLocale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.headers.set("Content-Security-Policy", csp);
  response.cookies.set("app-language", resolvedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
