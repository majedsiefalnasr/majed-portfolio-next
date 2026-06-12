"use client";

import type { ReactNode } from "react";

export const RISE_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word blur+opacity+translateY reveal — the same cinematic stagger
 * used in Efferd hero-5. Each word transitions independently; pass `inView`
 * to control when the reveal fires.
 */
export function RisingWords({
  units,
  inView,
  baseDelay = 0,
  step = 0.045,
  duration = 0.55,
}: {
  units: ReactNode[];
  inView: boolean;
  baseDelay?: number;
  step?: number;
  duration?: number;
}) {
  return (
    <>
      {units.map((unit, i) => (
        <span key={i} className="inline-block whitespace-pre-wrap">
          <span
            className="inline-block"
            style={{
              opacity: inView ? 1 : 0,
              filter: inView ? "blur(0px)" : "blur(6px)",
              transform: inView ? "translateY(0)" : "translateY(0.35em)",
              transition: `opacity ${duration}s, filter ${duration}s, transform ${duration}s`,
              transitionDelay: `${baseDelay + i * step}s`,
              transitionTimingFunction: `cubic-bezier(${RISE_EASE.join(",")})`,
            }}
          >
            {unit}
          </span>
          {" "}
        </span>
      ))}
    </>
  );
}

/** Split a plain string into word-unit array for RisingWords. */
export function wordsOf(text: string): string[] {
  return text.split(" ").filter(Boolean);
}
