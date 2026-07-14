import { notFound } from "next/navigation";

import AppProvider from "@/providers/AppProvider";
import { ClientToaster } from "@/components/utils/ClientToaster";
import { LazyScrollToTop } from "@/components/utils/LazyScrollToTop";
import { isValidLocale, SUPPORTED_LOCALES } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const initialTranslations = await loadLocale(locale);

  return (
    <AppProvider initialLocale={locale} initialTranslations={initialTranslations}>
      {children}
      <ClientToaster />
      <LazyScrollToTop />
    </AppProvider>
  );
}
