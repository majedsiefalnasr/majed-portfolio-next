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
    <div className="flex w-full flex-wrap justify-center gap-x-16 gap-y-5 text-left">
      {locationYear && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-body">Location &amp; year</span>
          <span className="text-base font-medium text-title">
            {locationYear}
          </span>
        </div>
      )}
      {role && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-body">Role / Services</span>
          <span className="text-base font-medium text-title">{role}</span>
        </div>
      )}
      {tools && tools.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-body">Tools Used</span>
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
