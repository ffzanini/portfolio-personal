"use client";
import { LuBriefcaseBusiness, LuStar } from "react-icons/lu";

import { Footer, Navbar, SanitizedText } from "@/components";

import { categories } from "@/constants/stack";
import { useTranslation } from "@/context";

export default function Stack() {
  const { translations } = useTranslation();

  const renderText = (name: string) => {
    switch (name) {
      case "frontend":
        return translations.stack.frontend;
      case "backend":
        return translations.stack.backend;
      case "devops":
        return translations.stack.devops;
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
              {translations.stack.title}
            </h1>
            <p className="text-xl max-w-5xl mx-auto leading-relaxed">
              {translations.stack.sub_title}
            </p>
          </div>
          <div className="flex justify-center my-8 lg:my-16 text-center">
            <div className="lg:inline-flex items-center space-y-4 lg:space-y-0 space-x-8 px-6 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <div className="flex items-center justify-center space-x-2">
                <LuStar className="h-6 w-6 lg:w-4 lg:h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-md">
                  {translations.stack.mainSpecialties}
                </span>
              </div>
              <div className="flex lg:flex-row items-center space-x-2">
                <div className="h-6 w-6 lg:w-4 lg:h-4 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="text-md">{translations.stack.knownTech}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-8 lg:my-16">
            {categories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <span className="text-xs">
                      {renderText(category.sub_title)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className="group/tech relative"
                      style={{
                        animationDelay: `${
                          categoryIndex * 0.1 + techIndex * 0.05
                        }s`,
                      }}
                    >
                      <div
                        className="p-3 rounded-2xl bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 transition-all duration-300 group-hover/tech:scale-105"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = tech.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "";
                        }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="relative">
                            <tech.icon
                              className="w-10 h-10 transition-transform duration-300 group-hover/tech:scale-110"
                              style={{ color: tech.color }}
                            />
                            {tech.featured && (
                              <LuStar className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-center leading-tight">
                            {tech.name}
                          </span>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-8 my-8 lg:my-16">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 min-w-12 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-900 rounded-xl flex items-center justify-center mr-4">
                <LuBriefcaseBusiness className="h-6 w-6" />
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
              {translations.stack.strengths.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/1 dark:bg-white/1 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4"
                >
                  <div className="flex flex-row items-center gap-2 pb-2">
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                  </div>
                  <span>{item.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent">
                {translations.stack.footer.title}
              </h1>

              <p className="inline-block">
                <SanitizedText
                  json={translations.stack.footer.message}
                  typeText="span"
                  className="text-lg"
                />
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
