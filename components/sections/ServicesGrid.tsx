import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";

/** 4 service cards. Static + CSS hover — Server Component. */
export function ServicesGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <li
          key={service.slug}
          className="group flex flex-col gap-4 rounded-large bg-surface p-8 ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-lg"
        >
          <span className="flex size-12 items-center justify-center rounded-large bg-ink/5 text-title transition-colors group-hover:bg-ink group-hover:text-paper">
            <Icon name={service.icon} className="size-6" aria-hidden />
          </span>
          <h3 className="text-h3 font-semibold text-title">{service.title}</h3>
          <p className="text-body">{service.description}</p>
        </li>
      ))}
    </ul>
  );
}
