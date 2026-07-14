"use client";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { FaBars, FaXmark } from "react-icons/fa6";
import { LuMoonStar, LuSun, LuX } from "react-icons/lu";

import { fontRyanaLovely } from "@/app/fonts";
import { LanguageSelect, Tooltip } from "@/components/ui";
import { navItems } from "@/constants/navbar";
import { nightStalker, dawnbreaker } from "@/constants/phrases";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import { withLocalePath } from "@/libs/i18n";

export function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { translations, setLocation, location } = useTranslation();
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const localizedPath = useCallback(
    (path: string) => withLocalePath(location, path),
    [location],
  );
  const isActive = (path: string) => pathname === localizedPath(path);

  const currentTheme = theme || "dark";

  const showThemeToast = useCallback((nextTheme: "light" | "dark") => {
    const goingToLight = nextTheme === "light";
    const pool = goingToLight ? dawnbreaker : nightStalker;
    const phrase =
      pool[crypto.getRandomValues(new Uint32Array(1))[0]! % pool.length] ??
      pool[0];
    const hero = goingToLight ? "Dawnbreaker" : "Night Stalker";
    const imageSrc = goingToLight
      ? "/images/toast/dawn.webp"
      : "/images/toast/night.webp";

    toast.custom((t) => (
      <div
        className={cn(
          t.visible ? "toast-animate-fade-in" : "toast-animate-fade-out",
          "w-full shadow-lg rounded-lg flex ring-1 ring-black/10 dark:ring-white/10 overflow-hidden",
          "bg-white-theme dark:bg-dark-theme border border-gray-200/50 dark:border-gray-700/50",
        )}
      >
        <div className="flex min-w-0 flex-1 items-start p-4">
          <div className="shrink-0 pt-0.5">
            <Image
              className="rounded-sm"
              src={imageSrc}
              width={100}
              height={100}
              alt={translations.ui.dota_hero_alt}
              loading="lazy"
            />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {hero}
            </p>
            <p className="mt-1 text-base text-gray-700 dark:text-gray-300">
              {phrase}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 shrink-0 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>
      </div>
    ));
  }, [translations.ui.dota_hero_alt]);

  const handleThemeToggle = useCallback(() => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    showThemeToast(nextTheme);
  }, [currentTheme, setTheme, showThemeToast]);

  const renderText = (name: string) => {
    switch (name) {
      case "about":
        return translations.navbar.aboutPage;
      case "stack":
        return translations.navbar.stackPage;
      case "arcade":
        return translations.navbar.arcadePage;
      case "projects":
        return translations.navbar.projectsPage;
      case "contact":
        return translations.navbar.contactPage;
      default:
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(globalThis.window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    globalThis.window.addEventListener("scroll", handleScroll, { passive: true });
    return () => globalThis.window.removeEventListener("scroll", handleScroll);
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
            <Tooltip text={translations.ui.back_home}>
              <Link
                href={localizedPath("/")}
                className={cn(
                  `${fontRyanaLovely.className} text-3xl transition-[opacity,color] duration-200`,
                  isActive("/")
                    ? "opacity-100 text-black dark:text-white"
                    : "opacity-60 text-gray-500 dark:text-gray-300 hover:opacity-100 hover:text-black dark:hover:text-white",
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
                href={localizedPath(item.path)}
                className={cn(
                  "relative py-2 text-sm transition-colors group text-[1rem]",
                  isActive(item.path)
                    ? "font-bold text-black dark:text-white"
                    : "font-medium text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white",
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
              text={
                currentTheme === "dark"
                  ? translations.ui.theme_to_light
                  : translations.ui.theme_to_dark
              }
            >
              <button
                onClick={handleThemeToggle}
                aria-label={
                  currentTheme === "dark"
                    ? translations.ui.switch_to_light
                    : translations.ui.switch_to_dark
                }
                className="cursor-pointer"
              >
                {currentTheme === "dark" ? (
                  <LuSun className="h-5 w-5 hover:rotate-12 transition-transform" />
                ) : (
                  <LuMoonStar className="h-5 w-5 hover:rotate-12 transition-transform" />
                )}
              </button>
            </Tooltip>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            aria-label={
              isOpenMenu
                ? translations.ui.close_menu
                : translations.ui.open_menu
            }
            aria-expanded={isOpenMenu}
          >
            {isOpenMenu ? (
              <FaXmark className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpenMenu && (
          <div className="xl:hidden pb-6 border-t border-gray-200/50 dark:border-white/10">
            <div className="flex flex-col space-y-2 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={localizedPath(item.path)}
                  className={`px-4 py-3 rounded-xl transition-colors ${
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

                <button
                  onClick={() => {
                    handleThemeToggle();
                    setIsOpenMenu(false);
                  }}
                  aria-label={
                    currentTheme === "dark"
                      ? translations.ui.switch_to_light
                      : translations.ui.switch_to_dark
                  }
                  className="cursor-pointer"
                >
                  {currentTheme === "dark" ? (
                    <LuSun className="h-5 w-5" />
                  ) : (
                    <LuMoonStar className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
