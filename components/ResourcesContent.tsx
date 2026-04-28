'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Laptop, Wrench, BarChart3, Cloud, Palette, Users } from 'lucide-react';
import ResourceSearchBar from '@/components/ResourceSearchBar';
import FeaturedLearningTracks from '@/components/FeaturedLearningTracks';
import FeaturedArticlesSection from '@/components/FeaturedArticlesSection';
import QuickAccessSection from '@/components/QuickAccessSection';
import ToolsAndTemplatesSection from '@/components/sections/ToolsAndTemplatesSection';
import { ArticleListItemProps } from '@/components/ArticleListItem';

const ResourceCategoryCard = dynamic(
  () => import('@/components/ResourceCategoryCard'),
  { loading: () => <CardSkeleton /> }
);

const categories = [
  { title: 'Frontend Development', description: 'React, Next.js, CSS, and modern UI tooling.', icon: Laptop, link: '/learning-resources/frontend' },
  { title: 'Backend Engineering', description: 'Node.js, databases, APIs, and server architecture.', icon: Wrench, link: '/learning-resources/backend' },
  { title: 'Data Science', description: 'Python, statistics, and machine learning fundamentals.', icon: BarChart3, link: '/learning-resources/data-science' },
  { title: 'DevOps & Cloud', description: 'CI/CD, Docker, Kubernetes, and cloud platforms.', icon: Cloud, link: '/learning-resources/devops' },
  { title: 'Design & UX', description: 'Figma, user research, and design systems.', icon: Palette, link: '/learning-resources/design' },
  { title: 'Soft Skills', description: 'Communication, leadership, and career growth.', icon: Users, link: '/learning-resources/soft-skills' },
];

const sampleArticles: ArticleListItemProps[] = [
  { category: 'Development', title: 'Getting Started with Next.js App Router', author: 'Jane Doe', readTime: '5 min read', href: '/articles/nextjs-app-router', isTrending: true },
  { category: 'Design', title: 'Mastering Figma for UI/UX Designers', author: 'John Smith', readTime: '8 min read', href: '/articles/figma-ui-ux' },
  { category: 'Data Science', title: 'Introduction to Machine Learning with Python', author: 'Alice Johnson', readTime: '10 min read', href: '/articles/ml-python-intro' },
];

function CardSkeleton() {
  return (
    <div className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full mb-3" />
      <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-32 h-3 bg-gray-100 rounded" />
    </div>
  );
}

export default function ResourcesContent() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredCategories = debouncedQuery
    ? categories.filter(
        (c) =>
          c.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : categories;

  const filteredArticles = debouncedQuery
    ? sampleArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          a.author.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : sampleArticles;

  const hasResults = filteredCategories.length > 0 || filteredArticles.length > 0;

  return (
    <>
      <div className="py-6">
        <ResourceSearchBar onSearch={setQuery} />
      </div>

      {debouncedQuery ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!hasResults ? (
            <p className="text-gray-500 text-center py-12">No results found for &ldquo;{debouncedQuery}&rdquo;</p>
          ) : (
            <>
              {filteredCategories.length > 0 && (
                <section className="mb-10" aria-labelledby="filtered-categories">
                  <h2 id="filtered-categories" className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat) => (
                      <ResourceCategoryCard key={cat.link} {...cat} />
                    ))}
                  </div>
                </section>
              )}
              {filteredArticles.length > 0 && (
                <section aria-labelledby="filtered-articles">
                  <h2 id="filtered-articles" className="text-xl font-semibold text-gray-800 mb-4">Articles</h2>
                  <FeaturedArticlesSection articles={filteredArticles} />
                </section>
              )}
            </>
          )}
        </main>
      ) : (
        <>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="mt-2 text-gray-500 text-base">
                Explore hand-picked resources to grow your skills across all disciplines.
              </p>
            </header>
            <section aria-labelledby="resource-categories">
              <h2 id="resource-categories" className="sr-only">Resource Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="grid" aria-label="Learning resource categories">
                {categories.map((cat) => (
                  <ResourceCategoryCard key={cat.link} {...cat} />
                ))}
              </div>
            </section>
          </main>
          <QuickAccessSection />
          <FeaturedLearningTracks />
          <FeaturedArticlesSection articles={sampleArticles} />
          <ToolsAndTemplatesSection />
        </>
      )}
    </>
  );
}
