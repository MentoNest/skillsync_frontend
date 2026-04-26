'use client';

import Link from 'next/link';

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  level: string;
}

const tracks: LearningTrack[] = [
  {
    id: '1',
    title: 'Full-Stack Development',
    description: 'Master frontend and backend technologies to build complete web applications.',
    icon: '💻',
    duration: '12 weeks',
    level: 'Beginner',
  },
  {
    id: '2',
    title: 'Data Science & AI',
    description: 'Learn Python, machine learning, and data visualization techniques.',
    icon: '📊',
    duration: '16 weeks',
    level: 'Intermediate',
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and seamless user experiences.',
    icon: '🎨',
    duration: '10 weeks',
    level: 'Beginner',
  },
];

export default function FeaturedLearningTracks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Learning Tracks
            </h2>
            <p className="mt-2 text-gray-500 text-base">
              Hand-picked paths to accelerate your career.
            </p>
          </div>
          <Link
            href="/learning-resources"
            className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View All
            <svg
              className="ml-1 w-4 h-4"
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

        {/* Track Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{track.icon}</span>
                <span className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full">
                  {track.level}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {track.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {track.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">
                  {track.duration}
                </span>
                <Link
                  href={`/learning/${track.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/learning-resources"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View All
            <svg
              className="ml-1 w-4 h-4"
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
      </div>
    </section>
  );
}
