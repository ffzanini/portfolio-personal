import type { Metadata } from "next";

import { projects } from "@/app/data/projects";
import { PERSON } from "@/constants/seo";
import { isValidLocale, normalizeLocale } from "@/libs/i18n";
import { buildPageMetadata, fillTemplate } from "@/libs/page-metadata";
import { loadLocale } from "@/locales/load-locale";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; navigation: string }>;
};

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { locale: rawLocale, navigation } = await params;
  if (!isValidLocale(rawLocale)) return {};

  const locale = normalizeLocale(rawLocale);
  const translations = await loadLocale(locale);
  const project = projects.find((item) => item.navigation === navigation);
  const seo = translations.ui.seo;

  if (!project) {
    return buildPageMetadata({
      locale,
      path: `/projects/${navigation}`,
      title: seo.project_fallback_title,
      description: `${seo.project_fallback_title} | ${PERSON.name}`,
    });
  }

  const projectCopy = translations.projects.projects.find(
    (item) => item.id === project.id,
  );
  const title = projectCopy?.title ?? navigation;
  const technologies = project.technologies.slice(0, 6).join(", ");

  return buildPageMetadata({
    locale,
    path: `/projects/${navigation}`,
    title,
    description: fillTemplate(seo.project_description, {
      title,
      name: PERSON.name,
      tech: technologies,
    }),
  });
}

export default function ProjectDetailsLayout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
