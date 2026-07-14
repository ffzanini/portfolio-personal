import Image from "next/image";
import { LuExternalLink, LuGamepad2 } from "react-icons/lu";

import type { IndieGame } from "@/app/data/arcade";
import { pixeloidSansBold } from "@/app/fonts";
import { cn } from "@/libs/cn";

type GameCardProps = {
  game: IndieGame;
  title: string;
  description: string;
  playLabel: string;
  statusLabel: string;
  index: number;
};

export function GameCard({
  game,
  title,
  description,
  playLabel,
  statusLabel,
  index,
}: Readonly<GameCardProps>) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-none",
        "bg-white-theme/80 dark:bg-dark-theme/80",
        "ring-1 ring-black/10 dark:ring-white/10",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-600/10",
        "active:scale-[0.99]",
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <a
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video overflow-hidden border-b border-black/10 dark:border-white/10 bg-dark-theme"
      >
        {game.coverImage ? (
          <Image
            src={game.coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary-900 via-primary-700 to-primary-500">
            <LuGamepad2 className="h-14 w-14 text-white/80" />
          </div>
        )}
        <span
          className={cn(
            pixeloidSansBold.className,
            "absolute left-3 top-3 rounded-none bg-black/55 px-2 py-1 text-[10px] uppercase tracking-wide text-white",
          )}
        >
          {statusLabel}
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className={cn(pixeloidSansBold.className, "text-lg leading-snug")}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-black/65 dark:text-white/65">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-none bg-black/5 px-2 py-0.5 text-[10px] uppercase tracking-wide dark:bg-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            pixeloidSansBold.className,
            "mt-auto inline-flex items-center gap-1.5 self-start rounded-none bg-primary-600 px-3 py-2 text-xs text-white",
            "transition-[transform,background-color] duration-150 ease-out",
            "hover:bg-primary-700 active:scale-[0.97]",
          )}
        >
          {playLabel}
          <LuExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
