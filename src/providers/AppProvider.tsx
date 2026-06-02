import { InternacionalizationProvider } from "@/context/internacionalization-context";
import { DEFAULT_LOCALE, type Locale } from "@/libs/i18n";
import type { Translations } from "@/locales";

export function AppProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialTranslations,
}: Readonly<{
  children: React.ReactNode;
  initialLocale?: Locale;
  initialTranslations: Translations;
}>) {
  return (
    <InternacionalizationProvider
      initialLocale={initialLocale}
      initialTranslations={initialTranslations}
    >
      {children}
    </InternacionalizationProvider>
  );
}

export default AppProvider;
