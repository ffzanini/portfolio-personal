import { memo } from "react";
import type { PixelSprite } from "@/app/data/arcade";
import { cn } from "@/libs/cn";

type PixelSpriteCanvasProps = {
  sprite: PixelSprite;
  className?: string;
  pixelSize?: number;
  label?: string;
};

function buildSpriteDataUrl(sprite: PixelSprite, pixelSize: number) {
  const cols = sprite.grid[0]?.length ?? 16;
  const rows = sprite.grid.length;
  const rects: string[] = [];

  for (let y = 0; y < rows; y += 1) {
    const row = sprite.grid[y] ?? [];
    for (let x = 0; x < cols; x += 1) {
      const cell = row[x] ?? 0;
      if (cell === 0) continue;
      const color = sprite.palette[cell - 1];
      if (!color) continue;
      rects.push(
        `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`,
      );
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols} ${rows}" width="${cols * pixelSize}" height="${rows * pixelSize}" shape-rendering="crispEdges">${rects.join("")}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function PixelSpriteCanvasComponent({
  sprite,
  className,
  pixelSize = 8,
  label = "",
}: Readonly<PixelSpriteCanvasProps>) {
  const cols = sprite.grid[0]?.length ?? 16;
  const rows = sprite.grid.length;

  return (
    <img
      src={buildSpriteDataUrl(sprite, pixelSize)}
      alt={label}
      width={cols * pixelSize}
      height={rows * pixelSize}
      className={cn("shrink-0", className)}
      style={{ imageRendering: "pixelated" }}
      draggable={false}
    />
  );
}

export const PixelSpriteCanvas = memo(PixelSpriteCanvasComponent);
