"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/animations";

interface MotionStepProps {
  children: ReactNode;
  /** Sequencing delay (s) so steps reveal one after another. */
  index?: number;
  className?: string;
}

/** Per-step scroll-reveal wrapper for ProcessSteps. Only the wrapper is client. */
export function MotionStep({ children, index = 0, className }: MotionStepProps) {
  return (
    <motion.li
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.1 }}
      className={className}
    >
      {children}
    </motion.li>
  );
}
