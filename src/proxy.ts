import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, resolvePreferredLocale } from "@/libs/i18n";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && isValidLocale(firstSegment)) {
    const response = NextResponse.next();
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
