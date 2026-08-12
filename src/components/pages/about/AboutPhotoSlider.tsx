"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";

import { useTranslation } from "@/context/internacionalization-context";
import type { photos } from "@/constants/about";

type AboutPhoto = (typeof photos)[number];

type AboutPhotoSliderProps = {
  photos: readonly AboutPhoto[];
};

const SNAP_MS = 320;
const SNAP_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const DRAG_THRESHOLD_PX = 40;
const VELOCITY_THRESHOLD = 0.35;
const SIDE_OFFSET_RATIO = 0.36;
const SIDE_SCALE = 0.82;
const SIDE_OPACITY = 0.55;

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

export function AboutPhotoSlider({ photos }: Readonly<AboutPhotoSliderProps>) {
  const { translations } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    axis: "undecided" | "x" | "y";
  } | null>(null);
  const snapTimeoutRef = useRef<number>(0);
  const suppressTransitionRef = useRef(false);
  const didDragRef = useRef(false);
  const snappingRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  const count = photos.length;
  const current = photos[index];

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

  const onSidePhotoClick = (direction: -1 | 1) => {
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
      aria-label={translations.ui.photo_carousel}
      className="relative"
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative touch-pan-y overflow-hidden select-none"
      >
        <div className="mx-auto aspect-3/4! w-[52%]" aria-hidden />
        {photos.map((photo, photoIndex) => {
          const progress =
            circularDelta(photoIndex, index, count) + progressShift;
          const distance = Math.abs(progress);
          const scale = lerp(1, SIDE_SCALE, distance);
          const opacity = lerp(1, SIDE_OPACITY, distance);
          const x = progress * sideOffset;

          return (
            <div
              key={photo.src}
              className="absolute top-0 left-1/2 aspect-3/4! w-[52%] overflow-hidden rounded-lg border border-black/10 shadow-lg dark:border-white/10"
              style={{
                zIndex: Math.round(20 - distance * 10),
                opacity: distance > 1.35 ? 0 : opacity,
                transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
                transition,
                willChange: "transform",
                pointerEvents: "none",
              }}
            >
              <Image
                src={photo.src}
                alt={photoIndex === index ? photo.alt : ""}
                width={photo.width}
                height={photo.height}
                draggable={false}
                quality={75}
                sizes="(max-width: 1024px) 70vw"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}

        <button
          type="button"
          className="absolute inset-y-0 left-0 z-30 w-[24%] cursor-pointer rounded-l-lg focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white/50"
          aria-label={translations.ui.photo_previous}
          onClick={() => onSidePhotoClick(-1)}
          onKeyDown={onCarouselKeyDown}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 z-30 w-[24%] cursor-pointer rounded-r-lg focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white/50"
          aria-label={translations.ui.photo_next}
          onClick={() => onSidePhotoClick(1)}
          onKeyDown={onCarouselKeyDown}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {current.alt}
      </p>
    </section>
  );
}
