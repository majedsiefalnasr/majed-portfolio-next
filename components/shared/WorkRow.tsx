import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { WorkInfoRow } from "@/components/shared/WorkInfoRow";
import { DemoTag } from "@/components/shared/DemoTag";
import { LaptopMockup } from "@/components/shared/LaptopMockup";

interface WorkRowProps {
  work: Work;
  /** Laptop-screen shot (defaults to the work hero export). */
  screenshot?: string;
  /** Full-bleed banner fill behind the device. */
  bannerColor?: string;
}

/**
 * One project on the work listing, per the Figma: centered brand lockup,
 * the one-line pitch, the info row, then a full-bleed colored banner with the
 * product on a MacBook overhanging both banner edges. The banner links to the
 * project; hovering lifts the device.
 */
export function WorkRow({
  work,
  screenshot,
  bannerColor,
}: WorkRowProps) {
  const { slug, title, description, logo } = work;
  const shot = screenshot ?? work.screenshot ?? work.cover;
  const banner =
    bannerColor ?? work.banner ?? work.accent ?? "#30e060";

  return (
    <section className="py-24 md:py-30">
      <div className="w-full px-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-page flex-col items-center gap-8 text-center">
        {work.demo && (
          <MotionReveal>
            <DemoTag />
          </MotionReveal>
        )}
        <MotionReveal>
          {logo ? (
            <Image
              src={logo}
              alt={`${title} logo`}
              width={196}
              height={74}
              className="h-14 w-auto sm:h-[68px]"
            />
          ) : (
            <span className="text-h3 font-bold uppercase tracking-tight text-title">
              {title}
            </span>
          )}
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <p className="max-w-xl text-balance text-lead text-title">
            {description}
          </p>
        </MotionReveal>
        <MotionReveal delay={0.16}>
          <WorkInfoRow work={work} />
        </MotionReveal>
        </div>
      </div>

      {/* Full-bleed banner; the device overhangs both edges onto the sand. */}
      <MotionReveal className="mt-24 md:mt-30">
        <Link
          href={`/work/${slug}`}
          aria-label={`Read the ${title} project`}
          className="group block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
        >
          {/* Flex prevents the device's negative margins from collapsing with
              the banner; the overhang stays visual. */}
          <div
            className="flex w-full justify-center"
            style={{ backgroundColor: banner }}
          >
            <LaptopMockup
              screenshot={shot}
              alt={`${title} — product on a laptop`}
              className="-my-[3.5vw] w-[min(56rem,76vw)] transition-transform duration-500 ease-out group-hover:-translate-y-2"
            />
          </div>
        </Link>
      </MotionReveal>
    </section>
  );
}
