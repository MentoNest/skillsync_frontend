import React from 'react';

/**
 * ResourceCategoryCard — Reusable card for resource category navigation.
 *
 * Renders an icon, title, description, and a navigable link with hover
 * animations, focus management, and dark-mode support.
 *
 * Accessibility:
 * - Rendered as an <a> tag so it's keyboard-navigable
 * - Visible focus ring via focus:ring-*
 * - Decorative elements are aria-hidden
 */

export interface ResourceCategoryCardProps {
  /** Icon element to display (e.g. a Lucide icon) */
  icon: React.ReactNode;
  /** Card heading text */
  title: string;
  /** Short descriptive text below the title */
  description: string;
  /** Navigation target for the card */
  href: string;
  /** Tailwind text-color class(es) applied to the icon wrapper */
  iconColor: string;
  /** Tailwind bg-color class(es) applied to the icon wrapper */
  iconBgColor: string;
}

export function ResourceCategoryCard({
  icon,
  title,
  description,
  href,
  iconColor,
  iconBgColor,
}: ResourceCategoryCardProps) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      {/* Decorative gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Card content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${iconBgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className={iconColor} aria-hidden="true">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Hover arrow indicator */}
        <div className="mt-4 inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-purple-400 dark:border-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />
    </a>
  );
}
