"use client";
import { useState } from "react";
import { LuFilter } from "react-icons/lu";

import { Card, Footer, Navbar, SanitizedText } from "@/components";
import { useTranslation } from "@/context";
import { projects } from "@/app/data/projects";

export default function Projects() {
  const { translations } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-200 via-white-theme to-white-theme dark:bg-gradient-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <Navbar />
      <main className="pt-20 lg:pt-32 pb-4 lg:pb-18">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.projects.title}
            </h1>
            <SanitizedText
              json={translations.projects.sub_title}
              className="text-xl max-w-5xl mx-auto leading-relaxed"
            />
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold my-8 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded mr-4"></span>
              {translations.projects.projects_title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.slice(0, 2).map((project, index) => (
                <Card
                  key={project.id}
                  project={project}
                  index={index}
                  lower={false}
                />
              ))}
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 my-8">
              <LuFilter className="h-7 w-7 " />
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`py-1 px-2 rounded-md font-semibold cursor-pointer ${
                    activeFilter === filter.id
                      ? "bg-primary-600 hover:bg-primary-700"
                      : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10"
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {filteredProjects.length !== 0 && (
              <h2 className="text-3xl font-bold my-8 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded mr-4"></span>
                {translations.projects.projects_all}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  project={project}
                  index={index}
                  lower={true}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">
                  Nenhum projeto encontrado para o filtro selecionado.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
