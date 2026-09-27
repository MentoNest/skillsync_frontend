import React from "react";
import { cn } from "@/lib/utils";

export interface MentorRatingProps {
  /** The numerical rating value (e.g., 4.8) */
  rating: number;
  /** Maximum rating on the scale (default: 5) */
  maxRating?: number;
  /** Number of decimal places to display (default: 1) */
  precision?: number;
  /** Optional number of reviews or sessions */
  ratingCount?: number;
  /** Label for rating count (e.g., "reviews", "ratings", "sessions", default: "reviews") */
  countLabel?: string;
  /** Custom formatter for rating count display (e.g. (count) => `· ${count} sessions`) */
  formatCount?: (count: number) => string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether to show the numerical score (default: true) */
  showScore?: boolean;
  /** Whether to show the star icons (default: true) */
  showStars?: boolean;
  /** Whether to show the rating count (default: true) */
  showCount?: boolean;
  /** Whether to show the max rating next to score, e.g. "4.8/5" (default: false) */
  showMaxRating?: boolean;
  /** Optional custom accessible label override */
  ariaLabel?: string;
  /** Optional additional CSS classes */
  className?: string;
}

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export function MentorRating({
  rating,
  maxRating = 5,
  precision = 1,
  ratingCount,
  countLabel = "reviews",
  formatCount,
  size = "md",
  showScore = true,
  showStars = true,
  showCount = true,
  showMaxRating = false,
  ariaLabel,
  className,
}: MentorRatingProps) {
  // Validate and clamp rating
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const clampedRating = Math.max(0, Math.min(safeRating, maxRating));
  const formattedScore = clampedRating.toFixed(precision);

  // Size mappings
  const sizeClasses = {
    sm: {
      star: "w-3.5 h-3.5",
      text: "text-xs",
      count: "text-xs",
      gap: "gap-1",
    },
    md: {
      star: "w-4 h-4",
      text: "text-sm",
      count: "text-xs",
      gap: "gap-1.5",
    },
    lg: {
      star: "w-5 h-5",
      text: "text-base",
      count: "text-sm",
      gap: "gap-2",
    },
  }[size];

  // Accessible description for screen readers
  const accessibleDescription =
    ariaLabel ||
    [
      `Rated ${formattedScore} out of ${maxRating} stars`,
      ratingCount !== undefined
        ? `from ${ratingCount.toLocaleString()} ${countLabel}`
        : "",
    ]
      .filter(Boolean)
      .join(", ");

  return (
    <div
      role="img"
      aria-label={accessibleDescription}
      className={cn("inline-flex items-center", sizeClasses.gap, className)}
    >
      {/* Visual Stars */}
      {showStars && (
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: maxRating }, (_, index) => {
            // Calculate fill percentage for each star (0% to 100%)
            const fillPercentage = Math.max(
              0,
              Math.min(100, (clampedRating - index) * 100)
            );

            return (
              <div key={index} className="relative inline-block shrink-0">
                {/* Background empty star */}
                <svg
                  className={cn(sizeClasses.star, "text-slate-200 fill-current")}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d={STAR_PATH} />
                </svg>

                {/* Foreground filled star with fractional clip */}
                {fillPercentage > 0 && (
                  <div
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                    aria-hidden="true"
                  >
                    <svg
                      className={cn(
                        sizeClasses.star,
                        "text-amber-400 fill-current"
                      )}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d={STAR_PATH} />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Numerical Decimal Score */}
      {showScore && (
        <span
          className={cn(
            "font-semibold text-slate-800 tabular-nums leading-none",
            sizeClasses.text
          )}
        >
          {formattedScore}
          {showMaxRating && (
            <span className="text-slate-400 font-normal ml-0.5">
              /{maxRating}
            </span>
          )}
        </span>
      )}

      {/* Rating or Session Count */}
      {showCount && ratingCount !== undefined && (
        <span className={cn("text-slate-500 leading-none", sizeClasses.count)}>
          {formatCount
            ? formatCount(ratingCount)
            : `(${ratingCount.toLocaleString()})`}
        </span>
      )}
    </div>
  );
}

export default MentorRating;
