import type { ReactNode } from "react";
import { PageTransitionWipe } from "@/components/motion/PageTransitionWipe";

/**
 * Page enter transition: an ink wipe sweeps up off the new page on every
 * route change (template remounts per navigation, re-triggering the sweep).
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransitionWipe />
      {children}
    </>
  );
}
