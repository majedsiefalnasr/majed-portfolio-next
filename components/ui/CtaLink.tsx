import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface CtaLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

const base =
  "tap-feedback inline-flex h-[54px] items-center justify-center rounded-pill px-8 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/90",
  secondary: "border border-ink/15 text-title hover:bg-ink/5",
};

/** Pill CTA link. Dimensions from Figma button tokens (height 50, pill radius). */
export function CtaLink({ variant = "primary", className, ...props }: CtaLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
