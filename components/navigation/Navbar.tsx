'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Discover Mentors', href: '/discover-mentors' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-cyan-600 tracking-tight">
          SkillSync
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                  pathname === href ? 'text-cyan-600 border-b-2 border-cyan-600 pb-0.5' : 'text-gray-600'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-cyan-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <ul className="flex flex-col gap-1 mt-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 hover:text-cyan-600 ${
                    pathname === href ? 'text-cyan-600 bg-cyan-50' : 'text-gray-700'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium text-gray-700 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
