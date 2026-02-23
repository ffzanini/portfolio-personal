"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

import pt from "../locales/pt";

type Locations = "en" | "es" | "pt";

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

const getInitialLanguage = (): Locations => {
  if (typeof window === "undefined") return "pt";

  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLang === "pt" || storedLang === "en" || storedLang === "es") {
    return storedLang as Locations;
  }

  const browserLang = navigator.language?.split("-")[0];
  if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
    return browserLang as Locations;
  }

  return "pt";
};

const DEFAULT_LOCATION: Locations = "pt";

const InternacionalizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [location, setLocationState] = useState<Locations>(DEFAULT_LOCATION);
  const [translations, setTranslationsState] = useState<typeof pt>(pt);
  const loadedLocales = useRef<{ en?: typeof pt; es?: typeof pt }>({});

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLocationState(initialLang);
  }, []);

  useEffect(() => {
    if (location === "pt") {
      setTranslationsState(pt);
      return;
    }
    const cached = loadedLocales.current[location];
    if (cached) {
      setTranslationsState(cached);
      return;
    }
    import(`../locales/${location}`).then((mod) => {
      const locale = mod.default;
      loadedLocales.current[location] = locale;
      setTranslationsState(locale);
    });
  }, [location]);

  const setLocationWithPersistence = useCallback((lang: Locations) => {
    setLocationState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${lang};path=/;max-age=31536000;samesite=lax`;
    }
  }, []);

  const objTranslations = useMemo(() => {
    return {
      location,
      setLocation: setLocationWithPersistence,
      translations,
    };
  }, [location, translations, setLocationWithPersistence]);

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
