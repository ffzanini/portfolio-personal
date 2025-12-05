"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuMapPin,
  LuCoffee,
  LuCalendar,
  LuCodeXml,
  LuArrowRight,
} from "react-icons/lu";
import { LiaHandSpock } from "react-icons/lia";

import { useTranslation } from "@/context";
import {
  FlipWords,
  Footer,
  SanitizedText,
  Navbar,
  ZoomImage,
  Tooltip,
} from "@/components";
import { mainTechStack } from "@/constants/stack";

export default function Home() {
  const { translations } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-200 via-white-theme to-white-theme dark:bg-gradient-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="flex flex-col justify-center items-center lg:h-screen z-10 max-w-7xl mx-auto w-full pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center mx-auto px-3">
            <div className="space-y-4 sm:space-y-6 xl:space-y-8 order-2 lg:order-1 pt-12 xl:pt-0">
              <div className="space-y-2 sm:space-y-4">
                <div className="space-y-2">
                  <h1 className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                    {translations.home.welcome}
                  </h1>
                  <h2 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                      {translations.home.name}
                    </span>
                  </h2>
                </div>
                <FlipWords
                  words={translations.home.roles}
                  className="text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight"
                />
                <SanitizedText
                  json={translations.home.description}
                  className="text-base text-gray-600 dark:text-gray-300 leading-relaxed"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <LuMapPin className="h-4 w-4 sm:h-4 sm:w-4 text-primary-600" />
                  <span className="text-sm">{translations.home.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCalendar className="h-4 w-4 sm:h-4 sm:w-4 text-primary-600" />
                  <span className="text-sm">
                    {translations.home.experience}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCoffee className="h-4 w-4 sm:h-4 sm:w-4 text-primary-600" />
                  <span className="text-sm">{translations.home.projects}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link
                  href="/about"
                  className="flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                >
                  {translations.home.textButtonAbout}
                  <LuArrowRight className="hidden lg:flex ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="https://resume.ffzanini.dev"
                  target="_blank"
                  className="flex flex-row justify-center items-center border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl backdrop-blur-sm group"
                >
                  <LiaHandSpock className="hidden lg:flex mr-3 h-6 w-6 group-hover:rotate-360 duration-500 transition-transform" />
                  {translations.home.textButtonResume}
                </Link>
              </div>
            </div>
            <div
              className="flex justify-center lg:justify-end order-1 lg:order-2 mt-28 xl:pt-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 bg-white/95 dark:bg-black/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-3 sm:p-4 shadow-xl z-10"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <LuCodeXml className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      FullStack Developer
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-black/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-3 sm:p-4 shadow-xl z-10"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <LuCodeXml className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      React & PHP Expert
                    </span>
                  </div>
                </motion.div>
                <div className="relative bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                  <div className="relative mx-auto w-32 sm:w-40 lg:w-50 h-32 sm:h-40 lg:h-50 mb-4 sm:mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-600 to-primary-800 rounded-4xl animate-pulse opacity-80"></div>
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary-200 via-primary-600 to-primary-950 p-1.5 sm:p-2 shadow-2xl">
                      <div className="w-full h-full flex items-center justify-center">
                        <ZoomImage
                          src="/images/me-desenho.jpeg"
                          alt="Profile photo"
                          width={180}
                          height={180}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 bg-green-500 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-3 sm:border-4 border-white dark:border-gray-900 flex items-center justify-center">
                      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-center space-y-3 sm:space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {translations.home.stack}
                    </h3>
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
                              className={`relative w-12 h-12 rounded-xl ${tech.bgColor} ${tech.borderColor} border shadow-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg backdrop-blur-sm`}
                            >
                              <tech.icon
                                className={`w-6 h-6 ${tech.iconColor} transition-transform duration-300 group-hover:scale-110`}
                              />
                            </div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                    <Link
                      href="/stack"
                      className="underline underline-offset-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold"
                    >
                      {translations.home.textButtonStack}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
