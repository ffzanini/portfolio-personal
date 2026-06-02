export { default as pt } from "./pt";
export { default as en } from "./en";
export { default as es } from "./es";
export type { Translations } from "./pt";

import type { Translations } from "./pt";
import type { Locale } from "@/libs/i18n";

export async function loadLocale(locale: Locale): Promise<Translations> {
  switch (locale) {
    case "en":
      return (await import("./en")).default;
    case "es":
      return (await import("./es")).default;
    default:
      return (await import("./pt")).default;
  }
}
