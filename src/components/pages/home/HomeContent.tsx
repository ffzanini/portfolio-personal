import Link from "next/link";
import Image from "next/image";
import {
  LuMapPin,
  LuCoffee,
  LuCalendar,
  LuCodeXml,
  LuArrowRight,
} from "react-icons/lu";
import { LiaHandSpock } from "react-icons/lia";

import { Tooltip } from "@/components/ui";
import { FlipWords } from "@/components/ui/FlipWords";
import { SanitizedText } from "@/components/utils";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { mainTechStack } from "@/constants/stack";
import { withLocalePath, type Locale } from "@/libs/i18n";
import type { Translations } from "@/locales";
import { HomeScrollLock } from "@/components/pages/home/HomeScrollLock";

interface HomeContentProps {
  translations: Translations;
  locale: Locale;
}

export function HomeContent({
  translations,
  locale,
}: Readonly<HomeContentProps>) {
  return (
    <HomeScrollLock>
      <div className="flex min-h-screen flex-col bg-linear-to-br from-primary-200 via-white-theme to-white-theme lg:h-dvh lg:max-h-dvh lg:overflow-hidden dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
        <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-20 pb-8 lg:min-h-0 lg:overflow-x-clip lg:pt-20 lg:pb-4 xl:px-3">
          <div className="grid w-full grid-cols-1 items-center gap-6 lg:max-h-full lg:grid-cols-2 lg:gap-8">
            <div className="order-2 space-y-4 sm:space-y-6 lg:order-1 xl:space-y-8">
              <div className="space-y-2 sm:space-y-4">
                <div className="space-y-2">
                  <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                    {translations.home.welcome}
                  </p>
                  <h1 className="text-4xl leading-tight font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-800 dark:via-primary-600 dark:to-primary-400">
                      {translations.home.name}
                    </span>
                  </h1>
                </div>
                <div className="min-h-7.5 lg:min-h-[2.344rem] xl:min-h-[2.813rem]">
                  <FlipWords
                    words={translations.home.roles}
                    className="text-2xl leading-tight font-medium lg:text-3xl xl:text-4xl"
                  />
                </div>
                <SanitizedText
                  json={translations.home.description}
                  className="text-base leading-relaxed text-gray-600 dark:text-gray-300"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <LuMapPin className="h-4 w-4 text-primary-600" />
                  <span className="text-sm">{translations.home.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCalendar className="h-4 w-4 text-primary-600" />
                  <span className="text-sm">{translations.home.experience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCoffee className="h-4 w-4 text-primary-600" />
                  <span className="text-sm">{translations.home.projects}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                <Link
                  href={withLocalePath(locale, "/about")}
                  className="group flex flex-row items-center justify-center rounded-xl bg-linear-to-r from-primary-400 to-primary-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-transform duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-xl sm:px-8 sm:py-3"
                >
                  {translations.home.textButtonAbout}
                  <LuArrowRight className="ml-3 hidden h-5 w-5 transition-transform group-hover:translate-x-1 lg:flex" />
                </Link>

                <Link
                  href="https://resume.ffzanini.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-row items-center justify-center rounded-xl border-2 border-gray-300 px-6 py-2.5 font-semibold text-gray-700 backdrop-blur-sm hover:bg-gray-100 sm:px-8 sm:py-3 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50"
                >
                  <LiaHandSpock className="mr-3 hidden h-6 w-6 transition-transform duration-500 group-hover:rotate-360 lg:flex" />
                  {translations.home.textButtonResume}
                </Link>
              </div>
            </div>

            <div className="order-1 mt-8 flex justify-center lg:order-2 lg:mt-0 lg:justify-end">
              <div className="relative p-8 sm:p-10">
                <div
                  className="absolute top-0 left-0 z-20 animate-float-up rounded-2xl border border-gray-200/50 bg-white/95 p-3 shadow-xl backdrop-blur-sm sm:p-4 dark:border-gray-700/50 dark:bg-black/70"
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <LuCodeXml className="h-4 w-4 text-primary-600 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                      FullStack Developer
                    </span>
                  </div>
                </div>
                <div
                  className="absolute right-0 bottom-0 z-20 animate-float-down rounded-2xl border border-gray-200/50 bg-white/95 p-3 shadow-xl backdrop-blur-sm sm:p-4 dark:border-gray-700/50 dark:bg-black/70"
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <LuCodeXml className="h-4 w-4 text-primary-600 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
                      React & PHP Expert
                    </span>
                  </div>
                </div>
                <div className="relative z-0 rounded-3xl border border-gray-200/50 bg-white/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-8 dark:border-gray-700/50 dark:bg-black/50">
                  <div className="relative mx-auto mb-4 h-32 w-32 sm:mb-6 sm:h-40 sm:w-40 lg:h-50 lg:w-50">
                    <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary-400 via-primary-600 to-primary-800 opacity-80" />
                    <div className="relative h-full w-full rounded-2xl bg-linear-to-br from-primary-200 via-primary-600 to-primary-950 p-1.5 shadow-2xl sm:p-2">
                      <div className="flex h-full w-full items-center justify-center">
                        <Image
                          src="/images/me-desenho.jpeg"
                          alt="Felipe Frantz Zanini (ffzanini) - Senior Software Engineer & Frontend Architect especializado em React, Next.js e TypeScript. Desenvolvedor frontend e fullstack em Pelotas, Brasil."
                          width={180}
                          height={180}
                          className="rounded-xl"
                          style={{ width: "100%", height: "auto" }}
                          sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 200px"
                          priority
                          quality={85}
                        />
                      </div>
                    </div>
                    <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-3 border-white bg-green-500 sm:-right-2 sm:-bottom-2 sm:h-8 sm:w-8 sm:border-4 dark:border-gray-900">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-white sm:h-3 sm:w-3" />
                    </div>
                  </div>
                  <div className="space-y-3 text-center sm:space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {translations.home.stack}
                    </h2>
                    <div className="flex justify-center gap-2 xl:gap-3">
                      {mainTechStack.map((tech, index) => (
                        <Tooltip
                          key={tech.name}
                          text={tech.name}
                          position="top"
                        >
                          <div
                            className="group relative"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div
                              className={`relative flex h-12 w-12 items-center justify-center rounded-xl border shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ${tech.bgColor} ${tech.borderColor}`}
                            >
                              <tech.icon
                                className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${tech.iconColor}`}
                                aria-label={tech.name}
                              />
                            </div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                    <Link
                      href={withLocalePath(locale, "/stack")}
                      className="font-semibold text-gray-600 underline underline-offset-4 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    >
                      {translations.home.textButtonStack}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="relative z-0 shrink-0">
          <LazyFooter />
        </div>
      </div>
    </HomeScrollLock>
  );
}
