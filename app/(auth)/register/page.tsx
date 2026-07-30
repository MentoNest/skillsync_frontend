'use client';

import RegisterForm from '@/components/auth/RegisterForm';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import Link from 'next/link';

/**
 * RegisterPage
 *
 * Renders the split-screen registration view (layout shell provided by AuthLayout).
 *
 * Flow:
 *  – Social auth buttons (UI-only, no backend wiring yet)
 *  – "or sign up with email" divider
 *  – RegisterForm (handles credentials-based registration via AuthContext)
 */
export default function RegisterPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">Sign up to start learning and connecting</p>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 border border-gray-100 dark:border-gray-700">
        <SocialAuthButtons dividerLabel="or sign up with email" />

        <RegisterForm />
      </div>

      {/* Footer links */}
      <p className="text-center text-xs text-gray-400 mt-6">
        By signing up, you agree to our{' '}
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
