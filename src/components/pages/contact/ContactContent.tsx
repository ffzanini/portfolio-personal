"use client";
import Link from "next/link";
import { LuArrowUpRight, LuHandshake, LuHouse } from "react-icons/lu";

import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { SanitizedText } from "@/components/utils/SanitizedText";
import { ContactIntentSection } from "@/components/pages/contact/ContactIntentSection";
import { TestimonialsSlider } from "@/components/pages/contact/TestimonialsSlider";
import type { ReactNode } from "react";

export function ContactContent({ footer }: Readonly<{ footer: ReactNode }>) {
  const { translations, location } = useTranslation();

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <main className="pt-20 pb-8 lg:pt-32">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.contact.title}
            </h1>
            <SanitizedText
              json={translations.contact.sub_title}
              className="text-xl max-w-5xl mx-auto leading-relaxed"
            />
          </div>

          <ContactIntentSection />
          <div className="flex flex-col my-8">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-md flex items-center justify-center mr-4">
                  <LuHandshake className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.contact.testimonials.title}
                  </h2>
                  <span className="text-xs">
                    {translations.contact.testimonials.sub_title}
                  </span>
                </div>
              </div>
              <TestimonialsSlider
                testimonials={translations.contact.testimonials.testimonials}
              />
            </div>
          </div>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-black/10 bg-black/5 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-linear-to-l from-primary-600/25 to-transparent"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  <span className="text-black dark:text-white">
                    {translations.contact.footer.title_start}{" "}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400">
                    {translations.contact.footer.title_end}
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-black/70 dark:text-white/70 sm:text-base">
                  {translations.contact.footer.message}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://resume.ffzanini.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-primary-400 to-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-[background-color,box-shadow] duration-200 hover:from-primary-500 hover:to-primary-700"
                  >
                    <LuArrowUpRight className="h-4 w-4" aria-hidden />
                    {translations.contact.footer.resume}
                  </a>
                  <Link
                    href={withLocalePath(location, "/")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/15 px-4 py-2.5 text-sm font-semibold transition-colors duration-150 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                  >
                    <LuHouse className="h-4 w-4" aria-hidden />
                    {translations.contact.footer.home}
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5 lg:w-96 lg:shrink-0">
                {translations.contact.footer.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-black/10 px-2 py-4 text-center dark:border-white/15"
                  >
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-tight text-black/60 dark:text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      {footer}
    </div>
  );
}
