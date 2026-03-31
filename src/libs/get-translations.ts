import { en, es, pt } from "@/locales";
import { DEFAULT_LOCALE, isValidLocale } from "@/libs/i18n";

type Locations = "en" | "es" | "pt";

export function getServerTranslations(lang?: string | null): typeof pt {
  if (lang === "en") return en;
  if (lang === "es") return es;
  return pt;
}

export function getLanguageFromSearchParams(
  searchParams?: { lang?: string } | null,
): Locations {
  const lang = searchParams?.lang;
  if (lang && isValidLocale(lang)) {
    return lang as Locations;
  }
  return DEFAULT_LOCALE;
}
