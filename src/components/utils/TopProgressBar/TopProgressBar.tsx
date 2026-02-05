"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function TopProgressBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef(0);
  const loadedImagesRef = useRef<Set<string>>(new Set());
  const totalImagesRef = useRef(0);
  const minProgressRef = useRef(0);
  const observerRef = useRef<MutationObserver | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const completionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const trackImageLoading = () => {
    const allImages = Array.from(document.querySelectorAll("img"));

    const imagesToTrack = allImages.filter((img) => {
      const src =
        img.src ||
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        "";

      if (!src || src.startsWith("data:") || loadedImagesRef.current.has(src)) {
        return false;
      }

      if (img.complete && img.naturalHeight !== 0) {
        loadedImagesRef.current.add(src);
        return false;
      }

      return true;
    });

    const allUniqueImages = new Set<string>();
    allImages.forEach((img) => {
      const src =
        img.src ||
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        "";
      if (src && !src.startsWith("data:")) {
        allUniqueImages.add(src);
      }
    });

    totalImagesRef.current = allUniqueImages.size;

    imagesToTrack.forEach((img) => {
      const src =
        img.src ||
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        "";
      if (!src || loadedImagesRef.current.has(src)) return;

      const handleImageLoad = () => {
        loadedImagesRef.current.add(src);
        updateProgressFromImages();
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageError);
      };

      const handleImageError = () => {
        loadedImagesRef.current.add(src);
        updateProgressFromImages();
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageError);
      };

      if (img.complete && img.naturalHeight !== 0) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad, { once: true });
        img.addEventListener("error", handleImageError, { once: true });
      }
    });

    updateProgressFromImages();
  };

  const updateProgressFromImages = () => {
    let baseProgress = 20;

    if (totalImagesRef.current === 0) {
      progressRef.current = Math.max(progressRef.current, baseProgress);
      setProgress(progressRef.current);
      return;
    }

    const loadedCount = loadedImagesRef.current.size;
    const imageProgress = (loadedCount / totalImagesRef.current) * 70;

    const totalProgress = baseProgress + imageProgress;

    progressRef.current = Math.max(
      progressRef.current,
      Math.min(totalProgress, 90),
    );
    setProgress(progressRef.current);
  };

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        link.getAttribute("href") !== "#" &&
        !link.hasAttribute("download") &&
        !link.hasAttribute("target") &&
        !isLoading
      ) {
        setIsLoading(true);
        progressRef.current = 0;
        minProgressRef.current = 0;
        loadedImagesRef.current.clear();
        totalImagesRef.current = 0;
        setProgress(0);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        progressRef.current = 10;
        setProgress(10);
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [isLoading]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    loadedImagesRef.current.clear();
    totalImagesRef.current = 0;
    minProgressRef.current = 0;

    setIsLoading(true);
    progressRef.current = progressRef.current > 0 ? progressRef.current : 10;
    setProgress(progressRef.current);

    const startTracking = () => {
      setTimeout(() => {
        trackImageLoading();
      }, 100);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new MutationObserver(() => {
        trackImageLoading();
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });

      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }

      checkIntervalRef.current = setInterval(() => {
        trackImageLoading();
      }, 500);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startTracking, {
        once: true,
      });
    } else {
      startTracking();
    }

    const completeProgress = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      progressRef.current = 100;
      setProgress(100);

      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        progressRef.current = 0;
        minProgressRef.current = 0;
        loadedImagesRef.current.clear();
        totalImagesRef.current = 0;
        setProgress(0);
      }, 300);
    };

    const checkCompletion = () => {
      trackImageLoading();

      const allImagesLoaded =
        totalImagesRef.current === 0 ||
        loadedImagesRef.current.size >= totalImagesRef.current;

      if (allImagesLoaded && document.readyState === "complete") {
        completeProgress();
        return true;
      }
      return false;
    };

    if (completionIntervalRef.current) {
      clearInterval(completionIntervalRef.current);
    }

    completionIntervalRef.current = setInterval(() => {
      if (checkCompletion()) {
        if (completionIntervalRef.current) {
          clearInterval(completionIntervalRef.current);
        }
      }
    }, 200);

    if (document.readyState === "complete") {
      timeoutRef.current = setTimeout(() => {
        if (!checkCompletion()) {
          setTimeout(() => {
            checkCompletion();
            if (completionIntervalRef.current) {
              clearInterval(completionIntervalRef.current);
            }
          }, 1000);
        } else {
          if (completionIntervalRef.current) {
            clearInterval(completionIntervalRef.current);
          }
        }
      }, 300);
    } else {
      const handleLoad = () => {
        setTimeout(() => {
          if (!checkCompletion()) {
            const finalCheck = setInterval(() => {
              if (checkCompletion()) {
                clearInterval(finalCheck);
                if (completionIntervalRef.current) {
                  clearInterval(completionIntervalRef.current);
                }
              }
            }, 300);

            setTimeout(() => {
              clearInterval(finalCheck);
              if (completionIntervalRef.current) {
                clearInterval(completionIntervalRef.current);
              }
              completeProgress();
            }, 3000);
          } else {
            if (completionIntervalRef.current) {
              clearInterval(completionIntervalRef.current);
            }
          }
        }, 300);
      };

      window.addEventListener("load", handleLoad, { once: true });

      timeoutRef.current = setTimeout(() => {
        window.removeEventListener("load", handleLoad);
        if (completionIntervalRef.current) {
          clearInterval(completionIntervalRef.current);
        }
        completeProgress();
      }, 8000);

      return () => {
        window.removeEventListener("load", handleLoad);
        if (completionIntervalRef.current) {
          clearInterval(completionIntervalRef.current);
        }
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (completionIntervalRef.current) {
        clearInterval(completionIntervalRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none"
        >
          <motion.div
            className="h-full bg-linear-to-r from-primary-400 via-primary-500 to-primary-600 shadow-lg shadow-primary-500/50"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
