"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Page enter transition: a quiet fade-and-rise on every route change
 * (template remounts per navigation). Reduced motion gets a plain crossfade.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        // Same initial tree on server and client (hydration-safe); reduced
        // motion collapses the rise so only a crossfade remains.
        reducedMotion
          ? { opacity: { duration: 0.3 }, y: { duration: 0 } }
          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
