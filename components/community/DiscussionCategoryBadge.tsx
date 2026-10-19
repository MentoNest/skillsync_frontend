import { cn } from "@/lib/utils";

/**
 * Category badge for discussions (#984).
 *
 * The label is dynamic — it renders whatever category string a discussion
 * carries, so the feed keeps working when the backend returns a category that
 * is not in the known list. Known categories get a stable colour so the same
 * category always looks the same across the feed, the sidebar and the detail
 * page; unknown categories fall back to the neutral `--secondary` token.
 *
 * Presentational only: renders a `<span>`, so it is never focusable and can
 * sit inside a card that is itself a link without nesting interactive
 * elements.
 */

export type DiscussionCategoryBadgeSize = "sm" | "md";

export interface DiscussionCategoryBadgeProps {
  /** The category text, e.g. `"Career Growth"` or `"technical"`. */
  label: string;
  /** `sm` for discussion cards, `md` for the detail-page header. */
  size?: DiscussionCategoryBadgeSize;
  /** Extra classes, appended last so they can override the defaults. */
  className?: string;
}

/**
 * Colour per canonical category. Keys are lower-cased and trimmed before
 * lookup so `"Career Growth"`, `"career growth"` and `" career growth "` all
 * resolve to the same style.
 */
const CATEGORY_STYLES: Record<string, string> = {
  // Categories from the community taxonomy (#993)
  general: "bg-slate-100 text-slate-700",
  career: "bg-indigo-50 text-indigo-700",
  technical: "bg-sky-50 text-sky-700",
  mentoring: "bg-emerald-50 text-emerald-700",
  announcements: "bg-amber-50 text-amber-700",
  // Finer-grained discussion categories (#984)
  "career growth": "bg-indigo-50 text-indigo-700",
  leadership: "bg-violet-50 text-violet-700",
  "interview prep": "bg-rose-50 text-rose-700",
  networking: "bg-teal-50 text-teal-700",
  "salary & compensation": "bg-amber-50 text-amber-700",
  "work-life balance": "bg-cyan-50 text-cyan-700",
};

const FALLBACK_STYLE = "bg-[var(--secondary)] text-[var(--muted)]";

const SIZE_STYLES: Record<DiscussionCategoryBadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

/** Resolve the style for a category, case- and whitespace-insensitively. */
export function discussionCategoryStyle(label: string): string {
  const key = label?.trim().toLowerCase() ?? "";
  return CATEGORY_STYLES[key] ?? FALLBACK_STYLE;
}

export function DiscussionCategoryBadge({
  label,
  size = "sm",
  className,
}: DiscussionCategoryBadgeProps) {
  if (!label) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full font-medium",
        SIZE_STYLES[size],
        discussionCategoryStyle(label),
        className
      )}
      data-category={label.trim().toLowerCase()}
    >
      {label}
    </span>
  );
}

export default DiscussionCategoryBadge;
