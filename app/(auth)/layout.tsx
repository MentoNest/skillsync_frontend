import React from 'react';

/**
 * Shared layout for the (auth) route group.
 *
 * Wraps both /login and /register with a centred, full-height container so
 * any auth page is always vertically and horizontally centred without each
 * page needing to repeat that boilerplate.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#auth-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:bg-purple-600 focus:rounded-lg"
      >
        Skip to content
      </a>

      <main id="auth-main" className="w-full max-w-md">
        {children}
      </main>
    </div>
  );
}
