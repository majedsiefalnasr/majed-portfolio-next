"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scroll-scrubbed copy reveal: the quote's words ink in one after another as
 * the reader scrolls through it (the Apple long-copy treatment). Reduced
 * motion renders the text at full strength.
 */
export function InkQuote({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.45"],
  });
  const words = text.split(" ");

  return (
    <blockquote ref={ref} className={className}>
      {words.map((word, i) => (
        <InkWord
          key={i}
          progress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
          isStatic={reducedMotion}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </InkWord>
      ))}
    </blockquote>
  );
}

function InkWord({
  progress,
  start,
  end,
  isStatic,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  isStatic: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={isStatic ? undefined : { opacity }}>
      {children}
    </motion.span>
  );
}
