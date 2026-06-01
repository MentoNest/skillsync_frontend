import React from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
  rightElement?: React.ReactNode;
}

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration,
  rightElement,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400
            bg-gray-50 transition-all duration-150 outline-none
            focus:bg-white focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500
            ${error
              ? "border-red-400 bg-red-50 focus:ring-red-300/30 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300"
            }
            ${rightElement ? "pr-11" : ""}
          `}
          {...registration}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-500 flex items-center gap-1 mt-0.5"
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
}