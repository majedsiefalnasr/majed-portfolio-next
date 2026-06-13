"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { STEP1_FILLED, STEP2_UNFILLED, playWipeReveal, type WipeDirection } from "@/lib/page-wipe";

function routeDepth(pathname: string): number {
  return pathname.split("/").filter(Boolean).length;
}

/**
 * Depth of the previously-rendered route, persisted across template
 * remounts within the session. `null` means this is the first mount —
 * the preloader plays the entry reveal instead.
 */
let previousDepth: number | null = null;

/**
 * Ink curtain that hides the new page on mount, then recedes via a liquid
 * SVG-path wave. Navigating into a deeper route (e.g. home -> work, work ->
 * a project) sweeps bottom-to-top; navigating back to a shallower route
 * (e.g. project -> work, work -> home) reverses it to top-to-bottom —
 * regardless of whether the user clicked a link or used the browser's
 * back/forward controls. Mounted per-route via app/template.tsx, so a
 * fresh instance replays the wave on every route change.
 */
export function PageTransitionWipe() {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const path = pathRef.current;
    if (!path) return;

    const depth = routeDepth(pathname);

    if (previousDepth === null) {
      // First mount of the session: the preloader handles the entry reveal.
      previousDepth = depth;
      path.setAttribute("d", STEP2_UNFILLED);
      return;
    }

    const direction: WipeDirection = depth < previousDepth ? "backward" : "forward";
    previousDepth = depth;

    let cancelled = false;
    playWipeReveal(path, direction, () => cancelled);

    return () => {
      cancelled = true;
    };
  }, [pathname, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path ref={pathRef} d={STEP1_FILLED} className="fill-ink" />
    </svg>
  );
}
