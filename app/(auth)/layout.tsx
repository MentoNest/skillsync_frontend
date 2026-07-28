import React from 'react';
import Image from 'next/image';

/**
 * Shared split-screen layout for the (auth) route group.
 *
 * Desktop: Split layout with form on left, purple gradient + mentor card on right
 * Mobile: Form only, right panel hidden
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#auth-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:bg-purple-600 focus:rounded-lg"
      >
        Skip to content
      </a>

      {/* Left Side - Form Container */}
      <main
        id="auth-main"
        className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8 transition-colors"
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Right Side - Purple Gradient + Mentor Card (Hidden on mobile) */}
      <aside className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center px-12 py-16 w-full">
          {/* Testimonial Section */}
          <div className="max-w-lg text-center mb-12">
            <svg
              className="w-12 h-12 text-purple-200/40 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
              Grow confidently with support from skilled mentors who care
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Featured Mentor Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl max-w-sm w-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/20">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center">
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
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Sarah Johnson</h3>
                <p className="text-purple-200 text-sm">Senior Product Designer</p>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              &ldquo;Mentoring on SkillSync has been incredibly rewarding. I love helping others grow their skills.&rdquo;
            </p>
            <div className="flex items-center gap-4 text-sm text-purple-200">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span>50+ mentees</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9 rating</span>
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-md w-full">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">10K+</p>
              <p className="text-purple-200 text-sm">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">500+</p>
              <p className="text-purple-200 text-sm">Expert Mentors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">95%</p>
              <p className="text-purple-200 text-sm">Success Rate</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
