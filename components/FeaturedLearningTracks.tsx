import React from 'react';
import Link from 'next/link';

const tracks = [
  {
    title: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript and modern frameworks.',
    icon: '🖥️',
    label: 'Computer screen',
  },
  {
    title: 'Data Science',
    description: 'Explore data analysis, ML, and statistical modeling.',
    icon: '📊',
    label: 'Bar chart',
  },
  {
    title: 'Product Management',
    description: 'Learn to build and ship products users love.',
    icon: '🚀',
    label: 'Rocket launch',
  },
];

export default function FeaturedLearningTracks() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800/40 py-12 px-4 border-y border-gray-150 dark:border-gray-850 transition-colors" aria-labelledby="tracks-heading">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 id="tracks-heading" className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Learning Tracks
          </h2>
          <Link 
            href="/resources" 
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline"
          >
            View All Tracks &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <article
              key={track.title}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-start"
            >
              <span 
                className="text-3xl mb-4 p-3 bg-slate-50 dark:bg-gray-750 rounded-xl" 
                role="img" 
                aria-label={track.label}
              >
                {track.icon}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {track.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {track.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
