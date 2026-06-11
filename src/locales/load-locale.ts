import { cache } from "react";
import type { Translations } from "./pt";
import type { Locale } from "@/libs/i18n";

export type { Translations };

export const loadLocale = cache(async function loadLocale(
  locale: Locale,
): Promise<Translations> {
  switch (locale) {
    case "en":
      return (await import("./en")).default;
    case "es":
      return (await import("./es")).default;
    default:
      return (await import("./pt")).default;
  }
});
