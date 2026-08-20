import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, resolvePreferredLocale } from "@/libs/i18n";

const LANGUAGE_COOKIE = "app-language";
const LANGUAGE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split("/").find(Boolean);

  if (
    firstSegment === "_next" ||
    firstSegment === "api" ||
    (pathname !== "/" && pathname.includes("."))
  ) {
    return NextResponse.next();
  }

  if (firstSegment && isValidLocale(firstSegment)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  const cookieLocale = req.cookies.get(LANGUAGE_COOKIE)?.value;
  const resolvedLocale = resolvePreferredLocale({
    cookieLocale,
    acceptLanguage: req.headers.get("accept-language"),
  });

  const url = req.nextUrl.clone();
  url.pathname = `/${resolvedLocale}${pathname}`;

  const response = NextResponse.redirect(url);
  if (cookieLocale !== resolvedLocale) {
    response.cookies.set(
      LANGUAGE_COOKIE,
      resolvedLocale,
      LANGUAGE_COOKIE_OPTIONS,
    );
  }
  return response;
}

export const config = {
  matcher: ["/", "/((?!pt|en|es|_next|api|.*\\..*).*)"],
};
