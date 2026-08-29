import React from 'react';
import Footer from '@/components/navigation/Footer';

import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
  <div className="min-h-screen flex flex-col items-center bg-slate-50 dark:bg-gray-950 transition-colors">
      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#auth-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:bg-purple-600 focus:rounded-lg"
      >
        Skip to content
      </a>

      <main id="auth-main" className="flex-1 flex items-center justify-center px-4 py-12 w-full">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}