interface CategoryBadgeProps {
  category: string;
  color?: string;
}

// Map categories to consistent colors
const categoryColors: Record<string, string> = {
  'Web Development': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Mobile Development': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Data Science': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Machine Learning': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'DevOps': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Cloud Computing': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  'UI/UX Design': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Cybersecurity': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Blockchain': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Game Development': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'AI': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'Database': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function CategoryBadge({ category, color }: CategoryBadgeProps) {
  // Use provided color, or look up in map, or use default
  const badgeColor = color || categoryColors[category] || 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400';
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColor}`}>
      {category}
    </span>
  );
}
