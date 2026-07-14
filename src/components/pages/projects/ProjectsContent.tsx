"use client";

import { useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { LuFilter } from "react-icons/lu";
import Link from "next/link";

import { SanitizedText } from "@/components/utils";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { useTranslation } from "@/context";
import { projects } from "@/app/data/projects";
import { withLocalePath } from "@/libs/i18n";
import { cn } from "@/libs/cn";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);

const Card = dynamic(
  () => import("@/components/ui/Card").then((mod) => mod.Card),
  { ssr: true },
);

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;

type FilterId = "all" | "fullstack" | "frontend" | "backend";

export function ProjectsContent() {
  const { translations, location } = useTranslation();
  const copy = translations.projects;
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [isPending, startTransition] = useTransition();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const project of projects) {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filters = useMemo(() => {
    const ids: FilterId[] = ["all", "fullstack", "frontend", "backend"];
    return ids
      .filter((id) => id === "all" || (categoryCounts[id] ?? 0) > 0)
      .map((id) => ({
        id,
        label: copy.filters[id],
        count: id === "all" ? projects.length : (categoryCounts[id] ?? 0),
      }));
  }, [categoryCounts, copy.filters]);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 2),
    [],
  );

  const featuredIds = useMemo(
    () => new Set(featuredProjects.map((project) => project.id)),
    [featuredProjects],
  );

  const filteredProjects = useMemo(() => {
    const byCategory =
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter);

    // Avoid duplicating featured cards in the main grid when viewing "all"
    if (activeFilter === "all") {
      return byCategory.filter((project) => !featuredIds.has(project.id));
    }

    return byCategory;
  }, [activeFilter, featuredIds]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    startTransition(() => {
      setVisibleCount((prev) => prev + LOAD_STEP);
    });
  };

  const handleFilterChange = (filterId: FilterId) => {
    startTransition(() => {
      setActiveFilter(filterId);
      setVisibleCount(INITIAL_VISIBLE);
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pb-8 pt-20 lg:pt-32">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="animate-fade-in text-center">
            <h1 className="mb-6 bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 p-3 text-5xl font-bold text-transparent bg-clip-text md:text-6xl dark:from-primary-800 dark:via-primary-600 dark:to-primary-400">
              {copy.title}
            </h1>
            <SanitizedText
              json={copy.sub_title}
              className="mx-auto max-w-5xl text-xl leading-relaxed"
            />
          </div>

          {featuredProjects.length > 0 && (
            <section className="mt-10 lg:mt-14">
              <h2 className="mb-8 flex items-center text-3xl font-bold">
                <span className="mr-4 h-8 w-2 rounded bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500" />
                {copy.projects_title}
              </h2>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {featuredProjects.map((project, index) => (
                  <Card
                    key={project.id}
                    project={project}
                    index={index}
                    featured
                  />
                ))}
              </div>
            </section>
          )}

          <section className="mt-12 lg:mt-16">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="flex items-center text-3xl font-bold">
                <span className="mr-4 h-8 w-2 rounded bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500" />
                {copy.projects_all}
              </h2>

              <fieldset className="flex flex-wrap items-center gap-2 border-0 p-0">
                <legend className="sr-only">{copy.projects_all}</legend>
                <LuFilter className="h-5 w-5 shrink-0 opacity-70" aria-hidden />
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    className={cn(
                      "cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold transition-colors duration-150",
                      isPending && "opacity-50",
                      activeFilter === filter.id
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
                    )}
                    onClick={() => handleFilterChange(filter.id)}
                    disabled={isPending}
                    aria-pressed={activeFilter === filter.id}
                  >
                    {filter.label}
                    <span className="ml-1.5 opacity-70">({filter.count})</span>
                  </button>
                ))}
              </fieldset>
            </div>

            {filteredProjects.length > 0 ? (
              <>
                <MotionDiv
                  key={activeFilter}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleProjects.map((project, index) => (
                    <Card
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </MotionDiv>

                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="cursor-pointer rounded-xl bg-linear-to-r from-primary-400 to-primary-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-[transform,box-shadow,background-color] duration-200 hover:from-primary-500 hover:to-primary-700 hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-3"
                    >
                      {copy.load}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-black/50 dark:text-white/50">
                  {copy.empty_filter}
                </p>
              </div>
            )}
          </section>

          <div className="mt-14 flex flex-col items-start gap-3 lg:mt-20">
            <h2 className="bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-primary-800 dark:via-primary-600 dark:to-primary-400">
              {copy.contact.title}
            </h2>

            <p className="inline-block">
              <SanitizedText
                json={copy.contact.description}
                typeText="span"
                className="text-lg"
              />
              <Link
                href={withLocalePath(location, "/contact")}
                className="text-lg font-bold hover:text-primary-800 dark:hover:text-primary-300"
              >
                {copy.contact.contact}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <LazyFooter />
    </div>
  );
}
