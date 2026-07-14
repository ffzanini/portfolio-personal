import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AppProvider from "@/providers/AppProvider";
import { ClientToaster } from "@/components/utils";
import { LazyScrollToTop } from "@/components/utils/LazyScrollToTop";
import { isValidLocale, normalizeLocale, SUPPORTED_LOCALES } from "@/libs/i18n";
import { buildPageMetadata } from "@/libs/page-metadata";
import { loadLocale } from "@/locales/load-locale";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = normalizeLocale(rawLocale);
  const translations = await loadLocale(locale);

  return buildPageMetadata({
    locale,
    path: "/",
    title: translations.ui.seo.home_title,
    description: translations.ui.seo.home_description,
  });
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
