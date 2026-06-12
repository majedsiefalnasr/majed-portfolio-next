"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scroll-scrubbed hero exit: as the hero leaves the viewport it recedes —
 * scaling down, drifting up, and dimming — so the next section feels like it
 * takes over. No-op under reduced motion.
 */
export function HeroExit({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end 0.9", "end 0.25"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <motion.div
      ref={ref}
      style={
        reducedMotion ? undefined : { scale, opacity, y, transformOrigin: "50% 100%" }
      }
    >
      {children}
    </motion.div>
  );
}
