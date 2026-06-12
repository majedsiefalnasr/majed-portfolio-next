"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const subscribeNoop = () => () => {};

export interface LightboxImage {
  src: string;
  alt: string;
}

/** Center + width of the clicked thumbnail, for the zoom-from-origin open. */
export interface LightboxOrigin {
  x: number;
  y: number;
  w: number;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /** Where the open started (clicked tile); the panel grows out of it. */
  origin?: LightboxOrigin | null;
}

// Smooth expo-out / standard ease curves: no spring bounce.
type Ease = readonly [number, number, number, number];
const easeOut: Ease = [0.16, 1, 0.3, 1];
const easeInOut: Ease = [0.4, 0, 0.2, 1];

// A wheel/scroll gesture in either direction scrubs the close in real time:
// progress 0 = fully open, 1 = shrunk back into the origin tile.
// DISMISS_DISTANCE is how many scrolled pixels (up or down) fully close it;
// once the gesture settles, crossing DISMISS_THRESHOLD finishes the close,
// otherwise it eases back open.
const DISMISS_DISTANCE = 320;
const DISMISS_THRESHOLD = 0.3;
const WHEEL_IDLE_MS = 120;

interface ClosedState {
  opacity: number;
  scale: number;
  x: number;
  y: number;
}

/**
 * Case-study artifact lightbox: a near-fullscreen panel (small margin on
 * every side) that zooms out of the clicked thumbnail and shrinks back into
 * it on close, with smooth eased scaling and a crossfade between images. No
 * visible chrome — Escape, backdrop click, or a scroll/wheel gesture (which
 * scrubs the shrink-back in real time, completing the close or snapping back
 * open depending on how far it got) all dismiss it; arrow keys still step
 * through multi-image galleries. Built on a motion overlay portaled to
 * <body> with manual dialog semantics: focus trap, scroll lock, focus
 * restore. Reduced motion drops the scale/position scrub to an opacity-only
 * fade.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
  origin,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const open = index !== null;
  const image = open ? images[index] : null;
  const many = images.length > 1;

  // Natural aspect ratio per image, learned on load and cached by src so the
  // panel can hug the image's width once it's known; falls back to filling
  // the available width until then.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const ratio = image ? ratios[image.src] : undefined;
  const onImageLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      const key = image?.src;
      if (!key || !naturalWidth || !naturalHeight) return;
      const r = naturalWidth / naturalHeight;
      setRatios((prev) => (prev[key] === r ? prev : { ...prev, [key]: r }));
    },
    [image?.src],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null || !many) return;
      onNavigate((index + dir + images.length) % images.length);
    },
    [index, many, images.length, onNavigate],
  );

  // Panel transform + backdrop fade, driven by the open/close/scrub
  // animations below rather than declarative variants.
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const backdropOpacity = useMotionValue(0);

  // Where the panel shrinks back to: the clicked tile, or a centered soft
  // zoom if there's none. Refreshed every render so the scroll handler
  // always reads the current viewport size and origin.
  const closedStateRef = useRef<ClosedState>({
    opacity: 0,
    scale: 0.94,
    x: 0,
    y: 0,
  });
  useEffect(() => {
    closedStateRef.current =
      origin && !reducedMotion
        ? {
            opacity: 0,
            x: origin.x - window.innerWidth / 2,
            y: origin.y - window.innerHeight / 2,
            scale: Math.max(
              0.25,
              Math.min(origin.w / (window.innerWidth * 0.72), 0.85),
            ),
          }
        : { opacity: 0, scale: reducedMotion ? 1 : 0.94, x: 0, y: 0 };
  });

  const progressRef = useRef(1);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const applyProgress = useCallback(
    (p: number) => {
      const c = closedStateRef.current;
      opacity.set(1 + (c.opacity - 1) * p);
      scale.set(1 + (c.scale - 1) * p);
      x.set(c.x * p);
      y.set(c.y * p);
      backdropOpacity.set(1 - p);
    },
    [opacity, scale, x, y, backdropOpacity],
  );

  const animateProgress = useCallback(
    (target: number, duration: number, ease: Ease) => {
      animRef.current?.stop();
      const controls = animate(progressRef.current, target, {
        duration,
        ease,
        onUpdate: (p) => {
          progressRef.current = p;
          applyProgress(p);
        },
      });
      animRef.current = controls;
      return controls;
    },
    [applyProgress],
  );

  const closeWithAnimation = useCallback(() => {
    clearTimeout(wheelTimeout.current);
    animateProgress(1, reducedMotion ? 0.1 : 0.3, easeInOut).then(onClose);
  }, [animateProgress, onClose, reducedMotion]);

  // Open: start shrunk into the origin tile, then grow to fill the screen.
  useEffect(() => {
    if (!open) return;
    progressRef.current = 1;
    applyProgress(1);
    animateProgress(0, reducedMotion ? 0.1 : 0.45, easeOut);
    return () => {
      animRef.current?.stop();
    };
  }, [open, reducedMotion, applyProgress, animateProgress]);

  // Keyboard: Escape closes, arrows step through a gallery, Tab stays on
  // the panel (there's nothing else focusable inside).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWithAnimation();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeWithAnimation, step]);

  // A wheel/scroll gesture scrubs the close live; once it settles, either
  // finish closing or snap back open depending on how far it got.
  useEffect(() => {
    if (!open) return;
    const onWheel = (e: WheelEvent) => {
      const next = Math.min(
        1,
        Math.max(0, progressRef.current + Math.abs(e.deltaY) / DISMISS_DISTANCE),
      );
      animateProgress(next, 0.12, easeOut);

      clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        if (progressRef.current > DISMISS_THRESHOLD) {
          animateProgress(1, 0.2, easeOut).then(onClose);
        } else {
          animateProgress(0, 0.25, easeOut);
        }
      }, WHEEL_IDLE_MS);
    };
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      document.removeEventListener("wheel", onWheel);
      clearTimeout(wheelTimeout.current);
    };
  }, [open, animateProgress, onClose]);

  // Initial focus + focus restore. No scroll lock: the wheel handler above
  // owns scroll while open, scrubbing the close instead of the page.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  if (!mounted || !open || !image) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Image viewer"}
    >
      <motion.div
        style={{ opacity: backdropOpacity }}
        onClick={closeWithAnimation}
        aria-hidden
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
      />

      <motion.figure
        ref={panelRef}
        tabIndex={-1}
        style={{
          opacity,
          scale,
          x,
          y,
          aspectRatio: ratio,
          width: ratio ? "auto" : "100%",
        }}
        className="relative h-full max-w-full overflow-hidden rounded-large bg-background outline-none ring-1 ring-ink/10"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.35,
              ease: easeOut,
            }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              onLoad={onImageLoad}
            />
          </motion.div>
        </AnimatePresence>
      </motion.figure>
    </div>,
    document.body,
  );
}
