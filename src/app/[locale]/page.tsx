import type { Metadata } from "next";
import { type Locale, isValidLocale, normalizeLocale } from "@/libs/i18n";
import { loadLocaleChrome, loadLocaleHome } from "@/locales/load-locale";
import { buildPageMetadata } from "@/libs/page-metadata";
import { HomeContent } from "@/components/pages/home/HomeContent";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Readonly<PageProps>): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = normalizeLocale(rawLocale);
  const translations = await loadLocaleChrome(locale);

  return buildPageMetadata({
    locale,
    path: "/",
    title: translations.ui.seo.home_title,
    description: translations.ui.seo.home_description,
  });
}

export default async function LocaleHomePage({ params }: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const home = await loadLocaleHome(locale);

  return <HomeContent home={home} locale={locale} />;
}
