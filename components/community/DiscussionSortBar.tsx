'use client';

export type SortOption = 'trending' | 'latest' | 'most-replies' | 'most-liked';

interface DiscussionSortBarProps {
  current: SortOption;
  onChange: (sort: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'latest', label: 'Latest' },
  { value: 'most-replies', label: 'Most Replies' },
  { value: 'most-liked', label: 'Most Liked' },
];

export default function DiscussionSortBar({ current, onChange }: DiscussionSortBarProps) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label="Sort discussions">
      <span className="text-sm text-gray-500 mr-1">Sort:</span>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            current === opt.value ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-pressed={current === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
