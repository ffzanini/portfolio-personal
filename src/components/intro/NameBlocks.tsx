"use client";

import { useEffect, useRef, useState } from "react";

import { pixeloidSansBold } from "@/app/fonts-pixeloid";
import { cn } from "@/libs/cn";

const WORD = "FELIPE FRANTZ ZANINI";
const LABEL = "Felipe Frantz Zanini. Software Engineer";
const MOBILE_LINES = ["FELIPE", "FRANTZ", "ZANINI"];
const LAYER_MS = 28;
const CELL_MS = 3;
const HOLD_MS = 380;
const MOBILE_CASCADE_MS = 1200;
const LOADING_EXTRA_MS = 900;

type Cell = {
  col: number;
  row: number;
  delay: number;
};

type NameBlocksProps = {
  active: boolean;
  onDone: () => void;
  onDuration?: (durationMs: number) => void;
  onNameSettled?: () => void;
};

function sampleLine(family: string, cell: number, fontSize: number, text: string): Cell[] {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];

  const font = `${fontSize}px ${family}`;
  context.font = font;
  const measured = context.measureText(text);
  const width = Math.ceil(measured.width) + cell * 2;
  const height = Math.ceil(fontSize * 1.35) + cell;
  canvas.width = width;
  canvas.height = height;
  context.font = font;
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#ffffff";
  context.textBaseline = "top";
  context.fillText(text, cell, cell / 2);

  const image = context.getImageData(0, 0, width, height);
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const occupied: Cell[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      let samples = 0;
      let ink = 0;
      const x0 = col * cell;
      const y0 = row * cell;
      for (let sy = y0; sy < y0 + cell; sy += 1) {
        for (let sx = x0; sx < x0 + cell; sx += 1) {
          if (sx >= width || sy >= height) continue;
          samples += 1;
          const alpha = image.data[(sy * width + sx) * 4 + 3] ?? 0;
          if (alpha > 140) ink += 1;
        }
      }
      if (samples > 0 && ink / samples >= 0.28) occupied.push({ col, row });
    }
  }

  if (occupied.length === 0) return [];

  let minCol = occupied[0]?.col ?? 0;
  let minRow = occupied[0]?.row ?? 0;
  for (const item of occupied) {
    if (item.col < minCol) minCol = item.col;
    if (item.row < minRow) minRow = item.row;
  }
  return occupied.map((item) => ({
    col: item.col - minCol,
    row: item.row - minRow,
    delay: 0,
  }));
}

function lineDelay(row: number, col: number) {
  return row * LAYER_MS + col * CELL_MS;
}

function layoutName(family: string, viewport: number) {
  const narrow = viewport < 640;
  const lines = narrow ? MOBILE_LINES : [WORD];
  let fontSize = narrow ? 72 : 64;
  const maxWidth = Math.max(220, viewport * (narrow ? 0.9 : 0.86));
  const probe = document.createElement("canvas").getContext("2d");
  if (probe) {
    while (fontSize > (narrow ? 52 : 42)) {
      probe.font = `${fontSize}px ${family}`;
      const widest = Math.max(...lines.map((line) => probe.measureText(line).width));
      if (widest <= maxWidth) break;
      fontSize -= 2;
    }
  }

  const cellSize = narrow ? 4 : fontSize >= 64 ? 6 : 5;
  const sampled = lines.map((line) => sampleLine(family, cellSize, fontSize, line));
  const widths = sampled.map((cells) =>
    cells.length === 0 ? 1 : cells.reduce((max, cell) => Math.max(max, cell.col), 0) + 1,
  );
  const blockCols = Math.max(1, ...widths);
  const placed: Cell[] = [];
  let rowOffset = 0;
  let nameEnd = 0;

  sampled.forEach((cells, index) => {
    const offset = Math.floor((blockCols - (widths[index] ?? 1)) / 2);
    const lineRows = cells.length === 0 ? 1 : cells.reduce((max, cell) => Math.max(max, cell.row), 0) + 1;
    for (const cell of cells) {
      const delay = lineDelay(cell.row, cell.col);
      if (delay > nameEnd) nameEnd = delay;
      placed.push({ col: cell.col + offset, row: cell.row + rowOffset, delay });
    }
    rowOffset += lineRows + (narrow ? 1 : 0);
  });

  const scale = narrow && nameEnd > MOBILE_CASCADE_MS ? MOBILE_CASCADE_MS / nameEnd : 1;
  for (const cell of placed) cell.delay *= scale;

  return { cells: placed, cellSize, nameSettledMs: nameEnd * scale };
}

