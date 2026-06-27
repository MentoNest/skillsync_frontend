import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-50 via-purple-50/80 to-indigo-50 border-t border-purple-100 dark:from-purple-950 dark:via-purple-900/80 dark:to-indigo-950 dark:border-purple-900 transition-colors" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          {/* Logo and Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              SkillSync
            </Link>
            <p className="text-sm text-purple-700/80 dark:text-purple-300/80 max-w-sm leading-relaxed">
              SkillSync connects aspiring professionals with world-class mentors. Build your skills, navigate your career path, and reach your goals.
            </p>
            {/* Social Links */}
            <div className="flex space-x-5 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors" aria-label="GitHub">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1: Explore */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/discover-mentors" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Discover Mentors
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/how-it-works" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-purple-600/80 hover:text-purple-700 dark:text-purple-300/80 dark:hover:text-purple-200 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright info */}
        <div className="mt-12 pt-8 border-t border-purple-100 dark:border-purple-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-purple-500/80 dark:text-purple-400/80 text-center sm:text-left">
            &copy; {currentYear} SkillSync. All rights reserved.
          </p>
          <p className="text-xs text-purple-400/60 dark:text-purple-500/60 text-center sm:text-right">
            Designed for career growth and mentorship connection.
          </p>
        </div>
      </div>
    </footer>
  );
}
