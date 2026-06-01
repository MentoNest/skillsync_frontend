import LearningTrackCard from '@/components/landing/LearningTrackCard';

const allTracks = [
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

export default function TracksPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">All Learning Tracks</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allTracks.map((track) => (
          <LearningTrackCard key={track.title} {...track} />
        ))}
      </div>
    </div>
  );
}
