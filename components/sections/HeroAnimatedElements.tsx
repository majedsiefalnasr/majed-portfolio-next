"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";

/**
 * The animated portion of the Hero: headline, bio, CTAs.
 * Isolated so HeroSection itself can stay a Server Component.
 */
export function HeroAnimatedElements() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6 text-center"
    >
      <motion.span variants={fadeUp} className="text-5xl" aria-hidden>
        👋
      </motion.span>
      <motion.h1
        variants={fadeUp}
        className="max-w-3xl text-display font-semibold tracking-tight text-title text-balance"
      >
        Hey there! Let&apos;s Design Something Amazing.
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="max-w-2xl text-lead text-body text-pretty"
      >
        I&apos;ve spent the last 7 years crafting seamless experiences with
        intuitive design and smart solutions. Let&apos;s make something great
        together!
      </motion.p>
      <motion.div variants={fadeUp} className="mt-2 flex flex-wrap justify-center gap-3">
        <CtaLink href={`mailto:${siteConfig.email}`}>Let&apos;s talk</CtaLink>
        <CtaLink href="/case-studies" variant="secondary">
          View my work
        </CtaLink>
      </motion.div>
    </motion.div>
  );
}
