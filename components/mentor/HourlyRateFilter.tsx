// Hourly rate range filter for mentor discovery (#842)
"use client";
import React from "react";

interface HourlyRateFilterProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const HourlyRateFilter = ({ min, max, onChange }: HourlyRateFilterProps) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-700">Hourly Rate ($)</p>
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={max}
        value={min}
        onChange={(e) => onChange(Number(e.target.value), max)}
        placeholder="Min"
        className="w-20 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Minimum hourly rate"
      />
      <span className="text-gray-400 text-sm">–</span>
      <input
        type="number"
        min={min}
        value={max}
        onChange={(e) => onChange(min, Number(e.target.value))}
        placeholder="Max"
        className="w-20 text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Maximum hourly rate"
      />
    </div>
  </div>
);

export default HourlyRateFilter;
