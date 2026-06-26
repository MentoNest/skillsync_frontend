import React from 'react';
import Link from 'next/link';

interface MentorCardProps {
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
}

export default function MentorCard({ name, role, description }: MentorCardProps) {
  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Create a predictable gradient background based on the name length
  const bgGradients = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-pink-500 to-rose-600',
  ];
  const gradientIndex = name.length % bgGradients.length;
  const gradient = bgGradients[gradientIndex];

  return (
    <article className="w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Avatar Area */}
        <div className="flex justify-between items-start mb-6">
          <div 
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <span className="bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verified
          </span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {name}
          </h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
            {role}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-750 flex items-center justify-between">
        <Link 
          href={`/mentors/${name.toLowerCase().replace(/ /g, '-')}`}
          className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1 group/link focus:outline-none focus:underline"
          aria-label={`View profile of mentor ${name}`}
        >
          View Profile
          <svg 
            className="w-4 h-4 transform group-hover/link:translate-x-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <Link 
          href={`/book/${name.toLowerCase().replace(/ /g, '-')}`}
          className="text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          aria-label={`Book a session with ${name}`}
        >
          Book Session
        </Link>
      </div>
    </article>
  );
}