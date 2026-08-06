import { cache } from "react";
import type { Translations } from "./pt";
import type { Locale } from "@/libs/i18n";

export type { Translations };

export type ChromeTranslations = Pick<Translations, "navbar" | "ui">;

export type InitialTranslations = ChromeTranslations &
  Partial<Omit<Translations, "navbar" | "ui">>;

async function importLocaleBundle(locale: Locale): Promise<Translations> {
  switch (locale) {
    case "en":
      return (await import("./en")).default;
    case "es":
      return (await import("./es")).default;
    default:
      return (await import("./pt")).default;
  }
}

async function importChrome(locale: Locale): Promise<ChromeTranslations> {
  switch (locale) {
    case "en": {
      const [{ default: navbar }, { default: ui }] = await Promise.all([
        import("./en/obj_navbar.json"),
        import("./en/obj_ui.json"),
      ]);
      return { navbar, ui };
    }
    case "es": {
      const [{ default: navbar }, { default: ui }] = await Promise.all([
        import("./es/obj_navbar.json"),
        import("./es/obj_ui.json"),
      ]);
      return { navbar, ui };
    }
    default: {
      const [{ default: navbar }, { default: ui }] = await Promise.all([
        import("./pt/obj_navbar.json"),
        import("./pt/obj_ui.json"),
      ]);
      return { navbar, ui };
    }
  }
}

export const loadLocale = cache(async function loadLocale(
  locale: Locale,
): Promise<Translations> {
  return importLocaleBundle(locale);
});

export const loadLocaleChrome = cache(async function loadLocaleChrome(
  locale: Locale,
): Promise<ChromeTranslations> {
  return importChrome(locale);
});

export const loadLocaleHome = cache(async function loadLocaleHome(
  locale: Locale,
): Promise<Translations["home"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_home.json")).default;
    case "es":
      return (await import("./es/obj_home.json")).default;
    default:
      return (await import("./pt/obj_home.json")).default;
  }
});
