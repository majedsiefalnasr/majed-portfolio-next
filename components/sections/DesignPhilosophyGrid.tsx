import { Icon } from "@/components/ui/Icon";
import { philosophy } from "@/data/philosophy";
import type { PastelTone } from "@/types";
import { cn } from "@/lib/utils";

const toneClass: Record<PastelTone, string> = {
  orange: "bg-pastel-orange",
  green: "bg-pastel-green",
  blue: "bg-pastel-blue",
  red: "bg-pastel-red",
};

/**
 * Data-driven design-approach cards ("Why Does his Design Approach Work?").
 * Static — Server Component. Horizontal scroll-snap on mobile, grid on desktop.
 */
export function DesignPhilosophyGrid() {
  return (
    <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
      {philosophy.map((item) => (
        <li
          key={item.title}
          className={cn(
            "flex min-w-[260px] flex-col gap-4 rounded-large p-6 md:min-w-0",
            toneClass[item.tone],
          )}
        >
          <span className="flex size-11 items-center justify-center rounded-large bg-ink/10 text-title">
            <Icon name={item.icon} className="size-5" aria-hidden />
          </span>
          <h3 className="text-h3 font-semibold text-title">{item.title}</h3>
          <p className="text-sm text-title/70">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
