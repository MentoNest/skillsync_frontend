// Side-by-side comparison of selected mentors (#861). Rendered as a semantic
// table so screen readers can navigate the comparison (#864).
"use client";

import React from "react";
import type { Mentor } from "@/types/mentor";
import MentorProfileImage from "./MentorProfileImage";
import MentorSkillTag from "./MentorSkillTag";

interface MentorComparisonPanelProps {
  mentors: Mentor[];
  onRemove: (mentorId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const EXPERIENCE_LABELS: Record<Mentor["experienceLevel"], string> = {
  junior: "Junior (0–2 yrs)",
  mid: "Mid (2–5 yrs)",
  senior: "Senior (5–10 yrs)",
  principal: "Principal (10+ yrs)",
};

const AVAILABILITY_LABELS: Record<Mentor["availability"], string> = {
  available: "Available",
  busy: "Busy",
  unavailable: "Unavailable",
};

const MentorComparisonPanel = ({ mentors, onRemove, onClear, onClose }: MentorComparisonPanelProps) => {
  const columnCount = mentors.length;

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `140px repeat(${columnCount}, minmax(0, 1fr))`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close comparison"
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 cursor-default"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-comparison-title"
        className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4">
          <h2 id="mentor-comparison-title" className="text-lg font-semibold text-gray-900">
            Compare Mentors
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            role="table"
            aria-label="Side-by-side mentor comparison"
            className="grid min-w-[640px] divide-y divide-gray-100"
            style={gridStyle}
          >
            <div role="rowgroup" className="contents">
              <div role="row" className="contents">
                <div role="columnheader" className="px-3 py-3 text-xs font-medium text-gray-400" />
                {mentors.map((mentor) => (
                  <div role="columnheader" key={mentor.id} className="px-3 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MentorProfileImage src={mentor.avatarUrl} name={mentor.name} size={40} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">{mentor.name}</p>
                          <p className="truncate text-xs text-gray-500">{mentor.title}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(mentor.id)}
                        aria-label={`Remove ${mentor.name} from comparison`}
                        className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {[
              { label: "Hourly rate", render: (m: Mentor) => <strong>${m.hourlyRate}/hr</strong> },
              { label: "Experience", render: (m: Mentor) => EXPERIENCE_LABELS[m.experienceLevel] },
              { label: "Availability", render: (m: Mentor) => AVAILABILITY_LABELS[m.availability] },
              { label: "Rating", render: (m: Mentor) => `${m.rating.toFixed(1)} ★ (${m.reviewCount} reviews)` },
              {
                label: "Skills",
                render: (m: Mentor) => (
                  <div className="flex flex-wrap gap-1">
                    {m.skills.slice(0, 4).map((skill) => (
                      <MentorSkillTag key={skill.id} skill={skill.name} />
                    ))}
                  </div>
                ),
              },
            ].map((row) => (
              <div role="row" key={row.label} className="contents">
                <div role="cell" className="px-3 py-3 text-xs font-medium text-gray-400">
                  {row.label}
                </div>
                {mentors.map((mentor) => (
                  <div role="cell" key={mentor.id} className="px-3 py-3 text-sm text-gray-700">
                    {row.render(mentor)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorComparisonPanel;