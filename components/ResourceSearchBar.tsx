'use client';

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Lazy load the Search icon
const SearchIcon = dynamic(
  () => import("lucide-react").then(mod => ({ default: mod.Search })),
  { ssr: true }
);

interface Props {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function ResourceSearchBar({
  onSearch,
  placeholder = "Search resources...",
}: Props) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
        />
      </div>
    </div>
  );
}
