import type { ReactNode } from "react";
import { TextIntro } from "@/components/motion/TextIntro";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  /** The conversational "question" headline. */
  headline: ReactNode;
  /** Supporting line, rendered as plain lead text under the headline. */
  children?: ReactNode;
  align?: "left" | "center";
  /** Heading level for the headline. Use `h1` for a page's first intro. */
  as?: "h1" | "h2";
  /** Play the rising-text choreography on scroll into view. */
  animate?: boolean;
  className?: string;
}

/**
 * The conversational intro that opens nearly every section: a bold question
 * headline answered by a plain supporting line, both rising in word by word
 * (TextIntro). Single source so the rhythm stays identical site-wide.
 */
export function SectionIntro({
  headline,
  children,
  align = "left",
  as: Heading = "h2",
  animate = true,
  className,
}: SectionIntroProps) {
  if (animate) {
    return (
      <TextIntro headline={headline} align={align} as={Heading} className={className}>
        {children}
      </TextIntro>
    );
  }

  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:gap-7",
        centered && "items-center text-center",
        className,
      )}
    >
      <Heading
        className={cn(
          "text-balance tracking-tight text-title",
          // Page intros sit at the section scale (Figma ~44px); question
          // headlines carry the conversational scale.
          Heading === "h1"
            ? "text-h2 max-w-2xl font-bold"
            : "text-question max-w-3xl font-bold",
        )}
      >
        {headline}
      </Heading>
      {children && (
        <p
          className={cn(
            "max-w-[44rem] text-pretty text-intro text-body [&_strong]:font-semibold [&_strong]:text-title",
            centered && "mx-auto",
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
