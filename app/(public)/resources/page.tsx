'use client';

import React, { useState } from 'react';
import ResourceSearchBar from '@/components/resources/ResourceSearchBar';
import QuickAccessSection from '@/components/resources/QuickAccessSection';
import FeaturedLearningTracksSection from '@/components/resources/FeaturedLearningTracksSection';
import ArticleListItem from '@/components/ArticleListItem';

const resourceArticles = [
  {
    category: 'Productivity',
    title: 'How to build meaningful mentorship goals',
    author: 'Amina Patel',
    readTime: '6 min read',
    href: '/resources/article-mentorship-goals',
  },
  {
    category: 'Career Growth',
    title: 'Design your first structured learning path',
    author: 'Noah Kim',
    readTime: '8 min read',
    href: '/resources/article-learning-path',
  },
  {
    category: 'Leadership',
    title: 'Best practices for growing trust with mentees',
    author: 'Lena Torres',
    readTime: '5 min read',
    href: '/resources/article-mentee-trust',
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase();
  const filteredArticles = q
    ? resourceArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      )
    : resourceArticles;

  return (
    <div className="space-y-10">
      <ResourceSearchBar onSearch={setSearchQuery} />
      <QuickAccessSection />
      <FeaturedLearningTracksSection searchQuery={searchQuery} />
      <section>
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Articles</h2>
        {filteredArticles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((item) => (
              <ArticleListItem
                key={item.title}
                category={item.category}
                title={item.title}
                author={item.author}
                readTime={item.readTime}
                href={item.href}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No articles match your search.</p>
        )}
      </section>
    </div>
  );
}
