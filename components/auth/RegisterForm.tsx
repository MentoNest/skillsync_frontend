import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        Join SkillSync and connect with mentors ready to help you grow.
      </p>

      <form className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="John Doe"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-800"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            required
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
          Log in
        </Link>
      </p>
    </div>
  );
}