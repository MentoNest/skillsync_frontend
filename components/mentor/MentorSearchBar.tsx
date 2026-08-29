"use client";

import React, { useCallback } from "react";
import { SearchIcon } from "@/components/ui/icons";

interface MentorSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

const MentorSearchBar = ({
  value,
  onChange,
  placeholder = "Search mentors by name, skills, or headline...",
  ariaLabel = "Search mentors by name, skills, or headline",
  className = "",
}: MentorSearchBarProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape" && value) {
        event.preventDefault();
        onChange("");
      }
    },
    [onChange, value],
  );

  return (
    <div
      role="search"
      className={[
        "relative flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100",
        className,
      ].join(" ")}
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
      {value.trim().length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MentorSearchBar;

