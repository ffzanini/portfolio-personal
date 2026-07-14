"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { LuArrowLeft, LuFilter, LuLayoutGrid } from "react-icons/lu";

import {
  PIXEL_ART_GROUPS,
  PIXEL_ART_TYPES,
  pixelSprites,
  type PixelArtGroupId,
  type PixelArtTypeId,
} from "@/app/data/arcade";
import { pixeloidSans, pixeloidSansBold } from "@/app/fonts";
import { PixelArtCard } from "@/components/pages/arcade/PixelArtCard";
import { LazyFooter } from "@/components/utils/LazyFooter";
import { useTranslation } from "@/context";
import { withLocalePath } from "@/libs/i18n";
import { cn } from "@/libs/cn";

type GroupFilter = "all" | PixelArtGroupId;
type TypeFilter = "all" | PixelArtTypeId;

export function PixelArtCollectionContent() {
  const { translations, location } = useTranslation();
  const copy = translations.arcade.pixelart;
  const collection = copy.collection;

  const [groupFilter, setGroupFilter] = useState<GroupFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [isPending, startTransition] = useTransition();

  const filteredSprites = useMemo(() => {
    return pixelSprites.filter((sprite) => {
      const groupOk = groupFilter === "all" || sprite.group === groupFilter;
      const typeOk = typeFilter === "all" || sprite.type === typeFilter;
      return groupOk && typeOk;
    });
  }, [groupFilter, typeFilter]);

  const groupedView = useMemo(() => {
    const groupsToShow =
      groupFilter === "all" ? PIXEL_ART_GROUPS : [groupFilter];

    return groupsToShow
      .map((groupId) => ({
        groupId,
        sprites: filteredSprites.filter((sprite) => sprite.group === groupId),
      }))
      .filter((group) => group.sprites.length > 0);
  }, [filteredSprites, groupFilter]);

  const getItemCopy = (id: string) =>
    copy.items.find((item) => item.id === id);

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
          <div className="mb-6">
            <Link
              href={withLocalePath(location, "/arcade")}
              className={cn(
                pixeloidSansBold.className,
                "inline-flex items-center gap-2 text-sm text-primary-700 dark:text-primary-300",
                "transition-opacity hover:opacity-80",
              )}
            >
              <LuArrowLeft className="h-4 w-4" />
              {collection.breadcrumb}
            </Link>
          </div>

          <div className="text-center animate-fade-in mb-10">
            <h1
              className={cn(
                pixeloidSansBold.className,
                "text-4xl sm:text-5xl md:text-6xl bg-linear-to-r from-primary-400 via-primary-600 to-primary-800",
                "dark:from-primary-800 dark:via-primary-600 dark:to-primary-400 bg-clip-text text-transparent mb-4 p-3",
              )}
            >
              {collection.title}
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              {collection.sub_title}
            </p>
          </div>

          <div className="mb-8 space-y-4 rounded-none bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <LuFilter className="h-5 w-5 text-primary-600" aria-hidden />
              <span className={cn(pixeloidSansBold.className, "text-sm")}>
                {collection.filter_group}
              </span>
              <button
                type="button"
                onClick={() =>
                  startTransition(() => setGroupFilter("all"))
                }
                className={cn(
                  "rounded-none px-2.5 py-1 text-xs font-semibold cursor-pointer transition-opacity",
                  isPending && "opacity-50",
                  groupFilter === "all"
                    ? "bg-primary-600 text-white"
                    : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
                )}
              >
                {collection.filter_all}
              </button>
              {PIXEL_ART_GROUPS.map((groupId) => (
                <button
                  key={groupId}
                  type="button"
                  onClick={() =>
                    startTransition(() => setGroupFilter(groupId))
                  }
                  className={cn(
                    "rounded-none px-2.5 py-1 text-xs font-semibold cursor-pointer transition-opacity",
                    isPending && "opacity-50",
                    groupFilter === groupId
                      ? "bg-primary-600 text-white"
                      : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
                  )}
                >
                  {collection.groups[groupId]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <LuLayoutGrid className="h-5 w-5 text-primary-600" aria-hidden />
              <span className={cn(pixeloidSansBold.className, "text-sm")}>
                {collection.filter_type}
              </span>
              <button
                type="button"
                onClick={() => startTransition(() => setTypeFilter("all"))}
                className={cn(
                  "rounded-none px-2.5 py-1 text-xs font-semibold cursor-pointer transition-opacity",
                  isPending && "opacity-50",
                  typeFilter === "all"
                    ? "bg-primary-600 text-white"
                    : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
                )}
              >
                {collection.filter_all}
              </button>
              {PIXEL_ART_TYPES.map((typeId) => (
                <button
                  key={typeId}
                  type="button"
                  onClick={() =>
                    startTransition(() => setTypeFilter(typeId))
                  }
                  className={cn(
                    "rounded-none px-2.5 py-1 text-xs font-semibold cursor-pointer transition-opacity",
                    isPending && "opacity-50",
                    typeFilter === typeId
                      ? "bg-primary-600 text-white"
                      : "border border-black/20 hover:bg-black/10 dark:border-white/20 dark:hover:bg-white/10",
                  )}
                >
                  {collection.types[typeId]}
                </button>
              ))}
            </div>

            <p className="text-xs text-black/55 dark:text-white/55">
              {filteredSprites.length} {collection.results}
            </p>
          </div>

          {groupedView.length === 0 ? (
            <div className="rounded-none border border-dashed border-black/15 dark:border-white/15 p-10 text-center text-black/70 dark:text-white/70">
              {collection.empty}
            </div>
          ) : (
            <div className="space-y-12">
              {groupedView.map(({ groupId, sprites }) => (
                <section key={groupId}>
                  <h2
                    className={cn(
                      pixeloidSansBold.className,
                      "mb-5 text-2xl flex items-center gap-3",
                    )}
                  >
                    <span className="w-2 h-7 bg-linear-to-b from-primary-700 to-primary-800 dark:from-primary-400 dark:to-primary-500 rounded-none" />
                    {collection.groups[groupId]}
                    <span className="text-sm font-normal text-black/45 dark:text-white/45">
                      ({sprites.length})
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sprites.map((sprite, index) => {
                      const item = getItemCopy(sprite.id);
                      if (!item) return null;

                      return (
                        <PixelArtCard
                          key={sprite.id}
                          sprite={sprite}
                          title={item.title}
                          description={item.description}
                          typeLabel={collection.types[sprite.type]}
                          index={index}
                          pixelSize={8}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <LazyFooter />
    </div>
  );
}
