"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import {
  hasFormErrors,
  validateRegisterForm,
  type RegisterFormErrors,
} from "@/lib/auth-validation";

const FULL_NAME_ID = "register-fullname";
const EMAIL_ID = "register-email";
const PASSWORD_ID = "register-password";
const CONFIRM_PASSWORD_ID = "register-confirm-password";

function errorId(id: string) {
  return `${id}-error`;
}

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
    hasError ? "border-red-400" : "border-[var(--border)]",
  ].join(" ");
}

/**
 * Registration form with inline validation (#1168, #1172) and social sign-in
 * (#1170).
 *
 * As with login, every field owns its own message and is linked to it through
 * `aria-describedby`. Confirm-password is validated against the live password
 * value so the two cannot silently disagree.
 */
export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);

    const fieldErrors = validateRegisterForm({
      fullName,
      email,
      password,
      confirmPassword,
    });
    setErrors(fieldErrors);
    if (hasFormErrors(fieldErrors)) {
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register(fullName.trim(), email.trim(), password);
      window.location.href = "/community";
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]";

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Join SkillSync and start your learning journey
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
            htmlFor={FULL_NAME_ID}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Full name
          </label>
          <input
            id={FULL_NAME_ID}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={
              errors.fullName ? errorId(FULL_NAME_ID) : undefined
            }
            className={`${fieldClass(Boolean(errors.fullName))} mt-1`}
            placeholder="John Doe"
          />
          {errors.fullName ? (
            <p id={errorId(FULL_NAME_ID)} className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          ) : null}
        </div>

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
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId(EMAIL_ID) : undefined}
            className={`${fieldClass(Boolean(errors.email))} mt-1`}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id={errorId(EMAIL_ID)} className="mt-1 text-sm text-red-600">
              {errors.email}
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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={
                errors.password ? errorId(PASSWORD_ID) : undefined
              }
              className={`${fieldClass(Boolean(errors.password))} pr-16`}
              placeholder="At least 8 characters"
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
          {errors.password ? (
            <p
              id={errorId(PASSWORD_ID)}
              className="mt-1 text-sm text-red-600"
            >
              {errors.password}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={CONFIRM_PASSWORD_ID}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            Confirm password
          </label>
          <div className="relative mt-1">
            <input
              id={CONFIRM_PASSWORD_ID}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={errors.confirmPassword ? true : undefined}
              aria-describedby={
                errors.confirmPassword
                  ? errorId(CONFIRM_PASSWORD_ID)
                  : undefined
              }
              className={`${fieldClass(Boolean(errors.confirmPassword))} pr-16`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showConfirmPassword}
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              className="absolute inset-y-0 right-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p
              id={errorId(CONFIRM_PASSWORD_ID)}
              className="mt-1 text-sm text-red-600"
            >
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-[var(--primary)] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <SocialAuthButtons className="mt-6" />

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--primary)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
