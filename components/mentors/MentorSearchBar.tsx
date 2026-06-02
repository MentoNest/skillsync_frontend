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
    <div className="w-full">
      <div className="relative">
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
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search mentors"
          style={{
            width: '100%',
            borderRadius: '100px',
            border: '1.5px solid rgba(20,18,16,0.15)',
            background: '#fff',
            padding: '11px 16px 11px 44px',
            fontSize: '14px',
            color: '#141210',
            fontFamily: "'DM Sans', sans-serif",
            outline: 'none',
            transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(20,18,16,0.5)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20,18,16,0.06)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(20,18,16,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
