"use client";

import { memo } from "react";
import Link from "next/link";
import { LuExternalLink, LuGithub, LuArrowRight } from "react-icons/lu";

import { Project } from "@/app/data/projects";
import { cn } from "@/libs/cn";
import { useTranslation } from "@/context";
import { ZoomImage } from "@/components/ui";
import { withLocalePath } from "@/libs/i18n";

interface CardProps {
  project: Project;
  index: number;
  /** Featured layout: larger emphasis, badge, all tech tags */
  featured?: boolean;
}

function formatYear(date: string) {
  const year = new Date(date).getFullYear();
  return Number.isFinite(year) ? String(year) : null;
}

function CardComponent({
  project,
  index,
  featured = false,
}: Readonly<CardProps>) {
  const { translations, location } = useTranslation();
  const copy = translations.projects;
  const projectTranslate = copy.projects.find(
    (translate) => translate.id === project.id,
  );
  const detailsHref = withLocalePath(
    location,
    `/projects/${project.navigation}`,
  );
  const year = formatYear(project.date);
  const categoryLabel =
    copy.filters[project.category as keyof typeof copy.filters] ??
    project.category;
  const techPreview = featured
    ? project.technologies
    : project.technologies.slice(0, 4);
  const remainingTech = featured
    ? 0
    : Math.max(0, project.technologies.length - techPreview.length);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white-theme/80 dark:bg-dark-theme/80 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-600/10"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link
        href={detailsHref}
        className="flex flex-1 flex-col rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        <div className="aspect-video overflow-hidden border-b border-black/10 dark:border-white/10">
          <ZoomImage
            className="aspect-video w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            width={1200}
            height={675}
            src={project.image}
            alt={String(projectTranslate?.title)}
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 pb-3 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-black/55 dark:text-white/55">
            <span className="rounded-md bg-black/5 px-2 py-0.5 capitalize dark:bg-white/5">
              {categoryLabel}
            </span>
            {year && <span>{year}</span>}
            {featured && (
              <span className="rounded-md bg-primary-600/15 px-2 py-0.5 text-primary-800 dark:text-primary-300">
                {copy.featured_badge}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold leading-snug line-clamp-2 sm:text-2xl">
            {projectTranslate?.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
            {projectTranslate?.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {techPreview.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/10 bg-black/5 px-2 py-0.5 text-xs font-medium dark:border-white/10 dark:bg-white/5"
              >
                {tag}
              </span>
            ))}
            {remainingTech > 0 && (
              <span className="px-1.5 py-0.5 text-xs text-black/45 dark:text-white/45">
                +{remainingTech}
              </span>
            )}
          </div>

          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-300">
            {copy.view_details}
            <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {(project.demo || project.github) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-black/10 px-4 py-3 dark:border-white/10">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={copy.demo}
              className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-primary-400 to-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md shadow-primary-600/20 transition-[transform,background-color] duration-150 hover:from-primary-500 hover:to-primary-700 active:scale-[0.97]"
            >
              <LuExternalLink className="h-4 w-4" aria-hidden />
              <span>{copy.demo}</span>
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold",
                "border border-black/15 transition-colors duration-150 hover:bg-black/5",
                "dark:border-white/15 dark:hover:bg-white/10",
              )}
            >
              <LuGithub className="h-4 w-4" aria-hidden />
              <span>GitHub</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export const Card = memo(CardComponent);
