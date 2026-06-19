import Image from "next/image";
import { cn } from "@/lib/utils";
import type { DeviceType } from "@/types";

interface DeviceFrameProps {
  type: DeviceType;
  screenshot: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function DeviceFrame({ type, screenshot, alt, priority, className }: DeviceFrameProps) {
  const cfg = SCREEN[type];
  return (
    <div className={cn("relative", className)} style={{ aspectRatio: cfg.aspect }}>
      <div className="absolute overflow-hidden" style={cfg.screen}>
        <Image
          src={screenshot}
          alt={alt}
          fill
          priority={priority}
          sizes={cfg.sizes}
          className="object-cover object-top"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cfg.svg} alt="" aria-hidden className="relative z-10 block size-full" />
    </div>
  );
}

const SCREEN: Record<
  DeviceType,
  {
    svg: string;
    aspect: string;
    screen: React.CSSProperties;
    sizes: string;
  }
> = {
  desktop: {
    svg: "/devices/desktop.svg",
    aspect: "535/365",
    screen: { left: "1.31%", top: "1.92%", width: "97.21%", height: "80.16%" },
    sizes: "(min-width: 1024px) 500px, (min-width: 768px) 380px, 65vw",
  },
  tablet: {
    svg: "/devices/tablet.svg",
    aspect: "457/365",
    screen: {
      left: "4.14%",
      top: "5.41%",
      width: "91.43%",
      bottom: "0",
      borderRadius: "clamp(2px, 0.5vw, 8px)",
    },
    sizes: "(min-width: 1024px) 400px, (min-width: 768px) 320px, 55vw",
  },
  mobile: {
    svg: "/devices/mobile.svg",
    aspect: "301/365",
    screen: {
      left: "5.0%",
      top: "3.49%",
      width: "89.96%",
      bottom: "0",
      borderRadius: "clamp(8px, 2.5vw, 32px)",
    },
    sizes: "(min-width: 1024px) 260px, (min-width: 768px) 200px, 40vw",
  },
};
