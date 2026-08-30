"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api-client";
import PasswordInput from "./PasswordInput";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = data.user;
      login(user, data.token);

      if (user.role === "mentor") {
        router.push("/dashboard/mentor");
      } else {
        router.push("/dashboard/mentee");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Logo mark — visible on mobile where right panel is hidden */}
      <div className="mb-8 flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600">
          <span className="text-sm font-bold text-white">S</span>
        </div>
        <span className="text-sm font-semibold tracking-wide text-slate-700">SkillSync</span>
      </div>

      <h1 className="mb-1 text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mb-8 text-sm text-slate-500">
        Log in to your SkillSync account to continue your mentorship journey.
      </p>

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        {/* Password + forgot link */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isLoading ? "Logging in…" : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
