import { Navbar } from "@/components/ui/Navbar";
import { ProjectsContent } from "@/components/pages/projects/ProjectsContent";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocale } from "@/locales/load-locale";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleProjectsPage({
  params,
}: Readonly<PageProps>) {
  const { locale: rawLocale } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const { projects } = await loadLocale(locale);

  return (
    <TranslationsPatch patch={{ projects }}>
      <Navbar />
      <ProjectsContent />
    </TranslationsPatch>
  );
}
