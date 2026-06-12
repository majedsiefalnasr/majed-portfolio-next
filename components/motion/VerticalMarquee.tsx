"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface VerticalMarqueeProps {
  children: ReactNode;
  /** Drift bottom-to-top by default; reverse drifts top-to-bottom. */
  reverse?: boolean;
  /** Auto-drift speed in px/s. */
  speed?: number;
  /** Tailwind gap class applied between items (and between the two copies). */
  gapClass?: string;
  className?: string;
}

/**
 * Vertical "wall of love" column: content rendered twice, a rAF loop drifts
 * the track and wraps it seamlessly by one copy's height. Hovering the
 * column eases the drift down to a slow crawl rather than stopping it.
 * Reduced motion drops the loop entirely (single static copy, no transform).
 */
export function VerticalMarquee({
  children,
  reverse = false,
  speed = 18,
  gapClass = "gap-5 pb-5",
  className,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const state = useRef({ offset: 0, vel: 0, half: 0, hover: false, raf: 0, lastT: 0 });
  const baseVelRef = useRef(0);
  useEffect(() => {
    baseVelRef.current = reducedMotion ? 0 : (reverse ? -1 : 1) * speed;
  }, [reducedMotion, reverse, speed]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || reducedMotion) return;
    const s = state.current;

    const measure = () => {
      s.half = track.scrollHeight / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (t: number) => {
      const dt = Math.min((t - s.lastT) / 1000, 0.05);
      s.lastT = t;
      const target = s.hover ? baseVelRef.current * 0.2 : baseVelRef.current;
      s.vel += (target - s.vel) * Math.min(1, dt * 2.5);
      s.offset += s.vel * dt;
      if (s.half > 0) s.offset = ((s.offset % s.half) + s.half) % s.half;
      track.style.transform = `translate3d(0, ${-s.offset}px, 0)`;
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

    // Don't burn frames while the column is off screen.
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
  }, [reducedMotion]);

  const onPointerEnter = () => {
    state.current.hover = true;
  };
  const onPointerLeave = () => {
    state.current.hover = false;
  };

  const copy = cn("flex flex-col", gapClass);

  return (
    <div
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn("overflow-hidden", className)}
    >
      <div ref={trackRef} className="flex flex-col">
        <div className={copy}>{children}</div>
        <div className={cn(copy, reducedMotion && "hidden")} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
