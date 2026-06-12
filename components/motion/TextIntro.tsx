"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { RisingWords } from "@/components/motion/RisingWords";

interface TextIntroProps {
  headline: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

/**
 * The animated beat behind every SectionIntro: the question rises in word by
 * word (as if being asked), then the answer follows in the same motion as a
 * plain supporting line. Emphasis inside the answer stays ink-dark so the key
 * phrases pop. Reduced motion renders everything immediately.
 */
export function TextIntro({
  headline,
  children,
  align = "left",
  as: Heading = "h2",
  className,
}: TextIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = usePrefersReducedMotion();

  const words = typeof headline === "string" ? headline.split(" ") : null;
  const wordCount = words?.length ?? 1;
  // The answer waits for the question to land.
  const replyDelay = 0.15 + Math.min(wordCount * 0.045, 0.5);

  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-5 md:gap-7",
        centered && "items-center text-center",
        className,
      )}
    >
      <Heading
        className={cn(
          "text-balance tracking-tight text-title",
          // Question headlines carry the Figma's conversational scale; page
          // h1 intros sit a step below it.
          Heading === "h1"
            ? "text-h2 max-w-2xl font-bold"
            : "text-question max-w-3xl font-bold",
        )}
      >
        {words && !reducedMotion ? (
          <RisingWords units={words} inView={inView} baseDelay={0.05} />
        ) : (
          headline
        )}
      </Heading>

      {children && (
        <p
          className={cn(
            "max-w-[44rem] text-pretty text-intro text-body [&_strong]:font-semibold [&_strong]:text-title",
            centered && "mx-auto",
          )}
        >
          {reducedMotion ? (
            children
          ) : (
            <RisingWords
              units={toWordUnits(children)}
              inView={inView}
              baseDelay={replyDelay}
              step={0.025}
            />
          )}
        </p>
      )}
    </div>
  );
}

/** Punctuation that must stay glued to the word before it, so ".", "," or
 * "?" after an emphasized phrase doesn't become its own floating "word". */
const LEADING_PUNCT = /^[.,:;!?…)\]]/;

/** Splits mixed children into animatable word units. Elements with plain-text
 * content (<strong>) are split per word too — each word cloned into its own
 * element — so emphasized phrases still wrap naturally mid-line. */
function toWordUnits(children: ReactNode): ReactNode[] {
  const units: ReactNode[] = [];
  const push = (word: ReactNode) => {
    if (
      typeof word === "string" &&
      LEADING_PUNCT.test(word) &&
      units.length > 0
    ) {
      const prev = units.pop();
      units.push(
        <span key={`glue-${units.length}`} className="whitespace-nowrap">
          {prev}
          {word}
        </span>,
      );
      return;
    }
    units.push(word);
  };
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(" ")
        .forEach((word) => {
          if (word) push(word);
        });
    } else if (
      isValidElement(child) &&
      typeof (child as ReactElement<{ children?: ReactNode }>).props
        .children === "string"
    ) {
      const el = child as ReactElement<{ children: string }>;
      el.props.children.split(" ").forEach((word, i) => {
        if (word) units.push(cloneElement(el, { key: `${el.key}-${i}` }, word));
      });
    } else if (child != null && child !== false) {
      units.push(child);
    }
  });
  return units;
}

