import ResourceSearchBar from '@/components/resources/ResourceSearchBar'
import QuickAccessSection from '@/components/resources/QuickAccessSection'
import FeaturedLearningTracksSection from '@/components/resources/FeaturedLearningTracksSection'
import ToolsTemplatesSection from '@/components/resources/ToolsTemplatesSection'
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
    <div className="space-y-10">
      {/* #317 - Search Bar */}
      <ResourceSearchBar />

      {/* #318 & #319 - Quick Access Section with Reusable Cards */}
      <QuickAccessSection />

      {/* #320 - Featured Learning Tracks */}
      <FeaturedLearningTracksSection />
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
      <ToolsTemplatesSection />
    </div>
  )
}
