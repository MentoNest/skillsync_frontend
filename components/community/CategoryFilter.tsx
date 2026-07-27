'use client';

import { CATEGORIES } from '@/lib/filters';

interface Props {
  selected: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-cyan-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
            selected === category.value
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.label}
          {category.count !== undefined && (
            <span className={`text-xs ${selected === category.value ? 'text-cyan-200' : 'text-gray-400'}`}>
              {category.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
