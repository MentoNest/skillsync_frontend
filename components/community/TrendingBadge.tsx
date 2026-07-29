"use client";

interface TrendingBadgeProps {
  isTrending?: boolean;
  className?: string;
}

export default function TrendingBadge({
  isTrending = false,
  className = "",
}: TrendingBadgeProps) {
  if (!isTrending) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium ${className}`}
    >
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l.97-5.67-4.12-4.02a1 1 0 01.56-1.71l5.7-.83 2.55-5.17a1 1 0 011.78 0l2.55 5.17 5.7.83a1 1 0 01.56 1.71l-4.12 4.02.97 5.67a1 1 0 01-1 1.18z" />
      </svg>
      Trending
    </span>
  );
}
