export type TimelineItem = {
  id: number;
  title: string;
  description: string;
  label?: string;
};

type TimelineProps = {
  items: readonly TimelineItem[];
};

export function Timeline({ items }: Readonly<TimelineProps>) {
  return (
    <ol className="relative mt-8 mb-8 md:mt-12">
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-3 w-px -translate-x-1/2 bg-black/15 md:left-1/2 dark:bg-white/20"
      />
      {items.map((item, index) => {
        const onLeft = index % 2 === 0;

        return (
          <li
            key={item.id}
            data-mount
            className="relative pb-10 last:pb-0 md:grid md:grid-cols-2 md:pb-14 md:last:pb-0"
          >
            <span
              aria-hidden
              className="absolute top-1 left-3 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary-500 md:left-1/2"
            />
            <span
              aria-hidden
              className="absolute top-[10px] left-8 h-px w-[calc(50%-3.25rem)] bg-linear-to-r from-primary-500 to-transparent md:hidden"
            />
            <div
              className={
                onLeft
                  ? "pt-5 pl-8 md:pt-0 md:pr-10 md:pl-0 md:text-right"
                  : "pt-5 pl-8 md:col-start-2 md:pt-0 md:pl-10"
              }
            >
              <p className="text-sm font-bold tabular-nums tracking-[0.14em] text-primary-600 uppercase dark:text-primary-400">
                {String(item.id).padStart(2, "0")}
                {item.label ? ` · ${item.label}` : ""}
              </p>
              <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
