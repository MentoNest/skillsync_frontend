import React from 'react';
import ArticleListItem from './ArticleListItem';

const articles = [
  { category: 'Career', title: 'How to Land Your First Tech Job', author: 'Jane Doe', readTime: '5 min read' },
  { category: 'Skills', title: 'Top 10 In-Demand Skills for 2025', author: 'John Smith', readTime: '7 min read' },
  { category: 'Mentorship', title: 'Getting the Most Out of a Mentor', author: 'Sarah Lee', readTime: '4 min read' },
];

export default function FeaturedArticles() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
          View All
        </a>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {articles.map((article) => (
          <ArticleListItem key={article.title} {...article} />
        ))}
      </div>
    </section>
  );
}
