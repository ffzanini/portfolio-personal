"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LuFilter } from "react-icons/lu";

import Link from "next/link";

import { Card, Footer, Navbar, SanitizedText } from "@/components";
import { useTranslation } from "@/context";
import { projects } from "@/app/data/projects";

export default function Projects() {
  const { translations } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);

  const filters = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
  ];

  const filteredProjects = useMemo(() => {
    return activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const featuredProjects = projects.filter((project) => project.featured);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(3);
  }, [activeFilter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-200 via-white-theme to-white-theme dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%">
      <Navbar />
      <main className="pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-6 p-3">
              {translations.projects.title}
            </h1>
            <SanitizedText
              json={translations.projects.sub_title}
              className="text-xl max-w-5xl mx-auto leading-relaxed"
            />
          </div>

          <h2 className="text-3xl font-bold my-8 flex items-center">
            <span className="w-2 h-8 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded mr-4"></span>
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
          <div className="flex flex-col my-8">
            {filteredProjects.length !== 0 && (
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="w-2 h-8 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded mr-4"></span>
                {translations.projects.projects_all}
              </h2>
            )}

            <motion.div
              key={activeFilter}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                  }}
                >
                  <Card project={project} index={index} lower={true} />
                </motion.div>
              ))}
            </motion.div>

            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="flex flex-row justify-center items-center bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-500 hover:to-primary-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-600/25 cursor-pointer"
                >
                  {translations.projects.load}
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">
                  Nenhum projeto encontrado para o filtro selecionado.
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                {translations.projects.contact.title}
              </h1>

              <p className="inline-block">
                <SanitizedText
                  json={translations.projects.contact.description}
                  typeText="span"
                  className="text-lg"
                />
                <Link
                  href="/contact"
                  className="font-bold text-lg hover:text-primary-800 dark:hover:text-primary-300"
                >
                  {translations.projects.contact.contact}
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
