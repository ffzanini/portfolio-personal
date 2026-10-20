"use client";
import { type CSSProperties, useState } from "react";
import Link from "next/link";
import { LuBriefcaseBusiness, LuFlag, LuHistory, LuStar } from "react-icons/lu";

import { SanitizedText } from "@/components/utils/SanitizedText";
import { categories } from "@/constants/stack";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import type { ReactNode } from "react";

type StackUsage = "daily" | "sometimes" | "once";

export function StackContent({ footer }: Readonly<{ footer: ReactNode }>) {
  const { translations, location } = useTranslation();
  const [locked, setLocked] = useState<StackUsage | null>(null);
  const [hovered, setHovered] = useState<StackUsage | null>(null);
  const highlight = hovered ?? locked;

  const toggleUsage = (usage: StackUsage) => {
    setLocked((current) => (current === usage ? null : usage));
  };

  const hoverUsage = (usage: StackUsage | null, pointerType: string) => {
    if (pointerType !== "mouse") return;
    setHovered(usage);
  };
  const renderText = (name: string) => {
    switch (name) {
      case "frontend":
        return translations.stack.frontend;
      case "backend":
        return translations.stack.backend;
      case "devops":
        return translations.stack.devops;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              data-mount
              className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3"
            >
              {translations.stack.title}
            </h1>
            <p data-mount className="text-xl max-w-5xl mx-auto leading-relaxed">
              {translations.stack.sub_title}
            </p>
          </div>
          <div className="my-8 flex justify-center text-center" data-mount>
            <div className="grid w-full grid-cols-2 items-center gap-x-3 gap-y-3 rounded-xl border border-black/10 bg-black/5 px-4 py-4 sm:flex sm:w-fit sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:px-6 dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                aria-pressed={locked === "daily"}
                className={`flex cursor-pointer items-center justify-center space-x-2 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-green-500/10 ${
                  locked === "daily" ? "bg-green-500/15" : ""
                }`}
                onClick={() => toggleUsage("daily")}
                onPointerEnter={(event) => hoverUsage("daily", event.pointerType)}
                onPointerLeave={(event) => hoverUsage(null, event.pointerType)}
              >
                <LuStar className="h-4 w-4 shrink-0 fill-green-500 text-green-500" aria-hidden="true" />
                <span className="text-md">
                  {translations.stack.mainSpecialties}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={locked === "sometimes"}
                className={`flex cursor-pointer items-center justify-center space-x-2 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-orange-500/10 ${
                  locked === "sometimes" ? "bg-orange-500/15" : ""
                }`}
                onClick={() => toggleUsage("sometimes")}
                onPointerEnter={(event) => hoverUsage("sometimes", event.pointerType)}
                onPointerLeave={(event) => hoverUsage(null, event.pointerType)}
              >
                <LuHistory className="h-4 w-4 shrink-0 text-orange-500" aria-hidden="true" />
                <span className="text-md">{translations.stack.knownTech}</span>
              </button>
              <button
                type="button"
                aria-pressed={locked === "once"}
                className={`col-span-2 flex cursor-pointer items-center justify-center space-x-2 rounded-lg px-2 py-1 transition-colors duration-200 hover:bg-sky-400/10 sm:col-span-1 ${
                  locked === "once" ? "bg-sky-400/15" : ""
                }`}
                onClick={() => toggleUsage("once")}
                onPointerEnter={(event) => hoverUsage("once", event.pointerType)}
                onPointerLeave={(event) => hoverUsage(null, event.pointerType)}
              >
                <LuFlag className="h-4 w-4 shrink-0 text-sky-400" aria-hidden="true" />
                <span className="text-md">{translations.stack.usedOnce}</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-8">
            {categories.map((category, categoryIndex) => (
              <div
                key={category.title}
                data-mount
                className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-md flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl font-bold">{category.title}</h2>
                    <span className="text-xs">
                      {renderText(category.sub_title)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {category.technologies.map((tech, techIndex) => {
                    const isLit = highlight === tech.usage;
                    const isDimmed = highlight !== null && !isLit;

                    return (
                    <div
                      key={tech.name}
                      className={`group/tech relative transition-opacity duration-300 ${
                        isDimmed ? "opacity-35" : "opacity-100"
                      }`}
                      style={{
                        animationDelay: `${
                          categoryIndex * 0.1 + techIndex * 0.05
                        }s`,
                      }}
                    >
                      <div
                        className={`relative rounded-2xl border border-black/10 bg-black/1 p-3 backdrop-blur-sm transition-[transform,border-color] duration-300 group-hover/tech:scale-105 hover:border-(--tech-color) dark:border-white/10 dark:bg-white/1 ${
                          isLit ? "scale-105" : ""
                        }`}
                        style={
                          {
                            willChange: "transform, border-color",
                            "--tech-color": tech.color,
                            borderColor: isLit ? tech.color : undefined,
                          } as CSSProperties
                        }
                      >
                        {tech.usage === "daily" ? (
                          <LuStar
                            className="absolute top-1 right-1 z-10 h-5 w-5 fill-green-500 text-green-500"
                            aria-hidden="true"
                          />
                        ) : tech.usage === "sometimes" ? (
                          <LuHistory
                            className="absolute top-1 right-1 z-10 h-5 w-5 text-orange-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <LuFlag
                            className="absolute top-1 right-1 z-10 h-5 w-5 text-sky-400"
                            aria-hidden="true"
                          />
                        )}
                        <div className="flex flex-col items-center space-y-2">
                          <tech.icon
                            className={`h-10 w-10 transition-transform duration-300 group-hover/tech:scale-110 ${
                              isLit ? "scale-110" : ""
                            }`}
                            style={{
                              color: tech.color,
                              willChange: "transform",
                            }}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-medium text-center leading-tight">
                            {tech.name}
                          </span>
                        </div>

                        <div
                          className={`absolute inset-0 rounded-xl bg-linear-to-br from-white/5 to-transparent transition-opacity duration-300 ${
                            isLit
                              ? "opacity-100"
                              : "opacity-0 group-hover/tech:opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div
            data-mount
            className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8 my-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-md flex items-center justify-center mr-4">
                <LuBriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-3xl font-bold">
                  {translations.stack.strengths.title}
                </h2>
                <span className="text-xs">
                  {translations.stack.strengths.sub_title}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {translations.stack.strengths.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/10 bg-black/1 p-4 backdrop-blur-sm transition-[box-shadow,border-color] duration-200 hover:border-primary-600/30 hover:shadow-xl hover:shadow-primary-600/25 dark:border-white/10 dark:bg-white/1 dark:hover:border-primary-400/30 dark:hover:shadow-primary-600/30"
                >
                  <div className="flex flex-row items-center gap-2 pb-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col" data-mount>
            <div className="flex flex-col items-start gap-3">
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                {translations.stack.footer.title}
              </h2>

              <p className="inline-block">
                <SanitizedText
                  json={translations.stack.footer.message}
                  typeText="span"
                  className="text-lg"
                />
                <Link
                  href={withLocalePath(location, "/projects")}
                  className="font-bold text-lg hover:text-primary-800 dark:hover:text-primary-300"
                >
                  {translations.stack.footer.project}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      {footer}
    </div>
  );
}
