import Image from "next/image";
import { HeroAnimatedElements } from "@/components/sections/HeroAnimatedElements";

/**
 * Home / Who Am I hero. Server Component; animation lives in the client
 * sub-component HeroAnimatedElements (brainstorm boundary decision).
 */
export function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-12 py-8">
      {/* Avatar with soft white glow rings + "Who Am I?" pill (from Figma). */}
      <div className="relative flex items-center justify-center">
        <span className="absolute size-[280px] rounded-full bg-white/40 blur-2xl" aria-hidden />
        <span className="absolute size-[230px] rounded-full bg-white/70" aria-hidden />
        <Image
          src="/avatar.png"
          alt="Majed Sief Alnasr"
          width={200}
          height={200}
          priority
          className="relative size-44 rounded-full object-cover sm:size-48"
        />
        <span className="absolute -bottom-2 left-2 flex -rotate-6 items-center gap-1.5 rounded-pill bg-warning px-4 py-2 text-sm font-semibold text-ink shadow-sm">
          <span aria-hidden>👋</span> Who Am I?
        </span>
      </div>
      <HeroAnimatedElements />
    </div>
  );
}
