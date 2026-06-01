import Link from 'next/link';
import LearningTrackCard from '@/components/landing/LearningTrackCard';

const learningTracks = [
  {
    title: 'Engineering Leadership',
    category: 'Engineering',
    description:
      'Develop the skills to lead technical teams, make stronger architectural choices, and level up your impact.',
    lessons: 18,
    duration: '6h 20m',
    imageSrc: '/tony-adebanjo.jpg',
    href: '/resources/engineering-leadership',
  },
  {
    title: 'Product Management',
    category: 'Product',
    description:
      'Master product strategy, user research, and execution to build products that users love.',
    lessons: 14,
    duration: '5h 10m',
    imageSrc: '/Image (Sarah Johnson).svg',
    href: '/resources/product-management',
  },
  {
    title: 'Data Science & Analytics',
    category: 'Data',
    description:
      'Use data-driven decision making, analytics, and machine learning techniques to solve real problems.',
    lessons: 20,
    duration: '7h 45m',
    imageSrc: '/Image (Marcus Williams).svg',
    href: '/resources/data-science',
  },
  {
    title: 'Design & UX',
    category: 'Design',
    description:
      'Learn user-centered design, prototyping, and research to craft delightful experiences.',
    lessons: 12,
    duration: '4h 30m',
    imageSrc: '/Image (Cole Hathans).svg',
    href: '/resources/design-ux',
  },
  {
    title: 'Business Strategy',
    category: 'Business',
    description:
      'Develop strategic thinking, financial fluency, and leadership skills to drive growth.',
    lessons: 16,
    duration: '6h 00m',
    imageSrc: '/tony-adebanjo.jpg',
    href: '/resources/business-strategy',
  },
  {
    title: 'Career Growth & Navigation',
    category: 'Career',
    description:
      'Get guidance on promotions, transitions, salary negotiation, and long-term professional development.',
    lessons: 10,
    duration: '3h 50m',
    imageSrc: '/Image (Sarah Johnson).svg',
    href: '/resources/career-growth',
  },
];

export default function LearningPathResourcesSection() {
  return (
    <section className="learning-path-resources bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">Learning & Growth</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Structured paths to accelerate your career journey
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {learningTracks.map(track => (
            <LearningTrackCard key={track.title} {...track} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-cyan-500 hover:bg-cyan-50"
          >
            Browse all resources
            <svg className="ml-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
