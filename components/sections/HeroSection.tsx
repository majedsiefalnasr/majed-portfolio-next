import Image from "next/image";
import { HeroAnimatedElements } from "@/components/sections/HeroAnimatedElements";

/**
 * Home / Who Am I hero. Server Component; animation lives in the client
 * sub-component HeroAnimatedElements (brainstorm boundary decision).
 */
export function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-12 py-8">
      {/* Avatar with concentric rings (from Figma). */}
      <div className="relative flex items-center justify-center">
        <span className="absolute size-[280px] rounded-full bg-ink/[0.03]" aria-hidden />
        <span className="absolute size-[220px] rounded-full bg-ink/[0.05]" aria-hidden />
        <Image
          src="/avatar.svg"
          alt="Majed Sief Alnasr"
          width={160}
          height={160}
          priority
          className="relative size-40 rounded-full object-cover"
        />
      </div>
      <HeroAnimatedElements />
    </div>
  );
}
