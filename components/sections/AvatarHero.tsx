"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CtaLink } from "@/components/ui/CtaLink";
import { siteConfig } from "@/lib/site-config";

/**
 * "Who am I?" hero: the big avatar in its soft halo with the waving hand and
 * sticky badge — the signature self-introduction from the Figma. The home
 * hero leads with the work; this page leads with the person.
 */
export function AvatarHero() {
  return (
    <div className="flex flex-col items-center gap-10 py-6 text-center sm:gap-12 sm:py-10">
      <div className="relative">
        {/* Soft pulsing halo behind the avatar (Figma), not a card frame. */}
        <span
          className="avatar-pulse-ring absolute -inset-16 rounded-full bg-white/45 blur-2xl"
          aria-hidden
        />
        <span
          className="avatar-pulse-ring avatar-pulse-ring-delayed absolute -inset-10 rounded-full bg-white/65"
          aria-hidden
        />
        <span
          className="avatar-pulse-ring avatar-pulse-ring-delayed-2 absolute -inset-12 rounded-full bg-white/45 blur-md"
          aria-hidden
        />
        <span
          className="avatar-pulse-ring avatar-pulse-ring-delayed-3 absolute -inset-14 rounded-full bg-white/35 blur-xl"
          aria-hidden
        />
        {/* Circular avatar over a faint grid. */}
        <div
          className="relative size-[188px] overflow-hidden rounded-full ring-1 ring-ink/5 sm:size-[210px]"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage:
              "linear-gradient(rgba(26,26,26,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.06) 1px, transparent 1px)",
            backgroundSize: "15px 15px",
          }}
        >
          <Image
            src="/avatar.png"
            alt="Majed Sief Alnasr"
            fill
            preload
            loading="eager"
            fetchPriority="high"
            sizes="210px"
            className="object-cover object-top"
          />
        </div>

        {/* Waving hand + "Who Am I?" sticky badge. */}
        <div className="absolute -bottom-6 -left-6 flex items-end gap-1">
          <span
            className="absolute -top-12 -left-2 -mb-1 inline-block origin-[70%_80%] animate-wave select-none text-6xl motion-reduce:animate-none z-10"
            aria-hidden
          >
            👋
          </span>
          <span className="-rotate-[7deg] rounded-pill bg-warning px-4 py-2 text-base font-semibold text-[20px] text-ink shadow-sm">
            Who Am I?
          </span>
        </div>
      </div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="max-w-3xl text-balance text-display font-semibold tracking-tight text-title">
          Hey there! I&apos;m Majed.
        </h1>
        <p className="max-w-xl text-pretty text-lead text-body">
          A CX &amp; product designer who has spent 7 years turning tangled
          products into ones people understand the moment they open them.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <CtaLink href="/work">See my work</CtaLink>
          <CtaLink href={siteConfig.links.bookingEmail} variant="secondary">
            Let&apos;s talk
          </CtaLink>
        </div>
      </motion.div>
    </div>
  );
}
