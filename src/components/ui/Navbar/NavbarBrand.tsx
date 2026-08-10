"use client";

import Link from "next/link";

import { fontRyanaLovely } from "@/app/fonts";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTranslation } from "@/context";
import { cn } from "@/libs/cn";
import { withLocalePath } from "@/libs/i18n";

type NavbarBrandProps = {
  isActive: boolean;
};

export function NavbarBrand({ isActive }: Readonly<NavbarBrandProps>) {
  const { translations, location } = useTranslation();

  return (
    <Tooltip text={translations.ui.back_home}>
      <Link
        href={withLocalePath(location, "/")}
        className={cn(
          `${fontRyanaLovely.className} text-3xl transition-[opacity,color] duration-200`,
          isActive
            ? "opacity-100 text-black dark:text-white"
            : "opacity-60 text-gray-500 dark:text-gray-300 hover:opacity-100 hover:text-black dark:hover:text-white",
        )}
        title="Felipe Frantz Zanini"
      >
        <p>2fZ</p>
      </Link>
    </Tooltip>
  );
}
