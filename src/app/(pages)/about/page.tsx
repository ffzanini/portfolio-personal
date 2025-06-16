"use client";
import Link from "next/link";

import {
  LuCarFront,
  LuBrain,
  LuCoffee,
  LuArrowRight,
  LuSend,
} from "react-icons/lu";

import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
} from "react-icons/ri";

import { Footer, Navbar, SanitizedText, ZoomImage } from "@/components";
import { useTranslation } from "@/context";
import { photos } from "@/constants/about";

export default function About() {
  const { translations } = useTranslation();

  const renderIco = (id: number) => {
    const iconClass = "h-6 w-6";

    switch (id) {
      case 1:
        return <RiNumber1 className={iconClass} />;
      case 2:
        return <RiNumber2 className={iconClass} />;
      case 3:
        return <RiNumber3 className={iconClass} />;
      case 4:
        return <RiNumber4 className={iconClass} />;
      case 5:
        return <RiNumber5 className={iconClass} />;
      case 6:
        return <RiNumber6 className={iconClass} />;
      default:
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-200 via-white-theme to-white-theme dark:bg-gradient-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <Navbar />
      <main className="pt-20 lg:pt-32 pb-4 lg:pb-18">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.about.title}
            </h1>
            <p className="text-xl max-w-5xl mx-auto leading-relaxed">
              {translations.about.sub_title}
            </p>
          </div>
          <div className="flex flex-col my-8 lg:my-16">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
                  <LuCarFront className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-bold">
                    {translations.about.description.title}
                  </h2>
                  <span className="text-xs">*carry on my wayward son...</span>
                </div>
              </div>
              <div className="space-y-4 leading-relaxed mb-8">
                <SanitizedText json={translations.about.description.begin} />
                <SanitizedText json={translations.about.description.middle} />
                <SanitizedText
                  json={translations.about.description.education}
                />
                <SanitizedText json={translations.about.description.end} />
              </div>
              <div className="md:grid grid-cols-5 flex flex-col gap-4 pb-6 hidden md:block">
                {photos.map((photo, index) => (
                  <ZoomImage
                    key={index}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className={photo.className}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col my-8 lg:my-16">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {translations.about.skills.process.map((process, index) => (
                  <div
                    key={index}
                    className="bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-primary-600/10 hover:scale-[1.02]"
                  >
                    <div className="flex flex-row items-center gap-2 pb-2">
                      <div className="w-8 h-8 min-w-8 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center">
                        {renderIco(process.id)}
                      </div>
                      <h4 className="text-xl font-medium">{process.title}</h4>
                    </div>
                    <span className="text-base">{process.description}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start pb-2">
                <h2 className="text-3xl font-bold">
                  {translations.about.stack.title}
                </h2>
              </div>
              <div className="text-lg space-y-4 leading-relaxed pb-2">
                {translations.about.stack.description}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link
                  href="/stack"
                  className="flex flex-row justify-center items-center border border-primary-600 bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                >
                  {translations.about.stack.button}
                  <LuArrowRight className="hidden md:flex ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex flex-row justify-center items-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 font-semibold px-4 py-2 rounded-xl backdrop-blur-sm group"
                >
                  {translations.about.stack.contact}
                  <LuSend className="hidden md:flex ml-3 h-5 w-5 group-hover:rotate-360 duration-500 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-8 lg:my-16">
            <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8">
              <div className="flex flex-row items-start mb-6">
                <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
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
                  href="/projects"
                  className="font-bold hover:text-primary-800 dark:hover:text-primary-300"
                >
                  {translations.about.site.projects}
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                {translations.about.contact.title}
              </h1>

              <p className="inline-block">
                <SanitizedText
                  json={translations.about.contact.description}
                  typeText="span"
                  className="text-lg"
                />
                <Link
                  href="/contact"
                  className="font-bold text-lg hover:text-primary-800 dark:hover:text-primary-300"
                >
                  {translations.about.contact.contact}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
