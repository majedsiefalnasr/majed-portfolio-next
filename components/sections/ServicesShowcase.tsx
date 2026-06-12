"use client";

import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Type,
  Layers,
  Palette,
  Grid2X2,
  TrendingUp,
  Users,
  MousePointerClick,
  BarChart2,
  FileSearch,
  Compass,
  FileText,
  MessageSquare,
  GitMerge,
  Lightbulb,
  Presentation,
} from "lucide-react";

// ─── Card 1: UX/UI Design ─────────────────────────────────────────────────────
// Hover: center icon (wireframe/layout) scales up, side icons scale down + fade

const designTools = [
  { icon: Type, label: "Typography" },
  { icon: Palette, label: "Color" },
  { icon: LayoutDashboard, label: "Wireframes" },
  { icon: Grid2X2, label: "Grids" },
  { icon: Layers, label: "Components" },
];

function DesignToolsVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden">
      <div
        className="relative flex size-full flex-col items-center justify-center"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="flex w-full items-center justify-center gap-3 px-4">
          {designTools.map(({ icon: Icon, label }, i) => {
            const isCenter = i === 2;
            const distFromCenter = Math.abs(i - 2);
            const scaleClass = isCenter
              ? "group-hover:scale-110"
              : distFromCenter === 1
                ? "group-hover:scale-90 group-hover:opacity-80"
                : "group-hover:scale-80 group-hover:opacity-60";
            return (
              <div key={label} className="relative">
                <div
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-2xl border bg-paper shadow-sm transition-all duration-[600ms] ease-in-out md:size-20",
                    isCenter &&
                      "bg-[radial-gradient(75%_75%_at_0%_0%,color-mix(in_srgb,var(--color-title)_8%,transparent),transparent)]",
                    scaleClass,
                  )}
                >
                  <Icon className="size-6 text-title" strokeWidth={1.5} />
                </div>
                {isCenter && (
                  <>
                    <div className="mt-1 text-center text-xs font-medium text-body transition-all duration-[600ms] ease-in-out group-hover:-mt-4">
                      {label}
                    </div>
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-title/5 blur-xl" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Card 2: Redesign ─────────────────────────────────────────────────────────
// Hover: stacked "before / after" layers spread apart (like the file-card fan)

const redesignLayers = [
  { label: "before.fig", icon: FileSearch },
  { label: "audit.pdf", icon: FileText },
  { label: "after.fig", icon: Layers },
  { label: "handoff.zip", icon: GitMerge },
];

function RedesignVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden">
      <div className="relative size-full -space-y-2 p-4 group-hover:space-y-2">
        {redesignLayers.map(({ label, icon: Icon }, i) => {
          const translateClass =
            i === 0
              ? "translate-x-1/2"
              : i === 1
                ? "translate-x-1/3"
                : i === 2
                  ? "translate-x-1/6"
                  : "translate-x-0";
          return (
            <div
              key={label}
              className={cn(
                "flex h-14 items-center rounded-xl border bg-paper px-4 pt-3 shadow-sm transition-all duration-[600ms] ease-in-out",
                "group-hover:h-11 group-hover:translate-x-0 group-hover:rounded-lg group-hover:pt-0",
                i !== 0 && translateClass,
                i === 0 && "bg-[radial-gradient(80%_80%_at_10%_0%,color-mix(in_srgb,var(--color-title)_8%,transparent),transparent)]",
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-body" strokeWidth={1.5} />
                <span className="font-medium text-sm text-title">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card 3: Analytic UX ──────────────────────────────────────────────────────
// Hover: metric bars grow, numbers count up via CSS animation

// Bar widths as literal class strings so Tailwind includes them in the bundle.
const metrics: { label: string; value: string; idle: string; active: string; color: string }[] = [
  {
    label: "Drop-off point found",
    value: "step 3 of 7",
    idle: "w-[8%]",
    active: "group-hover:w-[56%]",
    color: "bg-pastel-orange",
  },
  {
    label: "Task completion",
    value: "↑ 34%",
    idle: "w-[8%]",
    active: "group-hover:w-[68%]",
    color: "bg-pastel-green",
  },
  {
    label: "User satisfaction",
    value: "↑ 4.7 / 5",
    idle: "w-[8%]",
    active: "group-hover:w-[94%]",
    color: "bg-pastel-blue",
  },
];

function AnalyticsVisual() {
  return (
    <div className="relative flex h-64 flex-col justify-center gap-4 overflow-hidden px-6">
      <div className="flex items-center gap-2 text-body">
        <BarChart2 className="size-4" strokeWidth={1.5} />
        <span className="text-xs font-medium">Usability study · 24 sessions</span>
      </div>
      {metrics.map(({ label, value, idle, active, color }) => (
        <div key={label} className="space-y-1">
          <div className="flex justify-between text-xs text-body">
            <span>{label}</span>
            <span className="font-semibold text-title">{value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-[800ms] ease-in-out",
                color,
                idle,
                active,
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Card 4: UX Consultation ─────────────────────────────────────────────────
// Hover: deliverable pill chips stagger in (like the "Add tools" card)

const deliverables = [
  { icon: FileText, label: "UX Audit" },
  { icon: Lightbulb, label: "Quick Wins" },
  { icon: Compass, label: "Roadmap" },
  { icon: Users, label: "Research Plan" },
  { icon: Presentation, label: "Exec Brief" },
  { icon: MessageSquare, label: "Design Review" },
  { icon: TrendingUp, label: "KPI Report" },
  { icon: MousePointerClick, label: "Test Script" },
];

function ConsultationVisual() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden px-4">
      <div className="grid w-full grid-cols-3 gap-2">
        {deliverables.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border bg-paper px-2.5 py-2 text-xs font-medium text-title shadow-sm",
              "translate-y-4 opacity-0 transition-all duration-500 ease-in-out",
              "group-hover:translate-y-0 group-hover:opacity-100",
            )}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <Icon className="size-3.5 shrink-0 text-body" strokeWidth={1.5} />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface BentoCardProps {
  heading: React.ReactNode;
  visual: React.ReactNode;
  headingFirst?: boolean;
  colSpan?: "5" | "3";
  delay?: number;
  className?: string;
}

function BentoCard({
  heading,
  visual,
  headingFirst = true,
  colSpan = "5",
  delay = 0,
  className,
}: BentoCardProps) {
  return (
    <MotionReveal
      delay={delay}
      className={cn(
        "group relative rounded-card border border-title/8 bg-surface overflow-hidden",
        colSpan === "5" ? "md:col-span-5" : "md:col-span-3",
        className,
      )}
    >
      {headingFirst && <div className="p-6">{heading}</div>}
      {visual}
      {!headingFirst && <div className="p-6">{heading}</div>}
    </MotionReveal>
  );
}

function CardHeading({
  bold,
  muted,
}: {
  bold: string;
  muted: string;
}) {
  return (
    <h3 className="font-medium text-base leading-tight md:text-lg">
      <span className="text-title">{bold}</span>{" "}
      <span className="text-body">{muted}</span>
    </h3>
  );
}

export function ServicesShowcase() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 md:grid-cols-8">
      {/* Card 1: UX/UI Design — col-span-5, heading first */}
      <BentoCard
        colSpan="5"
        delay={0}
        heading={
          <CardHeading
            bold="Design from zero."
            muted="Screens, flows, and components built so users never pause to wonder what to do next."
          />
        }
        visual={<DesignToolsVisual />}
      />

      {/* Card 2: Redesign — col-span-3, visual first */}
      <BentoCard
        colSpan="3"
        delay={0.08}
        headingFirst={false}
        heading={
          <CardHeading
            bold="Revive what exists."
            muted="Audit, rethink, and rebuild a product that stopped converting."
          />
        }
        visual={<RedesignVisual />}
      />

      {/* Card 3: Analytic UX — col-span-3, visual first */}
      <BentoCard
        colSpan="3"
        delay={0.05}
        headingFirst={false}
        heading={
          <CardHeading
            bold="Find the friction."
            muted="Sessions, heatmaps, and real data — turned into a prioritized fix list."
          />
        }
        visual={<AnalyticsVisual />}
      />

      {/* Card 4: UX Consultation — col-span-5, heading first */}
      <BentoCard
        colSpan="5"
        delay={0.12}
        heading={
          <CardHeading
            bold="Get expert eyes."
            muted="A strategic review — audit, roadmap, or team advisory — delivered as a clear action plan."
          />
        }
        visual={<ConsultationVisual />}
      />
    </div>
  );
}
