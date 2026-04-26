import Link from 'next/link';
import LearningTrackCard from '@/components/LearningTrackCard';

interface LearningTrack {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  category: string;
  lessonCount: number;
  duration: string;
}

const tracks: LearningTrack[] = [
  {
    id: '1',
    imageSrc: '/learning-tracks/full-stack.svg',
    title: 'Full-Stack Development',
    description: 'Master frontend and backend technologies to build complete web applications.',
    category: 'Development',
    lessonCount: 24,
    duration: '12 weeks',
  },
  {
    id: '2',
    imageSrc: '/learning-tracks/data-science.svg',
    title: 'Data Science & AI',
    description: 'Learn Python, machine learning, and data visualization techniques.',
    category: 'Data Science',
    lessonCount: 30,
    duration: '16 weeks',
  },
  {
    id: '3',
    imageSrc: '/learning-tracks/design.svg',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and seamless user experiences.',
    category: 'Design',
    lessonCount: 18,
    duration: '10 weeks',
  },
];

export default function FeaturedLearningTracks() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Featured Tracks
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured Learning Tracks
            </h2>
            <p className="mt-2 text-base leading-7 text-gray-500">
              Hand-picked paths designed to keep the layout clean, readable, and easy to scan.
            </p>
          </div>
          <Link
            href="/learning-resources"
            className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            View All
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {tracks.map((track) => (
            <div key={track.id} className="min-w-[280px] flex-none md:min-w-0 md:flex-auto">
              <LearningTrackCard
                category={track.category}
                title={track.title}
                description={track.description}
                lessonCount={track.lessonCount}
                duration={track.duration}
                href={`/learning/${track.id}`}
                imageSrc={track.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
