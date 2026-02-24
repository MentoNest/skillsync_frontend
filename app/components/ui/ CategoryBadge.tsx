import React from "react";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColorMap: Record<string, string> = {
  blockchain: "bg-emerald-100 text-emerald-800",
  health: "bg-blue-100 text-blue-800",
  finance: "bg-yellow-100 text-yellow-800",
  ai: "bg-purple-100 text-purple-800",
  default: "bg-gray-100 text-gray-800",
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  className = "",
}) => {
  const normalized = category.toLowerCase();
  const colorClass =
    categoryColorMap[normalized] || categoryColorMap.default;

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colorClass} ${className}`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;