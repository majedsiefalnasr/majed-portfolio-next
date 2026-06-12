"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scroll-scrubbed drift for the oversized contact email: the wordmark slides
 * gently sideways as the section passes, the ghost layer counter-drifts for
 * depth. Static under reduced motion.
 */
export function EmailDrift({
  main,
  ghost,
}: {
  main: ReactNode;
  ghost: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <div ref={ref} className="relative">
      {/* Oversized ghost layer vertically centered behind the email (Figma). */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-1/2 block"
        style={reducedMotion ? { y: "-50%" } : { x: ghostX, y: "-50%" }}
      >
        {ghost}
      </motion.span>
      <motion.span
        className="relative block"
        style={reducedMotion ? undefined : { x }}
      >
        {main}
      </motion.span>
    </div>
  );
}
