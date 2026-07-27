export type SortOption = 'trending' | 'latest' | 'most-replies' | 'most-liked';

interface DiscussionSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'latest', label: 'Latest' },
  { value: 'most-replies', label: 'Most Replies' },
  { value: 'most-liked', label: 'Most Liked' },
];

export function DiscussionSort({
  currentSort,
  onSortChange,
  className = ''
}: DiscussionSortProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentSort === option.value
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}