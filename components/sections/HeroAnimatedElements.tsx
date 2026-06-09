"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";

// Hero plays on mount (not on scroll), so keep it brief: a slow opacity ramp
// here delays the Largest Contentful Paint (the headline). Short fade, small lift.
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// No opacity fade on the headline — it's the LCP element, so it must paint
// immediately. Animate position only for a subtle settle.
const heroItem: Variants = {
  hidden: { y: 10 },
  visible: { y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/**
 * The animated portion of the Hero: headline, bio, CTAs.
 * Isolated so HeroSection itself can stay a Server Component.
 */
export function HeroAnimatedElements() {
  return (
    <motion.div
      variants={heroContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6 text-center"
    >
      <motion.h1
        variants={heroItem}
        className="max-w-3xl text-display font-semibold tracking-tight text-title text-balance"
      >
        Hey there! Let&apos;s Design Something Amazing.
      </motion.h1>
      <motion.p
        variants={heroItem}
        className="max-w-2xl text-lead text-body text-pretty"
      >
        I&apos;ve spent the last 7 years crafting seamless experiences with
        intuitive design and smart solutions. Let&apos;s make something great
        together!
      </motion.p>
      <motion.div
        variants={heroItem}
        className="relative mt-2 flex flex-wrap items-center justify-center gap-3"
      >
        <CtaLink href="/case-studies">See My Work</CtaLink>
        <CtaLink href={`mailto:${siteConfig.email}`} variant="secondary">
          Let&apos;s talk
        </CtaLink>
        {/* "What's next?" doodle badge (from Figma). */}
        <span className="pointer-events-none absolute -right-32 top-1 hidden rotate-6 select-none flex-col items-center xl:flex">
          <span className="rounded-pill bg-warning px-3 py-1 text-xs font-semibold text-ink">
            What&apos;s next?
          </span>
          <Image
            src="/hero/arrows.svg"
            alt=""
            width={56}
            height={48}
            aria-hidden
            className="mt-1 -rotate-12"
          />
        </span>
      </motion.div>
    </motion.div>
  );
}
