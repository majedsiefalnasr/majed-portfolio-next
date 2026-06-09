"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";

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
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : transition}
      {...props}
    />
  );
}
