import React, { Suspense } from 'react';
import HeroSection from '@/components/resources/HeroSection';
import ResourceSearchBarWrapper from '@/components/resources/ResourceSearchBarWrapper';
import { CategoryGrid } from '@/components/resources/CategoryGrid';

function CategoryGridFallback() {
  return (
    <section className="max-w-screen-xl px-4 py-12 mx-auto lg:py-16">
      <div className="mb-10 text-center md:text-left">
        <div className="h-9 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mx-auto md:mx-0" />
        <div className="mt-2 h-5 w-72 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse mx-auto md:mx-0" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/40 rounded-xl animate-pulse" />
              <div className="w-20 h-5 bg-purple-100 dark:bg-purple-950/40 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse mb-1" />
            <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
import React from 'react';
import Link from 'next/link';
import ResourceSearchBar from '@/components/ResourceSearchBar';

interface Category {
  title: string;
  description: string;
  /** Decorative emoji icon */
  icon: string;
  count: string;
  /** URL slug for the category detail page */
  slug: string;
}

const categories: Category[] = [
  {
    title: 'Frontend Development',
    description: 'Master the basics of HTML, CSS, and JavaScript, and build with modern frameworks like React and Next.js.',
    icon: '💻',
    count: '12 guides',
    slug: 'frontend-development',
  },
  {
    title: 'Backend Engineering',
    description: 'Learn how to build scalable APIs, design databases, and handle authentication and server logic.',
    icon: '⚙️',
    count: '8 guides',
    slug: 'backend-engineering',
  },
  {
    title: 'UI/UX Design',
    description: 'Discover principles of modern design, prototyping, wireframing, and user research methodologies.',
    icon: '🎨',
    count: '6 guides',
    slug: 'ui-ux-design',
  },
  {
    title: 'Data Science & AI',
    description: 'Explore data analysis, statistics, machine learning algorithms, and prompt engineering.',
    icon: '📊',
    count: '10 guides',
    slug: 'data-science-ai',
  },
  {
    title: 'Product Management',
    description: 'Define product vision, run agile sprint planning, map features, and coordinate cross-functional releases.',
    icon: '🚀',
    count: '7 guides',
    slug: 'product-management',
  },
  {
    title: 'Career Growth',
    description: 'Prepare for technical interviews, polish resumes, learn negotiation tactics, and plan promotions.',
    icon: '💼',
    count: '15 guides',
    slug: 'career-growth',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
      <HeroSection />

      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors" aria-label="Resources Search">
        <ResourceSearchBarWrapper />
      </section>

      <Suspense fallback={<CategoryGridFallback />}>
        <CategoryGrid />
      </Suspense>
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-purple-700 to-indigo-800 py-16 px-4 text-center sm:py-24 lg:px-6 shadow-md"
        aria-labelledby="resources-hero-heading"
      >
        <div className="max-w-screen-xl mx-auto">
          <h1
            id="resources-hero-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
          >
            Learning Resources
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg font-normal text-purple-100/90 leading-relaxed">
            Explore our curated collection of guides, tutorials, and tools to help you grow your skills and advance your career.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section
        className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors"
        aria-labelledby="resources-search-heading"
      >
        <h2 id="resources-search-heading" className="sr-only">
          Search Resources
        </h2>
        <ResourceSearchBar />
      </section>

      {/* Browse by Topic Section */}
      <section
        className="max-w-screen-xl px-4 py-12 mx-auto lg:py-16"
        aria-labelledby="categories-heading"
      >
        <div className="mb-10 text-center md:text-left">
          <h2
            id="categories-heading"
            className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Browse by Topic
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Select a category to view tutorials, templates, and learning paths.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
        >
          {categories.map((category) => (
            <li key={category.title}>
              <article className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Decorative emoji — hidden from assistive tech; title conveys the category */}
                    <span
                      className="text-2xl p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl"
                      aria-hidden="true"
                    >
                      {category.icon}
                    </span>
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="font-normal text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link
                    href={`/resources/${category.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
                    aria-label={`Explore ${category.title}`}
                  >
                    Explore Topic
                    <svg
                      className="ml-1 w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
