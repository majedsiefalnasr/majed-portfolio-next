import type { Work } from "@/types";
import { ToolIcon } from "@/components/shared/ToolIcon";

/**
 * The location/year · role/services · tools row from the Figma, shared by the
 * featured showcase panel and the work listing rows.
 */
export function WorkInfoRow({ work }: { work: Work }) {
  const { locationYear, role, tools } = work;
  if (!locationYear && !role && !(tools && tools.length > 0)) return null;

  return (
    <div className="flex w-full flex-col gap-y-5 text-left sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-14">
      {locationYear && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-body">Project context</span>
          <span className="text-base font-medium text-title">
            {locationYear}
          </span>
        </div>
      )}
      {role && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-body">Majed&apos;s role</span>
          <span className="text-base font-medium text-title">{role}</span>
        </div>
      )}
      {tools && tools.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-body">Tools</span>
          <div className="flex gap-2">
            {tools.map((tool) => (
              <ToolIcon key={tool} tool={tool} size={36} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
