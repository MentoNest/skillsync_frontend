import Link from 'next/link';
import LearningTrackCard from '@/components/landing/LearningTrackCard';

const featuredTracks = [
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
];

interface FeaturedLearningTracksSectionProps {
  searchQuery?: string;
}

export default function FeaturedLearningTracksSection({ searchQuery = '' }: FeaturedLearningTracksSectionProps) {
  const q = searchQuery.toLowerCase();
  const filtered = q
    ? featuredTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    : featuredTracks;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Featured Learning Tracks</h2>
        <Link
          href="/resources/tracks"
          className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500"
        >
          View All &rarr;
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {featuredTracks.map((track) => (
          <LearningTrackCard key={track.title} {...track} />
        ))}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((track) => (
            <LearningTrackCard key={track.title} {...track} />
          ))
        ) : (
          <p className="col-span-3 text-sm text-slate-500">No learning tracks match your search.</p>
        )}
      </div>
    </section>
  );
}
