import Image from "next/image";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

/** Mixed landscape/portrait rhythm, like a desk strewn with work. */
const shots = [
  { src: "/work/zidney/cover.png", aspect: "aspect-[3/2]" },
  { src: "/services/ipad-notes.png", aspect: "aspect-[4/5]" },
  { src: "/work/aurora/cover.png", aspect: "aspect-[3/2]" },
  { src: "/services/ipad-keyboard.png", aspect: "aspect-[4/5]" },
  { src: "/work/bloom/cover.png", aspect: "aspect-[3/2]" },
  { src: "/work/pulse/cover.png", aspect: "aspect-[3/2]" },
];

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
      <Marquee speed={45} gapClass="gap-4 pe-4 md:gap-6 md:pe-6">
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            className={cn(
              "relative h-[240px] overflow-hidden rounded-large ring-1 ring-ink/5 md:h-[330px]",
              shot.aspect,
            )}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              priority={i < 2}
              sizes="(min-width: 768px) 500px, 360px"
              className="object-cover"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
