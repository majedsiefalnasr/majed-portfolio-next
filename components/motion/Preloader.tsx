"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { STEP1_FILLED, playWipeReveal } from "@/lib/page-wipe";

const HOLD_MS = 900;
const CONTENT_FADE_S = 0.2;

/**
 * First-load splash mirroring the navbar brand mark, centered and enlarged.
 * Mounted once in the root layout, which persists across client-side
 * navigation, so it only ever appears on a hard page load. Holds, then
 * recedes via the same liquid wave used for page transitions (forward,
 * bottom-to-top) to reveal the home page underneath.
 */
export function Preloader() {
  const reducedMotion = usePrefersReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const path = pathRef.current;
    if (!path) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      setContentVisible(false);
      playWipeReveal(path, "forward", () => cancelled).then(() => {
        if (!cancelled) setDone(true);
      });
    }, HOLD_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reducedMotion]);

  if (reducedMotion || done) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[200]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={STEP1_FILLED} className="fill-ink" />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-4"
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: CONTENT_FADE_S, ease: "easeOut" }}
      >
        <span className="relative size-20 shrink-0 overflow-hidden rounded-full bg-paper ring-1 ring-paper/20">
          <Image
            src="/avatar.png"
            alt=""
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </span>
        <span className="flex flex-col">
          <span className="text-3xl uppercase leading-tight tracking-tight text-paper">
            <span className="font-bold">Majed</span>{" "}
            <span className="font-normal text-paper/85">Sief Alnasr.</span>
          </span>
          <span className="text-base font-medium text-paper/70">{siteConfig.role}</span>
        </span>
      </motion.div>
    </div>
  );
}
