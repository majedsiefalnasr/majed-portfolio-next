import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { CaseInfoRow } from "@/components/shared/CaseInfoRow";
import { DemoTag } from "@/components/shared/DemoTag";
import { LaptopMockup } from "@/components/shared/LaptopMockup";

interface CaseStudyRowProps {
  caseStudy: CaseStudy;
  /** Laptop-screen shot (defaults to the case hero export). */
  screenshot?: string;
  /** Full-bleed banner fill behind the device. */
  bannerColor?: string;
}

/**
 * One case on the case-studies listing, per the Figma: centered brand lockup,
 * the one-line pitch, the info row, then a full-bleed colored banner with the
 * product on a MacBook overhanging both banner edges. The banner links to the
 * case study; hovering lifts the device.
 */
export function CaseStudyRow({
  caseStudy,
  screenshot,
  bannerColor,
}: CaseStudyRowProps) {
  const { slug, title, description, logo } = caseStudy;
  const shot = screenshot ?? caseStudy.screenshot ?? caseStudy.cover;
  const banner =
    bannerColor ?? caseStudy.banner ?? caseStudy.accent ?? "#30e060";

  return (
    <section className="py-24 md:py-30">
      <div className="w-full px-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-page flex-col items-center gap-8 text-center">
        {caseStudy.demo && (
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
          <CaseInfoRow caseStudy={caseStudy} />
        </MotionReveal>
        </div>
      </div>

      {/* Full-bleed banner; the device overhangs both edges onto the sand. */}
      <MotionReveal className="mt-24 md:mt-30">
        <Link
          href={`/case-studies/${slug}`}
          aria-label={`Read the ${title} case study`}
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
