import { cn } from "@/lib/utils";
import type { WorkCovers } from "@/types";
import { BrowserMock } from "@/components/shared/BrowserMock";

interface DeviceCoversProps {
  covers: WorkCovers;
  title: string;
  slug: string;
  priority?: boolean;
  className?: string;
}

const PHONE_ASPECT  = "9/19.5";
const TABLET_ASPECT = "3/4";

/**
 * Renders 1–3 device mocks based on which covers are provided.
 * All three use the same BrowserMock chrome; aspect ratio differs per device.
 *
 * 1 device  → centered, full-width
 * 2 devices → overlapping depth composition
 * 3 devices → triptych: tablet left, desktop center (raised), phone right
 */
export function DeviceCovers({ covers, title, slug, priority, className }: DeviceCoversProps) {
  const { desktop, mobile, tablet } = covers;
  const active = [
    desktop ? ("desktop" as const) : null,
    tablet  ? ("tablet"  as const) : null,
    mobile  ? ("mobile"  as const) : null,
  ].filter(Boolean) as Array<"desktop" | "tablet" | "mobile">;

  const count = active.length;

  if (count === 0) return null;

  // ── Single device ────────────────────────────────────────────────────────
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

  // ── Two devices ──────────────────────────────────────────────────────────
  if (count === 2) {
    const [primary, secondary] = active;

    // desktop + mobile
    if (primary === "desktop" && secondary === "mobile") {
      return (
        <div className={cn("relative flex items-end", className)}>
          <BrowserMock
            screenshot={desktop!}
            alt={`${title} — desktop`}
            url={`${slug}.com`}
            priority={priority}
            className="w-[84%]"
          />
          <BrowserMock
            screenshot={mobile!}
            alt={`${title} — mobile`}
            url={`${slug}.com`}
            aspect={PHONE_ASPECT}
            sizes="(min-width: 768px) 220px, 40vw"
            className="absolute bottom-0 right-0 w-[28%] drop-shadow-2xl"
          />
        </div>
      );
    }

    // desktop + tablet
    if (primary === "desktop" && secondary === "tablet") {
      return (
        <div className={cn("relative flex items-end", className)}>
          <BrowserMock
            screenshot={desktop!}
            alt={`${title} — desktop`}
            url={`${slug}.com`}
            priority={priority}
            className="w-[84%]"
          />
          <BrowserMock
            screenshot={tablet!}
            alt={`${title} — tablet`}
            url={`${slug}.com`}
            aspect={TABLET_ASPECT}
            sizes="(min-width: 768px) 320px, 60vw"
            className="absolute bottom-0 right-0 w-[38%] drop-shadow-2xl"
          />
        </div>
      );
    }

    // tablet + mobile
    if (primary === "tablet" && secondary === "mobile") {
      return (
        <div className={cn("relative flex items-end justify-center gap-4", className)}>
          <BrowserMock
            screenshot={tablet!}
            alt={`${title} — tablet`}
            url={`${slug}.com`}
            priority={priority}
            aspect={TABLET_ASPECT}
            sizes="(min-width: 768px) 320px, 60vw"
            className="w-[52%]"
          />
          <BrowserMock
            screenshot={mobile!}
            alt={`${title} — mobile`}
            url={`${slug}.com`}
            aspect={PHONE_ASPECT}
            sizes="(min-width: 768px) 220px, 40vw"
            className="w-[26%] self-end mb-4 drop-shadow-xl"
          />
        </div>
      );
    }
  }

  // ── Three devices ────────────────────────────────────────────────────────
  // tablet left, desktop center (raised), phone right-front
  return (
    <div className={cn("relative flex items-end justify-center", className)}>
      <BrowserMock
        screenshot={tablet!}
        alt={`${title} — tablet`}
        url={`${slug}.com`}
        aspect={TABLET_ASPECT}
        sizes="(min-width: 768px) 320px, 60vw"
        className="relative z-0 w-[30%] -mr-4 origin-bottom-right scale-95 opacity-90"
      />
      <BrowserMock
        screenshot={desktop!}
        alt={`${title} — desktop`}
        url={`${slug}.com`}
        priority={priority}
        className="relative z-10 w-[52%] -translate-y-4"
      />
      <BrowserMock
        screenshot={mobile!}
        alt={`${title} — mobile`}
        url={`${slug}.com`}
        aspect={PHONE_ASPECT}
        sizes="(min-width: 768px) 220px, 40vw"
        className="relative z-20 w-[18%] -ml-4 drop-shadow-2xl"
      />
    </div>
  );
}
