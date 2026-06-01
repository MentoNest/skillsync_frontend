import Link from 'next/link'
import React from 'react'
import ArticleListItem from '@/components/ArticleListItem'

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
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Explore core learning resources</h2>
          <p className="mt-3 text-slate-600">
            This page is a placeholder for the public resources route. It is scaffolded for future learning content, collections, and resource discovery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Back to Home
            </Link>
            <Link
              href="/resources"
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Explore resources
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick start</p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li>• Add curated learning path cards.</li>
            <li>• Connect resources to mentorship activities.</li>
            <li>• Build search and filter controls.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resourceArticles.map(item => (
          <ArticleListItem
            key={item.title}
            category={item.category}
            title={item.title}
            author={item.author}
            readTime={item.readTime}
            href={item.href}
          />
        ))}
      </section>
    </div>
  )
}
