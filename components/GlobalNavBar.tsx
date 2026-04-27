'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Learning Resources', href: '/learning-resources' },
  { label: 'Mentors', href: '/mentors' },
  { label: 'About', href: '/about' },
];

export default function GlobalNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-indigo-600" aria-label="SkillSync home">
          SkillSync
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className="text-gray-600 hover:text-indigo-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1"
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-3" role="group" aria-label="Account actions">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" aria-hidden="true" />
          <span className="block w-5 h-0.5 bg-current mb-1" aria-hidden="true" />
          <span className="block w-5 h-0.5 bg-current" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2" role="menu" aria-label="Mobile navigation menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-indigo-600 text-sm font-medium py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-200" role="group" aria-label="Account actions">
            <Link href="/login" className="block text-sm text-gray-700 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded px-2" role="menuitem">Log in</Link>
            <Link href="/register" className="block text-sm bg-indigo-600 text-white px-3 py-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" role="menuitem">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
