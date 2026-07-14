"use client";

import Link from "next/link";
import {
  LuBadgeCheck,
  LuExternalLink,
  LuGithub,
  LuReply,
  LuServerCrash,
  LuTrophy,
} from "react-icons/lu";

import { Project } from "@/app/data/projects";
import { Breadcrumb, ZoomImage } from "@/components/ui";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { SITE_URL, PERSON } from "@/constants/seo";
import { fillTemplate } from "@/libs/page-metadata";
import { cn } from "@/libs/cn";

interface ProjectDetailsContentProps {
  project: Project;
}

function formatYear(date: string) {
  const year = new Date(date).getFullYear();
  return Number.isFinite(year) ? String(year) : null;
}

export function ProjectDetailsContent({
  project,
}: Readonly<ProjectDetailsContentProps>) {
  const { translations, location } = useTranslation();
  const copy = translations.projects;
  const projectTranslate = copy.projects.find(
    (translate) => translate.id === project.id,
  );
  const year = formatYear(project.date);
  const categoryLabel =
    copy.filters[project.category as keyof typeof copy.filters] ??
    project.category;

  const breadcrumb = [
    {
      label: copy.breadcrumb_begin,
      link: withLocalePath(location, "/projects"),
    },
    { label: projectTranslate?.title ?? copy.breadcrumb_end },
  ];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: projectTranslate?.title ?? project.navigation,
    description: projectTranslate?.description ?? "",
    url: SITE_URL + withLocalePath(location, `/projects/${project.navigation}`),
    programmingLanguage: project.technologies,
    codeRepository: project.github || undefined,
  };

  const detailPanels = [
    {
      key: "features",
      title: projectTranslate?.featuresTitle,
      items: projectTranslate?.features ?? [],
      icon: LuBadgeCheck,
    },
    {
      key: "challenges",
      title: projectTranslate?.challengesTitle,
      items: projectTranslate?.challenges ?? [],
      icon: LuServerCrash,
    },
    {
      key: "achievements",
      title: projectTranslate?.achievementsTitle,
      items: projectTranslate?.achievements ?? [],
      icon: LuTrophy,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pb-8 pt-20 lg:pt-32">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
          />

          <Breadcrumb path={breadcrumb} />

          <div className="animate-fade-in mt-4 text-center lg:mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-black/55 dark:text-white/55">
              <span className="rounded-md bg-black/5 px-2.5 py-1 dark:bg-white/5">
                {categoryLabel}
              </span>
              {year && <span>{year}</span>}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1",
                  project.active
                    ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                    : "bg-red-500/15 text-red-800 dark:text-red-300",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    project.active ? "bg-emerald-500" : "bg-red-500",
                  )}
                  aria-hidden
                />
                {project.active ? copy.status_online : copy.status_offline}
              </span>
            </div>

            <h1 className="mb-4 bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 p-3 text-3xl font-bold text-transparent bg-clip-text md:text-4xl dark:from-primary-800 dark:via-primary-600 dark:to-primary-400">
              {projectTranslate?.title}
            </h1>

            <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-black/70 dark:text-white/70 md:text-lg">
              {projectTranslate?.description}
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-primary-400 to-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-[transform,background-color] duration-150 hover:from-primary-500 hover:to-primary-700 active:scale-[0.97]"
                >
                  <LuExternalLink className="h-4 w-4" aria-hidden />
                  {copy.visit_site}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  <LuGithub className="h-4 w-4" aria-hidden />
                  GitHub
                </a>
              )}
            </div>
          </div>

          <ZoomImage
            className="mx-auto my-6 aspect-video w-full rounded-2xl object-cover md:w-[70%]"
            src={project.image}
            alt={fillTemplate(translations.ui.project_image_alt, {
              title: projectTranslate?.title ?? project.navigation,
              name: PERSON.name,
              tech: project.technologies.slice(0, 3).join(", "),
            })}
            width={1200}
            height={0}
            priority
          />

          <div className="mb-8 lg:mb-10">
            <h2 className="mb-3 text-xl font-bold">
              {projectTranslate?.longDescriptionTitle}
            </h2>
            <div className="space-y-3">
              {projectTranslate?.longDescription.map((content) => (
                <p key={content} className="text-lg leading-relaxed">
                  {content}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-10 lg:mb-12">
            <h2 className="mb-3 text-xl font-bold">
              {projectTranslate?.stackTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-primary-800/40 bg-primary-300/40 px-3 py-1 text-sm font-medium backdrop-blur-sm dark:border-primary-300/40 dark:bg-primary-800/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {detailPanels.map(({ key, title, items, icon: Icon }) => (
              <div
                key={key}
                className="flex flex-col rounded-2xl border border-black/10 bg-black/2 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/2"
              >
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((content) => (
                    <li key={content} className="flex gap-2 text-base leading-relaxed">
                      <span className="text-primary-600 dark:text-primary-400" aria-hidden>
                        •
                      </span>
                      <span>{content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href={withLocalePath(location, "/projects")}
              className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-primary-400 to-primary-600 px-4 py-2 font-semibold text-white shadow-lg shadow-primary-600/25 transition-[transform,background-color] duration-150 hover:from-primary-500 hover:to-primary-700 active:scale-[0.97]"
            >
              <LuReply className="h-5 w-5" aria-hidden />
              {copy.return}
            </Link>
          </div>
        </div>
      </main>

      <LazyFooter />
    </div>
  );
}
