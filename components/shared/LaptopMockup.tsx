import Image from "next/image";
import { cn } from "@/lib/utils";

interface LaptopMockupProps {
  screenshot: string;
  alt: string;
  /** Mark the screenshot as an above-the-fold LCP candidate. */
  priority?: boolean;
  className?: string;
}

/**
 * CSS MacBook frame from the Figma listing banners: dark display shell over a
 * wider base bar with the lid notch. The screenshot crops to its hero. Scales
 * its image slightly on `group-hover`.
 */
export function LaptopMockup({
  screenshot,
  alt,
  priority,
  className,
}: LaptopMockupProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Display shell */}
      <div className="relative mx-auto w-[84%] rounded-t-[clamp(10px,1.4vw,20px)] rounded-b-[6px] bg-[#101113] p-[1.2%] pt-[1.4%] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[clamp(6px,0.8vw,12px)] rounded-b-[3px] bg-white">
          <Image
            src={screenshot}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 760px, 84vw"
            // Slight top-origin upscale keeps the asset's cookie strip out of
            // the 16/10 display while preserving the hero crop.
            className="origin-top scale-[1.18] object-cover object-top transition-transform duration-500 group-hover:scale-[1.21]"
          />
        </div>
      </div>
      {/* Base bar with lid notch */}
      <div
        aria-hidden
        className="relative h-[clamp(8px,1.4vw,16px)] w-full rounded-b-[clamp(8px,1vw,14px)] bg-gradient-to-b from-[#43464c] via-[#2b2d31] to-[#191b1e] shadow-[0_24px_45px_-18px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute left-1/2 top-0 h-[42%] w-[12%] -translate-x-1/2 rounded-b-[6px] bg-[#101113]" />
      </div>
    </div>
  );
}
