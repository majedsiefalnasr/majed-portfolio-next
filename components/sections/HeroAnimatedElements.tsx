"use client";

import { useSyncExternalStore } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { CvLinks } from "@/components/shared/CvLinks";
import { RisingWords, wordsOf } from "@/components/motion/RisingWords";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { siteConfig } from "@/lib/site-config";

const HEADLINE = "Design that makes your product click.";
const SUBLINE = "Hey, I'm Majed 👋 For 7 years I've turned tangled products into ones people understand the moment they open them.";

/**
 * Hero entrance: word-by-word blur+opacity+rise on mount, matching the
 * SectionIntro animation used site-wide (TextIntro / RisingWords).
 * Pill, CTAs, and the supporting line stagger after the headline lands.
 */
export function HeroAnimatedElements() {
  const reducedMotion = usePrefersReducedMotion();
  // Fire on mount (hero is above the fold, not scroll-triggered).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const inView = reducedMotion || mounted;

  const headlineWords = wordsOf(HEADLINE);
  const headlineWordCount = headlineWords.length;
  // Subline waits for headline to land.
  const sublineDelay = 0.08 + headlineWordCount * 0.045;
  // Pill and CTAs appear after subline settles.
  const pillDelay = sublineDelay + 0.05;
  const ctaDelay = sublineDelay + 0.15;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Status pill */}
      <p
        className="flex items-center gap-2.5 rounded-pill bg-surface px-4 py-2 text-sm font-medium text-title ring-1 ring-ink/5"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(0.4em)",
          filter: inView ? "blur(0px)" : "blur(4px)",
          transition: `opacity 0.55s, transform 0.55s, filter 0.55s`,
          transitionDelay: `${pillDelay}s`,
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-50 [animation-duration:2.2s] motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-positive" />
        </span>
        CX &amp; Product Designer · Available for projects
      </p>

      {/* Headline — word-by-word */}
      <h1 className="max-w-3xl text-balance text-display font-semibold tracking-tight text-title">
        <RisingWords
          units={headlineWords}
          inView={inView}
          baseDelay={0.05}
          step={0.045}
        />
      </h1>

      {/* Supporting line — word-by-word, faster step */}
      <p className="max-w-xl text-pretty text-lead text-body">
        <RisingWords
          units={wordsOf(SUBLINE)}
          inView={inView}
          baseDelay={sublineDelay}
          step={0.022}
        />
      </p>

      {/* CTAs */}
      <div
        className="relative mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(0.5em)",
          filter: inView ? "blur(0px)" : "blur(4px)",
          transition: `opacity 0.55s, transform 0.55s, filter 0.55s`,
          transitionDelay: `${ctaDelay}s`,
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <CtaLink href="/case-studies">See my work</CtaLink>
        <CtaLink href={siteConfig.links.bookingEmail} variant="secondary">
          Let&apos;s talk
        </CtaLink>
      </div>

      {/* CV / Resume — quiet downloads for recruiters, after the CTAs land */}
      <CvLinks
        className="mt-1"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.55s",
          transitionDelay: `${ctaDelay + 0.12}s`,
        }}
      />
    </div>
  );
}
