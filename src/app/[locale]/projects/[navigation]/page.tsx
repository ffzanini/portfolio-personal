import { cache } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import ProjectDetails from "@/app/[locale]/projects/[navigation]/ProjectDetails";
import { TranslationsPatch } from "@/components/utils/TranslationsPatch";
import { type Locale, isValidLocale } from "@/libs/i18n";
import { loadLocaleProjects } from "@/locales/load-locale";

interface PageProps {
  params: Promise<{
    locale: string;
    navigation: string;
  }>;
}

const getProjects = cache(async () => {
  const { projects } = await import("@/app/data/projects");
  return projects;
});

export async function generateStaticParams() {
  const projects = await getProjects();
  const locales = ["pt", "en", "es"];
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      navigation: project.navigation,
    })),
  );
}

export default async function LocaleProjectDetailsPage({
  params,
}: Readonly<PageProps>) {
  const { locale: rawLocale, navigation } = await params;
  const locale = (isValidLocale(rawLocale) ? rawLocale : "pt") as Locale;
  const [projects, projectList] = await Promise.all([
    loadLocaleProjects(locale),
    getProjects(),
  ]);
  const project = projectList.find((item) => item.navigation === navigation);

  if (!project) notFound();

  return (
    <TranslationsPatch patch={{ projects }}>
      <Navbar />
      <ProjectDetails project={project} />
    </TranslationsPatch>
  );
}
