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

type Phase = "idle" | "armed";

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
  const [phase, setPhase] = useState<Phase>("idle");

  useLayoutEffect(() => {
    freshRef.current = false;
  }, []);

  useLayoutEffect(() => {
    if (skip || hasPageMounted(pathname)) return;

    const play = () => {
      if (hasPageMounted(pathname) || prefersReducedMotion()) {
        markPageMounted(pathname);
        setPhase("idle");
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
        setPhase("idle");
        return;
      }
      setPhase("idle");
      stopRef.current = playSectionBuild(node, () => markPageMounted(pathname));
    };

    const root = document.documentElement;
    if (root.hasAttribute("data-intro")) {
      if (isIntroHomePath(pathname)) return;
      setPhase("armed");
      const observer = new MutationObserver(() => {
        if (root.hasAttribute("data-intro")) return;
        observer.disconnect();
        play();
      });
      observer.observe(root, {
        attributes: true,
        attributeFilter: ["data-intro"],
      });
      return () => {
        observer.disconnect();
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
      <div ref={rootRef} className={phase === "armed" ? "route-enter-armed" : undefined}>
        {children}
      </div>
    </RouteEnterFreshContext.Provider>
  );
}
