'use client';

import Link from "next/link";
import SplitScreenAuthLayout from "@/components/auth/SplitScreenAuthLayout";
import PasswordField from "@/components/auth/PasswordField";

export default function LoginPage() {
  return (
    <SplitScreenAuthLayout
      title="Welcome Back"
      description="Access your SkillSync account to continue your learning journey."
    >
      <form className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-800">
            Email Address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Password Input */}
        <PasswordField
          id="login-password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-purple-700 hover:to-indigo-700"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 mb-6 flex items-center">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="mx-4 text-sm text-slate-600">Or</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-400"
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-400"
        >
          Continue with GitHub
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
          Create one
        </Link>
      </p>
    </SplitScreenAuthLayout>
  );
}
