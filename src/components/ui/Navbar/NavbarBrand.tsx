"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { fontRyanaLovely } from "@/app/fonts-ryana";

type NavbarBrandProps = {
  href: string;
  backHomeLabel: string;
  onNavigate?: () => void;
};

export function NavbarBrand({
  href,
  backHomeLabel,
  onNavigate,
}: Readonly<NavbarBrandProps>) {
  const pathname = usePathname();
  const isHome = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={backHomeLabel}
      className={`${fontRyanaLovely.className} text-3xl transition-[opacity,color] duration-200 ${
        isHome
          ? "text-black opacity-100 dark:text-white"
          : "text-gray-500 opacity-60 hover:text-black hover:opacity-100 dark:text-gray-300 dark:hover:text-white"
      }`}
    >
      <span>2fZ</span>
    </Link>
  );
}
