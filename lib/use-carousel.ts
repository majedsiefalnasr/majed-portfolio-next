import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scroll-snap carousel logic shared by the design-approach, blog, and case
 * carousels. Tracks whether prev/next are possible and scrolls by one card.
 * Consumers are client components.
 */
export function useCarousel<T extends HTMLElement = HTMLUListElement>() {
  const ref = useRef<T>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByDir = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return {
    ref,
    canPrev,
    canNext,
    scrollPrev: () => scrollByDir(-1),
    scrollNext: () => scrollByDir(1),
  };
}
