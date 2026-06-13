import Image from "next/image";
import { Quote } from "lucide-react";
import { HorizontalMarquee } from "@/components/motion/HorizontalMarquee";
import { VerticalMarquee } from "@/components/motion/VerticalMarquee";
import { Icon } from "@/components/ui/Icon";
import { proofCards, proofColumns, type ProofCard } from "@/data/proof";
import { cn } from "@/lib/utils";

const COLUMN_SPEED = [16, 20, 18] as const;
const COLUMN_REVERSE = [false, true, false] as const;
const TABLET_COLUMNS: ProofCard[][] = [
  [proofCards[0], proofCards[2]],
  [proofCards[1], proofCards[3]],
];

/**
 * "Can I trust him with my project?" — proof cards scale from a three-column
 * wall on desktop, to two vertical columns on tablet, to one horizontal
 * auto-scrolling row on phones.
 */
export function ProofMarquee() {
  return (
    <>
      <div className="hidden gap-5 motion-safe:h-[560px] motion-safe:[mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)] md:grid md:grid-cols-3 lg:motion-safe:h-[640px]">
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

      <div className="hidden gap-5 motion-safe:h-[520px] motion-safe:[mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)] sm:grid sm:grid-cols-2 md:hidden">
        {TABLET_COLUMNS.map((column, i) => (
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

      <div className="mx-[calc(50%-50vw)] sm:hidden">
        <HorizontalMarquee
          speed={20}
          gapClass="gap-5 pr-5"
          className="px-[max(1.25rem,calc(50vw-30.625rem))]"
        >
          {proofCards.map((card) => (
            <ProofCardItem key={card.kicker} card={card} className="w-[82vw]" />
          ))}
        </HorizontalMarquee>
      </div>
    </>
  );
}

function ProofCardItem({
  card,
  className,
}: {
  card: ProofCard;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0", className)}>
      <ProofCardView card={card} />
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
            title="Demonstration data from the flagship demo project"
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
