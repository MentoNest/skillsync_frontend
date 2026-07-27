import Link from 'next/link';

/**
 * /register — Registration page placeholder.
 *
 * Wrapped by app/(auth)/layout.tsx which handles the centred container.
 * UI implementation will be added in a follow-up issue.
 */
export default function RegisterPage() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm">
      {/* Branding */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tracking-tight">
          SkillSync
        </span>
        <h1 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Register page — UI implementation coming soon.
        </p>
      </div>

      {/* Placeholder form area */}
      <div
        className="h-48 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 flex items-center justify-center"
        aria-label="Registration form placeholder"
      >
        <p className="text-sm text-gray-400 dark:text-gray-500 select-none">
          Form fields will be implemented here
        </p>
      </div>

      {/* Navigation link */}
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
