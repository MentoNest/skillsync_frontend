import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** Already-formatted figure: "2,400+", "48h", "4.9/5" */
  value: string;
  /** What the figure measures */
  label: string;
  /** Optional supporting sentence */
  description?: string;
  /** Optional decorative glyph */
  icon?: ReactNode;
  /** Optional accent classes for the icon container */
  iconClassName?: string;
}

/**
 * One platform statistic (#1160).
 *
 * A statistic is a label and the value it describes, so it is a `<dt>`/`<dd>`
 * pair inside the section's `<dl>` — the only markup that tells a screen
 * reader which number belongs to which label.
 *
 * `flex-col-reverse` puts the value above the label visually while keeping DOM
 * order label-then-value, so the label is announced first: the listener learns
 * what the number measures before having to hold the number in memory.
 */
export default function StatCard({
  value,
  label,
  description,
  icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="flex flex-col-reverse items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
      <dt className="text-sm font-medium text-slate-600">
        <span>{label}</span>
        {description ? (
          <span className="mt-1 block text-xs font-normal text-slate-500">
            {description}
          </span>
        ) : null}
      </dt>

      <dd className="flex flex-col items-center gap-3">
        {icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600",
              iconClassName
            )}
          >
            {icon}
          </span>
        ) : null}

        <span className="text-4xl font-extrabold tabular-nums tracking-tight text-indigo-600 sm:text-5xl">
          {value}
        </span>
      </dd>
    </div>
  );
}
