import { MotionReveal } from "@/components/motion/MotionReveal";
import { experienceData } from "@/data/experience";

/**
 * "Selected Experience & Capabilities" — credibility at a glance: companies,
 * industries, products, and disciplines. Currently renders placeholder data
 * (see data/experience.ts) and says so on the page; swap the data and flip
 * `isPlaceholder` off when real names are cleared.
 */
export function ExperienceCapabilities() {
  const { isPlaceholder, companies, industries, products, disciplines } =
    experienceData;

  const chipGroups = [
    { title: "Industries", items: industries },
    { title: "Products shipped", items: products },
    { title: "Design disciplines", items: disciplines },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Companies: dashed tiles read as reserved slots, not fake logos. */}
      <MotionReveal className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-body">Companies</h3>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {companies.map((company) => (
            <li
              key={company.name}
              className="flex flex-col items-center justify-center gap-1 rounded-large border-2 border-dashed border-ink/15 px-4 py-7 text-center"
            >
              <span className="text-base font-semibold text-title">
                {company.name}
              </span>
              <span className="text-sm text-body">{company.note}</span>
            </li>
          ))}
        </ul>
      </MotionReveal>

      <div className="grid gap-10 md:grid-cols-3">
        {chipGroups.map((group, i) => (
          <MotionReveal
            key={group.title}
            delay={0.08 + i * 0.08}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-medium text-body">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-pill bg-surface px-4 py-2 text-sm font-medium text-title ring-1 ring-ink/5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </MotionReveal>
        ))}
      </div>

      {isPlaceholder && (
        <p className="text-center text-sm text-body">
          Placeholder data while the portfolio framework is under
          construction. Real company names and logos land here next.
        </p>
      )}
    </div>
  );
}
