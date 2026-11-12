"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import {
  clearPageMotion,
  hasPageMounted,
  markPageMounted,
  playHomeBuild,
  playSectionBuild,
} from "@/components/intro/page-mount";
import { isIntroHomePath, prefersReducedMotion } from "@/components/intro/intro-seen";

const RouteEnterFreshContext = createContext<React.RefObject<boolean> | null>(
  null,
);

type RouteEnterProps = {
  children: React.ReactNode;
};

export function RouteEnter({ children }: Readonly<RouteEnterProps>) {
  const pathname = usePathname();
  const parentFresh = useContext(RouteEnterFreshContext);
  const freshRef = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef<() => void>(() => undefined);
  const [skip] = useState(() => parentFresh?.current ?? false);

  useLayoutEffect(() => {
    freshRef.current = false;
  }, []);

  useLayoutEffect(() => {
    if (skip || hasPageMounted(pathname)) return;

    const play = () => {
      if (hasPageMounted(pathname) || prefersReducedMotion()) {
        markPageMounted(pathname);
        return;
      }
      if (isIntroHomePath(pathname)) {
        stopRef.current = playHomeBuild(() => {
          clearPageMotion();
          markPageMounted(pathname);
        });
        return;
      }
      const node = rootRef.current;
      if (!node) {
        markPageMounted(pathname);
        return;
      }
      stopRef.current = playSectionBuild(node, () => markPageMounted(pathname));
    };

    const root = document.documentElement;
    if (root.hasAttribute("data-intro")) {
      if (isIntroHomePath(pathname)) return;
      let settled = false;
      let giveUp = 0;
      const settle = () => {
        if (settled) return;
        settled = true;
        observer.disconnect();
        window.clearTimeout(giveUp);
        root.removeAttribute("data-intro");
        document.querySelector("[data-home-scroll-lock]")?.removeAttribute("inert");
        play();
      };
      const observer = new MutationObserver(() => {
        if (root.hasAttribute("data-intro")) return;
        settle();
      });
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-intro"],
      });
      if (!root.hasAttribute("data-intro")) settle();
      giveUp = window.setTimeout(settle, 8000);
      return () => {
        settled = true;
        observer.disconnect();
        window.clearTimeout(giveUp);
        stopRef.current();
        stopRef.current = () => undefined;
      };
    }

    play();
    return () => {
      stopRef.current();
      stopRef.current = () => undefined;
    };
  }, [pathname, skip]);

  if (skip) {
    return (
      <RouteEnterFreshContext.Provider value={freshRef}>
        {children}
      </RouteEnterFreshContext.Provider>
    );
  }

  return (
    <RouteEnterFreshContext.Provider value={freshRef}>
      <div ref={rootRef}>
        {children}
      </div>
    </RouteEnterFreshContext.Provider>
  );
}
