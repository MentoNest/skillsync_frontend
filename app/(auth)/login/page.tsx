'use client';

import LoginForm from '@/components/auth/LoginForm';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import Link from 'next/link';

/**
 * LoginPage
 *
 * Renders the split-screen login view (layout shell provided by AuthLayout).
 *
 * Flow:
 *  – Social auth buttons (UI-only, no backend wiring yet)
 *  – "or continue with email" divider
 *  – LoginForm (handles credentials-based sign-in via AuthContext)
 */
export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign in to continue to SkillSync</p>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 border border-gray-100 dark:border-gray-700">
        <SocialAuthButtons dividerLabel="or continue with email" />

        <LoginForm />
      </div>

      {/* Footer links */}
      <p className="text-center text-xs text-gray-400 mt-6">
        By signing in, you agree to our{' '}
        <Link href="#" className="text-purple-600 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="text-purple-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
