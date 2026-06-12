import { HeroAnimatedElements } from "@/components/sections/HeroAnimatedElements";
import { HeroWorkMarquee } from "@/components/sections/HeroWorkMarquee";
import { HeroExit } from "@/components/motion/HeroExit";

/**
 * Home hero: status pill, value-prop headline, supporting line, dual CTAs,
 * then a full-bleed strip of work drifting by. Server Component; entrance
 * animation lives in the client sub-component HeroAnimatedElements. The
 * avatar now lives in the NavBar, so the headline leads.
 */
export function HeroSection() {
  return (
    <HeroExit>
      <div className="flex flex-col items-center gap-24 py-6 sm:gap-28 sm:py-10">
        <HeroAnimatedElements />
        <HeroWorkMarquee />
      </div>
    </HeroExit>
  );
}
