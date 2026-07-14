"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { PixelSprite } from "@/app/data/arcade";
import { pixeloidSansBold } from "@/app/fonts";
import { cn } from "@/libs/cn";

type PixelArtCardProps = {
  sprite: PixelSprite;
  title: string;
  description: string;
  typeLabel?: string;
  index?: number;
  /** Display scale of each logical pixel */
  pixelSize?: number;
};

type ZoomComponent = ComponentType<{ children: ReactNode }>;

function getSpriteBounds(grid: number[][]) {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = -1;
  let maxY = -1;

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) return;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });

  if (maxX < 0) {
    return { minX: 0, minY: 0, width: 16, height: 16 };
  }

  return {
    minX,
    minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

function appendFilledRects(
  sprite: PixelSprite,
  offsetX: number,
  offsetY: number,
  rects: string[],
) {
  sprite.grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) return;
      const color = sprite.palette[cell - 1];
      if (!color) return;
      rects.push(
        `<rect x="${x + offsetX}" y="${y + offsetY}" width="1" height="1" fill="${color}"/>`,
      );
    });
  });
}

function buildSpriteDataUrl(sprite: PixelSprite, scale: number) {
  const bounds = getSpriteBounds(sprite.grid);
  const size = Math.max(bounds.width, bounds.height);
  const offsetX = (size - bounds.width) / 2 - bounds.minX;
  const offsetY = (size - bounds.height) / 2 - bounds.minY;
  const rects: string[] = [];

  appendFilledRects(sprite, offsetX, offsetY, rects);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size * scale}" height="${size * scale}" shape-rendering="crispEdges">${rects.join("")}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function loadZoomWrapper(): Promise<ZoomComponent> {
  const mod = await import("@/components/ui/ZoomImage/ZoomWrapper");
  return mod.ZoomWrapper as ZoomComponent;
}

function setZoomComponent(
  setZoomWrapper: Dispatch<SetStateAction<ZoomComponent | null>>,
  Zoom: ZoomComponent,
) {
  setZoomWrapper(() => Zoom);
}

function observeArtForZoom(
  el: HTMLElement,
  setZoomWrapper: Dispatch<SetStateAction<ZoomComponent | null>>,
) {
  let cancelled = false;

  const onIntersect: IntersectionObserverCallback = (entries, io) => {
    if (!entries[0]?.isIntersecting) return;
    io.disconnect();
    void loadZoomWrapper().then((Zoom) => {
      if (!cancelled) setZoomComponent(setZoomWrapper, Zoom);
    });
  };

  const io = new IntersectionObserver(onIntersect, { rootMargin: "80px" });
  io.observe(el);

  return () => {
    cancelled = true;
    io.disconnect();
  };
}

export function PixelArtCard({
  sprite,
  title,
  description,
  typeLabel,
  index = 0,
  pixelSize = 10,
}: Readonly<PixelArtCardProps>) {
  const [ZoomWrapper, setZoomWrapper] = useState<ZoomComponent | null>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const imageSrc = buildSpriteDataUrl(sprite, Math.max(pixelSize, 12));

  useEffect(() => {
    if (ZoomWrapper) return;
    const el = artRef.current;
    if (!el) return;
    return observeArtForZoom(el, setZoomWrapper);
  }, [ZoomWrapper]);

  const image = (
    <img
      src={imageSrc}
      alt={title}
      width={16 * pixelSize}
      height={16 * pixelSize}
      className={cn(
        "pixel-art-zoom-target h-full w-full object-contain object-center p-6",
        "cursor-zoom-in transition-transform duration-300 ease-out",
        "group-hover:scale-[1.03]",
      )}
      style={{ imageRendering: "pixelated" }}
      draggable={false}
    />
  );

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-none",
        "bg-black/5 dark:bg-white/5",
        "ring-1 ring-black/10 dark:ring-white/10",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/10",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        ref={artRef}
        className="pixel-art-frame relative aspect-square border-b border-black/10 dark:border-white/10 bg-dark-theme/90 dark:bg-black/50"
      >
        {ZoomWrapper ? <ZoomWrapper>{image}</ZoomWrapper> : image}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {typeLabel && (
          <span className="w-fit rounded-none bg-primary-600/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary-700 dark:text-primary-300">
            {typeLabel}
          </span>
        )}
        <h3 className={cn(pixeloidSansBold.className, "text-lg leading-snug")}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-black/65 dark:text-white/65">
          {description}
        </p>
      </div>
    </article>
  );
}
