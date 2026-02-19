"use client";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [currentWord, setCurrentWord] = useState(words[0] || "");
  const [isAnimating, setIsAnimating] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const wordsRef = useRef<string[]>(words);

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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
