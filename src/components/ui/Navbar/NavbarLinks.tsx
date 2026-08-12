"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/constants/navbar";
import { withLocalePath, type Locale } from "@/libs/i18n";

type NavbarLabels = {
  aboutPage: string;
  stackPage: string;
  arcadePage: string;
  projectsPage: string;
  contactPage: string;
};

type NavbarLinksProps = {
  locale: Locale;
  labels: NavbarLabels;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function NavbarLinks({
  locale,
  labels,
  variant,
  onNavigate,
}: Readonly<NavbarLinksProps>) {
  const pathname = usePathname();
  const labelMap: Record<string, string> = {
    about: labels.aboutPage,
    stack: labels.stackPage,
    arcade: labels.arcadePage,
    projects: labels.projectsPage,
    contact: labels.contactPage,
  };

  return (
    <>
      {navItems.map((item) => {
        const href = withLocalePath(locale, item.path);
        const active = pathname === href;
        const label = labelMap[item.label] ?? item.label;

        if (variant === "mobile") {
          return (
            <Link
              key={item.path}
              href={href}
              className={`rounded-lg px-4 py-3 transition-colors ${
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
            className={`group relative py-2 text-sm text-[1rem] transition-colors ${
              active
                ? "font-bold text-black dark:text-white"
                : "font-medium text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            {label}
            <div
              className={`absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-linear-to-r from-primary-300 to-primary-800 transition-transform ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}
