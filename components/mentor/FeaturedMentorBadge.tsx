import { cn } from "@/lib/utils";

export interface FeaturedMentorBadgeProps {
  /** Visual size. Defaults to `sm` for cards. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Optional badge for mentors featured by the platform.
 *
 * Render it only when `mentor.featured` is true. The visible `Featured` text
 * and the explicit `aria-label` give screen-reader users the same meaning as
 * the gold/star treatment gives sighted users.
 */
export default function FeaturedMentorBadge({
  size = "sm",
  className,
}: FeaturedMentorBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-300/80 bg-amber-50 font-semibold text-amber-800 shadow-sm",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
      aria-label="Featured mentor"
      title="Featured mentor"
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>Featured</span>
    </span>
  );
}
