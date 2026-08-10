import { cache } from "react";
import type { Translations } from "./pt";
import type { Locale } from "@/libs/i18n";

export type { Translations };

export type ChromeTranslations = Pick<Translations, "navbar" | "ui">;

export type InitialTranslations = ChromeTranslations &
  Partial<Omit<Translations, "navbar" | "ui">>;

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

async function importLocaleBundle(locale: Locale): Promise<Translations> {
  switch (locale) {
    case "en": {
      const [
        { default: about },
        { default: arcade },
        { default: contact },
        { default: home },
        { default: navbar },
        { default: projects },
        { default: stack },
        { default: ui },
      ] = await Promise.all([
        import("./en/obj_about.json"),
        import("./en/obj_arcade.json"),
        import("./en/obj_contact.json"),
        import("./en/obj_home.json"),
        import("./en/obj_navbar.json"),
        import("./en/obj_projects.json"),
        import("./en/obj_stack.json"),
        import("./en/obj_ui.json"),
      ]);
      return { about, arcade, contact, home, navbar, projects, stack, ui };
    }
    case "es": {
      const [
        { default: about },
        { default: arcade },
        { default: contact },
        { default: home },
        { default: navbar },
        { default: projects },
        { default: stack },
        { default: ui },
      ] = await Promise.all([
        import("./es/obj_about.json"),
        import("./es/obj_arcade.json"),
        import("./es/obj_contact.json"),
        import("./es/obj_home.json"),
        import("./es/obj_navbar.json"),
        import("./es/obj_projects.json"),
        import("./es/obj_stack.json"),
        import("./es/obj_ui.json"),
      ]);
      return { about, arcade, contact, home, navbar, projects, stack, ui };
    }
    default: {
      const [
        { default: about },
        { default: arcade },
        { default: contact },
        { default: home },
        { default: navbar },
        { default: projects },
        { default: stack },
        { default: ui },
      ] = await Promise.all([
        import("./pt/obj_about.json"),
        import("./pt/obj_arcade.json"),
        import("./pt/obj_contact.json"),
        import("./pt/obj_home.json"),
        import("./pt/obj_navbar.json"),
        import("./pt/obj_projects.json"),
        import("./pt/obj_stack.json"),
        import("./pt/obj_ui.json"),
      ]);
      return { about, arcade, contact, home, navbar, projects, stack, ui };
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

export const loadLocaleAbout = cache(async function loadLocaleAbout(
  locale: Locale,
): Promise<Translations["about"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_about.json")).default;
    case "es":
      return (await import("./es/obj_about.json")).default;
    default:
      return (await import("./pt/obj_about.json")).default;
  }
});

export const loadLocaleContact = cache(async function loadLocaleContact(
  locale: Locale,
): Promise<Translations["contact"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_contact.json")).default;
    case "es":
      return (await import("./es/obj_contact.json")).default;
    default:
      return (await import("./pt/obj_contact.json")).default;
  }
});

export const loadLocaleStack = cache(async function loadLocaleStack(
  locale: Locale,
): Promise<Translations["stack"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_stack.json")).default;
    case "es":
      return (await import("./es/obj_stack.json")).default;
    default:
      return (await import("./pt/obj_stack.json")).default;
  }
});

export const loadLocaleProjects = cache(async function loadLocaleProjects(
  locale: Locale,
): Promise<Translations["projects"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_projects.json")).default;
    case "es":
      return (await import("./es/obj_projects.json")).default;
    default:
      return (await import("./pt/obj_projects.json")).default;
  }
});

export const loadLocaleArcade = cache(async function loadLocaleArcade(
  locale: Locale,
): Promise<Translations["arcade"]> {
  switch (locale) {
    case "en":
      return (await import("./en/obj_arcade.json")).default;
    case "es":
      return (await import("./es/obj_arcade.json")).default;
    default:
      return (await import("./pt/obj_arcade.json")).default;
  }
});
