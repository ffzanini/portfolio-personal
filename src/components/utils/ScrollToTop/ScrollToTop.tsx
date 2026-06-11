"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Tooltip } from "@/components/ui";
import { cn } from "@/libs/cn";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(globalThis.window.scrollY > 100);
    };
    globalThis.window.addEventListener("scroll", handleScroll, { passive: true });
    return () => globalThis.window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  const goTop = () => {
    const reduced = globalThis.window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    globalThis.window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={goTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-4 right-1 lg:bottom-20 lg:right-4 p-2 cursor-pointer z-40",
        "transition-all duration-300 ease-out motion-reduce:transition-none",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto hover:-translate-y-2 motion-reduce:hover:translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none",
      )}
    >
      <Tooltip text="Back to top" position="top">
        <Image
          src="/images/point_up.svg"
          width={36}
          height={36}
          alt="point up"
          loading="lazy"
          className="z-40"
        />
      </Tooltip>
    </button>
  );
}
