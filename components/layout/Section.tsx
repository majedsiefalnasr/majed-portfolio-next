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
  default: "max-w-container",
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
    <Tag id={id} className={cn("w-full px-5 py-16 sm:px-8 md:py-24", className)}>
      <div className={cn("mx-auto w-full", widthClass[width])}>{children}</div>
    </Tag>
  );
}
