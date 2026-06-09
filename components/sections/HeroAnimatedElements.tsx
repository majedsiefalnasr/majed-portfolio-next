"use client";

import { motion, type Variants } from "motion/react";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";

// Hero plays on mount (not on scroll), so keep it brief: a slow opacity ramp
// here delays the Largest Contentful Paint (the headline). Short fade, small lift.
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
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
      <motion.span variants={heroItem} className="text-5xl" aria-hidden>
        👋
      </motion.span>
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
      <motion.div variants={heroItem} className="mt-2 flex flex-wrap justify-center gap-3">
        <CtaLink href={`mailto:${siteConfig.email}`}>Let&apos;s talk</CtaLink>
        <CtaLink href="/case-studies" variant="secondary">
          View my work
        </CtaLink>
      </motion.div>
    </motion.div>
  );
}
