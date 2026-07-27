interface CategoryBadgeProps {
  category: string;
  color?: string;
}

export default function CategoryBadge({ category, color = 'bg-cyan-100 text-cyan-700' }: CategoryBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {category}
    </span>
  );
}
