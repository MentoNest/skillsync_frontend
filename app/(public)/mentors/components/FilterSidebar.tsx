"use client";

import React from "react";

interface FilterSidebarProps {
  className?: string;
  allExpertise: string[];
  selectedExpertise: string[];
  onToggleExpertise: (expertise: string) => void;
}

export default function FilterSidebar({
  className,
  allExpertise,
  selectedExpertise,
  onToggleExpertise,
}: FilterSidebarProps) {
  return (
    <aside className={`w-full md:w-64 lg:w-72 ${className}`}>
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Expertise</h4>
            <div className="space-y-2">
              {allExpertise.map((expertise) => (
                <label
                  key={expertise}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedExpertise.includes(expertise)}
                    onChange={() => onToggleExpertise(expertise)}
                    className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {expertise}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            {/* Price range filter options */}
          </div>
          <div>
            <h4 className="font-medium mb-2">Experience</h4>
            {/* Experience filter options */}
          </div>
        </div>
      </div>
    </aside>
  );
}
