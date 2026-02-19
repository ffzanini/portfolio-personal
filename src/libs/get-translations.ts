import { en, es, pt } from "@/locales";

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
  if (lang === "pt" || lang === "en" || lang === "es") {
    return lang as Locations;
  }
  return "pt";
}
