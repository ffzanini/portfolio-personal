"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";

import { NavbarBrand } from "@/components/ui/Navbar/NavbarBrand";
import { NavbarLinks } from "@/components/ui/Navbar/NavbarLinks";
import { ThemeToggle } from "@/components/ui/Navbar/ThemeToggle";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import { withLocalePath } from "@/libs/i18n";

const LanguageSelect = dynamic(
  () =>
    import("@/components/ui/LanguageSelect").then((mod) => mod.LanguageSelect),
  {
    ssr: false,
    loading: () => <div className="h-8 w-16" aria-hidden />,
  },
);

export function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { translations, setLocation, location } = useTranslation();
  const pathname = usePathname();
  const homeActive = pathname === withLocalePath(location, "/");

  const closeMenu = useCallback(() => setIsOpenMenu(false), []);

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

    globalThis.window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      globalThis.window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full backdrop-blur-md",
        isScrolled ? "border-b border-gray-200/40 dark:border-gray-800/40" : "",
      )}
    >
      <div className="mx-auto px-6 xl:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <NavbarBrand isActive={homeActive} />
          </div>

          <div className="hidden items-center space-x-6 xl:flex">
            <NavbarLinks variant="desktop" />
          </div>

          <div className="hidden items-center space-x-6 xl:flex">
            <div className="relative">
              <LanguageSelect selected={location} onChange={setLocation} />
            </div>
            <ThemeToggle />
          </div>

          <button
            type="button"
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

        {isOpenMenu && (
          <div className="border-t border-gray-200/50 pb-6 xl:hidden dark:border-white/10">
            <div className="flex flex-col space-y-2 pt-6">
              <NavbarLinks variant="mobile" onNavigate={closeMenu} />

              <div className="mt-4 flex items-center justify-between border-t border-gray-200/50 px-4 py-3 dark:border-white/10">
                <div className="relative">
                  <LanguageSelect
                    selected={location}
                    onChange={setLocation}
                    setIsOpenMenu={setIsOpenMenu}
                  />
                </div>
                <ThemeToggle onAfterToggle={closeMenu} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
