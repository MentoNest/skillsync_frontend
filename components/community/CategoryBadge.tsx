// Discussion category badge component with dynamic colors (#874)
import React from "react";

type CategoryName =
  | "Career Growth"
  | "Leadership"
  | "Interview Prep"
  | "Networking"
  | "Salary & Compensation"
  | "Work-Life Balance";

const CATEGORY_COLORS: Record<string, string> = {
  "Career Growth": "bg-blue-100 text-blue-700",
  Leadership: "bg-purple-100 text-purple-700",
  "Interview Prep": "bg-green-100 text-green-700",
  Networking: "bg-yellow-100 text-yellow-700",
  "Salary & Compensation": "bg-emerald-100 text-emerald-700",
  "Work-Life Balance": "bg-pink-100 text-pink-700",
};

const DEFAULT_COLOR = "bg-gray-100 text-gray-700";

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const colorClass = CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
