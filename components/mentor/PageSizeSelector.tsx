// Page size selector for mentor listing
"use client";
import React from "react";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
  totalResults?: number;
}

const PageSizeSelector = ({ 
  pageSize, 
  onPageSizeChange,
  options = [12, 24, 48, 96],
  totalResults
}: PageSizeSelectorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <label htmlFor="page-size-select" className="font-medium">
        Show:
      </label>
      <select
        id="page-size-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-1.5 rounded-md border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        aria-label="Results per page"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
      {totalResults !== undefined && (
        <span className="text-slate-500">
          of {totalResults} total
        </span>
      )}
    </div>
  );
};

export default PageSizeSelector;
