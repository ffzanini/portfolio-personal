"use client";

import Link from "next/link";
import { LuClapperboard, LuExternalLink, LuGamepad2, LuSparkles, LuYoutube } from "react-icons/lu";

import {
  featuredPixelSprites,
  ITCH_IO_PROFILE_URL,
  latestIndieGames,
} from "@/app/data/arcade";
import { pixeloidSans, pixeloidSansBold } from "@/app/fonts";
import { GameCard } from "@/components/pages/arcade/GameCard";
import { PixelArtCard } from "@/components/pages/arcade/PixelArtCard";
import { VideoCard } from "@/components/pages/arcade/VideoCard";
import { SanitizedText } from "@/components/utils";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { useTranslation } from "@/context";
import {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_LATEST_EMBED_SRC,
  type YouTubeVideo,
} from "@/libs/youtube";
import { withLocalePath } from "@/libs/i18n";
import { cn } from "@/libs/cn";

type ArcadeContentProps = {
  videos: YouTubeVideo[];
};

export function ArcadeContent({ videos }: Readonly<ArcadeContentProps>) {
  const { translations, location } = useTranslation();
  const copy = translations.arcade;

  return (
    <div
      className={cn(
        pixeloidSans.className,
        "arcade-pixel-ui relative min-h-screen overflow-hidden",
        "bg-linear-to-br from-primary-200 via-white-theme to-white-theme",
        "dark:bg-linear-to-br dark:from-primary-950 from-15% dark:via-dark-theme via-30% dark:to-dark-theme to-100%",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <main className="relative pt-20 lg:pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in mb-10 lg:mb-14">
            <h1
              className={cn(
                pixeloidSansBold.className,
                "text-4xl sm:text-5xl md:text-6xl bg-linear-to-r from-primary-400 via-primary-600 to-primary-800",
                "dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-4 p-3",
              )}
            >
              {copy.title}
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              {copy.sub_title}
            </p>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-14 lg:mb-20">
            <div className="flex flex-col items-start gap-5 order-2 lg:order-1">
              <span
                className={cn(
                  pixeloidSansBold.className,
                  "inline-flex items-center gap-2 rounded-none bg-primary-600/15 px-3 py-1.5 text-xs uppercase tracking-widest text-primary-700 dark:text-primary-300",
                )}
              >
                <LuSparkles className="h-3.5 w-3.5" />
                {copy.header.eyebrow}
              </span>
              <h2
                className={cn(
                  pixeloidSansBold.className,
                  "text-3xl sm:text-4xl leading-tight",
                )}
              >
                {copy.header.title}
              </h2>
              <SanitizedText
                json={copy.header.description}
                className="text-base sm:text-lg leading-relaxed text-black/75 dark:text-white/75"
              />
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  pixeloidSansBold.className,
                  "inline-flex items-center gap-2 rounded-none bg-linear-to-r from-primary-400 to-primary-600",
                  "px-5 py-3 text-white shadow-lg shadow-primary-600/25",
                  "transition-[transform,box-shadow] duration-200 ease-out",
                  "hover:scale-[1.02] hover:shadow-xl active:scale-[0.97]",
                )}
              >
                <LuYoutube className="h-5 w-5" />
                {copy.header.cta}
              </a>
            </div>

            <div className="order-1 lg:order-2">
              <div
                className={cn(
                  "relative overflow-hidden rounded-none",
                  "bg-black/5 dark:bg-white/5 p-2 sm:p-3",
                  "ring-1 ring-black/10 dark:ring-white/10",
                  "shadow-[6px_6px_0_0] shadow-primary-800/30 dark:shadow-primary-300/20",
                )}
              >
                <div className="relative aspect-video overflow-hidden rounded-none bg-black">
                  <iframe
                    title={copy.header.title}
                    src={YOUTUBE_LATEST_EMBED_SRC}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-14 lg:mb-20">
            <div className="mb-8 flex flex-col gap-2">
              <h2
                className={cn(
                  pixeloidSansBold.className,
                  "text-3xl flex items-center gap-3",
                )}
              >
                <span className="w-2 h-8 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded-none" />
                {copy.videos.title}
              </h2>
              <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
                {copy.videos.sub_title}
              </p>
            </div>

            {videos.length === 0 ? (
              <div className="rounded-none border border-dashed border-black/15 dark:border-white/15 p-8 text-center">
                <LuClapperboard className="mx-auto mb-3 h-8 w-8 text-primary-600" />
                <p className="mb-4 text-black/70 dark:text-white/70">
                  {copy.videos.empty}
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    pixeloidSansBold.className,
                    "inline-flex items-center gap-2 text-primary-700 dark:text-primary-300 hover:underline",
                  )}
                >
                  <LuYoutube className="h-4 w-4" />
                  {copy.header.cta}
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                    watchLabel={copy.videos.watch}
                    isLatest={index === 0}
                    latestBadge={copy.videos.latest_badge}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="mb-14 lg:mb-20">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-2">
                <h2
                  className={cn(
                    pixeloidSansBold.className,
                    "text-3xl flex items-center gap-3",
                  )}
                >
                  <span className="w-2 h-8 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded-none" />
                  {copy.games.title}
                </h2>
                <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
                  {copy.games.sub_title}
                </p>
              </div>

              <a
                href={ITCH_IO_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  pixeloidSansBold.className,
                  "inline-flex items-center justify-center gap-2 rounded-none bg-primary-600 px-5 py-2.5 text-sm text-white",
                  "transition-[transform,background-color] duration-150 ease-out",
                  "hover:bg-primary-700 active:scale-[0.97]",
                )}
              >
                {copy.games.see_all}
                <LuExternalLink className="h-4 w-4" />
              </a>
            </div>

            {latestIndieGames.length === 0 ? (
              <div className="rounded-none border border-dashed border-black/15 dark:border-white/15 p-8 text-center">
                <LuGamepad2 className="mx-auto mb-3 h-8 w-8 text-primary-600" />
                <p className="mb-4 text-black/70 dark:text-white/70">
                  {copy.games.empty}
                </p>
                <a
                  href={ITCH_IO_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    pixeloidSansBold.className,
                    "inline-flex items-center gap-2 text-primary-700 dark:text-primary-300 hover:underline",
                  )}
                >
                  {copy.games.see_all}
                  <LuExternalLink className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {latestIndieGames.map((game, index) => {
                  const item = (
                    copy.games.items as Array<{
                      id: string;
                      title: string;
                      description: string;
                    }>
                  ).find((entry) => entry.id === game.id);

                  return (
                    <GameCard
                      key={game.id}
                      game={game}
                      index={index}
                      title={item?.title ?? game.id}
                      description={item?.description ?? ""}
                      playLabel={copy.games.play}
                      statusLabel={copy.games.status[game.status]}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <section className="mb-14 lg:mb-20">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-2">
                <h2
                  className={cn(
                    pixeloidSansBold.className,
                    "text-3xl flex items-center gap-3",
                  )}
                >
                  <span className="w-2 h-8 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded-none" />
                  {copy.pixelart.title}
                </h2>
                <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-3xl">
                  {copy.pixelart.sub_title}
                </p>
              </div>

              <Link
                href={withLocalePath(location, "/arcade/pixel-art")}
                className={cn(
                  pixeloidSansBold.className,
                  "inline-flex items-center justify-center rounded-none bg-primary-600 px-5 py-2.5 text-sm text-white",
                  "transition-[transform,background-color] duration-150 ease-out",
                  "hover:bg-primary-700 active:scale-[0.97]",
                )}
              >
                {copy.pixelart.see_more}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPixelSprites.map((sprite, index) => {
                const item = copy.pixelart.items.find(
                  (entry) => entry.id === sprite.id,
                );
                if (!item) return null;

                return (
                  <PixelArtCard
                    key={sprite.id}
                    sprite={sprite}
                    title={item.title}
                    description={item.description}
                    index={index}
                    pixelSize={8}
                  />
                );
              })}
            </div>
          </section>

          <section className="rounded-none bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <LuGamepad2 className="mt-1 h-6 w-6 shrink-0 text-primary-600" />
                <div>
                  <h2 className={cn(pixeloidSansBold.className, "text-2xl")}>
                    {copy.footer.title}
                  </h2>
                  <p className="mt-1 text-black/70 dark:text-white/70">
                    {copy.footer.message}
                  </p>
                </div>
              </div>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  pixeloidSansBold.className,
                  "inline-flex items-center justify-center gap-2 rounded-none bg-primary-600 px-5 py-3 text-white",
                  "transition-[transform,background-color] duration-150 ease-out",
                  "hover:bg-primary-700 active:scale-[0.97]",
                )}
              >
                <LuYoutube className="h-5 w-5" />
                {copy.footer.cta}
              </a>
            </div>
          </section>
        </div>
      </main>
      <LazyFooter />
    </div>
  );
}
