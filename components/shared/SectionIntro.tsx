import Image from "next/image";
import type { ReactNode } from "react";
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
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {withAvatar && (
        <Image
          src="/avatar.svg"
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
      <h2 className="max-w-2xl text-h2 font-semibold text-title text-balance">
        {headline}
      </h2>
      {children && (
        <div className="max-w-xl text-lead text-body text-pretty">{children}</div>
      )}
    </div>
  );
}
