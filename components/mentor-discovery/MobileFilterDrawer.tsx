"use client";

import { useEffect, useRef } from "react";
import { MentorFilters } from "@/lib/mentor-types";
import { createPortal } from "react-dom";
import MentorFilterSidebar from "@/components/mentor-discovery/MentorFilterSidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MentorFilters;
  onFiltersChange: (filters: MentorFilters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

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
            <MentorFilterSidebar
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClearFilters={onClearFilters}
              variant="pills"
              showHeader={false}
            />

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
