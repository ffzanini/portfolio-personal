import { ContactContent } from "@/components/pages/contact/ContactContent";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocaleContact } from "@/locales/load-locale";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleContactPage({
  params,
}: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const contact = await loadLocaleContact(locale);

  return (
    <TranslationsPatch patch={{ contact }}>
      <ContactContent />
    </TranslationsPatch>
  );
}
