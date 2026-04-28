'use client';

import Link from 'next/link';
import ArticleListItem, { ArticleListItemProps } from './ArticleListItem';

export interface FeaturedArticlesSectionProps {
  articles: ArticleListItemProps[];
  viewAllHref?: string;
}

export default function FeaturedArticlesSection({
  articles,
  viewAllHref = '/resources/articles',
}: FeaturedArticlesSectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Featured Articles</h2>
        <Link
          href={viewAllHref}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article, index) => (
          <ArticleListItem key={index} {...article} />
        ))}
      </div>
    </section>
  );
}