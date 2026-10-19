"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";
import {
  HOURLY_RATE_DOMAIN_MAX,
  HOURLY_RATE_DOMAIN_MIN,
  HOURLY_RATE_STEP,
  normalizeHourlyRateRange,
  type HourlyRateRange,
} from "@/lib/hourly-rate";

export interface HourlyRateFilterProps {
  minHourlyRate?: number;
  maxHourlyRate?: number;
  /** Receives only the bounds that are actually set. */
  onChange: (range: HourlyRateRange) => void;
  domainMin?: number;
  domainMax?: number;
  step?: number;
  /** Show the "Any rate" reset affordance. Default true. */
  showClear?: boolean;
  className?: string;
}

function toText(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

/**
 * Dual-handle hourly rate filter: a stacked range slider for coarse
 * dragging plus two numeric inputs for exact entry. Both paths funnel
 * through `normalizeHourlyRateRange`, so the range is always valid.
 */
export default function HourlyRateFilter({
  minHourlyRate,
  maxHourlyRate,
  onChange,
  domainMin = HOURLY_RATE_DOMAIN_MIN,
  domainMax = HOURLY_RATE_DOMAIN_MAX,
  step = HOURLY_RATE_STEP,
  showClear = true,
  className,
}: HourlyRateFilterProps) {
  const groupId = useId();

  // Local text keeps typing usable: without it, typing "300" would be
  // fought by clamping on the intermediate "3".
  const [minText, setMinText] = useState(() => toText(minHourlyRate));
  const [maxText, setMaxText] = useState(() => toText(maxHourlyRate));

  useEffect(() => {
    setMinText(toText(minHourlyRate));
  }, [minHourlyRate]);

  useEffect(() => {
    setMaxText(toText(maxHourlyRate));
  }, [maxHourlyRate]);

  const min = minHourlyRate ?? domainMin;
  const max = maxHourlyRate ?? domainMax;
  const span = domainMax - domainMin || 1;

  const emit = (next: { min?: number; max?: number }) => {
    const normalized = normalizeHourlyRateRange(next, {
      domainMin,
      domainMax,
      step,
    });

    onChange({
      min: normalized.min,
      max: normalized.max,
    });

    // Reflect the enforced values back into the fields.
    setMinText(toText(normalized.min));
    setMaxText(toText(normalized.max));
  };

  const handleMinSlider = (value: number) => {
    // Never let the low handle cross above the high one.
    emit({ min: Math.min(value, max), max: maxHourlyRate });
  };

  const handleMaxSlider = (value: number) => {
    emit({ min: minHourlyRate, max: Math.max(value, min) });
  };

  const handleMinInput = (raw: string) => {
    setMinText(raw);
    if (raw.trim() === "") {
      emit({ max: maxHourlyRate });
      return;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    emit({ min: parsed, max: maxHourlyRate });
  };

  const handleMaxInput = (raw: string) => {
    setMaxText(raw);
    if (raw.trim() === "") {
      emit({ min: minHourlyRate });
      return;
    }
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    emit({ min: minHourlyRate, max: parsed });
  };

  const isActive = minHourlyRate !== undefined || maxHourlyRate !== undefined;

  const leftPercent = ((min - domainMin) / span) * 100;
  const rightPercent = ((domainMax - max) / span) * 100;

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Hourly Rate</h3>
        {showClear && isActive && (
          <button
            type="button"
            onClick={() => emit({ min: undefined, max: undefined })}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
          >
            Any rate
          </button>
        )}
      </div>

      <div
        className="px-1 pt-1 pb-3"
        role="group"
        aria-labelledby={`${groupId}-label`}
      >
        <span id={`${groupId}-label`} className="sr-only">
          Hourly rate range
        </span>

        <div className="relative h-6">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 w-full rounded-full bg-slate-200"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-indigo-500"
            style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
            aria-hidden="true"
          />

          <input
            type="range"
            min={domainMin}
            max={domainMax}
            step={step}
            value={min}
            onChange={(e) => handleMinSlider(Number(e.target.value))}
            aria-label="Minimum hourly rate"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-grab focus:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-indigo-500 [&::-webkit-slider-thumb]:ring-offset-2"
          />
          <input
            type="range"
            min={domainMin}
            max={domainMax}
            step={step}
            value={max}
            onChange={(e) => handleMaxSlider(Number(e.target.value))}
            aria-label="Maximum hourly rate"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-grab focus:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-indigo-500 [&::-webkit-slider-thumb]:ring-offset-2"
          />
        </div>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label
            htmlFor={`${groupId}-min`}
            className="block text-xs font-medium text-slate-600 mb-1"
          >
            Min ($/hr)
          </label>
          <input
            id={`${groupId}-min`}
            type="number"
            inputMode="numeric"
            min={domainMin}
            max={domainMax}
            step={step}
            value={minText}
            onChange={(e) => handleMinInput(e.target.value)}
            placeholder={String(domainMin)}
            className={inputClass}
            aria-label="Minimum hourly rate"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor={`${groupId}-max`}
            className="block text-xs font-medium text-slate-600 mb-1"
          >
            Max ($/hr)
          </label>
          <input
            id={`${groupId}-max`}
            type="number"
            inputMode="numeric"
            min={domainMin}
            max={domainMax}
            step={step}
            value={maxText}
            onChange={(e) => handleMaxInput(e.target.value)}
            placeholder={String(domainMax)}
            className={inputClass}
            aria-label="Maximum hourly rate"
          />
        </div>
      </div>

      <p className="text-xs text-slate-500" aria-live="polite">
        {isActive
          ? `Showing mentors between $${min} and $${max} per hour.`
          : "No rate filter applied."}
      </p>
    </div>
  );
}
