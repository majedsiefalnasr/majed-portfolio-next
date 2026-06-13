import { animate } from "motion/react";
import type { Easing } from "motion/react";

/**
 * Two topologically-different rects that render the same full-viewport
 * cover. STEP1 morphs toward a zero-height edge at the bottom (y=100),
 * STEP2 toward zero-height at the top (y=0) — each "_CURVE" overshoots
 * through the opposite edge for the liquid wobble.
 */
export const STEP1_FILLED = "M 0 100 V 0 Q 50 0 100 0 V 100 Z";
const STEP1_CURVE = "M 0 100 V 50 Q 50 100 100 50 V 100 Z";
const STEP1_UNFILLED = "M 0 100 V 100 Q 50 100 100 100 V 100 Z";

const STEP2_FILLED = "M 0 0 V 100 Q 50 100 100 100 V 0 Z";
const STEP2_CURVE = "M 0 0 V 50 Q 50 0 100 50 V 0 Z";
export const STEP2_UNFILLED = "M 0 0 V 0 Q 50 0 100 0 V 0 Z";

const easeInSine: Easing = [0.47, 0, 0.745, 0.715];
const easeOutQuint: Easing = [0.23, 1, 0.32, 1];

export type WipeDirection = "forward" | "backward";

/** Forward (entering a deeper route): wave recedes upward, bottom edge first. */
const FORWARD_WAVE = [STEP2_FILLED, STEP2_CURVE, STEP2_UNFILLED] as const;
/** Backward (returning to a shallower route): wave recedes downward, top edge first. */
const BACKWARD_WAVE = [STEP1_FILLED, STEP1_CURVE, STEP1_UNFILLED] as const;

const NUMBER = /-?\d*\.?\d+/g;

/** Morphs between two `d` strings that share the same command structure. */
function mixPath(from: string, to: string, t: number): string {
  const toNums = to.match(NUMBER)!.map(Number);
  let i = 0;
  return from.replace(NUMBER, (match) => {
    const start = Number(match);
    const value = start + (toNums[i] - start) * t;
    i++;
    return String(Math.round(value * 1000) / 1000);
  });
}

function morphSegment(path: SVGPathElement, from: string, to: string, duration: number, ease: Easing) {
  return animate(0, 1, {
    duration,
    ease,
    onUpdate: (t) => path.setAttribute("d", mixPath(from, to, t)),
  });
}

/**
 * Plays the cover -> curve -> reveal wave on `path`, jumping it to the
 * direction's full-cover shape first. Resolves once fully receded.
 * `isCancelled` is checked between segments so callers can bail on unmount.
 */
export async function playWipeReveal(
  path: SVGPathElement,
  direction: WipeDirection,
  isCancelled: () => boolean = () => false,
): Promise<void> {
  const [filled, curve, unfilled] = direction === "backward" ? BACKWARD_WAVE : FORWARD_WAVE;
  path.setAttribute("d", filled);
  await morphSegment(path, filled, curve, 0.2, easeInSine);
  if (isCancelled()) return;
  await morphSegment(path, curve, unfilled, 1, easeOutQuint);
}
