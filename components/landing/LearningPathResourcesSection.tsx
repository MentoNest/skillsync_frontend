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
];

interface QuickAccessItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    title: 'Resume Templates',
    description: 'Professionally crafted templates to help you stand out for tech roles.',
    href: '/resources/resume-templates',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides covering career skills and technical topics.',
    href: '/resources/video-tutorials',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Career Guides',
    description: 'In-depth written guides for navigating career transitions and growth stages.',
    href: '/resources/career-guides',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Downloadable Tools',
    description: 'Worksheets, checklists, and planners to support every stage of your learning.',
    href: '/resources/downloadable-tools',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function LearningPathResourcesSection() {
  return (
    <section aria-labelledby="learning-resources-heading" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
            Learning &amp; Growth
          </p>
          <h2
            id="learning-resources-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Structured paths to accelerate your career journey.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Explore curated learning tracks and resource collections designed to help you
            build skills, gain confidence, and advance your career.
          </p>
        </div>

        {/* Learning tracks */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Learning tracks</h3>
            <Link
              href="/resources/tracks"
              className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {learningTracks.map((track) => (
              <LearningTrackCard key={track.title} {...track} />
            ))}
          </div>
        </div>

        {/* Quick access resources */}
        <div className="mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Quick access resources</h3>
            <Link
              href="/resources"
              className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500"
            >
              Browse all &rarr;
            </Link>
          </div>

          <ul role="list" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickAccessItems.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="group block h-full">
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition duration-300 group-hover:bg-cyan-100">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-cyan-500 hover:bg-cyan-50"
          >
            Explore all resources
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
