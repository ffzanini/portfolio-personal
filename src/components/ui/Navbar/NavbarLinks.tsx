"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/navbar";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import { withLocalePath } from "@/libs/i18n";

type NavbarLinksProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavbarLinks({
  variant,
  onNavigate,
}: Readonly<NavbarLinksProps>) {
  const { translations, location } = useTranslation();
  const pathname = usePathname();

  const labels: Record<string, string> = {
    about: translations.navbar.aboutPage,
    stack: translations.navbar.stackPage,
    arcade: translations.navbar.arcadePage,
    projects: translations.navbar.projectsPage,
    contact: translations.navbar.contactPage,
  };

  return (
    <>
      {navItems.map((item) => {
        const href = withLocalePath(location, item.path);
        const active = pathname === href;
        const label = labels[item.label] ?? item.label;

        if (variant === "mobile") {
          return (
            <Link
              key={item.path}
              href={href}
              className={`rounded-xl px-4 py-3 transition-colors ${
                active
                  ? "bg-linear-to-r from-primary-950 via-primary-600 to-primary-300 font-bold text-white"
                  : "font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
              }`}
              onClick={onNavigate}
            >
              {label}
            </Link>
          );
        }

        return (
          <Link
            key={item.path}
            href={href}
            className={cn(
              "group relative py-2 text-sm text-[1rem] transition-colors",
              active
                ? "font-bold text-black dark:text-white"
                : "font-medium text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white",
            )}
          >
            {label}
            <div
              className={cn(
                "absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-linear-to-r from-primary-300 to-primary-800 transition-transform",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        );
      })}
    </>
  );
}
