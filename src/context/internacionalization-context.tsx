"use client";
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { en, es, pt } from "@/locales";
import {
  DEFAULT_LOCALE,
  getLocaleFromBrowserLanguage,
  isValidLocale,
  type Locale,
  withLocalePath,
} from "@/libs/i18n";

type Locations = Locale;

export interface InternacionalizationInterface {
  location: Locations;
  setLocation: (location: Locations) => void;
  translations: typeof pt;
}

const InternacionalizationContext = createContext(
  {} as InternacionalizationInterface,
);

const useTranslation = () => {
  const context = useContext(InternacionalizationContext);

  if (context === undefined) {
    throw new Error(
      "useTranslation must be used within InternacionalizationProvider",
    );
  }

  return context;
};

const LANGUAGE_STORAGE_KEY = "app-language";

const InternacionalizationProvider = ({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locations;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const translationsMap: Record<Locations, typeof pt> = useMemo(
    () => ({
      pt,
      en,
      es,
    }),
    [],
  );

  const pathnameLocale = useMemo(() => {
    const firstSegment = (pathname || "/").split("/").filter(Boolean)[0];
    if (firstSegment && isValidLocale(firstSegment)) {
      return firstSegment;
    }
    return null;
  }, [pathname]);

  const location = useMemo<Locations>(() => {
    if (pathnameLocale) return pathnameLocale;
    if (typeof window !== "undefined") {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage && isValidLocale(storedLanguage)) {
        return storedLanguage;
      }
      return getLocaleFromBrowserLanguage(window.navigator.language);
    }
    return initialLocale;
  }, [initialLocale, pathnameLocale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, location);
    document.cookie = `${LANGUAGE_STORAGE_KEY}=${location};path=/;max-age=31536000;samesite=lax`;
  }, [location]);

  const setLocationWithPersistence = useCallback((lang: Locations) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${lang};path=/;max-age=31536000;samesite=lax`;
    }
    const nextPath = withLocalePath(lang, pathname || "/");
    router.push(nextPath);
  }, [pathname, router]);

  const translations = translationsMap[location] ?? pt;

  const objTranslations = useMemo(() => {
    return {
      location,
      setLocation: setLocationWithPersistence,
      translations,
    };
  }, [location, setLocationWithPersistence, translations]);

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
