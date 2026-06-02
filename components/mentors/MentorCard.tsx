'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Mentor } from '@/lib/mentors';

interface MentorCardProps {
  mentor: Mentor;
  onBookmarkChange?: (nextIds: number[]) => void;
  isSelected?: boolean;
  onToggle?: () => void;
}

export default function MentorCard({ mentor, onBookmarkChange, isSelected, onToggle }: MentorCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bookmarkedMentors');
      const arr: number[] = raw ? JSON.parse(raw) : [];
      setBookmarked(arr.includes(mentor.id));
    } catch (e) {
      setBookmarked(false);
    }
  }, [mentor.id]);

  function toggleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const raw = localStorage.getItem('bookmarkedMentors');
      const arr: number[] = raw ? JSON.parse(raw) : [];
      let next: number[];

      if (arr.includes(mentor.id)) {
        next = arr.filter(id => id !== mentor.id);
        setBookmarked(false);
      } else {
        next = [...arr, mentor.id];
        setBookmarked(true);
      }

      localStorage.setItem('bookmarkedMentors', JSON.stringify(next));
      onBookmarkChange?.(next);
    } catch (e) {
      // ignore localStorage errors silently
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(20,18,16,0.1)]">
      <div className="p-6 flex items-start gap-4">
        {onToggle && (
          <button
            onClick={onToggle}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
              isSelected
                ? 'bg-[#141210] border-[#141210]'
                : 'border-[rgba(20,18,16,0.2)] hover:border-[#141210]'
            }`}
            aria-label={isSelected ? `Deselect ${mentor.name}` : `Select ${mentor.name} for comparison`}
          >
            {isSelected && <span className="text-[#f7f5f2] text-[10px]">✓</span>}
          </button>
        )}
        <div
          className="w-14 h-14 rounded-[14px] flex-shrink-0 flex items-center justify-center text-lg font-bold relative overflow-hidden"
          style={{ background: mentor.bg, color: mentor.accent, fontFamily: "'Syne', sans-serif" }}
        >
          {mentor.image ? (
            <Image
              src={mentor.image}
              alt={`${mentor.name} profile`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{mentor.initials}</span>
          )}
          <span
            className={`absolute bottom-[-2px] right-[-2px] w-3 h-3 rounded-full border-2 border-white ${
              mentor.available ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#141210] text-[15px] truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
            {mentor.name}
          </p>
          <p className="text-[13px] text-[#94928d] truncate">{mentor.role}</p>
          <p className="text-[12px] font-medium mt-0.5" style={{ color: mentor.accent }}>
            {mentor.company}
          </p>
          <p className="text-[12px] mt-1 text-[#141210]">${mentor.rate}/hr</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 bg-[#f7f5f2] rounded-lg px-2 py-1">
            <span className="text-amber-400 text-[11px]">★</span>
            <span className="text-[12px] font-semibold text-[#141210]">{mentor.rating}</span>
          </div>

          <button
            onClick={toggleBookmark}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark mentor'}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors border ${
              bookmarked ? 'bg-amber-400 text-white border-amber-400' : 'bg-white text-[#6b6860] border-[rgba(20,18,16,0.08)]'
            }`}
          >
            {bookmarked ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2C5.44772 2 5 2.44772 5 3V21L12 18L19 21V3C19 2.44772 18.5523 2 18 2H6Z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2C5.44772 2 5 2.44772 5 3V21L12 18L19 21V3C19 2.44772 18.5523 2 18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="h-px bg-[rgba(20,18,16,0.07)] mx-6" />

      <div className="p-6 flex-1 flex flex-col gap-4">
        <p className="text-[13.5px] leading-[1.7] text-[#6b6860] flex-1">{mentor.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {mentor.tags.map(tag => (
            <span
              key={tag}
              className="text-[11.5px] font-medium px-2.5 py-1 rounded-md bg-[#f7f5f2] text-[#6b6860] border border-[rgba(20,18,16,0.08)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 flex items-center justify-between gap-3">
        <span className="text-[12px] text-[#94928d]">
          <strong className="text-[#141210] font-semibold">{mentor.sessions}</strong> sessions
        </span>
        <Link
          href={mentor.available ? `/mentors/${mentor.id}` : '#'}
          className={`text-[12.5px] font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            mentor.available
              ? 'bg-[#141210] text-[#f7f5f2] hover:bg-[#2d2a27]'
              : 'bg-[#f0efed] text-[#94928d] cursor-default pointer-events-none'
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {mentor.available ? 'Book session' : 'Fully booked'}
        </Link>
      </div>
    </div>
  );
}
