"use client";

import { useEffect, useRef, useState } from "react";
import { MentorFilters } from "@/lib/mentor-types";
import { createPortal } from "react-dom";
import SearchInput from "./SearchInput";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MentorFilters;
  onFiltersChange: (filters: MentorFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const EXPERTISE_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Mobile",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Product Management",
  "UX Design",
  "QA Engineering",
];

const EXPERIENCE_OPTIONS = ["junior", "mid-level", "senior", "executive"];

const EXPERIENCE_LABELS: Record<string, string> = {
  junior: "Junior",
  "mid-level": "Mid-Level",
  senior: "Senior",
  executive: "Executive",
};

const INDUSTRY_OPTIONS = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Gaming",
  "Media",
  "Non-profit",
];

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "sessions", label: "Most Sessions" },
  { value: "hourlyRate", label: "Price: Low to High" },
  { value: "relevance", label: "Relevance" },
];

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const drawerContent = (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-drawer-title"
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
        aria-label="Filter options"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 id="filter-drawer-title" className="text-lg font-semibold text-slate-900">
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search Input */}
            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Search</h3>
              <SearchInput
                value={filters.search || ""}
                onChange={(value) => onFiltersChange({ ...filters, search: value || undefined })}
                placeholder="Search mentors..."
                debounceMs={300}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE_OPTIONS.map((expertise) => (
                  <label
                    key={expertise}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.expertise?.includes(expertise) || false}
                      onChange={(e) => {
                        const newExpertise = filters.expertise || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, expertise: [...newExpertise, expertise] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            expertise: newExpertise.filter((e) => e !== expertise),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {expertise}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Experience Level</h3>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <label
                    key={exp}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.experience?.includes(exp) || false}
                      onChange={(e) => {
                        const newExp = filters.experience || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, experience: [...newExp, exp] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            experience: newExp.filter((e) => e !== exp),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {EXPERIENCE_LABELS[exp]}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Industry</h3>
              <div className="flex flex-wrap gap-2">
                {INDUSTRY_OPTIONS.map((industry) => (
                  <label
                    key={industry}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.industry?.includes(industry) || false}
                      onChange={(e) => {
                        const newIndustry = filters.industry || [];
                        if (e.target.checked) {
                          onFiltersChange({ ...filters, industry: [...newIndustry, industry] });
                        } else {
                          onFiltersChange({
                            ...filters,
                            industry: newIndustry.filter((i) => i !== industry),
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    {industry}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Minimum Rating</h3>
              <select
                value={filters.minRating || ""}
                onChange={(e) => onFiltersChange({ ...filters, minRating: Number(e.target.value) || undefined })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Minimum rating"
              >
                <option value="">Any rating</option>
                <option value={4.5}>4.5+</option>
                <option value={4.0}>4.0+</option>
                <option value={3.5}>3.5+</option>
                <option value={3.0}>3.0+</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Maximum Hourly Rate</h3>
              <input
                type="number"
                value={filters.maxHourlyRate || ""}
                onChange={(e) => onFiltersChange({ ...filters, maxHourlyRate: Number(e.target.value) || undefined })}
                placeholder="e.g., 200"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Maximum hourly rate"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Sort By</h3>
              <select
                value={filters.sortBy || "relevance"}
                onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as MentorFilters["sortBy"] })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">Sort Order</h3>
              <div className="flex gap-4">
                {["asc", "desc"].map((order) => (
                  <label
                    key={order}
                    className="inline-flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortOrder"
                      value={order}
                      checked={filters.sortOrder === order}
                      onChange={() => onFiltersChange({ ...filters, sortOrder: order as "asc" | "desc" })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 capitalize">{order}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 space-y-3">
            <button
              onClick={onClearFilters}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={onApplyFilters}
              className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}