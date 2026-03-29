// app/(public)/page.tsx

'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/landing/HeroSection'), {
  loading: () => <div className="w-full bg-gradient-to-r from-white to-purple-50 py-16 md:py-24 animate-pulse"><div className="max-w-7xl mx-auto px-6 text-center"><div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div></div></div>,
  ssr: false
});

const WhyChooseUsSection = dynamic(() => import('@/components/landing/WhyChooseUsSection'), {
  loading: () => (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-100 animate-pulse">
              <div className="w-14 h-14 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const TestimonialsSection = dynamic(() => import('@/components/landing/TestimonialsSection'), {
  loading: () => <div className="w-full bg-gray-50 py-16 md:py-24 animate-pulse"><div className="max-w-7xl mx-auto px-6 text-center"><div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div></div></div>,
  ssr: false
});

const CTASection = dynamic(() => import('@/components/landing/CTASection'), {
  loading: () => <div className="w-full bg-purple-600 py-16 md:py-24 animate-pulse"><div className="max-w-7xl mx-auto px-6 text-center"><div className="h-12 bg-white rounded w-1/2 mx-auto"></div></div></div>,
  ssr: false
});

const PlatformStatisticsSection = dynamic(() => import('@/components/landing/PlatformStatisticsSection'), {
  loading: () => <div className="w-full bg-white py-16 md:py-24 animate-pulse"><div className="max-w-7xl mx-auto px-6 text-center"><div className="h-12 bg-gray-200 rounded w-1/2 mx-auto"></div></div></div>,
  ssr: false
});

export default function PublicHomePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PlatformStatisticsSection />
      </Suspense>
    </main>
      <TestimonialsSection />
      <CTASection />
      <PlatformStatisticsSection />
    </>
  );
}