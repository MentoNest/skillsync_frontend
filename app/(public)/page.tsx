import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';

// ─── Critical above-the-fold sections — statically imported ──────────────────
// These are rendered server-side and painted on first load, so they must not
// be deferred. Static imports also allow Next.js to include them in the
// initial HTML and eliminate layout shift.
import HeroSection from '@/components/landing/HeroSection';
import ResourceSearchBar from '@/components/ResourceSearchBar';

// ─── Below-the-fold sections — dynamically imported ──────────────────────────
// next/dynamic splits these into separate JS chunks that are only downloaded
// once the browser has finished painting the critical path, directly improving
// Time to Interactive (TTI) and Lighthouse performance scores.

const MentorDiscoverySection = dynamic(
  () => import('@/components/landing/MentorDiscoverySection'),
  {
    loading: () => (
      <div className="bg-gray-50 dark:bg-gray-800/40 py-12 px-4" aria-hidden="true">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

const FeaturedMentorHighlight = dynamic(
  () => import('@/components/landing/FeaturedMentorHighlight'),
  {
    loading: () => (
      <div className="bg-white dark:bg-gray-900 py-16 px-4" aria-hidden="true">
        <div className="mx-auto max-w-screen-xl">
          <div className="h-64 rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    ),
  }
);

const WhyChooseUsSection = dynamic(
  () => import('@/components/landing/WhyChooseUsSection'),
  {
    loading: () => (
      <div className="bg-slate-900 py-20 px-6" aria-hidden="true">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const LearningPathResourcesSection = dynamic(
  () => import('@/components/landing/LearningPathResourcesSection'),
  {
    loading: () => (
      <div className="bg-slate-50 py-20 px-6" aria-hidden="true">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const PlatformStatisticsSection = dynamic(
  () => import('@/components/landing/PlatformStatisticsSection'),
  {
    loading: () => (
      <div className="bg-slate-950 py-20 px-6" aria-hidden="true">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const FeaturedArticles = dynamic(
  () => import('@/components/FeaturedArticles'),
  {
    loading: () => (
      <div className="bg-white dark:bg-gray-900 py-12 px-4" aria-hidden="true">
        <div className="mx-auto max-w-screen-xl space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const ToolsAndTemplates = dynamic(
  () => import('@/components/ToolsAndTemplates'),
  {
    loading: () => (
      <div className="bg-white dark:bg-gray-900 py-12 px-4" aria-hidden="true">
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/TestimonialsSection'),
  {
    loading: () => (
      <div className="bg-slate-50 dark:bg-gray-800/40 py-16 px-4" aria-hidden="true">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main aria-label="SkillSync home page">
      {/* ── Critical path: rendered and painted on first load ── */}

      {/* 1. Hero — LCP candidate, always above fold */}
      <HeroSection />

      {/* Mobile-only browse shortcut — no layout shift risk (text only) */}
      <div className="block lg:hidden">
        <Link
          href="/mentors"
          aria-label="Browse all mentors"
          className="block text-center mx-auto max-w-xs bg-cyan-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-colors mb-6"
        >
          Browse Mentors
        </Link>
      </div>

      {/* 2. Resource Search — above fold on most viewports, keep synchronous */}
      <section
        className="bg-slate-50 dark:bg-gray-800/40 border-y border-slate-100 dark:border-gray-800 transition-colors"
        aria-label="Resource Search"
      >
        <ResourceSearchBar />
      </section>

      {/* 3. About SkillSync — first image section.
            - Light image gets priority (LCP on desktop), dark variant is hidden
              until dark mode is resolved client-side so we lazy-load it.
            - explicit width/height prevents layout shift.
            - sizes attr lets the browser pick the smallest fitting source. */}
      <section
        className="bg-white dark:bg-gray-900 transition-colors"
        aria-labelledby="about-skillsync-heading"
      >
        <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 grid grid-cols-1 md:grid-cols-2 lg:px-6">
          <div className="w-full flex justify-center">
            {/* Light-mode mockup — priority because it is visible on first paint */}
            <Image
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
              alt="SkillSync web platform interface preview showing mentors list and schedule builder"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto max-w-md md:max-w-full rounded-2xl shadow-md border border-gray-100 dark:hidden"
            />
            {/* Dark-mode mockup — hidden until dark mode activates, lazy load */}
            <Image
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
              alt="SkillSync dark mode platform interface preview showcasing career progress dashboard"
              width={1200}
              height={800}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto max-w-md md:max-w-full rounded-2xl shadow-md border border-gray-800 hidden dark:block"
            />
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-center text-center md:items-start md:text-left">
            <h2
              id="about-skillsync-heading"
              className="mb-4 text-2xl sm:text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
            >
              Let&apos;s create more tools and ideas that bring us together.
            </h2>
            <p className="mb-6 font-light text-gray-500 text-sm sm:text-base md:text-lg dark:text-gray-400">
              SkillSync helps you connect with professional communities, find
              vetted mentors, and collaborate with peers who share your
              professional interests. Empower your career growth through custom
              roadmaps and expert coaching.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center w-full sm:w-auto text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-cyan-900 transition-colors"
            >
              Get started
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Below-the-fold: loaded after critical path ── */}

      {/* 4. Mentor Discovery */}
      <Suspense fallback={
        <div className="bg-gray-50 dark:bg-gray-800/40 py-12 px-4" aria-hidden="true">
          <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <MentorDiscoverySection />
      </Suspense>

      {/* 5. Featured Mentor Highlight */}
      <Suspense fallback={
        <div className="bg-white dark:bg-gray-900 py-16 px-4" aria-hidden="true">
          <div className="mx-auto max-w-screen-xl h-64 rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      }>
        <FeaturedMentorHighlight />
      </Suspense>

      {/* 6. Why Choose Us — Issue #599 */}
      <Suspense fallback={
        <div className="bg-slate-900 py-20 px-6" aria-hidden="true">
          <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <WhyChooseUsSection />
      </Suspense>

      {/* 7. Learning Path & Resources — Issue #600 */}
      <Suspense fallback={
        <div className="bg-slate-50 py-20 px-6" aria-hidden="true">
          <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <LearningPathResourcesSection />
      </Suspense>

      {/* 8. Platform Statistics — Issue #601 */}
      <Suspense fallback={
        <div className="bg-slate-950 py-20 px-6" aria-hidden="true">
          <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <PlatformStatisticsSection />
      </Suspense>

      {/* 9. Featured Articles */}
      <Suspense fallback={
        <div className="bg-white dark:bg-gray-900 py-12 px-4" aria-hidden="true">
          <div className="mx-auto max-w-screen-xl space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <FeaturedArticles />
      </Suspense>

      {/* 10. Tools & Templates */}
      <Suspense fallback={
        <div className="bg-white dark:bg-gray-900 py-12 px-4" aria-hidden="true">
          <div className="mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <ToolsAndTemplates />
      </Suspense>

      {/* 11. Testimonials */}
      <Suspense fallback={
        <div className="bg-slate-50 dark:bg-gray-800/40 py-16 px-4" aria-hidden="true">
          <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <TestimonialsSection />
      </Suspense>

      {/* 12. Bottom CTA — text-only, no images, no layout shift risk */}
      <section
        className="bg-cyan-600 dark:bg-cyan-800 transition-colors"
        aria-labelledby="bottom-cta-heading"
      >
        <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-20 lg:px-6 text-center">
          <h2
            id="bottom-cta-heading"
            className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-white"
          >
            Ready to elevate your career?
          </h2>
          <p className="mb-8 font-light text-cyan-100 md:text-lg max-w-xl mx-auto">
            Join SkillSync today and connect with mentors who can help you
            achieve your goals. Take control of your career journey.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-bold text-cyan-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-600 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </main>
  );
}
