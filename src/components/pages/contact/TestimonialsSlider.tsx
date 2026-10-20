"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { LuChevronLeft, LuChevronRight, LuQuote } from "react-icons/lu";

import { useTranslation } from "@/context/internacionalization-context";
import { cn } from "@/libs/cn";

export type Testimonial = {
  headline: string;
  quote: string;
  name: string;
  title: string;
};

type TestimonialsSliderProps = {
  testimonials: readonly Testimonial[];
};

const DURATION_MS = 5_000;

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

function TestimonialTimer({
  paused,
  cycleKey,
  onComplete,
}: Readonly<{
  paused: boolean;
  cycleKey: number;
  onComplete: () => void;
}>) {
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [cycleKey]);

  useEffect(() => {
    if (paused) return;

    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (last === 0) last = now;
      elapsedRef.current += now - last;
      last = now;

      if (elapsedRef.current >= DURATION_MS) {
        elapsedRef.current = 0;
        setProgress(0);
        onCompleteRef.current();
        return;
      }

      setProgress(elapsedRef.current / DURATION_MS);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, cycleKey]);

  return (
    <div className="h-0.5 w-full bg-black/10 dark:bg-white/10" aria-hidden>
      <div className="h-full bg-primary-500" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

export function TestimonialsSlider({
  testimonials,
}: Readonly<TestimonialsSliderProps>) {
  const { translations } = useTranslation();
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const paused = hovered || focused;

  useEffect(() => {
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      const fine = hoverMedia.matches;
      setReducedMotion(reducedMedia.matches);
      setFinePointer(fine);
      if (fine && rootRef.current?.matches(":hover")) setHovered(true);
      if (!fine) setHovered(false);
    };
    sync();
    setMotionReady(true);
    reducedMedia.addEventListener("change", sync);
    hoverMedia.addEventListener("change", sync);
    return () => {
      reducedMedia.removeEventListener("change", sync);
      hoverMedia.removeEventListener("change", sync);
    };
  }, []);

  if (count === 0) return null;

  const activeIndex = ((index % count) + count) % count;
  const showTimer = motionReady && !reducedMotion && count > 1;

  const goTo = (next: number) => {
    setCycle((value) => value + 1);
    setIndex(((next % count) + count) % count);
  };

  const advance = () => {
    setCycle((value) => value + 1);
    setIndex((current) => (current + 1) % count);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const target = event.target;
    const inside =
      target instanceof HTMLElement &&
      event.currentTarget.contains(target) &&
      target.matches(":focus-visible");
    setFocused(inside);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    const inside =
      next instanceof HTMLElement &&
      event.currentTarget.contains(next) &&
      next.matches(":focus-visible");
    setFocused(inside);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (!finePointer || event.pointerType !== "mouse") return;
    setHovered(true);
  };

  return (
    <div
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={translations.ui.testimonial_carousel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
    >
      <div className="grid w-full min-w-0">
        {testimonials.map((testimonial, slideIndex) => {
          const active = slideIndex === activeIndex;

          return (
            <article
              key={testimonial.name}
              aria-hidden={active ? undefined : true}
              inert={active ? undefined : true}
              className={cn(
                "col-start-1 row-start-1 flex h-full min-w-0 flex-col px-5 pt-6 pb-4 transition-opacity duration-700 ease-in-out motion-reduce:transition-none sm:px-8 sm:pt-8 sm:pb-6",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <LuQuote className="h-8 w-8 text-primary-500" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold leading-tight wrap-break-word sm:text-3xl">
                {testimonial.headline}
              </h3>
              <p className="mt-2 min-w-0 flex-1 text-sm leading-relaxed wrap-break-word text-black/60 dark:text-white/60 sm:text-base">
                {testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:h-11 sm:pr-40">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                  {initials(testimonial.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold wrap-break-word">{testimonial.name}</span>
                  <span className="block text-sm wrap-break-word text-black/55 dark:text-white/55">
                    {testimonial.title}
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div
        className={cn(
          "z-10 flex h-11 items-center justify-center gap-3 px-5 pb-4 sm:absolute sm:right-8 sm:justify-end sm:px-0 sm:pb-0",
          showTimer ? "sm:bottom-[calc(1.5rem+0.125rem)]" : "sm:bottom-6",
        )}
      >
        <button
          type="button"
          className="order-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-150 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:order-2 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10"
          aria-label={translations.ui.testimonial_previous}
          onClick={() => goTo(activeIndex - 1)}
        >
          <LuChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <p className="order-2 text-sm tabular-nums text-black/55 sm:order-1 dark:text-white/55">
          <span className="sr-only">{translations.ui.testimonial_carousel} </span>
          {activeIndex + 1}/{count}
        </p>
        <button
          type="button"
          className="order-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors duration-150 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10"
          aria-label={translations.ui.testimonial_next}
          onClick={() => goTo(activeIndex + 1)}
        >
          <LuChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {showTimer && (
        <TestimonialTimer paused={paused} cycleKey={cycle} onComplete={advance} />
      )}
    </div>
  );
}
