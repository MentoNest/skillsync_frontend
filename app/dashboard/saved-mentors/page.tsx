'use client';

import { useEffect, useState } from 'react';
import MentorCard from '@/components/mentors/MentorCard';
import { mentors } from '@/lib/mentors';
import type { Mentor } from '@/lib/mentors';

export default function SavedMentorsPage() {
  const [savedMentors, setSavedMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('bookmarkedMentors');
    if (!stored) {
      setSavedMentors([]);
      return;
    }

    try {
      const bookmarkedIds: number[] = JSON.parse(stored);
      const saved = mentors.filter(mentor => bookmarkedIds.includes(mentor.id));
      setSavedMentors(saved);
    } catch (error) {
      setSavedMentors([]);
    }
  }, []);

  function handleBookmarkChange(nextIds: number[]) {
    setSavedMentors(mentors.filter(mentor => nextIds.includes(mentor.id)));
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-[rgba(20,18,16,0.07)]">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#94928d] mb-2">
          Your Dashboard
        </p>
        <h1
          className="text-[clamp(28px,4vw,42px)] font-extrabold text-[#141210] leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Saved mentors
        </h1>
        <p className="mt-2 text-[15px] text-[#6b6860]">
          Quickly revisit the mentors you bookmarked for future sessions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedMentors.length === 0 ? (
          <div className="rounded-3xl bg-white border border-[rgba(20,18,16,0.07)] p-12 text-center">
            <p className="text-[15px] text-[#141210] font-semibold mb-3">No saved mentors yet</p>
            <p className="text-[14px] text-[#6b6860]">
              Bookmark mentors while browsing the directory to save them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {savedMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} onBookmarkChange={handleBookmarkChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
