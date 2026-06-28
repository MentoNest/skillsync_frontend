import React from 'react';
import Link from 'next/link';
import LearningTrackCard from '@/components/landing/LearningTrackCard';

const learningTracks = [
  {
    title: 'Engineering Leadership',
    category: 'Engineering',
    description:
      'Develop the skills to lead technical teams, make stronger architectural decisions, and grow your impact as a senior engineer.',
    lessons: 18,
    duration: '6h 20m',
    imageSrc: '/tony-adebanjo.jpg',
    href: '/resources/engineering-leadership',
  },
  {
    title: 'Product Management',
    category: 'Product',
    description:
      'Master product strategy, user research, and cross-functional execution to build products that people genuinely love.',
    lessons: 14,
    duration: '5h 10m',
    imageSrc: '/Image (Sarah Johnson).svg',
    href: '/resources/product-management',
  },
  {
    title: 'Data Science & Analytics',
    category: 'Data',
    description:
      'Apply data-driven thinking, analytics, and machine learning to solve real-world problems and drive business decisions.',
    lessons: 20,
    duration: '7h 45m',
    imageSrc: '/Image (Marcus Williams).svg',
    href: '/resources/data-science',
  },
  {
    title: 'Design & UX',
    category: 'Design',
    description:
      'Learn user-centred design, prototyping, and research methods to craft experiences that delight and retain users.',
    lessons: 12,
    duration: '4h 30m',
    imageSrc: '/Image (Cole Hathans).svg',
    href: '/resources/design-ux',
  },
  {
    title: 'Business Strategy',
    category: 'Business',
    description:
      'Build strategic thinking, financial fluency, and leadership skills to drive sustainable growth in any organisation.',
    lessons: 16,
    duration: '6h 00m',
    imageSrc: '/tony-adebanjo.jpg',
    href: '/resources/business-strategy',
  },
  {
    title: 'Career Growth',
    category: 'Career',
    description:
      'Get tactical guidance on promotions, role transitions, salary negotiation, and long-term professional development.',
    lessons: 10,
    duration: '3h 50m',
    imageSrc: '/Image (Sarah Johnson).svg',
    href: '/resources/career-growth',
  },
  {
    title: 'Frontend Development Mastery',
    category: 'Engineering',
    description:
      'Master HTML, CSS, JavaScript, and modern frontend frameworks like React and Next.js to build fast, responsive user interfaces.',
    lessons: 24,
    duration: '9h 15m',
    imageSrc: '/Image (Cole Hathans).svg',
    href: '/resources/frontend-development',
  },
  {
    title: 'Backend Systems Design',
    category: 'Engineering',
    description:
      'Deep dive into relational and non-relational databases, API design, caching, system security, and scalability patterns.',
    lessons: 22,
    duration: '8h 30m',
    imageSrc: '/Image (Marcus Williams).svg',
    href: '/resources/backend-design',
  }
];

export default function TracksPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back to Resources link */}
        <div className="mb-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Resources
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-gray-800 pb-8 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Learning Tracks
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-gray-400 max-w-3xl">
            Explore curated learning tracks designed to guide you step-by-step through core industry disciplines and advance your professional capabilities.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learningTracks.map((track) => (
            <LearningTrackCard key={track.title} {...track} />
          ))}
        </div>
      </div>
    </main>
  );
}
