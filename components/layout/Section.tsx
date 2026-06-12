import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  /** Anchor id for in-page nav. */
  id?: string;
  className?: string;
  /** Inner content width. `prose` narrows for long-form reading. */
  width?: "default" | "prose";
  /** Render element — section by default, but e.g. `header`/`footer` when semantic. */
  as?: ElementType;
}

const widthClass = {
  default: "max-w-page",
  prose: "max-w-[680px]",
} as const;

/**
 * Layout primitive: centered, padded content well.
 * Replaces raw <section> wrappers site-wide (brainstorm SCAMPER "Substitute").
 */
export function Section({
  children,
  id,
  className,
  width = "default",
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      // Fluid vertical rhythm: ~56px on mobile up to ~112px on wide screens.
      // Tighter than the Figma's literal 200px so the page scans in a few
      // folds instead of yawning between sections. `className` still wins for
      // per-section overrides (pt-0, border-t).
      className={cn(
        "w-full px-5 py-[clamp(3.5rem,7vw,7rem)] sm:px-8",
        className,
      )}
    >
      <div className={cn("mx-auto w-full", widthClass[width])}>{children}</div>
    </Tag>
  );
}