function cleanFamily(family: string) {
  return (
    family
      .split(",")[0]
      ?.replaceAll(/['"]/g, "")
      .trim() || "pixeloidSansBold"
  );
}

export function NameBlocks({ active, onDone, onDuration, onNameSettled }: Readonly<NameBlocksProps>) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [cellSize, setCellSize] = useState(8);
  const onDoneRef = useRef(onDone);
  const onDurationRef = useRef(onDuration);
  const onNameSettledRef = useRef(onNameSettled);
  const rootRef = useRef<HTMLDivElement>(null);
  onDoneRef.current = onDone;
  onDurationRef.current = onDuration;
  onNameSettledRef.current = onNameSettled;

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let timer = 0;
    let settledTimer = 0;

    const run = async () => {
      try {
        const family = cleanFamily(pixeloidSansBold.style.fontFamily);
        await Promise.race([
          document.fonts.load(`16px "${family}"`).catch(() => undefined),
          new Promise((resolve) => window.setTimeout(resolve, 150)),
        ]);
        if (cancelled) return;

        const applied = rootRef.current
          ? getComputedStyle(rootRef.current).fontFamily
          : `"${family}"`;
        const viewport = window.innerWidth;
        let next = layoutName(applied, viewport);
        if (next.cells.length === 0) {
          await new Promise((resolve) => window.setTimeout(resolve, 150));
          if (cancelled) return;
          next = layoutName(`"${family}"`, viewport);
        }

        setCellSize(next.cellSize);
        setCells(next.cells);

        const cascade = next.cells.reduce((max, cell) => Math.max(max, cell.delay), 0);
        const visibleFor =
          (next.cells.length === 0 ? 300 : cascade + HOLD_MS) + LOADING_EXTRA_MS;
        onDurationRef.current?.(visibleFor);
        settledTimer = window.setTimeout(
          () => onNameSettledRef.current?.(),
          next.nameSettledMs + 120,
        );
        timer = window.setTimeout(() => onDoneRef.current(), visibleFor);
      } catch {
        const fallback = 1600 + LOADING_EXTRA_MS;
        onDurationRef.current?.(fallback);
        timer = window.setTimeout(() => onDoneRef.current(), fallback);
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(settledTimer);
    };
  }, [active]);

  const cols = cells.reduce((max, cell) => Math.max(max, cell.col), 0);
  const rows = cells.reduce((max, cell) => Math.max(max, cell.row), 0);

  return (
    <div ref={rootRef} className={cn(pixeloidSansBold.className, "intro-name")} aria-hidden={cells.length === 0}>
      <p className="sr-only">{LABEL}</p>
      <div
        className="relative"
        style={{
          width: cells.length ? (cols + 1) * cellSize : undefined,
          height: cells.length ? (rows + 1) * cellSize : undefined,
        }}
      >
        {cells.map((cell) => (
          <span
            key={`${cell.col}-${cell.row}`}
            className="intro-cell absolute bg-[#f4f1ea]"
            style={{
              left: cell.col * cellSize,
              top: cell.row * cellSize,
              width: Math.max(cellSize - 1, 1),
              height: Math.max(cellSize - 1, 1),
              animationDelay: `${cell.delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
