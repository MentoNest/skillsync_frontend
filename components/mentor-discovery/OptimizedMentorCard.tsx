"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MentorCardProps } from "@/components/landing/MentorCard";

interface OptimizedMentorCardProps extends MentorCardProps {
  onBookmark?: (mentorId: string) => void;
  onCompare?: (mentor: MentorCardProps) => void;
  isBookmarked?: boolean;
  isSelectedForComparison?: boolean;
}

const OptimizedMentorCard = memo(function OptimizedMentorCard({
  name,
  title,
  description,
  skills,
  avatarInitials,
  avatarColor,
  rating,
  sessions,
  profileHref = "/register",
  children,
  onBookmark,
  onCompare,
  isBookmarked = false,
  isSelectedForComparison = false,
}: OptimizedMentorCardProps) {
  const handleBookmark = useCallback(() => {
    onBookmark?.(name);
  }, [onBookmark, name]);

  const handleCompare = useCallback(() => {
    onCompare?.({ name, title, description, skills, avatarInitials, avatarColor, rating, sessions, profileHref });
  }, [onCompare, name, title, description, skills, avatarInitials, avatarColor, rating, sessions, profileHref]);

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 w-14 h-14 rounded-2xl ${avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}
            aria-hidden="true"
          >
            {avatarInitials}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{name}</h3>
            <p className="text-sm text-indigo-600 font-medium truncate">{title}</p>

            <div className="flex items-center gap-1.5 mt-1">
              <svg
                className="w-4 h-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-slate-800">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-500">· {sessions} sessions</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">{description}</p>
      </div>

      <div className="px-6 pb-4 flex flex-wrap gap-2" aria-label={`${name}'s skills`}>
        {skills.slice(0, 4).map((skill) => (
          <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">
            +{skills.length - 4} more
          </span>
        )}
      </div>

      <div className="mt-auto px-6 pb-6">
        {children ? (
          <>
            {children}
            <Link
              href={profileHref}
              className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-3"
              aria-label={`View ${name}'s profile`}
            >
              View profile
            </Link>
          </>
        ) : (
          <Link
            href={profileHref}
            className="block w-full text-center px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`View ${name}'s profile`}
          >
            View profile
          </Link>
        )}
      </div>
    </article>
  );
});

OptimizedMentorCard.displayName = "OptimizedMentorCard";

export default OptimizedMentorCard;