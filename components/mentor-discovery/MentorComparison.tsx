"use client";

import { useState, useEffect, useRef } from "react";
import { Mentor, type MentorComparison as MentorComparisonType, ComparisonCriteria } from "@/lib/mentor-types";
import { createPortal } from "react-dom";

const COMPARISON_CRITERIA: ComparisonCriteria[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "headline", label: "Headline", type: "text" },
  { key: "experienceLevel", label: "Experience Level", type: "text" },
  { key: "industry", label: "Industry", type: "text" },
  { key: "skills", label: "Skills", type: "array" },
  { key: "rating", label: "Rating", type: "number" },
  { key: "hourlyRate", label: "Hourly Rate", type: "number" },
  { key: "availability", label: "Availability", type: "text" },
  { key: "sessions", label: "Sessions Completed", type: "number" },
  { key: "bio", label: "Bio", type: "text" },
];

interface MentorComparisonProps {
  selectedMentors: Mentor[];
  onClose: () => void;
  onRemoveMentor: (mentorId: string) => void;
}

export default function MentorComparison({ selectedMentors, onClose, onRemoveMentor }: MentorComparisonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selectedMentors.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedMentors.length]);

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

  const getValue = (mentor: Mentor, criterion: ComparisonCriteria) => {
    const value = mentor[criterion.key];
    if (criterion.type === "array") {
      return (value as string[]).join(", ");
    }
    if (criterion.type === "number") {
      return criterion.key === "hourlyRate" ? `$${value}/hr` : String(value);
    }
    return String(value);
  };

  if (!isOpen || selectedMentors.length === 0) return null;

  const drawerContent = (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="fixed right-0 top-0 bottom-0 w-full max-w-4xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:max-w-5xl"
        aria-label="Mentor comparison"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 id="comparison-title" className="text-lg font-semibold text-slate-900">
              Compare Mentors ({selectedMentors.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close comparison"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm" role="table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="sticky left-0 bg-white p-3 text-left font-medium text-slate-900 border-r border-slate-200 z-10">
                      Criteria
                    </th>
                    {selectedMentors.map((mentor) => (
                      <th key={mentor.id} className="sticky p-3 text-left font-medium text-slate-900 border-b border-slate-200 relative">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm"
                            aria-hidden="true"
                          >
                            {mentor.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="max-w-[150px]">
                            <p className="font-medium text-slate-900 truncate">{mentor.name}</p>
                            <p className="text-xs text-slate-500 truncate">{mentor.headline}</p>
                          </div>
                          <button
                            onClick={() => onRemoveMentor(mentor.id)}
                            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label={`Remove ${mentor.name} from comparison`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_CRITERIA.map((criterion) => (
                    <tr key={criterion.key} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="sticky left-0 bg-white p-3 font-medium text-slate-900 border-r border-slate-200 z-10">
                        {criterion.label}
                      </td>
                      {selectedMentors.map((mentor) => (
                        <td key={mentor.id} className="p-3 text-slate-700">
                          {criterion.key === "skills" ? (
                            <div className="flex flex-wrap gap-1">
                              {(mentor.skills || []).slice(0, 5).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-700"
                                >
                                  {skill}
                                </span>
                              ))}
                              {(mentor.skills || []).length > 5 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-500">
                                  +{(mentor.skills || []).length - 5} more
                                </span>
                              )}
                            </div>
                          ) : (
                            getValue(mentor, criterion)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center mb-4">
              Select up to 3 mentors to compare side by side
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}