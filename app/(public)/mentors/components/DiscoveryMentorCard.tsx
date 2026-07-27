import Link from 'next/link';
import StarRating from '@/components/ui/StarRating';
import MentorAvailabilityBadge from '@/components/MentorAvailabilityBadge';
import {
  mentorSlug,
  type Mentor,
} from '../data/mockMentors';

interface DiscoveryMentorCardProps {
  mentor: Mentor;
}

const AVATAR_GRADIENTS = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
];

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function deterministicGradient(name: string): string {
  // Hash by character code so the gradient is stable across renders.
  const seed = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[seed % AVATAR_GRADIENTS.length];
}

/**
 * Mentor card used inside the Discovery page.
 *
 * Built locally (instead of reusing the global MentorCard.tsx) because the
 * global card has duplicate interface / export declarations that fail a
 * strict compile. This component is purposely lean — it draws on the
 * project's visual language (rounded-2xl, cyan accents, StarRating,
 * MentorAvailabilityBadge) so it sits comfortably next to the rest of the
 * site.
 */
export default function DiscoveryMentorCard({ mentor }: DiscoveryMentorCardProps) {
  const profileHref = `/mentors/${mentorSlug(mentor)}`;
  const gradient = deterministicGradient(mentor.name);
  const initials = initialsFromName(mentor.name);

  const unavailable = mentor.availability === 'fully-booked';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between">
          {/* Avatar (image fallback → gradient initials) */}
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-md shadow-cyan-500/10 transition-transform duration-300 group-hover:scale-105 ${gradient}`}
            aria-hidden="true"
          >
            {initials || 'M'}
          </div>

          <MentorAvailabilityBadge
            status={mentor.availability}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
            {mentor.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-cyan-600 dark:text-cyan-400">
            {mentor.headline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={mentor.rating} size="sm" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {mentor.rating.toFixed(1)} · {mentor.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {mentor.bio}
        </p>

        {/* Skill chips */}
        {mentor.skills.length > 0 ? (
          <ul
            role="list"
            aria-label={`${mentor.name}'s skills`}
            className="flex flex-wrap gap-1.5"
          >
            {mentor.skills.slice(0, 4).map((skill) => (
              <li
                key={skill}
                className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
              >
                {skill}
              </li>
            ))}
            {mentor.skills.length > 4 ? (
              <li className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                +{mentor.skills.length - 4} more
              </li>
            ) : null}
          </ul>
        ) : null}

        {/* Industry chips */}
        {mentor.industries.length > 0 ? (
          <ul
            role="list"
            aria-label={`${mentor.name}'s industries`}
            className="flex flex-wrap gap-1.5"
          >
            {mentor.industries.slice(0, 2).map((industry) => (
              <li
                key={industry}
                className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                {industry}
              </li>
            ))}
            {mentor.industries.length > 2 ? (
              <li className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                +{mentor.industries.length - 2}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      {/* ── Footer / CTAs ────────────────────────────────────── */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900/60">
        <div className="flex flex-col">
          <span className="text-xs leading-none text-gray-500 dark:text-gray-400">
            per session
          </span>
          <span className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
            ${mentor.pricePerSession}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={profileHref}
            className="text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            aria-label={`View profile of ${mentor.name}`}
          >
            Profile
            <svg
              className="ml-1 inline h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {unavailable ? (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="cursor-not-allowed rounded-lg bg-gray-200 px-3.5 py-1.5 text-xs font-semibold text-gray-400 dark:bg-gray-800 dark:text-gray-500"
            >
              Unavailable
            </button>
          ) : (
            <Link
              href={`/book/${mentorSlug(mentor)}`}
              className="rounded-lg bg-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              aria-label={`Book a session with ${mentor.name}`}
            >
              Book Session
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
