"use client";
import Link from "next/link";

import {
  LuCarFront,
  LuBrain,
  LuCoffee,
  LuArrowRight,
  LuChevronDown,
  LuSend,
} from "react-icons/lu";

import { AboutPhotoSlider } from "@/components/pages/about/AboutPhotoSlider";
import { Timeline } from "@/components/ui/Timeline";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { SanitizedText } from "@/components/utils/SanitizedText";
import { photos } from "@/constants/about";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { useEffect, useState, type ReactNode } from "react";

type ChapterPart = {
  text: string;
  href?: string;
};

function MoreBelowHint({ label }: Readonly<{ label: string }>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-mount-when='scroll']");
    if (!section) return;

    const update = () => {
      setShow(section.style.opacity === "0");
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(section, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
    };
  }, []);

  const goNext = () => {
    const section = document.querySelector<HTMLElement>("[data-mount-when='scroll']");
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={goNext}
      className="mx-auto flex w-fit items-center justify-center px-4 pt-2 pb-12 text-primary-600 dark:text-primary-300"
    >
      <LuChevronDown aria-hidden className="h-7 w-7 animate-bounce motion-reduce:animate-none" />
    </button>
  );
}

function chapterParts(body: unknown): ChapterPart[] {
  if (typeof body === "string") return [{ text: body }];
  if (!Array.isArray(body)) return [];

  const parts: ChapterPart[] = [];
  for (const part of body) {
    if (typeof part === "string") {
      parts.push({ text: part });
      continue;
    }
    if (!part || typeof part !== "object" || !("text" in part)) continue;
    if (typeof part.text !== "string") continue;
    const href = "href" in part && typeof part.href === "string" ? part.href : undefined;
    parts.push(href ? { text: part.text, href } : { text: part.text });
  }
  return parts;
}

export function AboutContent({ footer }: Readonly<{ footer: ReactNode }>) {
  const { translations, location } = useTranslation();

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center" data-mount>
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.about.title}
            </h1>
            <p className="text-xl max-w-5xl mx-auto leading-relaxed">
              {translations.about.sub_title}
            </p>
          </div>
          <div className="my-8 flex flex-col cv-auto">
            <div
              className="rounded-2xl border border-black/10 bg-black/5 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              data-mount
            >
              <div className="mb-6 flex flex-row items-start">
                <div className="mr-4 flex h-12 w-12 min-w-12 items-center justify-center rounded-md bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900">
                  <LuCarFront className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.about.description.title}
                  </h2>
                  <span className="text-xs">*carry on my wayward son...</span>
                </div>
              </div>
              <div className="mb-8 mt-6 grid grid-cols-1 md:grid-cols-2">
                {translations.about.description.chapters.map((chapter, index) => {
                  const isRight = index % 2 === 1;
                  const isBottom = index >= 2;

                  return (
                    <article
                      key={chapter.label}
                      data-mount
                      className={[
                        "py-6",
                        isRight ? "md:pl-10" : "md:pr-10",
                        index > 0
                          ? "border-t border-black/10 pt-8 dark:border-white/10"
                          : "",
                        isBottom ? "md:pt-8" : "md:border-t-0 md:pt-2 md:pb-8",
                        isRight ? "md:border-l" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-3xl font-bold leading-none tabular-nums text-primary-600 dark:text-primary-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                          {chapter.label}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold sm:text-2xl">
                        {chapter.title}
                      </h2>
                      <div
                        className={
                          index === 0
                            ? "text-base leading-relaxed text-gray-700 dark:text-gray-300 [&_a]:font-bold [&_a]:text-gray-950 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-white [&_b]:font-bold [&_b]:text-gray-950 dark:[&_b]:text-white [&_b:first-of-type]:text-lg"
                            : "text-base leading-relaxed text-gray-700 dark:text-gray-300 [&_a]:font-bold [&_a]:text-gray-950 [&_a]:underline [&_a]:underline-offset-2 dark:[&_a]:text-white [&_b]:font-bold [&_b]:text-gray-950 dark:[&_b]:text-white"
                        }
                      >
                        {chapterParts(chapter.body).map((part, partIndex) =>
                          "href" in part && part.href ? (
                            <Link
                              key={`${chapter.label}-${part.href}`}
                              href={withLocalePath(location, part.href)}
                              className="hover:text-(--primary)"
                            >
                              {part.text}
                            </Link>
                          ) : (
                            <SanitizedText
                              key={`${chapter.label}-${partIndex}`}
                              json={part.text}
                              typeText="span"
                            />
                          ),
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div data-mount>
                <div className="hidden grid-cols-5 gap-4 pb-6 lg:grid">
                  {photos.map((photo) => (
                    <ZoomImage
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      className={photo.className}
                    />
                  ))}
                </div>
                <div className="pb-2 lg:hidden">
                  <AboutPhotoSlider photos={photos} />
                </div>
              </div>
            </div>
          </div>
          <MoreBelowHint label={translations.about.scroll_hint} />
          <div className="mb-8 flex flex-col" data-mount-when="scroll">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="mb-6 flex flex-row items-start" data-mount>
                <div className="mr-4 flex h-12 w-12 min-w-12 items-center justify-center rounded-md bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900">
                  <LuBrain className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.about.skills.title}
                  </h2>
                  <span className="text-xs">
                    {translations.about.skills.subtitle}
                  </span>
                </div>
              </div>

              <Timeline items={translations.about.skills.process} />
              <div data-mount>
                <div className="flex flex-col items-start pb-2">
                  <h2 className="text-3xl font-bold">
                    {translations.about.stack.title}
                  </h2>
                </div>
                <div className="space-y-4 pb-2 text-lg leading-relaxed">
                  {translations.about.stack.description}
                </div>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                  <Link
                    href={withLocalePath(location, "/stack")}
                    className="flex flex-row justify-center items-center border border-primary-600 bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-4 py-2 rounded-lg transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                  >
                    {translations.about.stack.button}
                    <LuArrowRight className="hidden md:flex ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={withLocalePath(location, "/contact")}
                    className="flex flex-row justify-center items-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 font-semibold px-4 py-2 rounded-lg backdrop-blur-sm group"
                  >
                    {translations.about.stack.contact}
                    <LuSend className="hidden md:flex ml-3 h-5 w-5 group-hover:rotate-360 duration-500 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col" data-mount>
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-md flex items-center justify-center mr-4">
                  <LuCoffee className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.about.site.title}
                  </h2>
                  <span className="text-xs">
                    {translations.about.site.subtitle}
                  </span>
                </div>
              </div>
              <p className="inline-block">
                <SanitizedText
                  json={translations.about.site.description}
                  typeText="span"
                  className="text-base"
                />
                <Link
                  href={withLocalePath(location, "/projects")}
                  className="font-bold hover:text-primary-800 dark:hover:text-primary-300"
                >
                  {translations.about.site.projects}
                </Link>
                {translations.about.site.description_end}
              </p>
            </div>
          </div>
        </div>
      </main>
      {footer}
    </div>
  );
}
