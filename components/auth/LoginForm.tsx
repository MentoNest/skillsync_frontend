"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/contexts/AuthContext";
import PasswordInput from "./PasswordInput";
import FormField from "./FormField";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch {
      // Error is surfaced via AuthContext `error` state
    }
  };

  const isDisabled = isLoading || isSubmitting || !isValid;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Sign in with email
      </h2>

      {/* API-level error (only shown once, at the top) */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-5 flex items-start gap-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 mt-0.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* Email */}
        <FormField label="Email" error={errors.email?.message}>
          {({ id, className, ...inputProps }) => (
            <input
              id={id}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...inputProps}
              {...register("email")}
              className={className}
            />
          )}
        </FormField>

        {/* Password */}
        <FormField label="Password" error={errors.password?.message}>
          {({ id, className, ...inputProps }) => (
            <PasswordInput
              id={id}
              placeholder="••••••••"
              autoComplete="current-password"
              {...inputProps}
              {...register("password")}
              className={className}
            />
          )}
        </FormField>

        {/* Forgot password link */}
        <div className="-mt-2 text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          className="relative w-full bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing in…
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
