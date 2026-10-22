import { cn } from "@/lib/utils";

export type CategoryBadgeVariant =
  | "indigo"
  | "slate"
  | "emerald"
  | "amber"
  | "rose"
  | "sky";

export type CategoryBadgeSize = "sm" | "md";

export interface CategoryBadgeProps {
  /** The category text, e.g. "Article", "Track", "Career". */
  label: string;
  /** Colour scheme. Defaults to `indigo`, the resource-type colour. */
  variant?: CategoryBadgeVariant;
  /** `sm` for dense cards, `md` for section-level labels. Defaults to `sm`. */
  size?: CategoryBadgeSize;
  /** Adds a 1px border in the variant's colour. */
  outlined?: boolean;
  /** Extra classes, appended last so they can override the defaults. */
  className?: string;
}

const VARIANT_STYLES: Record<CategoryBadgeVariant, { fill: string; border: string }> = {
  indigo: { fill: "bg-indigo-50 text-indigo-700", border: "border-indigo-200" },
  slate: { fill: "bg-slate-100 text-slate-700", border: "border-slate-200" },
  emerald: { fill: "bg-emerald-50 text-emerald-700", border: "border-emerald-200" },
  amber: { fill: "bg-amber-50 text-amber-700", border: "border-amber-200" },
  rose: { fill: "bg-rose-50 text-rose-700", border: "border-rose-200" },
  sky: { fill: "bg-sky-50 text-sky-700", border: "border-sky-200" },
};

const SIZE_STYLES: Record<CategoryBadgeSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

/**
 * Rounded pill label for a resource's category or type.
 *
 * Presentational only — it renders a `<span>`, so it is never focusable and
 * can sit inside a card that is itself a link without nesting interactive
 * elements.
 */
export default function CategoryBadge({
  label,
  variant = "indigo",
  size = "sm",
  outlined = false,
  className,
}: CategoryBadgeProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full font-semibold",
        SIZE_STYLES[size],
        styles.fill,
        outlined && `border ${styles.border}`,
        className,
      )}
    >
      {label}
    </span>
  );
}
