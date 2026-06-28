import React from 'react';
import Link from 'next/link';
import ArticleListItem from '@/components/ArticleListItem';

const articles = [
  { category: 'Career', title: 'How to Land Your First Tech Job', author: 'Jane Doe', readTime: '5 min read' },
  { category: 'Skills', title: 'Top 10 In-Demand Skills for 2025', author: 'John Smith', readTime: '7 min read' },
  { category: 'Mentorship', title: 'Getting the Most Out of a Mentor', author: 'Sarah Lee', readTime: '4 min read' },
  { category: 'Engineering', title: 'Understanding System Design Basics', author: 'Alex Chen', readTime: '10 min read' },
  { category: 'Product', title: 'Defining a Product MVP That Works', author: 'Rachel Green', readTime: '8 min read' },
  { category: 'Design', title: 'Color Theory in Modern UI Design', author: 'David Foster', readTime: '6 min read' },
  { category: 'Data', title: 'Introduction to Machine Learning Models', author: 'Priya Sharma', readTime: '12 min read' },
  { category: 'Leadership', title: 'Transitioning from IC to Engineering Manager', author: 'Marcus Williams', readTime: '9 min read' }
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back to Resources link */}
        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-gray-800 pb-8 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Articles &amp; Guides
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-gray-400 max-w-3xl">
            Stay up to date with the latest industry insights, career advice, and deep dives written by experienced mentors.
          </p>
        </div>

        {/* Articles List */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {articles.map((article) => (
              <ArticleListItem key={article.title} {...article} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
