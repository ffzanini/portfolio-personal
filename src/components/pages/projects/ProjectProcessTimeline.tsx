"use client";

import type { ReactNode } from "react";

import { ZoomImage } from "@/components/ui/ZoomImage";

export type TimelineStepKey =
  | "context"
  | "challenge"
  | "solution"
  | "build"
  | "result";

type ProjectProcessTimelineProps = {
  labels: {
    context: string;
    challenge: string;
    solution: string;
    build: string;
    result: string;
  };
  context: readonly string[];
  challenge: string;
  solution: string;
  featuresTitle: string;
  features: readonly string[];
  challengesTitle: string;
  challenges: readonly string[];
  results: readonly string[];
  images?: Partial<Record<TimelineStepKey, string>>;
  imageAlt: string;
};

function readTimelineImages(
  translate: unknown,
): Partial<Record<TimelineStepKey, string>> {
  if (!translate || typeof translate !== "object" || !("timelineImages" in translate)) {
    return {};
  }

  const images = translate.timelineImages;
  if (!images || typeof images !== "object") return {};

  const record = images as Record<string, unknown>;
  const steps: TimelineStepKey[] = [
    "context",
    "challenge",
    "solution",
    "build",
    "result",
  ];
  const result: Partial<Record<TimelineStepKey, string>> = {};

  for (const step of steps) {
    const value = record[step];
    if (typeof value === "string" && value) result[step] = value;
  }

  return result;
}

export { readTimelineImages };

function StepImage({ src, alt }: Readonly<{ src?: string; alt: string }>) {
  if (!src) return null;

  return (
    <ZoomImage
      className="mt-4 aspect-video w-full rounded-xl object-cover"
      src={src}
      alt={alt}
      width={1200}
      height={675}
    />
  );
}

function BulletList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-base leading-relaxed">
          <span className="text-primary-600 dark:text-primary-400" aria-hidden>
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectProcessTimeline({
  labels,
  context,
  challenge,
  solution,
  featuresTitle,
  features,
  challengesTitle,
  challenges,
  results,
  images,
  imageAlt,
}: Readonly<ProjectProcessTimelineProps>) {
  const steps: Array<{
    key: TimelineStepKey;
    title: string;
    body: ReactNode;
  }> = [
    {
      key: "context",
      title: labels.context,
      body: (
        <div className="space-y-3">
          {context.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-black/75 dark:text-white/75"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "challenge",
      title: labels.challenge,
      body: (
        <p className="text-base leading-relaxed text-black/75 dark:text-white/75">
          {challenge}
        </p>
      ),
    },
    {
      key: "solution",
      title: labels.solution,
      body: (
        <p className="text-base leading-relaxed text-black/75 dark:text-white/75">
          {solution}
        </p>
      ),
    },
    {
      key: "build",
      title: labels.build,
      body: (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-black/2 p-4 dark:border-white/10 dark:bg-white/2">
            <h4 className="mb-3 text-lg font-medium">{featuresTitle}</h4>
            <BulletList items={features} />
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/2 p-4 dark:border-white/10 dark:bg-white/2">
            <h4 className="mb-3 text-lg font-medium">{challengesTitle}</h4>
            <BulletList items={challenges} />
          </div>
        </div>
      ),
    },
    {
      key: "result",
      title: labels.result,
      body: (
        <ul className="flex flex-wrap gap-2">
          {results.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white dark:bg-primary-800"
            >
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <ol className="relative mt-2 ml-4 space-y-10 pl-8">
      {steps.map((step, stepIndex) => (
        <li key={step.key} className="relative">
          {stepIndex < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-4 -left-8 h-[calc(100%+2.5rem)] w-px -translate-x-1/2 bg-black/15 dark:bg-white/20"
            />
          )}
          <span className="absolute top-0 -left-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
            {stepIndex + 1}
          </span>
          <h3 className="text-xl font-bold">{step.title}</h3>
          <div className="mt-3">{step.body}</div>
          <StepImage src={images?.[step.key]} alt={imageAlt} />
        </li>
      ))}
    </ol>
  );
}
