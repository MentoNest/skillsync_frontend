import Link from 'next/link';
import ArticleListItem from './ArticleListItem';

const featuredArticles = [
  {
    category: 'Career Growth',
    title: 'How to Negotiate Your Salary Like a Pro',
    author: 'By Sarah Johnson',
    readTime: '5 min read',
    href: '/articles/negotiate-salary',
  },
  {
    category: 'Personal Branding',
    title: 'Building a Personal Brand on LinkedIn',
    author: 'By Marcus Williams',
    readTime: '7 min read',
    href: '/articles/personal-branding-linkedin',
  },
  {
    category: 'Career Change',
    title: 'Transitioning to Tech: A Complete Guide',
    author: 'By Emily Chen',
    readTime: '10 min read',
    href: '/articles/transitioning-to-tech',
'use client';

import Link from 'next/link';

const featuredArticles = [
  {
    id: 1,
    title: 'How to Set Measurable Growth Goals with Your Mentor',
    excerpt: 'A practical framework for turning ambitions into progress using weekly checkpoints and feedback loops.',
    category: 'Mentorship',
    date: 'March 22, 2026',
    href: '/resources?article=goal-setting',
  },
  {
    id: 2,
    title: 'Building a Learning Path That Matches Your Career Timeline',
    excerpt: 'Design your personalized skill plan across 3–12 months, with checkpoints and recommended resources.',
    category: 'Career',
    date: 'March 18, 2026',
    href: '/resources?article=learning-path',
  },
  {
    id: 3,
    title: 'Preparing for a Senior Engineering Interview: Mentor Tips',
    excerpt: 'Top 10 dos and don’ts from veteran mentors to help you perform under pressure.',
    category: 'Interview',
    date: 'March 11, 2026',
    href: '/resources?article=senior-interview',
  },
];

export default function FeaturedArticlesSection() {
  return (
    <section
      aria-labelledby="featured-articles-heading"
      className="w-full bg-slate-50 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
              Featured Articles
            </p>
            <h2 id="featured-articles-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Explore our latest insights
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-700"
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Featured Articles</h2>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 transition hover:text-purple-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
          >
            View All
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul role="list" className="grid gap-4">
          {featuredArticles.map((article) => (
            <ArticleListItem key={article.title} {...article} />
        <ul className="space-y-4">
          {featuredArticles.map((article) => (
            <li key={article.id}>
              <Link
                href={article.href}
                className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-purple-600">
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-purple-700">{article.category}</span>
                  <span className="text-slate-400">{article.date}</span>
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900 transition group-hover:text-purple-700">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>

                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 transition group-hover:text-purple-900">
                  Read article
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
