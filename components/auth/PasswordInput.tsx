"use client";

import { useId, useState } from "react";

export interface PasswordInputProps {
  /** Visible label for the field. */
  label: string;
  /** Controlled value. */
  value: string;
  /** Controlled change handler. */
  onChange: (value: string) => void;
  /** Overrides the generated input id. */
  id?: string;
  /** Name attribute, defaults to a derived value from the id. */
  name?: string;
  placeholder?: string;
  /** Defaults to `current-password`; pass `new-password` on registration. */
  autoComplete?: "current-password" | "new-password";
  required?: boolean;
  minLength?: number;
  /** Validation message. When set the input is announced as invalid. */
  error?: string | null;
}

function EyeIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}

/**
 * Password field with an accessible show/hide toggle (#1173).
 *
 * The toggle is an icon button rather than the previous "Show"/"Hide" text
 * link: the requirement is an eye icon, and a text link changes width as the
 * label flips, nudging the field layout on every click. The button is
 * absolutely positioned inside a relatively-positioned wrapper and the input
 * reserves `pr-12` for it, so toggling never reflows the input.
 *
 * `aria-pressed` plus a label that flips between "Show password" and "Hide
 * password" tells a screen reader both the current state and what the control
 * does, which a bare icon cannot.
 */
export default function PasswordInput({
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  autoComplete = "current-password",
  required = false,
  minLength,
  error,
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const inputName = name ?? "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[var(--foreground)]"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={inputId}
          name={inputName}
          type={showPassword ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 pr-12 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] aria-invalid:border-red-400"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-1 inline-flex w-10 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
