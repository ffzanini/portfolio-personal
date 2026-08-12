import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, resolvePreferredLocale } from "@/libs/i18n";

const LANGUAGE_COOKIE = "app-language";
const LANGUAGE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split("/").find(Boolean);

  if (
    (firstSegment && isValidLocale(firstSegment)) ||
    firstSegment === "_next" ||
    firstSegment === "api" ||
    (pathname !== "/" && pathname.includes("."))
  ) {
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
    "/((?!pt|en|es|_next|api|.*\\..*).*)",
  ],
};
