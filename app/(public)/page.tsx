'use client';

import React from 'react'
import HeroSection from '@/components/landing/HeroSection';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SectionLoadingSkeleton, MentorCardSkeleton, ArticleCardSkeleton } from '@/components/loadingSkeletons';

// Lazy load sections to improve initial page load
const WhyChooseUsSection = dynamic(() => import('@/components/landing/WhyChooseUsSection'), {
  loading: () => <SectionLoadingSkeleton />
});

const FeaturedMentorSection = dynamic(() => import('@/components/landing/FeaturedMentorSection'), {
  loading: () => (
    <div className="w-full bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-12 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
        <div className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  )
});

const MentorDiscoverySection = dynamic(() => import('@/components/landing/MentorDiscoverySection'), {
  loading: () => (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-12 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <MentorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
});

const LearningPathResourcesSection = dynamic(() => import('@/components/landing/LearningPathResourcesSection'), {
  loading: () => <SectionLoadingSkeleton />
});

const FeaturedArticlesSection = dynamic(() => import('@/components/landing/FeaturedArticlesSection'), {
  loading: () => (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-12 bg-gray-200 rounded w-1/3 mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
});

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection'), {
  loading: () => <SectionLoadingSkeleton />
});

const PlatformStatisticsSection = dynamic(() => import('@/components/landing/PlatformStatisticsSection'), {
  loading: () => <SectionLoadingSkeleton />
});

const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
  loading: () => (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="h-12 bg-white/20 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
        <div className="h-6 bg-white/20 rounded w-1/2 mx-auto animate-pulse"></div>
      </div>
    </div>
  )
});

export default function PublicPage() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={null}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={null}>
        <FeaturedMentorSection />
      </Suspense>
      <Suspense fallback={null}>
        <MentorDiscoverySection />
      </Suspense>
      <Suspense fallback={null}>
        <LearningPathResourcesSection />
      </Suspense>
      <Suspense fallback={null}>
        <FeaturedArticlesSection />
      </Suspense>
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={null}>
        <PlatformStatisticsSection />
      </Suspense>
      <Suspense fallback={null}>
        <CTASection />
      </Suspense>
    </main>
  );
}
