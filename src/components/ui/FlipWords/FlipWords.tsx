"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: Readonly<{
  words: string[];
  duration?: number;
  className?: string;
}>) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [exitWord, setExitWord] = useState<string | null>(null);

  const [animKey, setAnimKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const indexRef = useRef(0);
  const wordsRef = useRef(words);

  useEffect(() => {
    const prev = wordsRef.current;
    if (words[0] === prev[0] && words.length === prev.length) return;
    wordsRef.current = words;
    indexRef.current = 0;
    setCurrentIdx(0);
    setExitWord(null);
    setAnimKey(0);
    setBusy(false);
  }, [words]);

  useEffect(() => {
    if (busy || words.length <= 1) return;
    const id = setTimeout(() => {
      const nextIdx = (indexRef.current + 1) % wordsRef.current.length;
      setExitWord(wordsRef.current[indexRef.current] ?? null);
      indexRef.current = nextIdx;
      setCurrentIdx(nextIdx);
      setAnimKey((k) => k + 1);
      setBusy(true);
    }, duration);
    return () => clearTimeout(id);
  }, [busy, duration, words.length]);

  const onExitEnd = useCallback(() => {
    setExitWord(null);
    setBusy(false);
  }, []);

  const wrapperClass = className
    ? `relative inline-block ${className}`
    : "relative inline-block";
  const wordClass =
    animKey > 0
      ? "inline-block whitespace-nowrap text-neutral-900 dark:text-neutral-100 animate-flip-in"
      : "inline-block whitespace-nowrap text-neutral-900 dark:text-neutral-100";

  return (
    <span className={wrapperClass}>
      {exitWord !== null && (
        <span
          className="absolute left-0 top-0 whitespace-nowrap text-neutral-900 dark:text-neutral-100 animate-flip-out"
          onAnimationEnd={onExitEnd}
          aria-hidden="true"
        >
          {exitWord}
        </span>
      )}
      <span key={animKey} className={wordClass}>
        {words[currentIdx] ?? ""}
      </span>
    </span>
  );
};
