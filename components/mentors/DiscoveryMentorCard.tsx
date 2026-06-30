import Link from 'next/link';
import Image from 'next/image';
import StarRating from '@/components/ui/StarRating';
import MentorAvailabilityBadge from '@/components/MentorAvailabilityBadge';
import type { Mentor } from '@/lib/types';

interface DiscoveryMentorCardProps {
  mentor: Mentor;
}

/**
 * Deterministic gradient palette so avatars look consistent across renders.
 * Index is derived from the mentor's name so the gradient never flickers.
 */
const AVATAR_GRADIENTS = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-sky-600',
] as const;

function initialsFor(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function gradientFor(name: string): string {
  // Sum char codes so similar names don't accidentally collide visually.
  const hash = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const idx = hash % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

function slugFor(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

import MentorSkillTag from './MentorSkillTag';

export default function DiscoveryMentorCard({ mentor }: { mentor: Mentor }) {
  const initials = initialsFor(mentor.name);
  const gradient = gradientFor(mentor.name);
  const profileHref = `/mentors/${slugFor(mentor.name)}`;
  const isFullyBooked = mentor.availability === 'fully-booked';

  return (
    <article className="relative h-full flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 group overflow-hidden">
      <div className="p-6 flex flex-col gap-4 grow">
        {/* Avatar + availability badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              {mentor.isFeatured && (
                <div className="absolute -top-2 -right-2 z-10">
                  <span className="inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 text-xs font-medium text-purple-700 dark:text-purple-400 border border-purple-200/80 dark:border-purple-800">
                    Featured
                  </span>
                </div>
              )}
              {mentor.avatarUrl ? (
                <Image
                  src={mentor.avatarUrl}
                  alt={`Photo of ${mentor.name}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg font-bold shadow-md group-hover:scale-105 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}
            </div>
            <button
              onClick={mentor.onToggleBookmark}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={mentor.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={mentor.isBookmarked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
          <MentorAvailabilityBadge status={mentor.availability} />
        </div>

        {/* Identity */}
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
            {mentor.name}
          </h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 truncate">
            {mentor.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {mentor.company} · {mentor.experienceYears}+ yrs experience
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 flex-wrap" aria-label={`Rating: ${mentor.rating} out of 5`}>
          <StarRating rating={mentor.rating} size="sm" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
            {mentor.rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({mentor.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {mentor.bio}
        </p>

        {/* Expertise chips (a compact view) */}
        {mentor.expertise.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Areas of expertise">
            {mentor.expertise.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300"
              >
                {tag}
              </span>
            ))}
            {mentor.expertise.length > 2 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{mentor.expertise.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Skills */}
        {mentor.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Skills">
            {mentor.skills.map((skill) => (
              <MentorSkillTag key={skill} skill={skill} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: price + CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/60 flex items-center justify-between gap-3">
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            per session
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${mentor.pricePerSession}
          </span>
        </div>

        <Link
          href={profileHref}
          aria-disabled={isFullyBooked}
          tabIndex={isFullyBooked ? -1 : undefined}
          className={`inline-flex items-center gap-1 text-sm font-semibold rounded-lg px-3.5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            isFullyBooked
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none dark:bg-gray-700 dark:text-gray-500'
              : 'bg-cyan-600 text-white hover:bg-cyan-700'
          }`}
          aria-label={
            isFullyBooked
              ? `${mentor.name} is fully booked — view profile for waitlist`
              : `View profile and book a session with ${mentor.name}`
          }
        >
          View Profile
          {!isFullyBooked && (
            <svg
              className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </Link>
      </div>
    </article>
  );
}