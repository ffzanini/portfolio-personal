import Image from "next/image";
import { LuClock3, LuGamepad2, LuPlay } from "react-icons/lu";
import { pixeloidSans, pixeloidSansBold } from "@/app/fonts";
import type { YouTubeVideo } from "@/libs/youtube";
import { cn } from "@/libs/cn";

type VideoCardProps = {
  video: YouTubeVideo;
  index: number;
  watchLabel: string;
  isLatest?: boolean;
  latestBadge?: string;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function VideoCard({
  video,
  index,
  watchLabel,
  isLatest = false,
  latestBadge,
}: Readonly<VideoCardProps>) {
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
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video overflow-hidden border-b border-black/10 dark:border-white/10"
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/35">
          <span className="flex h-12 w-12 items-center justify-center rounded-none bg-primary-600 text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            <LuPlay className="h-5 w-5 translate-x-0.5" />
          </span>
        </span>
        {isLatest && latestBadge && (
          <span
            className={cn(
              pixeloidSansBold.className,
              "absolute left-3 top-3 rounded-none bg-primary-600 px-2 py-1 text-[10px] uppercase tracking-wide text-white",
            )}
          >
            {latestBadge}
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-primary-100 text-primary-700 dark:bg-primary-900/60 dark:text-primary-300">
            <LuGamepad2 className="h-4 w-4" />
          </span>
          <h3
            className={cn(
              pixeloidSansBold.className,
              "line-clamp-2 text-base leading-snug",
            )}
          >
            {video.title}
          </h3>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          <p
            className={cn(
              pixeloidSans.className,
              "flex items-center gap-1.5 text-xs text-black/55 dark:text-white/55",
            )}
          >
            <LuClock3 className="h-3.5 w-3.5" />
            {formatDate(video.publishedAt)}
          </p>

          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              pixeloidSansBold.className,
              "inline-flex items-center gap-1 rounded-none bg-primary-600 px-3 py-2 text-xs text-white",
              "transition-[transform,background-color] duration-150 ease-out",
              "hover:bg-primary-700 active:scale-[0.97]",
            )}
          >
            {watchLabel}
            <LuPlay className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
