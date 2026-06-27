import React from 'react';
import Link from 'next/link';
import Avatar from './Avatar';
import MentorAvailabilityBadge, { AvailabilityStatus } from './MentorAvailabilityBadge';

interface MentorCardProps {
  mentorId?: string;
  name: string;
  role: string;
  description: string;
  avatarUrl?: string | null;
  rating?: number;
  reviewCount?: number;
  pricePerSession?: number;
  skills?: string[];
  availability?: AvailabilityStatus;
  profileHref?: string;
  onBook?: () => void;
}

export default function MentorCard({
  mentorId,
  name,
  role,
  description,
  avatarUrl,
  rating,
  reviewCount,
  pricePerSession,
  skills,
  availability = 'available',
  profileHref,
  onBook,
}: MentorCardProps) {
  const resolvedProfileHref = profileHref ?? (mentorId ? `/mentors/${mentorId}` : '#');

  return (
    <article className="w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between overflow-hidden group">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <Avatar
            src={avatarUrl}
            alt={`Photo of ${name}`}
            name={name}
            size="md"
            variant="rounded"
            className="group-hover:scale-105 transition-transform duration-300"
          />

          <div className="flex flex-col items-end gap-2">
            <MentorAvailabilityBadge status={availability} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {role}
          </p>
        </div>

        {rating !== undefined && (
          <div className="flex items-center gap-2" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
            {reviewCount !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Skills">
            {skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-400"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{skills.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/60 flex items-center justify-between gap-3">
        {pricePerSession !== undefined && (
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">per session</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
              ${pricePerSession}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Link
            href={resolvedProfileHref}
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1 group/link focus:outline-none focus:underline"
            aria-label={`View profile of ${name}`}
          >
            Profile
            <svg
              className="w-4 h-4 transform group-hover/link:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {onBook && (
            <button
              onClick={onBook}
              className="text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              aria-label={`Book a session with ${name}`}
            >
              Book Session
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function renderStars(rating: number) {
  const clamped = Math.min(5, Math.max(0, rating));
  const full = Math.floor(clamped);
  const hasHalf = clamped - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg key="half" className="w-4 h-4" viewBox="0 0 20 20" aria-hidden="true">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-fill)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </>
  );
}
