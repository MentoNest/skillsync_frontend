"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

type PasswordFieldProps = {
  label: string;
  name: string;
  id?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
};

export default function PasswordField({
  label,
  name,
  id,
  autoComplete,
  placeholder,
  required = false,
}: PasswordFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-medium text-slate-800">
        {label}
      </label>

      <div className="relative">
        <input
          id={fieldId}
          name={name}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        />

        <button
          type="button"
          onClick={() => setIsVisible((previous) => !previous)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          {isVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}