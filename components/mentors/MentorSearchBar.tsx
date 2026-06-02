'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MentorSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function MentorSearchBar({
  onSearch,
  placeholder = 'Search by name, skills, or headline...',
  debounceMs = 300,
}: MentorSearchBarProps) {
  const [query, setQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!onSearch) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, onSearch, debounceMs]);

  return (
    <form role="search" aria-label="Search mentors" className="w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <label htmlFor="mentor-search" className="sr-only">
          Search mentors
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5"
            style={{ color: '#94928d' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="mentor-search"
          name="mentorSearch"
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-[rgba(20,18,16,0.15)] bg-white px-4 py-3 pl-11 text-[14px] text-[#141210] font-[DM Sans] outline-none transition duration-200 focus:border-[#141210] focus:ring-2 focus:ring-[#d6d3d1]"
          autoComplete="off"
        />
      </div>
    </form>
  );
}
