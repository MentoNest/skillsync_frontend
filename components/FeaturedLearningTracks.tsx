import React from 'react';

const tracks = [
  {
    title: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript and modern frameworks.',
    icon: '🖥️',
  },
  {
    title: 'Data Science',
    description: 'Explore data analysis, ML, and statistical modeling.',
    icon: '📊',
  },
  {
    title: 'Product Management',
    description: 'Learn to build and ship products users love.',
    icon: '🚀',
  },
];

export default function FeaturedLearningTracks() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Learning Tracks</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
          View All
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tracks.map((track) => (
          <div
            key={track.title}
            className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <span className="text-3xl mb-4 block">{track.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{track.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{track.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
