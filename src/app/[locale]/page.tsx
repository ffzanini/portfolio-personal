import type { Metadata } from "next";
import { type Locale, isValidLocale, normalizeLocale } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";
import { buildPageMetadata } from "@/libs/page-metadata";
import { Navbar } from "@/components/ui";
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
  const translations = await loadLocale(locale);

  return buildPageMetadata({
    locale,
    path: "/",
    title: translations.ui.seo.home_title,
    description: translations.ui.seo.home_description,
  });
}

export default async function LocaleHomePage({ params }: Readonly<PageProps>) {
  const { locale } = await params;
  const translations = await loadLocale(locale as Locale);

  return (
    <>
      <link
        rel="preload"
        href="/images/me-desenho.jpeg"
        as="image"
        fetchPriority="high"
      />
      <Navbar />
      <HomeContent translations={translations} locale={locale as Locale} />
    </>
  );
}
