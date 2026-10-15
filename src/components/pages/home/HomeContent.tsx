import Link from "next/link";
import {
  LuCodeXml,
  LuArrowRight,
} from "react-icons/lu";
import { LiaHandSpock } from "react-icons/lia";

import { HomeCharacterCard } from "@/components/pages/home/HomeCharacterCard";
import { FlipWords } from "@/components/ui/FlipWords";
import { SanitizedText } from "@/components/utils/SanitizedText";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { withLocalePath, type Locale } from "@/libs/i18n";
import type { Translations } from "@/locales";

interface HomeContentProps {
  home: Translations["home"];
  locale: Locale;
}

export function HomeContent({ home, locale }: Readonly<HomeContentProps>) {
  return (
    <div
      data-home-scroll-lock
      className="flex min-h-screen flex-col bg-linear-to-br from-primary-200 via-white-theme to-white-theme lg:h-dvh lg:max-h-dvh lg:overflow-hidden dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%"
    >
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-20 pb-8 lg:min-h-0 lg:overflow-x-clip lg:pt-20 lg:pb-4 xl:px-3">
        <div className="grid w-full grid-cols-1 items-center gap-6 lg:max-h-full lg:grid-cols-2 lg:gap-8">
          <div className="order-2 space-y-4 sm:space-y-6 lg:order-1 xl:space-y-8">
            <div className="space-y-2 sm:space-y-4">
              <div className="space-y-2">
                <p
                  data-build="welcome"
                  className="text-xl font-medium text-gray-600 dark:text-gray-400"
                >
                  {home.welcome}
                </p>
                <h1
                  data-build="name"
                  className="text-4xl leading-tight font-bold text-primary-600 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-primary-300"
                >
                  <span className="bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-800 dark:via-primary-600 dark:to-primary-400">
                    {home.name}
                  </span>
                </h1>
              </div>
              <div
                data-build="roles"
                className="min-h-7.5 lg:min-h-[2.344rem] xl:min-h-[2.813rem]"
              >
                <FlipWords
                  words={home.roles}
                  className="text-2xl leading-tight font-medium lg:text-3xl xl:text-4xl"
                />
              </div>
              <div className="space-y-3">
                <div data-build="description">
                  <SanitizedText
                    json={home.description}
                    className="text-base leading-relaxed text-gray-600 dark:text-gray-300"
                  />
                </div>
                <div data-build="leisure">
                  <SanitizedText
                    json={home.descriptionLeisure}
                    className="text-base leading-relaxed text-gray-600 dark:text-gray-300"
                  />
                </div>
              </div>
            </div>
            <div
              data-build="stack"
              className="overflow-hidden rounded-xl border border-black/10 bg-[#1c1c21] shadow-lg dark:border-white/10"
            >
              <div className="flex gap-1.5 px-4 py-3" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="space-y-1 px-4 pb-4 font-mono text-sm">
                <p>
                  <span className="text-gray-500">$ </span>
                  <span className="text-primary-400">felipe</span>
                  <span className="text-gray-300"> --principal-stack</span>
                </p>
                <p className="text-sky-400">react next tailwind javascript typescript php</p>
                <Link
                  href={withLocalePath(locale, "/stack")}
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <span className="text-primary-400" aria-hidden>
                    →
                  </span>
                  ls ./stacks --all
                </Link>
              </div>
            </div>

            <div
              data-build="actions"
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4"
            >
              <Link
                href={withLocalePath(locale, "/about")}
                className="group flex flex-row items-center justify-center rounded-lg bg-linear-to-r from-primary-400 to-primary-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-transform duration-300 hover:from-primary-500 hover:to-primary-700 hover:shadow-xl sm:px-8 sm:py-3"
              >
                {home.textButtonAbout}
                <LuArrowRight className="ml-3 hidden h-5 w-5 transition-transform group-hover:translate-x-1 lg:flex" />
              </Link>

              <Link
                href="https://resume.ffzanini.dev"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-row items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-2.5 font-semibold text-gray-700 backdrop-blur-sm transition-colors duration-300 hover:bg-gray-100 sm:px-8 sm:py-3 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50"
              >
                <LiaHandSpock className="mr-3 hidden h-6 w-6 transition-transform duration-500 group-hover:rotate-360 lg:flex" />
                {home.textButtonResume}
              </Link>
            </div>
          </div>

          <div className="order-1 mt-8 flex w-full justify-center lg:order-2 lg:mt-0 lg:justify-end">
            <div className="relative w-full lg:max-w-md lg:p-10">
              <div
                data-build="card"
                className="invisible absolute -top-6 -left-4 z-30 animate-float-up rounded-lg border border-gray-200/50 bg-white/95 p-3 shadow-xl lg:top-0 lg:left-0 lg:p-4 dark:border-gray-700/50 dark:bg-black/70"
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center gap-2">
                  <LuCodeXml className="h-4 w-4 text-primary-600 lg:h-5 lg:w-5" />
                  <span className="text-xs font-medium text-gray-700 lg:text-sm dark:text-gray-300">
                    FullStack Developer
                  </span>
                </div>
              </div>
              <div
                data-build="card"
                className="invisible absolute -right-4 -bottom-6 z-30 animate-float-down rounded-lg border border-gray-200/50 bg-white/95 p-3 shadow-xl lg:right-0 lg:bottom-0 lg:p-4 dark:border-gray-700/50 dark:bg-black/70"
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center gap-2">
                  <LuCodeXml className="h-4 w-4 text-primary-600 lg:h-5 lg:w-5" />
                  <span className="text-xs font-medium text-gray-700 lg:text-sm dark:text-gray-300">
                    React & PHP Expert
                  </span>
                </div>
              </div>
              <div className="relative z-0">
                <HomeCharacterCard sheet={home.sheet} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div data-build="stack" className="relative z-0 shrink-0">
        <LazyFooter locale={locale} />
      </div>
    </div>
  );
}
