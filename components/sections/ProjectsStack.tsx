"use client";

import { createRef, useMemo, type ReactNode, type RefObject } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";
import type { Work } from "@/types";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { WorkShowcase } from "@/components/shared/WorkShowcase";

/**
 * The home "PROJECTS" scroll stack from the Figma: the oversized wordmark
 * sticks below the nav, project cards slide up over its bottom one by one,
 * and each settled card shrinks, blurs, and takes on its pastel sheet color
 * as the next one covers it — leaving the colored edges peeking above the
 * front card.
 *
 * Reduced motion keeps the exact same tree (so hydration and the useScroll
 * targets stay stable) but drops the sticky choreography and transforms,
 * leaving a plain list of the real work.
 */

/** The Figma frame shows three sheets peeking behind the front card. */
const STACK_SIZE = 4;

/** How much of each settled card stays visible above the card covering it. */
const PEEK = "clamp(16px, 1.7vw, 26px)";

/** Wordmark sticky offset (below the 64px nav). */
const WORD_TOP = "8rem";

/** Card sticky offset: the front card lands just under the wordmark's
 * baseline so it covers only the descenders, not the legible letter bodies.
 * (The earlier value cut straight through the x-height and read as a slice.) */
const cardTop = (index: number) =>
  `calc(${WORD_TOP} + clamp(60px, 10vw, 120px) + ${index} * ${PEEK})`;

/** A covering card's deformation window: from entering the viewport bottom
 * until its top nears its sticky offset. */
const COVER_OFFSET = ["start end", "start 0.3"] as const;

const blurForDepth = (depth: number) => {
  // Non-linear: the strip right behind the front card stays almost crisp,
  // the deepest one goes soft (per the Figma edges).
  if (depth <= 1) return depth * 1;
  if (depth <= 2) return 1 + (depth - 1) * 1.5;
  return 2.5 + (depth - 2) * 2.5;
};

interface ProjectsStackProps {
  workItems: Work[];
}

export function ProjectsStack({ workItems }: ProjectsStackProps) {
  const isStatic = usePrefersReducedMotion();

  // Fill the stack to the designed depth by cycling the available work
  // items; fills are inert so assistive tech only meets each one once.
  const cards = Array.from(
    { length: Math.max(workItems.length, STACK_SIZE) },
    (_, i) => workItems[i % workItems.length],
  );
  const wrapperRefs = useMemo(
    () => Array.from({ length: cards.length }, () => createRef<HTMLDivElement>()),
    [cards.length],
  );

  if (workItems.length === 0) return null;

  return (
    <div className="relative">
      <div
        aria-hidden
        className={cn("pointer-events-none", !isStatic && "sticky z-0")}
        style={
          isStatic
            ? undefined
            : { top: WORD_TOP, height: "clamp(60px, 10vw, 120px)" }
        }
      >
        <div className="flex justify-center leading-none select-none">
          <span
            className="font-extrabold tracking-[-0.04em] text-title"
            style={{ fontSize: "clamp(3.75rem, 16vw, 11.75rem)" }}
          >
            PROJECTS
          </span>
        </div>
      </div>

      {cards.map((work, index) => (
        <StackCard
          key={index}
          index={index}
          wrapperRefs={wrapperRefs}
          isFill={index >= workItems.length}
          isStatic={isStatic}
        >
          <WorkShowcase
            work={work}
            metrics="inside"
            priority={index === 0}
          />
        </StackCard>
      ))}

      {/* Holds the settled composition on screen for a beat before the whole
          stack scrolls away together (sticky range = container content). */}
      {!isStatic && <div aria-hidden className="h-[30vh]" />}
    </div>
  );
}

interface StackCardProps {
  index: number;
  wrapperRefs: RefObject<HTMLDivElement | null>[];
  isFill: boolean;
  isStatic: boolean;
  children: ReactNode;
}

/** One sticky card. Its deformation (shrink + blur; each card keeps its own
 * accent colors) is driven by the scroll progress of the cards that cover it,
 * so the sync holds at any viewport size. */
function StackCard({
  index,
  wrapperRefs,
  isFill,
  isStatic,
  children,
}: StackCardProps) {
  const last = wrapperRefs.length - 1;
  // Fixed hook count: up to three covering cards; deeper ones change nothing
  // visible behind the stack edges.
  const cover1 = useCoverProgress(wrapperRefs[Math.min(index + 1, last)]);
  const cover2 = useCoverProgress(wrapperRefs[Math.min(index + 2, last)]);
  const cover3 = useCoverProgress(wrapperRefs[Math.min(index + 3, last)]);
  const w1 = index + 1 <= last ? 1 : 0;
  const w2 = index + 2 <= last ? 1 : 0;
  const w3 = index + 3 <= last ? 1 : 0;

  const depth = useTransform(
    () => w1 * cover1.get() + w2 * cover2.get() + w3 * cover3.get(),
  );
  const scale = useTransform(depth, (d) => 1 - 0.03 * d);
  const blur = useTransform(depth, blurForDepth);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div
      ref={wrapperRefs[index]}
      className={cn(!isStatic && "sticky", isStatic && isFill && "hidden")}
      style={
        isStatic
          ? { marginTop: index === 0 ? undefined : "2.5rem" }
          : {
              top: cardTop(index),
              zIndex: index + 1,
              // Small gap: the next card enters as soon as one lands, so the
              // pinned section never feels like dead scroll.
              marginTop: index === 0 ? undefined : "10vh",
            }
      }
      inert={isFill || undefined}
    >
      <motion.div
        className="relative mx-auto w-full max-w-[62rem]"
        style={
          isStatic
            ? undefined
            : { scale, filter, transformOrigin: "50% 0%" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

function useCoverProgress(
  target: RefObject<HTMLDivElement | null>,
): MotionValue<number> {
  return useScroll({ target, offset: [...COVER_OFFSET] }).scrollYProgress;
}
