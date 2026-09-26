import { cn } from "@/lib/utils";

export interface StatCardProps {
  /** Display value, e.g. "2,400+" */
  value: string;
  /** Short label describing the value, e.g. "Expert Mentors" */
  label: string;
  /** Optional supporting sentence for extra context */
  description?: string;
  /** Optional decorative icon rendered above the value */
  icon?: React.ReactNode;
  /** Optional accent colour classes for the icon container */
  iconClassName?: string;
}

export default function StatCard({
  value,
  label,
  description,
  icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
      {icon && (
        <span
          className={cn(
            "mb-4 w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center",
            iconClassName
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums">
        {value}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-800">{label}</p>

      {description && (
        <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-[22ch]">
          {description}
        </p>
      )}
    </div>
  );
}
