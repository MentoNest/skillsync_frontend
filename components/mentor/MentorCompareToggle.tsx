// Compare toggle for a mentor card — adds/removes a mentor from the
// side-by-side comparison (#861).
"use client";

import React from "react";

interface MentorCompareToggleProps {
  checked: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onToggle: () => void;
}

const MentorCompareToggle = ({
  checked,
  disabled = false,
  disabledReason,
  onToggle,
}: MentorCompareToggleProps) => {
  const label = checked ? "Remove from comparison" : "Add to comparison";

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={checked}
      aria-label={label}
      title={disabled ? (disabledReason ?? label) : label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ${
        checked
          ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700"
          : "border-gray-200 bg-white text-gray-400 hover:border-primary-300 hover:text-primary-600"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {checked && <path d="M20 6L9 17l-5-5" />}
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="M6 13h12" />
      </svg>
    </button>
  );
};

export default MentorCompareToggle;