"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface DiscussionSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function DiscussionSearch({
  onSearch,
  placeholder = "Search discussions...",
}: DiscussionSearchProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(debouncedQuery);
  };

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        aria-label="Search discussions"
      />
    </div>
  );
}
