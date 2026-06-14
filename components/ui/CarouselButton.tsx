import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

/** The circular prev/next control used by every carousel in the Figma. */
export function CarouselButton({
  direction,
  onClick,
  disabled,
  className,
}: CarouselButtonProps) {
  const Chevron = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={cn(
        "focus-ring tap-feedback inline-flex size-14 items-center justify-center rounded-pill bg-paper text-title shadow-sm ring-1 ring-ink/5 enabled:hover:scale-105 enabled:hover:shadow-md disabled:opacity-40",
        className,
      )}
    >
      <Chevron className="size-5 sm:size-6" aria-hidden />
    </button>
  );
}
