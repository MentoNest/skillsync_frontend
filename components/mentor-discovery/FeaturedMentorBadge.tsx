export interface FeaturedMentorBadgeProps {
  className?: string;
}

export default function FeaturedMentorBadge({
  className,
}: FeaturedMentorBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ${className ?? ""}`}
      aria-label="Featured mentor"
    >
      Featured
    </span>
  );
}
