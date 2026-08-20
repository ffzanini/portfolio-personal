import {
  getLocaleFromNavigatorLanguages,
  isValidLocale,
  type Locale,
} from "@/libs/i18n";

export const LANGUAGE_COOKIE = "app-language";

export function readLanguageCookie(): string | undefined {
  const match = /(?:^|; )app-language=([^;]*)/.exec(document.cookie);
  return match?.[1];
}

export function persistLocale(locale: Locale) {
  document.cookie = `${LANGUAGE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  try {
    localStorage.setItem(LANGUAGE_COOKIE, locale);
  } catch {
    // Ignore.
  }
}

export function resolveEntryLocale(): Locale {
  const cookieLocale = readLanguageCookie();
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  try {
    const stored = localStorage.getItem(LANGUAGE_COOKIE);
    if (stored && isValidLocale(stored)) return stored;
  } catch {
    // localStorage can throw in private mode
  }

  const languages =
    navigator.languages?.length > 0
      ? navigator.languages
      : [navigator.language];

  return getLocaleFromNavigatorLanguages(languages);
}

export function cacheMissingLocale(pathname: string): Locale {
  const cookieLocale = readLanguageCookie();
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const pathLocale = pathname.split("/").find(Boolean);
  if (pathLocale && isValidLocale(pathLocale)) {
    persistLocale(pathLocale);
    return pathLocale;
  }

  const locale = resolveEntryLocale();
  persistLocale(locale);
  return locale;
}
