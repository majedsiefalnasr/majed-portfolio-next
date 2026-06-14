"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

/** Mixed landscape/portrait rhythm, like a desk strewn with work. */
const shots = [
  { src: "/work/zidney/cover.png", aspect: "aspect-[3/2]", tilt: "-0.7deg" },
  { src: "/services/ipad-notes.png", aspect: "aspect-[4/5]", tilt: "0.8deg" },
  { src: "/work/aurora/cover.png", aspect: "aspect-[3/2]", tilt: "-0.4deg" },
  { src: "/services/ipad-keyboard.png", aspect: "aspect-[4/5]", tilt: "0.6deg" },
  { src: "/work/bloom/cover.png", aspect: "aspect-[3/2]", tilt: "-0.6deg" },
  { src: "/work/pulse/cover.png", aspect: "aspect-[3/2]", tilt: "0.5deg" },
];

function onShotAnimEnd(e: React.AnimationEvent<HTMLDivElement>) {
  (e.currentTarget as HTMLDivElement).dataset.settled = "";
}

/**
 * The hero's full-bleed strip of work drifting by under the headline. Purely
 * decorative (the projects present themselves properly one scroll below), so
 * the whole strip is hidden from assistive tech.
 */
export function HeroWorkMarquee() {
  return (
    // Full-bleed inside the hero's centered flex column: a w-screen item
    // centers itself on the viewport, no left/margin offsets needed.
    <div className="w-screen" aria-hidden>
      <Marquee speed={36} gapClass="gap-3 pe-3 sm:gap-4 sm:pe-4 md:gap-6 md:pe-6">
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            className={cn(
              "hero-work-shot relative h-[260px] overflow-hidden rounded-large ring-1 ring-ink/5 sm:h-[320px]",
              shot.aspect,
            )}
            style={{
              "--shot-index": i,
              "--shot-rest-tilt": shot.tilt,
              "--shot-tilt": shot.tilt,
            } as CSSProperties}
            onAnimationEnd={onShotAnimEnd}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="(min-width: 768px) 500px, 360px"
              className="object-cover"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
