import type { Variants, Transition } from "motion/react";

/**
 * Shared Motion variants for scroll-triggered reveals.
 * Apply with `whileInView="visible"` + `initial="hidden"` on motion elements.
 * Used site-wide instead of a ScrollReveal wrapper (see brainstorm SCAMPER "Adapt").
 */

const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/**
 * Shared viewport config so reveals fire once, slightly before fully in view.
 * amount is low so tall sections on short viewports still cross the
 * threshold instead of staying at opacity 0.
 */
export const viewportOnce = { once: true, amount: 0.1 } as const;
