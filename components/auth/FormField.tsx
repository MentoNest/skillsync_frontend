"use client";

import { type ReactNode, useId } from "react";

interface FormFieldProps {
  /** Rendered label text */
  label: string;
  /** Error message string from react-hook-form */
  error?: string;
  /** Optional hint shown below the input when there is no error */
  hint?: ReactNode;
  /** The <input>, <PasswordInput>, or any other form control */
  children: (inputProps: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    className: string;
  }) => ReactNode;
  /** Extra wrapper class */
  className?: string;
}

/**
 * FormField
 *
 * A reusable accessibility-first form field shell that:
 * - Generates stable IDs with useId()
 * - Links the label → input via htmlFor
 * - Links the input → error message via aria-describedby
 * - Sets aria-invalid on the input when an error is present
 * - Provides consistent error/valid border colour to the input via className
 * - Renders an error message with role="alert" so screen readers announce it
 */
export default function FormField({
  label,
  error,
  hint,
  children,
  className = "",
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const hasError = !!error;
  const inputClass = [
    "border rounded-lg px-3 py-2.5 text-sm w-full outline-none focus:ring-2 transition",
    hasError
      ? "border-red-400 focus:ring-red-300 focus:border-red-400 bg-red-50/30 dark:bg-red-900/10"
      : "border-gray-300 dark:border-gray-600 focus:ring-cyan-500 focus:border-cyan-500",
    "dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500",
  ]
    .filter(Boolean)
    .join(" ");

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {children({
        id,
        "aria-invalid": hasError,
        "aria-describedby": describedBy || undefined,
        className: inputClass,
      })}

      {/* Inline error — announced by screen readers immediately */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
        >
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Hint text — visible only when no error is showing */}
      {!error && hint && (
        <p id={hintId} className="text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  );
}
