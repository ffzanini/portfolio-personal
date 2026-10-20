"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/libs/cn";
import { pixeloidSans } from "@/app/fonts-pixeloid";
import { withLocalePath } from "@/libs/i18n";
import { cacheMissingLocale } from "./intro-locale";
import { IntroLoader } from "./IntroLoader";
import { NameBlocks } from "./NameBlocks";
import { markPageMounted, playHomeBuild } from "@/components/intro/page-mount";
import {
  clearIntroQuery,
  isIntroHomePath,
  prefersReducedMotion,
} from "./intro-seen";

type Phase = "boot" | "print" | "build" | "done";

const ROLE = "Software Engineer";

function IntroRole({ active }: Readonly<{ active: boolean }>) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (count >= ROLE.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 48);
    return () => window.clearTimeout(timer);
  }, [active, count]);

  return (
    <p
      className={cn(
        pixeloidSans.className,
        "min-h-[1.4em] text-center text-sm tracking-[0.12em] text-[#f4f1ea] sm:text-base",
      )}
    >
      <span aria-hidden>{ROLE.slice(0, count)}</span>
      <span className="sr-only">{ROLE}</span>
    </p>
  );
}

function clearBuildStyles() {
  document.querySelectorAll("[data-build]").forEach((node) => {
    node.removeAttribute("data-built");
    if (!(node instanceof HTMLElement)) return;
    node.style.opacity = "";
    node.style.transform = "";
    node.style.transition = "";
  });
}

function releaseHome() {
  clearBuildStyles();
  document.documentElement.removeAttribute("data-intro");
  document.querySelector("[data-home-scroll-lock]")?.removeAttribute("inert");
}

export function IntroGreetings() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("boot");
  const [loadProgress, setLoadProgress] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const finishedRef = useRef(false);
  const armBuildRef = useRef(false);
  const redirectHome = useCallback(() => {
    if (window.location.pathname !== "/") return;
    const locale = cacheMissingLocale("/");
    router.replace(withLocalePath(locale, "/"));
  }, [router]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    armBuildRef.current = false;
    clearIntroQuery();
    releaseHome();
    redirectHome();
    setPhase("done");
  }, [redirectHome]);

  const progressFrameRef = useRef(0);
  const handleDuration = useCallback((durationMs: number) => {
    window.cancelAnimationFrame(progressFrameRef.current);
    const started = performance.now();
    let lastPaint = 0;
    const tick = (now: number) => {
      const ratio = Math.min(1, (now - started) / durationMs);
      if (ratio === 1 || now - lastPaint > 40) {
        lastPaint = now;
        setLoadProgress(ratio);
      }
      if (ratio < 1) progressFrameRef.current = window.requestAnimationFrame(tick);
    };
    progressFrameRef.current = window.requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => window.cancelAnimationFrame(progressFrameRef.current);
  }, []);

  const handleNameDone = useCallback(() => {
    if (finishedRef.current) return;
    if (window.location.pathname === "/" || window.location.pathname === "") {
      armBuildRef.current = true;
      redirectHome();
      return;
    }
    if (isIntroHomePath(window.location.pathname)) {
      setPhase("build");
      return;
    }
    finish();
  }, [finish, redirectHome]);

  useLayoutEffect(() => {
    if (finishedRef.current || phase !== "boot") return;
    if (prefersReducedMotion()) return;
    if (document.documentElement.dataset.intro !== "print") return;
    setShowRole(false);
    setPhase("print");
  }, [phase]);

  useEffect(() => {
    if (!armBuildRef.current || finishedRef.current) return;
    if (!isIntroHomePath(pathname) || pathname === "/") return;
    armBuildRef.current = false;
    setPhase("build");
  }, [pathname]);

  useEffect(() => {
    if (finishedRef.current) {
      if (pathname === "/") redirectHome();
      return;
    }

    if (armBuildRef.current) return;

    if (phase === "print") return;

    if (phase === "build") {
      if (!isIntroHomePath(pathname)) {
        armBuildRef.current = false;
        finishedRef.current = true;
        window.cancelAnimationFrame(progressFrameRef.current);
        clearIntroQuery();
        releaseHome();
        setPhase("done");
      }
      return;
    }

    if (prefersReducedMotion()) {
      finishedRef.current = true;
      clearIntroQuery();
      releaseHome();
      if (pathname === "/") redirectHome();
      setPhase("done");
      return;
    }

    if (document.documentElement.dataset.intro !== "print") {
      finishedRef.current = true;
      setPhase("done");
      return;
    }

    document.documentElement.dataset.intro = "print";
    document.querySelector("[data-home-scroll-lock]")?.setAttribute("inert", "");
    setLoadProgress(0);
    setShowRole(false);
    setPhase("print");
  }, [pathname, phase, redirectHome]);

  useEffect(() => {
    if (phase !== "build") return;

    document.documentElement.dataset.intro = "build";
    document.querySelector("[data-home-scroll-lock]")?.setAttribute("inert", "");

    return playHomeBuild(
      () => {
        markPageMounted(window.location.pathname);
        finish();
      },
      () => finish(),
    );
  }, [finish, phase]);

  if (phase === "done") return null;

  const playing = phase === "print" || phase === "build";

  return (
    <div
      data-intro-lock={playing ? "" : undefined}
      className={cn(
        "intro-curtain",
        phase === "build" && "intro-curtain-build",
      )}
      role="status"
      aria-live="polite"
      aria-busy={playing}
    >
      <div
        className={cn(
          "intro-stage transition-opacity duration-700",
          phase === "build" && "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <NameBlocks
            active={phase === "print"}
            onDone={handleNameDone}
            onDuration={handleDuration}
            onNameSettled={() => setShowRole(true)}
          />
          <IntroRole active={showRole} />
        </div>
        <IntroLoader progress={loadProgress} />
      </div>
    </div>
  );
}
