"use client";

import { useEffect, type ReactNode } from "react";

const DESKTOP_MQ = "(min-width: 1024px)";

export function HomeScrollLock({
  children,
}: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const media = window.matchMedia(DESKTOP_MQ);

    const apply = () => {
      if (media.matches) {
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        return;
      }

      html.style.overflow = "";
      body.style.overflow = "";
    };

    apply();
    media.addEventListener("change", apply);

    return () => {
      media.removeEventListener("change", apply);
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, []);

  return children;
}
