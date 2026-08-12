import { notFound } from "next/navigation";

import { Navbar } from "@/components/ui/Navbar";
import AppProvider from "@/providers/AppProvider";
import { LazyClientToaster } from "@/components/utils/ClientToaster/LazyClientToaster";
import { LazyScrollToTop } from "@/components/utils/LazyScrollToTop";
import { isValidLocale, SUPPORTED_LOCALES } from "@/libs/i18n";
import { loadLocaleChrome } from "@/locales/load-locale";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

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

  const initialTranslations = await loadLocaleChrome(locale);

  return (
    <AppProvider initialLocale={locale} initialTranslations={initialTranslations}>
      <Navbar locale={locale} chrome={initialTranslations} />
      {children}
      <LazyClientToaster />
      <LazyScrollToTop />
    </AppProvider>
  );
}
