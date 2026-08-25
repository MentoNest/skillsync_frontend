"use client";

import { getPasswordStrength } from "@/lib/validations/auth";

interface PasswordStrengthMeterProps {
  /** The current password value (from RHF watch) */
  value: string;
}

const BAR_COUNT = 4;

const colourMap: Record<string, string> = {
  weak: "bg-red-500",
  fair: "bg-amber-400",
  good: "bg-yellow-400",
  strong: "bg-emerald-500",
};

const textColourMap: Record<string, string> = {
  weak: "text-red-600 dark:text-red-400",
  fair: "text-amber-600 dark:text-amber-400",
  good: "text-yellow-600 dark:text-yellow-400",
  strong: "text-emerald-600 dark:text-emerald-400",
};

/**
 * PasswordStrengthMeter
 *
 * Renders 4 colour-coded bars + a text label reflecting real-time password
 * strength. Checks: length ≥ 8, number, lowercase, uppercase or symbol.
 * Each satisfied check adds one bar.
 */
export default function PasswordStrengthMeter({
  value,
}: PasswordStrengthMeterProps) {
  const { score, level, label, checks } = getPasswordStrength(value);

  if (level === "empty") return null;

  const barColour = colourMap[level] ?? "bg-gray-200";
  const labelColour = textColourMap[level] ?? "text-gray-500";

  return (
    <div
      aria-live="polite"
      aria-label={`Password strength: ${label}`}
      className="space-y-1.5 mt-1"
    >
      {/* Strength bars */}
      <div className="flex gap-1" role="img" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < score ? barColour : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* Label + checklist */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${labelColour}`}>{label}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 sr-only">
          {score} of {BAR_COUNT} checks passed
        </span>
      </div>

      {/* Requirement checklist */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
        <CheckItem satisfied={checks.length}>8+ characters</CheckItem>
        <CheckItem satisfied={checks.number}>Number (0–9)</CheckItem>
        <CheckItem satisfied={checks.lowercase}>Lowercase (a–z)</CheckItem>
        <CheckItem satisfied={checks.uppercaseOrSymbol}>
          Uppercase or symbol
        </CheckItem>
      </ul>
    </div>
  );
}

function CheckItem({
  satisfied,
  children,
}: {
  satisfied: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={`flex items-center gap-1 transition-colors duration-200 ${
        satisfied
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-gray-400 dark:text-gray-600"
      }`}
    >
      {satisfied ? (
        <svg
          aria-hidden="true"
          className="w-3 h-3 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="w-3 h-3 shrink-0 text-gray-300 dark:text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="10" r="7" />
        </svg>
      )}
      {children}
    </li>
  );
}
