"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { philosophy } from "@/data/philosophy";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
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
 * sheets sized to their content. The row moves horizontally as page scroll
 * progresses, so the section reads as one continuous argument instead of a
 * manual slider.
 */
export function DesignApproachCarousel({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "mx-[calc(50%-50vw)] w-screen",
        reducedMotion ? "" : "h-[185vh] sm:h-[215vh]",
      )}
    >
      <div
        ref={viewportRef}
        className={cn(
          "overflow-hidden",
          reducedMotion
            ? "overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "sticky top-20 flex h-[calc(100vh-9rem)] flex-col items-start pt-6",
        )}
      >
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          {children}
        </div>
        <motion.ul
          ref={trackRef}
          aria-label="Design approach principles"
          style={reducedMotion ? undefined : { x }}
          className="mt-12 flex w-max snap-x snap-mandatory gap-5 px-[max(1.25rem,calc(50vw-30.625rem))] scroll-px-[max(1.25rem,calc(50vw-30.625rem))] sm:gap-6"
        >
          {philosophy.map((item, i) => {
            const tone = tones[i % tones.length];
            return (
              <li
                key={item.title}
                className={cn(
                  "flex min-h-[17rem] w-[78vw] shrink-0 snap-start flex-col rounded-large p-7 sm:min-h-[19rem] sm:w-[21rem]",
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
        </motion.ul>
      </div>
    </div>
  );
}
