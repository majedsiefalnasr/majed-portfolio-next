import Image from "next/image";
import { cn } from "@/lib/utils";
import type { DeviceType, WorkCovers } from "@/types";
import { BrowserMock } from "@/components/shared/BrowserMock";
import { DeviceFrame } from "@/components/shared/DeviceFrame";

interface DeviceCoversProps {
  covers: WorkCovers;
  title: string;
  slug: string;
  deviceType?: DeviceType;
  priority?: boolean;
  className?: string;
}

const PHONE_ASPECT  = "9/19.5";
const TABLET_ASPECT = "3/4";

export function DeviceCovers({ covers, title, slug, deviceType, priority, className }: DeviceCoversProps) {
  if (deviceType) {
    return (
      <DeviceShowcase
        covers={covers}
        deviceType={deviceType}
        title={title}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <LegacyDeviceCovers
      covers={covers}
      title={title}
      slug={slug}
      priority={priority}
      className={className}
    />
  );
}

// ── Figma grid layout proportions ──────────────────────────────────────────
// All items overlap in the same grid cell positioned via margin offsets.
// The grid is wider than the card — card overflow-clip handles the rest.

const LAYOUT: Record<DeviceType, {
  gridWidth: string;
  gridAspect: string;
  center: { left: string; width: string };
  side: { left: string; right: string; top: string; width: string; aspect: string };
}> = {
  desktop: {
    gridWidth: "147%",
    gridAspect: "1273/360",
    center: { left: "29.07%", width: "41.95%" },
    side: { left: "0%", right: "74.23%", top: "7.07%", width: "25.77%", aspect: "328/246" },
  },
  tablet: {
    gridWidth: "135%",
    gridAspect: "1273/360",
    center: { left: "30.42%", width: "39.14%" },
    side: { left: "0%", right: "73.27%", top: "9.56%", width: "26.63%", aspect: "311/445" },
  },
  mobile: {
    gridWidth: "115%",
    gridAspect: "1273/360",
    center: { left: "32.56%", width: "34.78%" },
    side: { left: "0%", right: "73.3%", top: "9.5%", width: "26.7%", aspect: "231/502" },
  },
};

function DeviceShowcase({
  covers,
  deviceType,
  title,
  priority,
  className,
}: {
  covers: WorkCovers;
  deviceType: DeviceType;
  title: string;
  priority?: boolean;
  className?: string;
}) {
  const centerSrc = covers[deviceType] ?? covers.desktop ?? "";
  if (!centerSrc) return null;

  const hasThree = !!covers.left && !!covers.right;
  const L = LAYOUT[deviceType];

  if (!hasThree) {
    return (
      <div className={cn("relative", className)}>
        <DeviceFrame
          type={deviceType}
          screenshot={centerSrc}
          alt={`${title} — ${deviceType}`}
          priority={priority}
          className="relative z-10 mx-auto w-[52%]"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative left-1/2 -translate-x-1/2"
        style={{ width: L.gridWidth }}
      >
        <div className="relative w-full" style={{ aspectRatio: L.gridAspect }}>
          <SidePanel
            src={covers.left!}
            alt={`${title} — detail`}
            style={{
              left: L.side.left,
              top: L.side.top,
              width: L.side.width,
            }}
            aspect={L.side.aspect}
          />
          <SidePanel
            src={covers.right!}
            alt={`${title} — detail`}
            style={{
              left: L.side.right,
              top: L.side.top,
              width: L.side.width,
            }}
            aspect={L.side.aspect}
          />
          <div
            className="absolute z-10"
            style={{ left: L.center.left, top: "0", width: L.center.width }}
          >
            <DeviceFrame
              type={deviceType}
              screenshot={centerSrc}
              alt={`${title} — ${deviceType}`}
              priority={priority}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidePanel({
  src,
  alt,
  style,
  aspect,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
  aspect: string;
}) {
  return (
    <div className="absolute" style={style}>
      <div className="relative overflow-hidden rounded-xl bg-white" style={{ aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 260px, 30vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

// ── Legacy layout (no deviceType) ──────────────────────────────────────────

function LegacyDeviceCovers({
  covers,
  title,
  slug,
  priority,
  className,
}: {
  covers: WorkCovers;
  title: string;
  slug: string;
  priority?: boolean;
  className?: string;
}) {
  const { desktop, mobile, tablet } = covers;
  const active = [
    desktop ? ("desktop" as const) : null,
    tablet  ? ("tablet"  as const) : null,
    mobile  ? ("mobile"  as const) : null,
  ].filter(Boolean) as Array<"desktop" | "tablet" | "mobile">;

  const count = active.length;

  if (count === 0) return null;

  if (count === 1) {
    const type = active[0];
    const aspect = type === "mobile" ? PHONE_ASPECT : type === "tablet" ? TABLET_ASPECT : undefined;
    const sizes =
      type === "mobile" ? "(min-width: 768px) 220px, 40vw"
      : type === "tablet" ? "(min-width: 768px) 320px, 60vw"
      : undefined;
    const src = type === "mobile" ? mobile! : type === "tablet" ? tablet! : desktop!;
    return (
      <BrowserMock
        screenshot={src}
        alt={`${title} — ${type}`}
        url={`${slug}.com`}
        priority={priority}
        aspect={aspect}
        sizes={sizes}
        className={className}
      />
    );
  }

  if (count === 2) {
    const [primary, secondary] = active;

    if (primary === "desktop" && secondary === "mobile") {
      return (
        <div className={cn("relative flex items-end", className)}>
          <BrowserMock screenshot={desktop!} alt={`${title} — desktop`} url={`${slug}.com`} priority={priority} className="w-[84%]" />
          <BrowserMock screenshot={mobile!} alt={`${title} — mobile`} url={`${slug}.com`} aspect={PHONE_ASPECT} sizes="(min-width: 768px) 220px, 40vw" className="absolute bottom-0 right-0 w-[28%] drop-shadow-2xl" />
        </div>
      );
    }

    if (primary === "desktop" && secondary === "tablet") {
      return (
        <div className={cn("relative flex items-end", className)}>
          <BrowserMock screenshot={desktop!} alt={`${title} — desktop`} url={`${slug}.com`} priority={priority} className="w-[84%]" />
          <BrowserMock screenshot={tablet!} alt={`${title} — tablet`} url={`${slug}.com`} aspect={TABLET_ASPECT} sizes="(min-width: 768px) 320px, 60vw" className="absolute bottom-0 right-0 w-[38%] drop-shadow-2xl" />
        </div>
      );
    }

    if (primary === "tablet" && secondary === "mobile") {
      return (
        <div className={cn("relative flex items-end justify-center gap-4", className)}>
          <BrowserMock screenshot={tablet!} alt={`${title} — tablet`} url={`${slug}.com`} priority={priority} aspect={TABLET_ASPECT} sizes="(min-width: 768px) 320px, 60vw" className="w-[52%]" />
          <BrowserMock screenshot={mobile!} alt={`${title} — mobile`} url={`${slug}.com`} aspect={PHONE_ASPECT} sizes="(min-width: 768px) 220px, 40vw" className="w-[26%] self-end mb-4 drop-shadow-xl" />
        </div>
      );
    }
  }

  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      <BrowserMock screenshot={tablet!} alt={`${title} — tablet`} url={`${slug}.com`} aspect={TABLET_ASPECT} sizes="(min-width: 768px) 320px, 60vw" className="relative z-0 w-[30%] -mr-4 origin-bottom-right scale-95 opacity-90" />
      <BrowserMock screenshot={desktop!} alt={`${title} — desktop`} url={`${slug}.com`} priority={priority} className="relative z-10 w-[52%] -translate-y-4" />
      <BrowserMock screenshot={mobile!} alt={`${title} — mobile`} url={`${slug}.com`} aspect={PHONE_ASPECT} sizes="(min-width: 768px) 220px, 40vw" className="relative z-20 w-[18%] -ml-4 drop-shadow-2xl" />
    </div>
  );
}
