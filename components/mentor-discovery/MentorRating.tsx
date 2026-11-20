export interface MentorRatingProps {
  rating: number;
  ratingCount?: number;
  countLabel?: string;
  size?: "sm" | "md";
  className?: string;
}

export default function MentorRating({
  rating,
  ratingCount,
  countLabel = "ratings",
  size = "md",
  className,
}: MentorRatingProps) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  const stars = "★".repeat(rounded) + "☆".repeat(5 - rounded);
  const value = rating.toFixed(1);

  return (
    <span
      className={`inline-flex items-center gap-1 text-amber-500 ${size === "sm" ? "text-xs" : "text-sm"} ${className ?? ""}`}
      aria-label={`Rated ${value} out of 5 from ${ratingCount ?? 0} ${countLabel}`}
    >
      <span aria-hidden="true" className="tracking-tight">
        {stars}
      </span>
      <span className="font-medium text-slate-700">{value}</span>
      {ratingCount !== undefined && (
        <span className="text-slate-500">({ratingCount} {countLabel})</span>
      )}
    </span>
  );
}
