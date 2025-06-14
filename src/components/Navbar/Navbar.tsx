"use client";
import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { FaBars, FaXmark } from "react-icons/fa6";
import { LuMoonStar, LuSun } from "react-icons/lu";

import { fontRyanaLovely } from "@/app/fonts";
import { Tooltip } from "@/components";
import { languages, navItems } from "@/constants/navbar";
import { nightStalker, dawnbreaker } from "@/constants/phrases";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import toast from "react-hot-toast";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkTheme, setCheckTheme] = useState<string | undefined>();
  const [isScrolled, setIsScrolled] = useState(false);

  const { translations, setLocation, location } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [phrases, setPhrases] = useState(
    theme === "dark" ? "Face the light!" : "Darkness reigns!"
  );

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const selectLocation = (tag: string) => {
    switch (tag) {
      case "pt":
        setLocation("pt");
        break;
      case "en":
        setLocation("en");
        break;
      case "es":
        setLocation("es");
        break;
      default:
        setLocation("pt");
    }

    const url = new URL(window.location.href);
    url.searchParams.set("lang", tag);
    window.history.pushState({}, "", url.toString());

    url.searchParams.delete("lang");
    window.history.replaceState({}, "", url.pathname);
  };

  const renderText = (name: string) => {
    switch (name) {
      case "about":
        return translations.navbar.aboutPage;
      case "stack":
        return translations.navbar.stackPage;
      case "contents":
        return translations.navbar.contentsPage;
      case "projects":
        return translations.navbar.projectsPage;
      case "contact":
        return translations.navbar.contactPage;
      default:
    }
  };

  const showRandomPhrases = () => {
    let randomIndex;
    if (theme === "dark") {
      randomIndex = Math.floor(Math.random() * nightStalker.length);
      setPhrases(nightStalker[randomIndex]);
    } else {
      randomIndex = Math.floor(Math.random() * dawnbreaker.length);
      setPhrases(dawnbreaker[randomIndex]);
    }
  };

  const renderPhrase = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/10 dark:ring-white/10 
      bg-white/80 dark:bg-black/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                className="rounded-sm"
                src={
                  theme === "dark"
                    ? "/images/toast/dawn.webp"
                    : "/images/toast/night.webp"
                }
                width={100}
                height={100}
                alt="Dota Heroes"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {theme === "dark" ? "Dawnbreaker" : "Night Stalker"}
              </p>
              <p className="mt-1 text-md text-gray-700 dark:text-gray-300">
                {phrases}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  useLayoutEffect(() => {
    if (theme) {
      setCheckTheme(theme);
    }
  }, [theme]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        `fixed top-0 w-full z-50 backdrop-blur-xl ${
          isScrolled
            ? "border-b border-gray-200/40 dark:border-gray-800/40"
            : ""
        }`
      )}
    >
      <div className="mx-auto px-6 xl:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Tooltip text="Back to home">
              <Link
                href="/"
                className={cn(
                  `${fontRyanaLovely.className} opacity-60 transition-opacity duration-200 hover:opacity-100 text-3xl`,
                  {
                    "opacity-100": pathname === "/",
                  }
                )}
                title="Felipe Frantz Zanini"
              >
                <p>2fZ</p>
              </Link>
            </Tooltip>
          </div>

          {/* Desktop Menu Button */}
          <div className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  `relative py-2 text-sm transition-all  group text-[1rem] ${
                    isActive(item.path)
                      ? "font-bold text-black dark:text-white"
                      : "font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`
                )}
              >
                {renderText(item.label)}

                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-300 to-primary-800" />
                )}

                {!isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-300 to-primary-800 scale-x-0 group-hover:scale-x-100 transition-transform  origin-left" />
                )}
              </Link>
            ))}
          </div>
          <div className="hidden xl:flex items-center space-x-6">
            <select
              value={location}
              onChange={(e) => selectLocation(e.target.value)}
              className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-300 dark:focus:border-primary-300"
            >
              {languages.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="flex items-center"
                >
                  {`${lang.flag} ${lang.label}`}
                </option>
              ))}
            </select>
            <Tooltip
              text={`${checkTheme !== "dark" ? "To the Dark" : "To the Light"}`}
            >
              <motion.button
                onClick={() => {
                  toggleTheme();
                  showRandomPhrases();
                  renderPhrase();
                }}
                className="cursor-pointer"
              >
                {checkTheme === "dark" ? (
                  <LuSun className="h-5 w-5 hover:rotate-12 transition-transform" />
                ) : (
                  <LuMoonStar className="h-5 w-5 hover:rotate-12 transition-transform" />
                )}
              </motion.button>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="xl:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaXmark className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="xl:hidden pb-6 border-t border-gray-200/50 dark:border-white/10">
            <div className="flex flex-col space-y-2 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-xl transition-all  ${
                    isActive(item.path)
                      ? "font-bold text-white bg-gradient-to-r from-primary-950 via-primary-600 to-primary-300"
                      : "font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {renderText(item.label)}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-3 mt-4 border-t border-gray-200/50 dark:border-white/10">
                <select
                  value={location}
                  onChange={(e) => {
                    selectLocation(e.target.value);
                    setIsOpen(false);
                  }}
                  className="bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full/2 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-300 dark:focus:border-primary-300"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="flex items-center"
                    >
                      {`${lang.flag} ${lang.label}`}
                    </option>
                  ))}
                </select>

                <motion.button
                  onClick={() => {
                    toggleTheme();
                    showRandomPhrases();
                    renderPhrase();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {checkTheme === "dark" ? (
                    <LuSun className="h-5 w-5" />
                  ) : (
                    <LuMoonStar className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
