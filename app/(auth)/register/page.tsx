"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Enter your full name");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register(fullName.trim(), email.trim(), password);
      window.location.href = "/community";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Join SkillSync and start your learning journey
      </p>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[var(--foreground)]">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-[var(--foreground)]">
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-sm font-medium text-[var(--foreground)]">
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 pr-16 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--foreground)]">
            Confirm password
          </label>
          <div className="relative mt-1">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 pr-16 text-[var(--foreground)] placeholder-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              aria-pressed={showConfirmPassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-[var(--primary)] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[var(--primary-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

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
