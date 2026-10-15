"use client";

import { useEffect, useRef } from "react";

import { pixeloidSansBold } from "@/app/fonts-pixeloid";
import { cn } from "@/libs/cn";

const TRACK = 16;
const CELL = 8;
const GAP = 4;
const SKY_WIDTH = 188;
const SKY_HEIGHT = 118;

type IntroLoaderProps = {
  progress: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  shade: number;
};

const PRIMARY_LIGHT = ["#ffc9d5", "#ff9db3", "#ff668b"];
const PRIMARY_DARK = ["#f32263", "#cc0447", "#aa0743"];
const HOT_CELLS = ["#ff9db3", "#ff3067", "#aa0743"];

function launchParticle(): Particle {
  return {
    x: -8 - Math.random() * 16,
    y: 6 + Math.random() * 28,
    vx: 78 + Math.random() * 48,
    vy: -42 + Math.random() * 24,
    size: Math.random() > 0.65 ? 3 : 2,
    shade: Math.floor(Math.random() * PRIMARY_LIGHT.length),
  };
}

export function IntroLoader({ progress }: Readonly<IntroLoaderProps>) {
  const ratio = Math.min(1, Math.max(0, progress));
  const filled = Math.round(ratio * TRACK);
  const head = Math.min(TRACK - 1, Math.max(0, filled - 1));
  const percent = Math.round(ratio * 100);
  const headLeft = head * (CELL + GAP);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headRef = useRef(headLeft);
  headRef.current = headLeft;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SKY_WIDTH * dpr;
    canvas.height = SKY_HEIGHT * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles: Particle[] = Array.from({ length: 7 }, () => {
      const particle = launchParticle();
      particle.x = Math.random() * SKY_WIDTH * 0.45;
      particle.y = 4 + Math.random() * 32;
      return particle;
    });
    const trackY = SKY_HEIGHT - 2;
    let last = performance.now();
    let spawnIn = 0.05;
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      spawnIn -= dt;
      if (spawnIn <= 0 && particles.length < 16) {
        particles.push(launchParticle());
        spawnIn = 0.12;
      }

      const targetX = headRef.current + CELL / 2;
      context.clearRect(0, 0, SKY_WIDTH, SKY_HEIGHT);

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        if (!particle) continue;
        particle.vy += 360 * dt;
        particle.vx += (targetX - particle.x) * 1.2 * dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        if (particle.y >= trackY || particle.x > SKY_WIDTH + 16) {
          particles.splice(index, 1);
          continue;
        }

        const nearTrack = particle.y > SKY_HEIGHT * 0.58;
        const palette = nearTrack ? PRIMARY_DARK : PRIMARY_LIGHT;
        context.fillStyle = palette[particle.shade % palette.length] ?? palette[0];
        context.fillRect(
          Math.round(particle.x),
          Math.round(particle.y),
          particle.size,
          particle.size,
        );
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="intro-loader" aria-hidden>
      <canvas ref={canvasRef} className="intro-loader-sky" />
      <span
        className={cn(pixeloidSansBold.className, "intro-loader-bubble")}
        style={{
          left: headLeft,
          transform:
            ratio < 0.22 ? "translateX(0)" : ratio > 0.78 ? "translateX(-100%)" : "translateX(-50%)",
        }}
      >
        {percent}%
      </span>
      <div className="intro-loader-track">
        {Array.from({ length: TRACK }, (_, index) => {
          const hotIndex = index - (filled - HOT_CELLS.length);
          const hotColor = hotIndex >= 0 ? HOT_CELLS[hotIndex] : undefined;

          return (
            <span
              key={index}
              className={cn("intro-loader-cell", index < filled && "is-on")}
              style={hotColor ? { background: hotColor } : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
