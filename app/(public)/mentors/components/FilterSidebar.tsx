"use client";

import React from "react";

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <aside className={`w-full md:w-64 lg:w-72 ${className}`}>
      <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        {/* Filter sections will go here */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Expertise</h4>
            {/* Expertise filter options */}
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
