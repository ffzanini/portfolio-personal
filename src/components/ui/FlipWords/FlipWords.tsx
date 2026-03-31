"use client";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/libs/cn";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(words[0] || "");
  const [isAnimating, setIsAnimating] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const wordsRef = useRef<string[]>(words);
  const hasStartedCycleRef = useRef(false);

  useEffect(() => {
    const wordsChanged =
      words.length !== wordsRef.current.length ||
      words[0] !== wordsRef.current[0];

    if (wordsChanged && words.length > 0) {
      setCurrentWord(words[0]);
      setIsAnimating(false);
      setResetKey((prev) => prev + 1);
      wordsRef.current = words;
    }
  }, [words]);

  const currentIndex = useMemo(() => {
    const index = words.indexOf(currentWord);
    return index >= 0 ? index : 0;
  }, [currentWord, words]);

  const startAnimation = useCallback(() => {
    if (words.length === 0) return;
    const nextIndex = (currentIndex + 1) % words.length;
    hasStartedCycleRef.current = true;
    setCurrentWord(words[nextIndex]);
    setIsAnimating(true);
  }, [currentIndex, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      key={resetKey}
      onExitComplete={() => setIsAnimating(false)}
    >
      <motion.div
        key={currentWord}
        initial={
          hasStartedCycleRef.current
            ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 }
            : { opacity: 1, y: 0 }
        }
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: shouldReduceMotion ? 0 : -8,
          filter: shouldReduceMotion ? "blur(0px)" : "blur(2px)",
          position: "absolute",
        }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 0.2, ease: "easeOut" }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
      >
        <span className="inline-block whitespace-nowrap">{currentWord}</span>
      </motion.div>
    </AnimatePresence>
  );
};
