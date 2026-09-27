"use client";

import React from "react";
import { MentorFilters } from "@/lib/mentor-types";
import { IndustryFilter } from "@/components/mentor-discovery/IndustryFilter";

export interface MentorFilterSidebarProps {
  filters: MentorFilters;
  onFiltersChange: (filters: MentorFilters) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function MentorFilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: MentorFilterSidebarProps) {
  return (
    <aside className={className} aria-label="Mentor filters">
      <div className="space-y-6">
        <IndustryFilter
          selectedIndustries={filters.industry || []}
          onChange={(industry) => onFiltersChange({ ...filters, industry })}
          onClear={() => onFiltersChange({ ...filters, industry: [] })}
        />
      </div>
    </aside>
  );
}

export { IndustryFilter };
