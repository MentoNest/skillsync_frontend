import React from 'react';

const stats = [
  { label: 'Mentors', value: '120+' },
  { label: 'Mentees', value: '2,500+' },
  { label: 'Learning Tracks', value: '35+' },
  { label: 'Resources', value: '400+' },
  { label: 'Sessions Held', value: '1,200+' },
];

export default function PlatformStatistics() {
  return (
    <section className="w-full py-12 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-3xl font-extrabold text-blue-600">{stat.value}</span>
              <span className="mt-2 text-gray-700 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
