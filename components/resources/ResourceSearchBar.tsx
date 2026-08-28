"use client";

import React from "react";
import { SearchIcon } from "@/components/ui/icons";

interface ResourceSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

const ResourceSearchBar = ({
  value,
  onChange,
  placeholder = "Search resources",
  ariaLabel = "Search resources",
  className = "",
}: ResourceSearchBarProps) => {
  return (
    <label
      className={[
        "flex w-full max-w-xl items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100",
        className,
      ].join(" ")}
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
    </label>
  );
};

export default ResourceSearchBar;
