"use client";

import { useState } from "react";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

export default function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState(value.min);
  const [maxValue, setMaxValue] = useState(value.max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(newMin);
    onChange({ ...value, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(newMax);
    onChange({ ...value, max: newMax });
  };

  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Hourly Rate
      </legend>
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <label htmlFor="min-price" className="sr-only">
            Min price
          </label>
          <input
            type="range"
            id="min-price"
            min={min}
            max={max}
            value={minValue}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${minValue}
          </div>
        </div>
        <div className="relative w-full">
          <label htmlFor="max-price" className="sr-only">
            Max price
          </label>
          <input
            type="range"
            id="max-price"
            min={min}
            max={max}
            value={maxValue}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${maxValue}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
