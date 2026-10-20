"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import { type Project } from "@/app/data/projects";
import { PERSON } from "@/constants/seo";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import { fillTemplate } from "@/libs/fill-template";
import { withLocalePath } from "@/libs/i18n";

const DURATION_MS = 5_000;

type FeaturedProjectsSliderProps = {
  projects: readonly Project[];
};

function formatYear(date: string) {
  const year = new Date(date).getFullYear();
  return Number.isFinite(year) ? String(year) : null;
}

function FeaturedSlide({
  project,
  active,
}: Readonly<{
  project: Project;
  active: boolean;
}>) {
  const { translations, location } = useTranslation();
  const copy = translations.projects;
  const projectTranslate = copy.projects.find((item) => item.id === project.id);
  const title = projectTranslate?.title ?? project.navigation;
  const year = formatYear(project.date);
  const categoryLabel =
    copy.filters[project.category as keyof typeof copy.filters] ??
    project.category;
  const detailsHref = withLocalePath(
    location,
    `/projects/${project.navigation}`,
  );
  const points = [
    { label: copy.timeline.challenge, text: projectTranslate?.summaryChallenge },
    { label: copy.timeline.solution, text: projectTranslate?.summarySolution },
    { label: copy.timeline.result, text: projectTranslate?.summaryResult },
  ];

  return (
    <div
      id={`featured-panel-${project.id}`}
      role={active ? "tabpanel" : undefined}
      aria-labelledby={active ? `featured-tab-${project.id}` : undefined}
      aria-hidden={active ? undefined : true}
      inert={active ? undefined : true}
      className={cn(
        "col-start-1 row-start-1 h-full transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="grid h-full items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="relative aspect-[2/1] h-full w-full overflow-hidden">
          <Image
            className="object-cover object-top"
            src={project.image}
            alt={fillTemplate(translations.ui.project_image_alt, {
              title,
              name: PERSON.name,
              tech: project.technologies.slice(0, 3).join(", "),
            })}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={active}
          />
        </div>

        <div className="flex h-full flex-col justify-center bg-black/[0.04] p-5 dark:bg-black/40 sm:p-6 lg:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-black/55 dark:text-white/55">
            <span className="rounded-md bg-black/5 px-2.5 py-1 dark:bg-white/5">
              {categoryLabel}
            </span>
            {year && (
              <span className="rounded-md bg-black/5 px-2.5 py-1 dark:bg-white/5">
                {year}
              </span>
            )}
          </div>

          <h3 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h3>

          <ol className="mt-5 space-y-4">
            {points.map((point, pointIndex) => (
              <li key={point.label} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {pointIndex + 1}
                </span>
                <p className="min-w-0">
                  <span className="font-semibold">{point.label}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {point.text}
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <Link
            href={detailsHref}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-linear-to-r from-primary-400 to-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-[transform,background-color] duration-150 hover:from-primary-500 hover:to-primary-700 active:scale-[0.97]"
          >
            {copy.view_project}
            <LuArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeaturedTimer({
  paused,
  cycleKey,
  onComplete,
}: Readonly<{
  paused: boolean;
  cycleKey: number;
  onComplete: () => void;
}>) {
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [cycleKey]);

  useEffect(() => {
    if (paused) return;

    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (last === 0) last = now;
      elapsedRef.current += now - last;
      last = now;

      if (elapsedRef.current >= DURATION_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        onCompleteRef.current();
        return;
      }

      setProgress(elapsedRef.current / DURATION_MS);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, cycleKey]);

  return (
    <div
      className="h-0.5 w-full bg-black/10 dark:bg-white/10"
      aria-hidden
    >
      <div
        className="h-full bg-primary-500"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

export function FeaturedProjectsSlider({
  projects,
}: Readonly<FeaturedProjectsSliderProps>) {
  const { translations } = useTranslation();
  const copy = translations.projects;
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const paused = hovered || focused;

  useEffect(() => {
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      const fine = hoverMedia.matches;
      setReducedMotion(reducedMedia.matches);
      setFinePointer(fine);
      if (fine && rootRef.current?.matches(":hover")) setHovered(true);
      if (!fine) setHovered(false);
    };
    sync();
    setMotionReady(true);
    reducedMedia.addEventListener("change", sync);
    hoverMedia.addEventListener("change", sync);
    return () => {
      reducedMedia.removeEventListener("change", sync);
      hoverMedia.removeEventListener("change", sync);
    };
  }, []);

  if (count === 0) return null;

  const activeIndex = ((index % count) + count) % count;
  const showTimer = motionReady && !reducedMotion;

  const goTo = (next: number) => {
    setCycle((value) => value + 1);
    setIndex(next);
  };

  const advance = () => {
    setCycle((value) => value + 1);
    setIndex((current) => (current + 1) % count);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const target = event.target;
    const inside =
      target instanceof HTMLElement &&
      event.currentTarget.contains(target) &&
      target.matches(":focus-visible");
    setFocused(inside);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    const inside =
      next instanceof HTMLElement &&
      event.currentTarget.contains(next) &&
      next.matches(":focus-visible");
    setFocused(inside);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (!finePointer || event.pointerType !== "mouse") return;
    setHovered(true);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number,
  ) => {
    let next = tabIndex;
    if (event.key === "ArrowRight") next = (tabIndex + 1) % count;
    else if (event.key === "ArrowLeft") next = (tabIndex - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;

    event.preventDefault();
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={copy.projects_title}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <div
        role="tablist"
        aria-label={copy.projects_title}
        className="flex flex-wrap gap-2"
      >
        {projects.map((item, tabIndex) => {
          const itemTitle =
            copy.projects.find((translate) => translate.id === item.id)?.title ??
            item.navigation;
          const selected = tabIndex === activeIndex;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[tabIndex] = node;
              }}
              type="button"
              role="tab"
              id={`featured-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`featured-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold transition-colors duration-150",
                selected
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
              )}
              onClick={() => goTo(tabIndex)}
              onKeyDown={(event) => handleTabKeyDown(event, tabIndex)}
            >
              {itemTitle}
            </button>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white-theme/70 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="grid">
          {projects.map((item, slideIndex) => (
            <FeaturedSlide
              key={item.id}
              project={item}
              active={slideIndex === activeIndex}
            />
          ))}
        </div>

        {showTimer && (
          <FeaturedTimer
            paused={paused}
            cycleKey={cycle}
            onComplete={advance}
          />
        )}
      </div>
    </div>
  );
}
