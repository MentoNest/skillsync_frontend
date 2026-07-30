'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export interface ResourceSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function ResourceSearchBar({
  onSearch,
  placeholder = 'Search learning tracks, articles, tools, and templates...',
}: ResourceSearchBarProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const router = useRouter();

  // Keep query in sync if URL param changes externally (e.g. from HeroSearchBar)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
    router.push(`/resources?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} role="search" className="relative" aria-label="Search resources">
        <label htmlFor="resource-search" className="sr-only">
          Search learning resources, guides, and templates
        </label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 sm:pl-4 pointer-events-none">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="block w-full p-3.5 sm:p-4 pl-10 sm:pl-12 pr-24 sm:pr-28 text-xs sm:text-sm md:text-base text-gray-900 border border-gray-200 rounded-full bg-white shadow-sm hover:border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-cyan-500 dark:focus:ring-cyan-500/20 transition-all outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 sm:right-2 top-1.5 bottom-1.5 px-4 sm:px-6 text-xs sm:text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 rounded-full transition-all cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
