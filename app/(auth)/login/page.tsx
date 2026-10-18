"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import {
  hasFormErrors,
  validateLoginForm,
  type LoginFormErrors,
} from "@/lib/auth-validation";

const EMAIL_ID = "login-email";
const PASSWORD_ID = "login-password";
const EMAIL_ERROR_ID = `${EMAIL_ID}-error`;
const PASSWORD_ERROR_ID = `${PASSWORD_ID}-error`;

function fieldClass(hasError: boolean) {
  return [
    "mt-1 w-full rounded-md border bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
    hasError ? "border-red-400" : "border-[var(--border)]",
  ].join(" ");
}

/**
 * Login form with inline validation (#1169, #1172) and social sign-in (#1170).
 *
 * Each field owns its own error: the message sits directly under the input it
 * describes, the input gets `aria-invalid`, and the message is wired in with
 * `aria-describedby` so a screen reader reads it when the field receives focus.
 * Validation runs on submit only, so the form does not scold the user while
 * they are still typing.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);

    const fieldErrors = validateLoginForm({ email, password });
    setErrors(fieldErrors);
    if (hasFormErrors(fieldErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      await authApi.login(email.trim(), password);
      window.location.href = "/community";
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const emailError = errors.email;
  const passwordError = errors.password;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Sign in to your SkillSync account
      </p>

      {serverError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label
            htmlFor={EMAIL_ID}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Email
          </label>
          <input
            id={EMAIL_ID}
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? EMAIL_ERROR_ID : undefined}
            className={fieldClass(Boolean(emailError))}
            placeholder="you@example.com"
          />
          {emailError ? (
            <p id={EMAIL_ERROR_ID} className="mt-1 text-sm text-red-600">
              {emailError}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={PASSWORD_ID}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id={PASSWORD_ID}
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={passwordError ? true : undefined}
              aria-describedby={passwordError ? PASSWORD_ERROR_ID : undefined}
              className={fieldClass(Boolean(passwordError))}
              placeholder="Enter your password"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordError ? (
            <p id={PASSWORD_ERROR_ID} className="mt-1 text-sm text-red-600">
              {passwordError}
            </p>
          ) : null}
          <p className="mt-1 text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              Forgot password?
            </Link>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-[var(--primary)] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <SocialAuthButtons className="mt-6" />

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
