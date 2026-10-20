"use client";

import Link from "next/link";
import {
  LuArrowLeft,
  LuArrowRight,
  LuExternalLink,
  LuGithub,
  LuLock,
} from "react-icons/lu";

import { Project, projects } from "@/app/data/projects";
import {
  ProjectProcessTimeline,
  readTimelineImages,
} from "@/components/pages/projects/ProjectProcessTimeline";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { SITE_URL, PERSON } from "@/constants/seo";
import { fillTemplate } from "@/libs/fill-template";
import { cn } from "@/libs/cn";
import type { ReactNode } from "react";

interface ProjectDetailsContentProps {
  project: Project;
  footer: ReactNode;
}

function formatYear(date: string) {
  const year = new Date(date).getFullYear();
  return Number.isFinite(year) ? String(year) : null;
}

function neighborProjects(currentId: number) {
  const ordered = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const index = ordered.findIndex((item) => item.id === currentId);
  if (index < 0 || ordered.length < 2) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: ordered.at(index - 1),
    next: ordered.at((index + 1) % ordered.length),
  };
}

function ProjectNavLink({
  href,
  label,
  title,
  direction,
  className,
}: Readonly<{
  href: string;
  label: string;
  title: string;
  direction: "previous" | "next";
  className?: string;
}>) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-2xl border border-black/10 bg-black/2 p-4 transition-colors duration-150 hover:border-primary-600/40 hover:bg-primary-600/5 dark:border-white/10 dark:bg-white/2 dark:hover:border-primary-400/40",
        className,
      )}
    >
      <span className="text-sm font-medium text-black/55 dark:text-white/55">
        {label}
      </span>
      <span className="mt-1 flex items-center gap-3 text-lg font-bold">
        {isPrevious && (
          <LuArrowLeft
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
        )}
        <span className="min-w-0 flex-1 break-words">{title}</span>
        {!isPrevious && (
          <LuArrowRight
            className="ml-auto h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        )}
      </span>
    </Link>
  );
}

export function ProjectDetailsContent({
  project,
  footer,
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

  const { previous: previousProject, next: nextProject } = neighborProjects(
    project.id,
  );
  const imageAlt = fillTemplate(translations.ui.project_image_alt, {
    title: projectTranslate?.title ?? project.navigation,
    name: PERSON.name,
    tech: project.technologies.slice(0, 3).join(", "),
  });

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
              {!project.demo && !project.github && (
                <span className="inline-flex items-center gap-2 rounded-md border border-black/15 px-4 py-2 text-sm font-semibold text-black/70 dark:border-white/15 dark:text-white/70">
                  <LuLock className="h-4 w-4" aria-hidden />
                  {copy.internal_use}
                </span>
              )}
            </div>
          </div>

          <figure className="mx-auto my-8 w-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-200 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-[#2a2a2e] dark:shadow-black/40">
            <div className="flex items-center gap-2 px-4 py-3" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <ZoomImage
              className="h-auto w-full object-cover"
              src={project.image}
              alt={imageAlt}
              width={2556}
              height={1270}
              sizes="(min-width: 80rem) 80rem, 100vw"
              quality={100}
              priority
            />
          </figure>

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

          <ProjectProcessTimeline
            labels={copy.timeline}
            context={projectTranslate?.longDescription ?? []}
            challenge={projectTranslate?.summaryChallenge ?? ""}
            solution={projectTranslate?.summarySolution ?? ""}
            featuresTitle={projectTranslate?.featuresTitle ?? ""}
            features={projectTranslate?.features ?? []}
            challengesTitle={projectTranslate?.challengesTitle ?? ""}
            challenges={projectTranslate?.challenges ?? []}
            results={projectTranslate?.achievements ?? []}
            images={readTimelineImages(projectTranslate)}
            imageAlt={imageAlt}
          />

          <nav
            aria-label={`${copy.previous_project} / ${copy.next_project}`}
            className="mt-10 grid gap-4 md:grid-cols-2"
          >
            {previousProject && (
              <ProjectNavLink
                href={withLocalePath(
                  location,
                  `/projects/${previousProject.navigation}`,
                )}
                label={copy.previous_project}
                title={
                  copy.projects.find((item) => item.id === previousProject.id)
                    ?.title ?? previousProject.navigation
                }
                direction="previous"
                className="md:col-start-1"
              />
            )}
            {nextProject && (
              <ProjectNavLink
                href={withLocalePath(
                  location,
                  `/projects/${nextProject.navigation}`,
                )}
                label={copy.next_project}
                title={
                  copy.projects.find((item) => item.id === nextProject.id)
                    ?.title ?? nextProject.navigation
                }
                direction="next"
                className="md:col-start-2"
              />
            )}
          </nav>
        </div>
      </main>

      {footer}
    </div>
  );
}
