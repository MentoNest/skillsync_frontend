'use client';

import { useState } from 'react';

interface CommunitySidebarProps {
  children: React.ReactNode;
}

export default function CommunitySidebar({ children }: CommunitySidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full bg-cyan-600 text-white shadow-lg hover:bg-cyan-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-40 h-full w-80 bg-white shadow-lg transform transition-transform duration-200
          lg:static lg:z-auto lg:translate-x-0 lg:w-full lg:h-auto lg:shadow-none lg:rounded-lg
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 lg:p-0">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {children}
        </div>
      </aside>
    </>
  );
}
