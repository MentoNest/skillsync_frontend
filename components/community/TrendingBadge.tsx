export interface TrendingBadgeProps {
  className?: string;
}

export default function TrendingBadge({ className }: TrendingBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 ${className ?? ""}`}
      aria-label="Trending discussion"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 fill-current">
        <path d="M8 1c.4 0 .7.2.9.5C10 4 10.5 5.5 10.5 7a2.5 2.5 0 0 1-5 0c0-1.5.5-3 1.6-5.5.2-.3.5-.5.9-.5Zm-1 11h2v2H7v-2Z" />
      </svg>
      Trending
    </span>
  );
}
