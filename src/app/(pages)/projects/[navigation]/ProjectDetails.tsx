"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import { RiGithubLine } from "react-icons/ri";
import { LuBadgeCheck, LuReply, LuServerCrash, LuTrophy } from "react-icons/lu";

import { Project } from "@/app/data/projects";
import { Breadcrumb, Footer, Navbar, ZoomImage } from "@/components";
import { useTranslation } from "@/context";

import { cn } from "@/libs/cn";

interface ProjectDetailsViewProps {
  project: Project;
}

export default function ProjectDetailsView({
  project,
}: Readonly<ProjectDetailsViewProps>) {
  const { translations } = useTranslation();

  const projectTranslate = translations.projects.projects.find(
    (translate) => translate.id === project.id,
  );

  const breadcrumb = [
    { label: translations.projects.breadcrumb_begin, link: "/projects" },
    { label: translations.projects.breadcrumb_end },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <Navbar />
      <main className="pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Breadcrumb path={breadcrumb} />
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {projectTranslate?.title}
            </h1>
          </div>
          <ZoomImage
            className="aspect-video w-full md:w-[70%] mx-auto rounded-3xl object-cover my-6"
            src={project.image}
            alt={projectTranslate?.title ?? "project.id"}
            width={1200}
            height={800}
          />
          <div className="flex flex-col 2xl:flex-row justify-between mb-4">
            <div className="flex flex-row items-center align-center gap-2">
              {project.active ? (
                <>
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <p>Online:</p>
                  <Link
                    href={project.demo}
                    className="text-blue-600 hover:text-primary-800 dark:hover:text-primary-300 font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.demo}
                  </Link>
                </>
              ) : (
                <>
                  <motion.div className="w-3 h-3 bg-red-500 rounded-full" />
                  <p>Offline</p>
                </>
              )}
            </div>
            {project.github && (
              <motion.div className="flex flex-row items-center align-center gap-2 sanitized-json">
                <Link
                  href={project.github}
                  target="_blank"
                  className="flex flex-row items-center gap-2"
                >
                  <RiGithubLine />
                  {translations.projects.github}
                </Link>
              </motion.div>
            )}
          </div>

          <div className="mb-8 lg:mb-4">
            <h1 className="text-xl mb-2 font-bold">
              {projectTranslate?.longDescriptionTitle}
            </h1>
            {projectTranslate?.longDescription.map((content, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-lg">{content}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-12 lg:mb-4">
            {project.technologies.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-base font-medium px-3 py-1 bg-primary-300/50 dark:bg-primary-800/50 backdrop-blur-sm border border-primary-800/50 dark:border-primary-300/50 rounded-2xl",
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            <div className="bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col">
              <div className="flex flex-row items-center gap-2 pb-2">
                <div className="w-8 h-8 min-w-8 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center">
                  <LuBadgeCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-medium">
                  {projectTranslate?.featuresTitle}
                </h4>
              </div>

              {projectTranslate?.features.map((content, index) => (
                <div key={index} className="mb-2 ">
                  <h3 className="text-lg flex gap-2">‣ {content}</h3>
                </div>
              ))}
            </div>

            <div className="bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col">
              <div className="flex flex-row items-center gap-2 pb-2">
                <div className="w-8 h-8 min-w-8 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center">
                  <LuServerCrash className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-medium">
                  {projectTranslate?.challengesTitle}
                </h4>
              </div>

              {projectTranslate?.challenges.map((content, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-lg">‣ {content}</h3>
                </div>
              ))}
            </div>

            <div className="bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col">
              <div className="flex flex-row items-center gap-2 pb-2">
                <div className="w-8 h-8 min-w-8 bg-linear-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-full flex items-center justify-center">
                  <LuTrophy className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-medium">
                  {projectTranslate?.achievementsTitle}
                </h4>
              </div>

              {projectTranslate?.achievements.map((content, index) => (
                <div key={index} className="mb-2">
                  <h3 className="text-lg">‣ {content}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center align-center gap-2 mt-6">
            <Link
              href="/projects"
              className="flex flex-row justify-center items-center bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-3 py-1.5 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
            >
              <LuReply className="mr-2 h-5 w-5" />
              {translations.projects.return}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
