"use client";

import { usePathname } from "next/navigation";

import { RouteEnter } from "@/components/utils/RouteEnter";

type LocaleTemplateProps = {
  children: React.ReactNode;
};

export default function LocaleTemplate({
  children,
}: Readonly<LocaleTemplateProps>) {
  const pathname = usePathname();

  return <RouteEnter key={pathname}>{children}</RouteEnter>;
}
