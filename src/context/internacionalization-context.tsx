"use client";
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
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
  isLanguageSwitching: boolean;
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
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);

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

  useEffect(() => {
    if (isLanguageSwitching) {
      const timer = window.setTimeout(() => {
        setIsLanguageSwitching(false);
      }, 220);
      return () => window.clearTimeout(timer);
    }
  }, [location, isLanguageSwitching]);

  const setLocationWithPersistence = useCallback((lang: Locations) => {
    if (lang === location) return;
    setIsLanguageSwitching(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${lang};path=/;max-age=31536000;samesite=lax`;
    }
    const nextPath = withLocalePath(lang, pathname || "/");
    const docWithTransition = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (docWithTransition.startViewTransition) {
      docWithTransition.startViewTransition(() => router.push(nextPath));
      return;
    }
    router.push(nextPath);
  }, [location, pathname, router]);

  const translations = translationsMap[location] ?? pt;

  const objTranslations = useMemo(() => {
    return {
      location,
      setLocation: setLocationWithPersistence,
      translations,
      isLanguageSwitching,
    };
  }, [isLanguageSwitching, location, setLocationWithPersistence, translations]);

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
      {isLanguageSwitching && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-9999 h-0.5 overflow-hidden">
          <div className="h-full w-1/4 animate-[loading-slide_1100ms_ease-in-out_infinite] rounded-r-full bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 opacity-60">
            <div className="h-full w-full blur-[1px]" />
          </div>
        </div>
      )}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
