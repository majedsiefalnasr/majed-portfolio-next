import { Marquee } from "@/components/motion/Marquee";
import { Icon } from "@/components/ui/Icon";
import { capabilities, type Capability } from "@/data/capabilities";

function Chip({ capability }: { capability: Capability }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap rounded-pill bg-surface px-5 py-3 font-medium text-title ring-1 ring-ink/5">
      <Icon name={capability.icon} className="size-[18px]" aria-hidden />
      {capability.label}
    </span>
  );
}

/**
 * "What does he actually do?" — the day-to-day craft as two chip rows
 * drifting in opposite directions, fading at the edges. Hover pauses the
 * drift so chips stay readable; reduced motion recenters them as a static
 * wrapped cloud.
 */
export function CapabilityChips() {
  const mid = Math.ceil(capabilities.length / 2);
  const rows = [capabilities.slice(0, mid), capabilities.slice(mid)];

  return (
    <div className="flex flex-col gap-4 motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {rows.map((row, i) => (
        <Marquee
          key={i}
          reverse={i === 1}
          speed={35}
          gapClass="gap-4 pe-4"
          reduced="wrap"
        >
          {row.map((capability) => (
            <Chip key={capability.label} capability={capability} />
          ))}
        </Marquee>
      ))}
    </div>
  );
}
