"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

import { HTML_LANG, isValidLocale } from "@/libs/i18n";

export function HtmlLang() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const first = pathname.split("/").filter(Boolean)[0] ?? "";
    const locale = isValidLocale(first) ? first : "pt";
    document.documentElement.lang = HTML_LANG[locale];
  }, [pathname]);

  return null;
}
