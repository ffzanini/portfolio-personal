import Link from "next/link";
import { LuExternalLink, LuGithub, LuSparkles } from "react-icons/lu";

import { Project } from "@/app/data/projects";
import { cn } from "@/libs/cn";
import { useTranslation } from "@/context";
import { ZoomImage } from "../ZoomImage";

interface CardProps {
  project: Project;
  index: number;
  lower: boolean;
}

export function Card({ project, index, lower }: Readonly<CardProps>) {
  const { translations } = useTranslation();
  const projectTranslate = translations.projects.projects.find(
    (translate) => translate.id === project.id
  );

  return (
    <div className="flex flex-col group h-full">
      <div
        className="flex flex-col h-full rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-black/40"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <div className="aspect-video overflow-hidden border-b border-black/10 dark:border-black/40">
          <ZoomImage
            className="aspect-video w-full object-cover group-hover:scale-125 transition-transform duration-700"
            width={1200}
            height={1200}
            src={project.image}
            alt={String(projectTranslate?.title)}
          />
        </div>
        <div className="flex flex-col bg-white-theme/80 dark:bg-dark-theme/80 flex-1 px-4 pt-4 pb-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-2xl font-bold leading-snug truncate">
              {projectTranslate?.title}
            </h3>
            {lower === false && (
              <div className="font-semibold bg-primary-300 border border-primary-800 dark:border-primary-300 dark:bg-primary-800 px-2 rounded-full whitespace-nowrap">
                Destaque
              </div>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <p className="leading-relaxed">{projectTranslate?.description}</p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {(lower
                ? project.technologies.slice(0, 3)
                : project.technologies
              ).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl"
                  )}
                >
                  {tag}
                </span>
              ))}
              {lower && project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-400">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              {lower === false ? (
                <>
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-3 py-1.5 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                    >
                      <LuGithub className="md:mr-2 h-4 w-4" />
                      <span className="hidden md:flex">GitHub</span>
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-3 py-1.5 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                    >
                      <LuExternalLink className="md:mr-2 h-4 w-4" />
                      <span className="hidden md:flex">Demo</span>
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.navigation}`}
                    className="flex flex-row justify-center items-center border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 font-semibold px-3 py-1.5 rounded-sm backdrop-blur-sm group/sparkles"
                  >
                    <LuSparkles className="hidden md:flex mr-2 h-4 w-4 group-hover/sparkles:rotate-360 duration-500 transition-transform" />
                    Ver detalhes
                  </Link>
                </>
              ) : (
                <>
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-2 py-1 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                    >
                      <LuGithub className="h-5 w-5" />
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex flex-row justify-center items-center bg-gradient-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-2 py-1 rounded-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 group"
                    >
                      <LuExternalLink className="h-5 w-5" />
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.navigation}`}
                    className="flex flex-row justify-center items-center border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 font-semibold px-2 py-1 rounded-sm backdrop-blur-sm group"
                  >
                    Ver detalhes
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
