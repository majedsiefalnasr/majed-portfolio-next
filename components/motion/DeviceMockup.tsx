"use client";

import { Children, useState, type ReactNode } from "react";
import { CarouselButton } from "@/components/ui/CarouselButton";
import { cn } from "@/lib/utils";

interface DeviceMockupProps {
  /** One or more slides — image, video, or interactive embed. */
  children: ReactNode;
  /** Browser address-bar label. */
  url?: string;
  className?: string;
}

/**
 * Browser-chrome frame with optional carousel.
 * Media-agnostic: accepts any children (brainstorm SCAMPER "Modify").
 * Client component for the active-slide index.
 */
export function DeviceMockup({ children, url = "zidney.com", className }: DeviceMockupProps) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const multiple = slides.length > 1;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <div className={cn("relative", className)}>
      {/* Soft floor glow + light-line under the frame (Figma "next case" depth). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-3 -z-10 h-16 rounded-[50%] bg-ink/40 blur-[55px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-ink/40 to-transparent"
      />
      <div className="relative overflow-hidden rounded-card bg-surface shadow-2xl ring-1 ring-ink/5">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-3 rounded-full bg-pastel-red" />
            <span className="size-3 rounded-full bg-pastel-orange" />
            <span className="size-3 rounded-full bg-pastel-green" />
          </div>
          <div className="mx-auto w-full max-w-md truncate rounded-pill bg-background px-4 py-1 text-center text-xs text-body">
            {url}
          </div>
        </div>
        {/* Slide viewport */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {multiple && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <CarouselButton direction="prev" onClick={() => go(-1)} />
          <span className="text-sm tabular-nums text-body">
            {index + 1} / {slides.length}
          </span>
          <CarouselButton direction="next" onClick={() => go(1)} />
        </div>
      )}
    </div>
  );
}
