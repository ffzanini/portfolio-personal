"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { FaBars, FaXmark } from "react-icons/fa6";
import { LuMoonStar, LuSun, LuX } from "react-icons/lu";

import { fontRyanaLovely } from "@/app/fonts";
import { LanguageSelect, Tooltip } from "@/components";
import { navItems } from "@/constants/navbar";
import { nightStalker, dawnbreaker } from "@/constants/phrases";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";

export function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [checkTheme, setCheckTheme] = useState<string | undefined>();
  const [isScrolled, setIsScrolled] = useState(false);

  const { translations, setLocation, location } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [phrases, setPhrases] = useState(
    theme === "dark" ? "Face the light!" : "Darkness reigns!",
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
        key={t.id}
        className={`${
          t.visible ? "toast-animate-fade-in" : "toast-animate-fade-out"
        } relative z-9999 max-w-md w-full shadow-lg rounded-lg flex ring-1 ring-black/10 dark:ring-white/10 
      bg-white-theme dark:bg-dark-theme border border-gray-200/50 dark:border-gray-700/50`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="shrink-0 pt-0.5">
              <Image
                className="rounded-sm"
                src={
                  theme === "dark"
                    ? "/images/toast/dawn.webp"
                    : "/images/toast/night.webp"
                }
                width={100}
                height={100}
                alt="Dota Hero"
                loading="lazy"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {theme === "dark" ? "Dawnbreaker" : "Night Stalker"}
              </p>
              <p className="mt-1 text-base text-gray-700 dark:text-gray-300">
                {phrases}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (theme) {
      setCheckTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        `fixed top-0 w-full z-50 backdrop-blur-xl ${
          isScrolled
            ? "border-b border-gray-200/40 dark:border-gray-800/40"
            : ""
        }`,
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
                  },
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
                  }`,
                )}
              >
                {renderText(item.label)}

                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-300 to-primary-800" />
                )}

                {!isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary-300 to-primary-800 scale-x-0 group-hover:scale-x-100 transition-transform  origin-left" />
                )}
              </Link>
            ))}
          </div>
          <div className="hidden xl:flex items-center space-x-6">
            <div className="relative">
              <LanguageSelect selected={location} onChange={setLocation} />
            </div>
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
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            {isOpenMenu ? (
              <FaXmark className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpenMenu && (
          <div className="xl:hidden pb-6 border-t border-gray-200/50 dark:border-white/10">
            <div className="flex flex-col space-y-2 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-xl transition-all  ${
                    isActive(item.path)
                      ? "font-bold text-white bg-linear-to-r from-primary-950 via-primary-600 to-primary-300"
                      : "font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                  onClick={() => setIsOpenMenu(false)}
                >
                  {renderText(item.label)}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-3 mt-4 border-t border-gray-200/50 dark:border-white/10">
                <div className="relative">
                  <LanguageSelect
                    selected={location}
                    onChange={setLocation}
                    setIsOpenMenu={setIsOpenMenu}
                  />
                </div>

                <motion.button
                  onClick={() => {
                    toggleTheme();
                    showRandomPhrases();
                    renderPhrase();
                    setIsOpenMenu(false);
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
