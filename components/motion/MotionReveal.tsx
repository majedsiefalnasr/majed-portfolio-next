"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { fadeIn, fadeUp, viewportOnce } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type MotionRevealProps = ComponentProps<typeof motion.div> & {
  /** Stagger delay (s) for sequenced reveals. */
  delay?: number;
};

/**
 * Minimal scroll-reveal wrapper — the only client surface a static section needs.
 * Replaces the eliminated ScrollReveal component (brainstorm SCAMPER "Adapt"):
 * sections stay Server Components and wrap just their animated children in this.
 */
export function MotionReveal({ delay = 0, transition, ...props }: MotionRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const variants = reducedMotion ? fadeIn : fadeUp;

  return (
    <motion.div
      variants={variants}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : delay
            ? { delay }
            : transition
      }
      {...props}
    />
  );
}
