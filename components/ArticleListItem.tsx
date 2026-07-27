import React from 'react';
import Link from 'next/link';

interface ArticleListItemProps {
  category: string;
  title: string;
  author: string;
  readTime: string;
  href?: string;
}

export default function ArticleListItem({ category, title, author, readTime, href }: ArticleListItemProps) {
  const articleSlug = title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-p\-]/g, '');
  const targetHref = href || `/resources/articles/${articleSlug}`;

  return (
    <Link
      href={targetHref}
      className="flex items-center justify-between gap-4 py-4 px-2 hover:bg-slate-50 dark:hover:bg-gray-800/60 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
    >
      <div>
        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
          {category}
        </span>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          By {author} &middot; {readTime}
        </p>
      </div>
      <div className="flex-shrink-0 p-2 bg-slate-50 rounded-full group-hover:bg-cyan-50 group-hover:text-cyan-600 dark:bg-gray-800 dark:group-hover:bg-cyan-900/30 dark:group-hover:text-cyan-400 transition-colors">
        <svg
          className="w-4 h-4 text-cyan-600 dark:text-cyan-400 transform group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
