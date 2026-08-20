"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { LuQuote } from "react-icons/lu";

import { useTranslation } from "@/context/internacionalization-context";

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

type TestimonialsSliderProps = {
  testimonials: readonly Testimonial[];
};

const SNAP_MS = 320;
const SNAP_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const DRAG_THRESHOLD_PX = 40;
const VELOCITY_THRESHOLD = 0.35;
const SIDE_OFFSET_RATIO = 0.72;
const SIDE_SCALE = 0.9;
const SIDE_OPACITY = 0.45;
const CARD_WIDTH = "84%";

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function circularDelta(itemIndex: number, activeIndex: number, length: number) {
  let delta = itemIndex - activeIndex;
  const half = length / 2;
  if (delta > half) delta -= length;
  if (delta < -half) delta += length;
  return delta;
}

function lerp(start: number, end: number, amount: number) {
  const t = Math.min(1, Math.max(0, amount));
  return start + (end - start) * t;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function TestimonialCard({
  testimonial,
  inert,
}: Readonly<{
  testimonial: Testimonial;
  inert?: boolean;
}>) {
  return (
    <article
      aria-hidden={inert}
      className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"
    >
      {/* Opaque section-matched base so side cards never bleed through */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[color-mix(in_srgb,black_5%,var(--color-white-theme))] dark:bg-[color-mix(in_srgb,white_5%,var(--color-dark-theme))]"
      />
      {/* Same glass as the desktop grid cards */}
      <div className="relative flex h-full min-h-72 flex-col bg-black/5 p-6 dark:bg-white/5">
        <LuQuote className="mb-4 h-8 w-8 shrink-0 text-primary-600" />
        <p className="mb-6 grow text-[0.95rem] leading-relaxed italic">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="mt-auto border-t border-black/10 pt-4 dark:border-white/10">
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-black/70 dark:text-white/70">
            {testimonial.title}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSlider({
  testimonials,
}: Readonly<TestimonialsSliderProps>) {
  const { translations } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    axis: "undecided" | "x" | "y";
  } | null>(null);
  const snapTimeoutRef = useRef(0);
  const suppressTransitionRef = useRef(false);
  const didDragRef = useRef(false);
  const snappingRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [minHeight, setMinHeight] = useState(0);

  const count = testimonials.length;
  const current = testimonials[index];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => setTrackWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-measure-card]");
      let tallest = 0;
      for (const card of cards) {
        tallest = Math.max(tallest, card.offsetHeight);
      }
      setMinHeight(tallest);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [testimonials]);

  useEffect(() => {
    return () => window.clearTimeout(snapTimeoutRef.current);
  }, []);

  const jump = useCallback(
    (direction: -1 | 1) => {
      window.clearTimeout(snapTimeoutRef.current);
      snappingRef.current = false;
      suppressTransitionRef.current = true;
      setIndex((currentIndex) => wrapIndex(currentIndex + direction, count));
      setDragX(0);
      setIsDragging(false);
      requestAnimationFrame(() => {
        suppressTransitionRef.current = false;
      });
    },
    [count],
  );

  const snapTo = useCallback(
    (direction: -1 | 1) => {
      if (snappingRef.current) return;
      window.clearTimeout(snapTimeoutRef.current);
      if (reducedMotion || trackWidth === 0) {
        jump(direction);
        return;
      }

      snappingRef.current = true;
      setIsDragging(false);
      setDragX(-direction * trackWidth * SIDE_OFFSET_RATIO);

      snapTimeoutRef.current = window.setTimeout(() => {
        suppressTransitionRef.current = true;
        setIndex((currentIndex) => wrapIndex(currentIndex + direction, count));
        setDragX(0);
        snappingRef.current = false;
        requestAnimationFrame(() => {
          suppressTransitionRef.current = false;
        });
      }, SNAP_MS);
    },
    [count, jump, reducedMotion, trackWidth],
  );

  const onSideClick = (direction: -1 | 1) => {
    if (didDragRef.current || snappingRef.current) return;
    snapTo(direction);
  };

  const commitDrag = useCallback(
    (offset: number, velocity: number) => {
      const shouldAdvance =
        Math.abs(offset) > DRAG_THRESHOLD_PX ||
        Math.abs(velocity) > VELOCITY_THRESHOLD;
      if (shouldAdvance) {
        snapTo(offset < 0 ? 1 : -1);
        return;
      }
      setDragX(0);
      setIsDragging(false);
    },
    [snapTo],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    didDragRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      axis: "undecided",
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (drag.axis === "undecided") {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (drag.axis === "x") {
        didDragRef.current = true;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }

    if (drag.axis !== "x") return;

    event.preventDefault();
    drag.lastX = event.clientX;
    drag.lastTime = performance.now();
    setDragX(dx);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;

    const elapsed = Math.max(performance.now() - drag.lastTime, 16);
    const velocity = (event.clientX - drag.lastX) / elapsed;
    const offset = drag.axis === "x" ? event.clientX - drag.startX : 0;
    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.axis === "x") {
      commitDrag(offset, velocity);
      return;
    }
    setIsDragging(false);
  };

  const onCarouselKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      jump(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      jump(1);
    }
  };

  if (count === 0 || !current) return null;

  const sideOffset = trackWidth * SIDE_OFFSET_RATIO;
  const progressShift = sideOffset < 1 ? 0 : dragX / sideOffset;
  const animate =
    !isDragging && !reducedMotion && !suppressTransitionRef.current;
  const transition = animate
    ? `transform ${SNAP_MS}ms ${SNAP_EASE}, opacity ${SNAP_MS}ms ${SNAP_EASE}`
    : "none";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={translations.ui.testimonial_carousel}
      className="relative"
    >
      {/* Clipped measure tray — must not expand page scroll height */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"
        aria-hidden
      >
        <div ref={measureRef} className="mx-auto" style={{ width: CARD_WIDTH }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} data-measure-card>
              <TestimonialCard testimonial={testimonial} inert />
            </div>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative touch-pan-y overflow-hidden select-none"
        style={minHeight > 0 ? { minHeight } : undefined}
      >
        {testimonials.map((testimonial, testimonialIndex) => {
          const progress =
            circularDelta(testimonialIndex, index, count) + progressShift;
          const distance = Math.abs(progress);
          const isFront = distance < 0.45;
          const scale = lerp(1, SIDE_SCALE, distance);
          const opacity = isFront ? 1 : lerp(1, SIDE_OPACITY, distance);
          const x = progress * sideOffset;

          return (
            <div
              key={testimonial.name}
              className="absolute top-0 left-1/2 h-full isolate"
              style={{
                width: CARD_WIDTH,
                zIndex: isFront ? 40 : Math.round(12 - distance * 10),
                opacity: distance > 1.25 ? 0 : opacity,
                transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
                transition,
                willChange: "transform",
                pointerEvents: "none",
              }}
            >
              <TestimonialCard
                testimonial={testimonial}
                inert={testimonialIndex !== index}
              />
            </div>
          );
        })}

        <button
          type="button"
          className="absolute inset-y-0 left-0 z-50 w-[14%] cursor-pointer rounded-l-2xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/50"
          aria-label={translations.ui.testimonial_previous}
          onClick={() => onSideClick(-1)}
          onKeyDown={onCarouselKeyDown}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 z-50 w-[14%] cursor-pointer rounded-r-2xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/50"
          aria-label={translations.ui.testimonial_next}
          onClick={() => onSideClick(1)}
          onKeyDown={onCarouselKeyDown}
        />
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-hidden>
        {testimonials.map((testimonial, testimonialIndex) => (
          <span
            key={testimonial.name}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ${
              testimonialIndex === index
                ? "w-5 bg-primary-600 dark:bg-primary-300"
                : "w-1.5 bg-black/20 dark:bg-white/20"
            }`}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {current.name}
      </p>
    </section>
  );
}
