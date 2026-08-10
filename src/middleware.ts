import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, resolvePreferredLocale } from "@/libs/i18n";

const LANGUAGE_COOKIE = "app-language";
const LANGUAGE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

/**
 * Edge-only locale redirect for paths that lack a /pt|/en|/es prefix.
 * Localized routes return next() immediately so ISR/CDN stays on the cold path.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").find(Boolean);

  // Already localized — never prepend another locale (prevents /es/es/es… loops).
  // Matcher negative-lookahead alone is not reliable under Next's path-to-regexp.
  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(LANGUAGE_COOKIE)?.value;
  const resolvedLocale = resolvePreferredLocale({
    cookieLocale,
    acceptLanguage: req.headers.get("accept-language"),
  });

  const url = req.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${resolvedLocale}` : `/${resolvedLocale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "private, no-store");

  if (cookieLocale !== resolvedLocale) {
    response.cookies.set(LANGUAGE_COOKIE, resolvedLocale, LANGUAGE_COOKIE_OPTIONS);
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
