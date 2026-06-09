import Image from "next/image";
import type { ReactNode } from "react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  /** The conversational "question" headline. */
  headline: ReactNode;
  /** Supporting body paragraph(s). */
  children?: ReactNode;
  /** Small label above the headline (e.g. section eyebrow). */
  eyebrow?: string;
  /** Show the avatar pill that opens the conversational rhythm. */
  withAvatar?: boolean;
  align?: "left" | "center";
  /** Heading level for the headline. Use `h1` for a page's first intro. */
  as?: "h1" | "h2";
  /** Reveal on scroll into view. */
  animate?: boolean;
  className?: string;
}

/**
 * The conversational intro pattern used across nearly every section:
 * avatar + question headline + body. Single source prevents markup drift
 * (brainstorm: appears 8–10× site-wide).
 */
export function SectionIntro({
  headline,
  children,
  eyebrow,
  withAvatar = true,
  align = "left",
  as: Heading = "h2",
  animate = true,
  className,
}: SectionIntroProps) {
  const Wrapper = animate ? MotionReveal : "div";
  return (
    <Wrapper
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {withAvatar && (
        <Image
          src="/avatar.png"
          alt="Majed Sief Alnasr"
          width={48}
          height={48}
          className="size-12 rounded-pill object-cover"
        />
      )}
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-wide text-subtle">
          {eyebrow}
        </span>
      )}
      <Heading className="max-w-2xl text-h2 font-semibold text-title text-balance">
        {headline}
      </Heading>
      {children && (
        <div className="max-w-xl text-lead text-body text-pretty">{children}</div>
      )}
    </Wrapper>
  );
}
