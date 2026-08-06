import { Navbar } from "@/components/ui/Navbar";
import { ArcadeContent } from "@/components/pages/arcade/ArcadeContent";
import { ArcadeUnderConstruction } from "@/components/pages/arcade/ArcadeUnderConstruction";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { ARCADE_ENABLED } from "@/libs/arcade-ui";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";
import { fetchChannelVideos } from "@/libs/youtube";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleArcadePage({
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

  const videos = await fetchChannelVideos(9);

  return (
    <TranslationsPatch patch={{ arcade }}>
      <Navbar />
      <ArcadeContent videos={videos} />
    </TranslationsPatch>
  );
}
