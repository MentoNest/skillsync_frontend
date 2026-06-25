import React from 'react';

interface ArticleListItemProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  href?: string;
}

export default function ArticleListItem({ category, title, author, readTime, href = '#' }: ArticleListItemProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-4 py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group"
    >
      <div>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          {category}
        </span>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {author} · {readTime}
        </p>
      </div>
      <svg
        className="w-4 h-4 text-green-500 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </a>
  );
}
