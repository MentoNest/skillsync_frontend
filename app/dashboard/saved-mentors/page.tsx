'use client';

import { useState } from 'react';
import { MENTORS } from '@/app/(public)/mentors/data/mockMentors';
import MentorCard from '@/components/MentorCard';
import { Mentor } from '@/lib/types';
import Link from 'next/link';

export default function SavedMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>(MENTORS.filter(m => m.isBookmarked));

  const handleToggleBookmark = (mentorId: string) => {
    setMentors(currentMentors =>
      currentMentors.filter(mentor => mentor.id !== mentorId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <main className="max-w-screen-xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Saved Mentors
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Your bookmarked mentors are shown here. Review them anytime and start a conversation.
          </p>
        </div>

        {mentors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mentors.map(mentor => (
              <MentorCard
                key={mentor.id}
                {...mentor}
                isBookmarked={true}
                onToggleBookmark={() => handleToggleBookmark(mentor.id as string)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No saved mentors yet
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Browse our community of mentors and save your favorites to get started.
            </p>
            <div className="mt-6">
              <Link
                href="/discover-mentors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Discover Mentors
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}