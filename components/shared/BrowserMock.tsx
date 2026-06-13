import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  SquareArrowOutUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BrowserMockProps {
  screenshot: string;
  alt: string;
  /** Text shown in the URL pill, e.g. "zidney.com". */
  url: string;
  /** Mark the screenshot as the LCP candidate (above-the-fold instance). */
  priority?: boolean;
  className?: string;
}

/**
 * The Figma browser-chrome frame: traffic lights, nav arrows, URL pill, and
 * the screenshot cropped to its hero. Rounded at the top only — every use
 * clips or bleeds the bottom edge. Scales its image on `group-hover`.
 */
export function BrowserMock({ screenshot, alt, url, priority, className }: BrowserMockProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-[12px] bg-white shadow-[0_30px_70px_-30px_rgba(26,26,26,0.4)] ring-1 ring-ink/5",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-pastel-red" />
          <span className="size-2.5 rounded-full bg-pastel-amber" />
          <span className="size-2.5 rounded-full bg-pastel-green" />
        </span>
        <span className="hidden items-center gap-1 text-subtle sm:flex" aria-hidden>
          <ChevronLeft size={13} />
          <ChevronRight size={13} />
        </span>
        <span className="mx-auto truncate rounded-pill bg-background px-4 py-0.5 text-[11px] text-body">
          {url}
        </span>
        <span className="hidden items-center gap-2 text-subtle sm:flex" aria-hidden>
          <SquareArrowOutUpRight size={12} />
          <Plus size={13} />
          <Copy size={12} />
        </span>
      </div>
      <div className="relative aspect-15/8 w-full overflow-hidden bg-white">
        <Image
          src={screenshot}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover object-top transition-transform duration-500"
        />
      </div>
    </div>
  );
}
