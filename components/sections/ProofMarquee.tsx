import Image from "next/image";
import { Quote } from "lucide-react";
import { VerticalMarquee } from "@/components/motion/VerticalMarquee";
import { Icon } from "@/components/ui/Icon";
import { proofColumns, type ProofCard } from "@/data/proof";
import { cn } from "@/lib/utils";

const COLUMN_SPEED = [16, 20, 18] as const;
const COLUMN_REVERSE = [false, true, false] as const;

/**
 * "Can I trust him with my project?" — a three-column wall of love: each
 * column drifts vertically and loops seamlessly, slowing to a crawl on
 * hover/focus rather than stopping. Demo data carries a visible chip.
 * Reduced motion drops the loop to a static stack per column.
 */
export function ProofMarquee() {
  return (
    <div className="grid gap-5 motion-safe:h-[480px] sm:grid-cols-3 sm:motion-safe:h-[560px] lg:motion-safe:h-[640px] motion-safe:[mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]">
      {proofColumns.map((column, i) => (
        <VerticalMarquee
          key={i}
          speed={COLUMN_SPEED[i]}
          reverse={COLUMN_REVERSE[i]}
          gapClass="gap-5 pb-5"
          className="h-full"
        >
          {column.map((card) => (
            <ProofCardView key={card.kicker} card={card} />
          ))}
        </VerticalMarquee>
      ))}
    </div>
  );
}

function ProofCardView({ card }: { card: ProofCard }) {
  return (
    <article className="flex min-h-[260px] w-full flex-col gap-4 rounded-large bg-surface p-6 ring-1 ring-ink/5">
      <div className="flex items-center gap-2 text-xs font-medium text-body">
        {card.icon ? (
          <Icon name={card.icon} className="size-4" aria-hidden />
        ) : (
          <Quote className="size-4 -scale-x-100" aria-hidden />
        )}
        <span>{card.kicker}</span>
        {card.demo && (
          <span
            title="Demonstration data from the flagship demo case study"
            className="ml-auto rounded-pill bg-paper px-2.5 py-0.5 font-mono text-[11px] font-medium text-body ring-1 ring-ink/10"
          >
            demo data
          </span>
        )}
      </div>

      <div className="text-pretty text-[15px] leading-relaxed text-body">
        {card.lines.map((line) => (
          <p
            key={line.text}
            className={cn(line.strong && "font-medium text-title")}
          >
            {line.text}
          </p>
        ))}
      </div>

      {card.avatar ? (
        <div className="mt-auto flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-paper">
            <Image
              src={card.avatar}
              alt={card.author ?? ""}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="font-medium text-title">{card.author}</p>
            <p className="text-body">{card.role}</p>
          </div>
        </div>
      ) : card.source ? (
        <p className="mt-auto text-xs text-body">— {card.source}</p>
      ) : null}
    </article>
  );
}
