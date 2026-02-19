"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

import { en, es, pt } from "../locales";

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
  if (typeof window === "undefined") return "en";

  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLang === "pt" || storedLang === "en" || storedLang === "es") {
    return storedLang as Locations;
  }

  const browserLang = navigator.language?.split("-")[0];
  if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
    return browserLang as Locations;
  }

  return "en";
};

const InternacionalizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [location, setLocationState] = useState<Locations | null>(null);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLocationState(initialLang);
  }, []);

  const setLocationWithPersistence = useCallback((lang: Locations) => {
    setLocationState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  const getTranslations = useCallback(() => {
    if (location === "en") return en;
    if (location === "es") return es;
    return pt;
  }, [location]);

  const objTranslations = useMemo(() => {
    return {
      location: location || "en",
      setLocation: setLocationWithPersistence,
      translations: getTranslations(),
    };
  }, [location, getTranslations, setLocationWithPersistence]);

  if (location === null) return null;

  return (
    <InternacionalizationContext.Provider value={objTranslations}>
      {children}
    </InternacionalizationContext.Provider>
  );
};

export { InternacionalizationProvider, useTranslation };
