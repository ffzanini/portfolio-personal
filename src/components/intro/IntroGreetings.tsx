"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/libs/cn";
import { withLocalePath } from "@/libs/i18n";
import { cacheMissingLocale } from "./intro-locale";

const WORD_MS = 165;
const HOLD_MS = 700;
const EXIT_MS = 700;
const REDUCED_MS = 350;
const GREETINGS = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo",
  "Hola",
  "Oi",
] as const;

type Phase = "playing" | "exiting" | "done";

function nextWordDelay(index: number, reduced: boolean) {
  if (reduced) return REDUCED_MS;
  if (index < GREETINGS.length - 1) return WORD_MS;
  return HOLD_MS;
}

export function IntroGreetings() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("playing");
  const [index, setIndex] = useState(0);
  const [playDone, setPlayDone] = useState(false);

  useEffect(() => {
    const locale = cacheMissingLocale(pathname);
    if (pathname === "/") {
      router.replace(withLocalePath(locale, "/"));
    }
  }, [pathname, router]);

  useEffect(() => {
    if (phase !== "playing") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timer = window.setTimeout(() => {
      if (reduced || index >= GREETINGS.length - 1) {
        setPlayDone(true);
        return;
      }
      setIndex((current) => current + 1);
    }, nextWordDelay(index, reduced));

    return () => window.clearTimeout(timer);
  }, [index, phase]);

  useEffect(() => {
    if (phase !== "playing" || !playDone) return;
    if (pathname !== "/") {
      setPhase("exiting");
      return;
    }

    const fallback = window.setTimeout(() => {
      const locale = cacheMissingLocale("/");
      router.replace(withLocalePath(locale, "/"));
    }, 400);

    return () => window.clearTimeout(fallback);
  }, [pathname, phase, playDone, router]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = window.setTimeout(() => {
      delete document.documentElement.dataset.intro;
      setPhase("done");
    }, EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  const word = GREETINGS[index] ?? GREETINGS.at(-1) ?? "Oi";

  return (
    <div
      data-intro-lock=""
      className={cn(
        "fixed inset-0 z-9999 flex items-center justify-center bg-[#0c0c0e] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "exiting" ? "-translate-y-full" : "translate-y-0",
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p
        key={word}
        className="intro-greet flex items-center gap-3 text-4xl font-medium tracking-tight text-[#f4f1ea] sm:gap-4 sm:text-6xl md:text-7xl"
      >
        <span
          className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-primary-500 sm:h-3 sm:w-3"
          aria-hidden
        />
        <span>{word}</span>
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
