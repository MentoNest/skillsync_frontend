// Trending discussion badge — optional, small orange pill (#875)
import React from "react";

interface TrendingBadgeProps {
  show?: boolean;
}

const TrendingBadge = ({ show = true }: TrendingBadgeProps) => {
  if (!show) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
      🔥 Trending
    </span>
  );
};

export default TrendingBadge;
