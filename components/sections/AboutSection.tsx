import Image from "next/image";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { CtaLink } from "@/components/ui/CtaLink";
import { credibilityCards } from "@/data/credibility";

/**
 * "Who's behind the work?" — human intro and positioning beside the portrait,
 * then three credibility cards (product thinking, UX/UI execution, founder
 * mindset). Cards are soft-paper sheets with pastel icon chips, the approach-
 * carousel language; claims stay capability-shaped, never invented numbers.
 */
export function AboutSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-10">
        <MotionReveal className="flex flex-col gap-6">
          <p className="max-w-prose text-pretty text-intro text-body">
            I&apos;m Majed Sief Alnasr, a{" "}
            <strong className="font-semibold text-title">
              CX &amp; product designer
            </strong>{" "}
            and founder. For 7 years I&apos;ve worked where founders feel the most
            pain: products that grew faster than their design, flows nobody
            can explain, and interfaces that quietly leak trust.
          </p>
          <p className="max-w-prose text-pretty text-lead text-body">
            I cover the whole arc, research to dev handoff, and having shipped
            my own products I treat yours the way an owner would: scope
            honestly, measure what matters, and make reaching the next
            milestone the design brief. My favorite review is when nobody
            mentions the design at all, because everything simply made sense.
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
            <CtaLink href="/who-am-i" variant="secondary">
              More about me
            </CtaLink>
            <SocialLinks className="gap-2" />
          </div>
        </MotionReveal>

        <MotionReveal
          delay={0.12}
          className="relative order-first min-h-[340px] overflow-hidden rounded-large ring-1 ring-ink/5 md:order-none md:min-h-0"
        >
          {/* Same graph-paper white as the old hero avatar frame. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#ffffff",
              backgroundImage:
                "linear-gradient(rgba(26,26,26,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.06) 1px, transparent 1px)",
              backgroundSize: "15px 15px",
            }}
            aria-hidden
          />
          <Image
            src="/avatar.png"
            alt="Portrait of Majed Sief Alnasr"
            fill
            sizes="(min-width: 768px) 470px, 100vw"
            className="object-cover object-top"
          />
        </MotionReveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {credibilityCards.map((card, i) => (
          <MotionReveal key={card.title} delay={i * 0.08}>
            <article className="flex h-full flex-col gap-4 rounded-large bg-surface p-7 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-lg">
              <span
                className="inline-flex size-11 items-center justify-center rounded-full"
                style={{ backgroundColor: card.tint }}
                aria-hidden
              >
                <card.icon className="size-5 text-ink" />
              </span>
              <h3 className="text-h3 font-semibold text-title">
                {card.title}
              </h3>
              <p className="text-pretty text-body">{card.description}</p>
            </article>
          </MotionReveal>
        ))}
      </div>
    </div>
  );
}
