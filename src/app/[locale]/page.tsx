import { type Locale } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";
import { Navbar } from "@/components/ui";
import { HomeContent } from "@/components/pages/home/HomeContent";

export default async function LocaleHomePage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
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
