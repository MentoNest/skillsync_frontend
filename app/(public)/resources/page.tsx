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
    </div>
  );
}
