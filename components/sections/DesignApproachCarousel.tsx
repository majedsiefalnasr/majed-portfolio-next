"use client";

import { CarouselButton } from "@/components/ui/CarouselButton";
import { Icon } from "@/components/ui/Icon";
import { philosophy } from "@/data/philosophy";
import { useCarousel } from "@/lib/use-carousel";
import { cn } from "@/lib/utils";

/** Card tones cycling the Figma violet / plum / blush / amber / mint set,
 * each with a matching icon-chip treatment. */
const tones = [
  {
    bg: "bg-accent-violet",
    title: "text-title",
    body: "text-title/75",
    chip: "bg-paper/60 text-title",
  },
  {
    bg: "bg-accent-plum",
    title: "text-paper",
    body: "text-paper/75",
    chip: "bg-paper/15 text-paper",
  },
  {
    bg: "bg-accent-blush",
    title: "text-title",
    body: "text-title/75",
    chip: "bg-paper/60 text-title",
  },
  {
    bg: "bg-pastel-amber",
    title: "text-title",
    body: "text-title/75",
    chip: "bg-paper/60 text-title",
  },
  {
    bg: "bg-pastel-green",
    title: "text-title",
    body: "text-title/75",
    chip: "bg-paper/60 text-title",
  },
];

/**
 * "Why does his design approach work?" — the five principles as colored
 * sheets sized to their content: icon chip up top, title and description
 * anchored at the base. Scroll-snap row aligned to the content box with
 * neighbors bleeding to both viewport edges (the shared slider geometry);
 * prev/next sit at the end of the row, never centered.
 */
export function DesignApproachCarousel() {
  const { ref, canPrev, canNext, scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="mx-[calc(50%-50vw)] flex w-screen flex-col gap-8">
      <ul
        ref={ref}
        aria-label="Design approach principles"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 px-[max(1.25rem,calc(50vw-30.625rem))] scroll-px-[max(1.25rem,calc(50vw-30.625rem))] sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {philosophy.map((item, i) => {
          const tone = tones[i % tones.length];
          return (
            <li
              key={item.title}
              className={cn(
                "flex min-h-[17rem] w-[78%] shrink-0 snap-start flex-col rounded-large p-7 sm:min-h-[19rem] sm:w-[21rem]",
                tone.bg,
              )}
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full",
                  tone.chip,
                )}
              >
                <Icon name={item.icon} className="size-5" aria-hidden />
              </span>
              <h3
                className={cn(
                  "mt-auto pt-10 text-h3 font-semibold text-balance",
                  tone.title,
                )}
              >
                {item.title}
              </h3>
              <p className={cn("mt-2 text-base leading-relaxed", tone.body)}>
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mx-auto flex w-full max-w-page justify-end gap-3 px-5 sm:px-8">
        <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canPrev} />
        <CarouselButton direction="next" onClick={scrollNext} disabled={!canNext} />
      </div>
    </div>
  );
}
