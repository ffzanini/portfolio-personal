"use client";

import { useMemo, type ReactNode } from "react";

import {
  InternacionalizationContext,
  useTranslation,
} from "@/context/internacionalization-context";
import type { Translations } from "@/locales";

export function TranslationsPatch({
  patch,
  children,
}: Readonly<{
  patch: Partial<Translations>;
  children: ReactNode;
}>) {
  const parent = useTranslation();

  const value = useMemo(
    () => ({
      ...parent,
      translations: {
        ...parent.translations,
        ...patch,
      } as Translations,
    }),
    [parent, patch],
  );

  return (
    <InternacionalizationContext.Provider value={value}>
      {children}
    </InternacionalizationContext.Provider>
  );
}
