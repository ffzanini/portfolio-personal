import { AboutContent } from "@/components/pages/about/AboutContent";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocaleAbout } from "@/locales/load-locale";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleAboutPage({ params }: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const about = await loadLocaleAbout(locale);

  return (
    <TranslationsPatch patch={{ about }}>
      <AboutContent />
    </TranslationsPatch>
  );
}
