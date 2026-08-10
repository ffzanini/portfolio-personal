import { Navbar } from "@/components/ui/Navbar";
import { StackContent } from "@/components/pages/stack/StackContent";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocaleStack } from "@/locales/load-locale";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleStackPage({ params }: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const stack = await loadLocaleStack(locale);

  return (
    <TranslationsPatch patch={{ stack }}>
      <Navbar />
      <StackContent />
    </TranslationsPatch>
  );
}
