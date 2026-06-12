"use client";

import { CarouselButton } from "@/components/ui/CarouselButton";
import { LaptopMockup } from "@/components/shared/LaptopMockup";
import { BrowserMock } from "@/components/shared/BrowserMock";
import { useCarousel } from "@/lib/use-carousel";
import type { CaseStudy } from "@/types";

interface CaseHeroSliderProps {
  caseStudy: CaseStudy;
}

/**
 * The case-study hero from the Figma: a full-bleed center-mode slider of
 * wide presentation cards (the product on a laptop over a lime sweep, in
 * browser chrome on paper), neighbors peeking at the viewport edges,
 * circular prev/next below.
 */
export function CaseHeroSlider({ caseStudy }: CaseHeroSliderProps) {
  const { ref, canPrev, canNext, scrollPrev, scrollNext } = useCarousel();
  const { slug, title, cover } = caseStudy;
  const screenshot = caseStudy.screenshot ?? cover;

  const slides = [
    <div
      key="laptop-hero"
      className="flex h-[300px] items-center justify-center overflow-hidden rounded-card sm:h-[480px]"
      style={{
        background:
          "linear-gradient(115deg, #cde747 0%, #62cc45 48%, #cbe746 100%)",
      }}
    >
      <LaptopMockup
        screenshot={screenshot}
        alt={`${title} — product on a laptop`}
        className="w-[66%]"
      />
    </div>,
    <div
      key="browser"
      className="flex h-[300px] items-center justify-center overflow-hidden rounded-card bg-surface ring-1 ring-ink/5 sm:h-[480px]"
    >
      <BrowserMock
        screenshot={screenshot}
        alt={`${title} — product screenshot`}
        url={`${slug}.com`}
        className="w-[70%] translate-y-[6%]"
      />
    </div>,
    <div
      key="laptop-cover"
      className="flex h-[300px] items-center justify-center overflow-hidden rounded-card sm:h-[480px]"
      style={{
        background:
          "linear-gradient(245deg, #cde747 0%, #62cc45 52%, #cbe746 100%)",
      }}
    >
      <LaptopMockup
        screenshot={cover}
        alt={`${title} — another product screen on a laptop`}
        className="w-[66%]"
      />
    </div>,
  ];

  return (
    <div className="mx-[calc(50%-50vw)] flex w-screen flex-col gap-8">
      <ul
        ref={ref}
        aria-label={`${title} gallery`}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 px-[max(1.25rem,calc(50vw-30.625rem))] scroll-px-[max(1.25rem,calc(50vw-30.625rem))] sm:gap-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li key={i} className="w-[min(61.25rem,92vw)] shrink-0 snap-start">
            {slide}
          </li>
        ))}
      </ul>
      {/* Arrows at the end of the row (site-wide rule). */}
      <div className="mx-auto flex w-full max-w-page justify-end gap-3 px-5 sm:px-8">
        <CarouselButton direction="prev" onClick={scrollPrev} disabled={!canPrev} />
        <CarouselButton direction="next" onClick={scrollNext} disabled={!canNext} />
      </div>
    </div>
  );
}
