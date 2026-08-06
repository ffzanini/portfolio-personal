import { Navbar } from "@/components/ui/Navbar";
import { ArcadeUnderConstruction } from "@/components/pages/arcade/ArcadeUnderConstruction";
import { PixelArtCollectionContent } from "@/components/pages/arcade/PixelArtCollectionContent";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { ARCADE_ENABLED } from "@/libs/arcade-ui";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePixelArtPage({
  params,
}: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const { arcade } = await loadLocale(locale);

  if (!ARCADE_ENABLED) {
    return (
      <TranslationsPatch patch={{ arcade }}>
        <Navbar />
        <ArcadeUnderConstruction />
      </TranslationsPatch>
    );
  }

  return (
    <TranslationsPatch patch={{ arcade }}>
      <Navbar />
      <PixelArtCollectionContent />
    </TranslationsPatch>
  );
}
