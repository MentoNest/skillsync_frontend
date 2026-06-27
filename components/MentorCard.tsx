import React from 'react';
import Link from 'next/link';
import MentorAvailabilityBadge, { AvailabilityStatus } from './MentorAvailabilityBadge';

interface MentorCardProps {
  mentorId: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  rating: number;
  reviewCount?: number;
  pricePerSession: number;
  skills: string[];
  profileHref?: string;
  onBook?: () => void;
}

export default function MentorCard({
  name,
  title,
  bio,
  avatarUrl,
  rating,
  reviewCount,
  pricePerSession,
  skills,
  profileHref,
  onBook,
}: MentorCardProps) {
  // Initials fallback when no avatar photo is provided
  role: string;
  description: string;
  avatarUrl: string;
  availability?: AvailabilityStatus;
}

export default function MentorCard({ mentorId, name, role, description }: MentorCardProps) {
export default function MentorCard({ name, role, description, availability = 'available' }: MentorCardProps) {
  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Deterministic gradient derived from name length so it never flickers
  const bgGradients = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-pink-500 to-rose-600',
  ];
  const gradient = bgGradients[name.length % bgGradients.length];

  // Clamp rating to [0, 5] and build filled/empty star counts
  const clampedRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalf = clampedRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const mentorSlug = name.toLowerCase().replace(/ /g, '-');
  const resolvedProfileHref = profileHref ?? `/mentors/${mentorSlug}`;

  return (
    <article className="w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between overflow-hidden group">
      {/* ── Card body ── */}
      <div className="p-6 flex flex-col gap-4">

        {/* Profile photo + verified badge */}
        <div className="flex items-start justify-between">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`Photo of ${name}`}
                className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300`}
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
          </div>

          <span className="bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verified
          </span>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Verified
            </span>
            <MentorAvailabilityBadge status={availability} />
          </div>
        </div>

        {/* Name + title */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {title}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2" aria-label={`Rating: ${clampedRating} out of 5`}>
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <StarIcon key={`full-${i}`} type="full" />
            ))}
            {/* Half star */}
            {hasHalf && <StarIcon type="half" />}
            {/* Empty stars */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <StarIcon key={`empty-${i}`} type="empty" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {clampedRating.toFixed(1)}
          </span>
          {reviewCount !== undefined && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount.toLocaleString()} reviews)
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {bio}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
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

      {/* ── Card footer: price + CTAs ── */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/60 flex items-center justify-between gap-3">
        {/* Price */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">per session</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
            ${pricePerSession}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
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

          <button
            onClick={onBook}
            className="text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            aria-label={`Book a session with ${name}`}
          >
            Book Session
          </button>
        </div>
      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-750 flex items-center justify-between">
        <Link 
          href={`/mentors/${mentorId}`}
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
          className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            availability === 'fully-booked'
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none dark:bg-gray-700 dark:text-gray-500'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500'
          }`}
          aria-label={`Book a session with ${name}`}
          aria-disabled={availability === 'fully-booked'}
          tabIndex={availability === 'fully-booked' ? -1 : undefined}
        >
          {availability === 'fully-booked' ? 'Unavailable' : 'Book Session'}
        </Link>
      </div>
    </article>
  );
}

// ── Inline SVG star icons (no external icon lib dependency) ──────────────────

interface StarIconProps {
  type: 'full' | 'half' | 'empty';
}

function StarIcon({ type }: StarIconProps) {
  if (type === 'full') {
    return (
      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }

  if (type === 'half') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 20 20" aria-hidden="true">
        {/* Left half filled */}
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
    );
  }

  // empty
  return (
    <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
