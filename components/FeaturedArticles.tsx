import React from 'react';
import Link from 'next/link';
import ArticleListItem from './ArticleListItem';

const articles = [
  { category: 'Career', title: 'How to Land Your First Tech Job', author: 'Jane Doe', readTime: '5 min read' },
  { category: 'Skills', title: 'Top 10 In-Demand Skills for 2025', author: 'John Smith', readTime: '7 min read' },
  { category: 'Mentorship', title: 'Getting the Most Out of a Mentor', author: 'Sarah Lee', readTime: '4 min read' },
];

export default function FeaturedArticles() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 transition-colors" aria-labelledby="articles-heading">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 id="articles-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Articles
          </h2>
          <Link 
            href="/resources" 
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            View All Articles &rarr;
          </Link>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-b border-gray-100 dark:border-gray-800">
          {articles.map((article) => (
            <ArticleListItem key={article.title} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
