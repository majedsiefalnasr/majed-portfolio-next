"use client";

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Drift right-to-left by default; reverse drifts left-to-right. */
  reverse?: boolean;
  /** Auto-drift speed in px/s. */
  speed?: number;
  /** Tailwind gap class applied between items (and between the two copies). */
  gapClass?: string;
  /**
   * Reduced-motion fallback: "wrap" recenters the items as a static wrapping
   * row (chips); "crop" leaves a draggable cropped row (large imagery).
   */
  reduced?: "wrap" | "crop";
  className?: string;
}

/**
 * Drag-enabled ticker (the Framer-template feel): content rendered twice, a
 * rAF loop drifts the track and wraps it seamlessly by one copy's width.
 * Pointer drag scrubs it directly; on release the fling decays back into the
 * base drift. The loop only runs while the ticker is on screen. Reduced
 * motion stops the drift ("crop" stays draggable, "wrap" becomes a static
 * wrapped row via CSS).
 */
export function Marquee({
  children,
  reverse = false,
  speed = 40,
  gapClass = "gap-5 pe-5",
  reduced = "crop",
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Static wrapped fallback: no drift, no drag, no transforms.
  const inert = reducedMotion && reduced === "wrap";

  const state = useRef({
    offset: 0,
    vel: 0,
    half: 0,
    dragging: false,
    lastX: 0,
    lastMoveT: 0,
    raf: 0,
    lastT: 0,
  });
  const baseVelRef = useRef(0);
  useEffect(() => {
    baseVelRef.current = reducedMotion ? 0 : (reverse ? -1 : 1) * speed;
  }, [reducedMotion, reverse, speed]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || inert) return;
    const s = state.current;

    const measure = () => {
      s.half = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (t: number) => {
      const dt = Math.min((t - s.lastT) / 1000, 0.05);
      s.lastT = t;
      if (!s.dragging) {
        // Fling velocity eases back into the base drift.
        s.vel += (baseVelRef.current - s.vel) * Math.min(1, dt * 2.5);
        s.offset += s.vel * dt;
      }
      if (s.half > 0) s.offset = ((s.offset % s.half) + s.half) % s.half;
      track.style.transform = `translate3d(${-s.offset}px, 0, 0)`;
      s.raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!s.raf) {
        s.lastT = performance.now();
        s.raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };

    // Don't burn frames while the ticker is off screen.
    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    );
    io.observe(container);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      track.style.transform = "";
    };
  }, [inert]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (inert) return;
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastMoveT = e.timeStamp;
    s.vel = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dt = (e.timeStamp - s.lastMoveT) / 1000;
    s.lastX = e.clientX;
    s.lastMoveT = e.timeStamp;
    s.offset -= dx;
    // Smoothed instantaneous velocity, clamped so a flick stays graceful.
    if (dt > 0) {
      const instant = -dx / dt;
      s.vel = Math.max(-1600, Math.min(1600, s.vel * 0.4 + instant * 0.6));
    }
  };

  const endDrag = () => {
    state.current.dragging = false;
  };

  const copy = cn("flex w-max shrink-0 items-center", gapClass);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden select-none",
        !inert && "cursor-grab active:cursor-grabbing [touch-action:pan-y]",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        ref={trackRef}
        className={cn("flex w-max", reduced === "wrap" && "motion-reduce:w-full")}
      >
        <div
          className={cn(
            copy,
            reduced === "wrap" &&
              "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center",
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            copy,
            reduced === "wrap" && "motion-reduce:hidden",
          )}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
