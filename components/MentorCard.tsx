import Link from 'next/link';
import Avatar from './Avatar';
import MentorAvailabilityBadge from './MentorAvailabilityBadge';
import MentorSkillTag from './MentorSkillTag';
import StarRating from './ui/StarRating';
import { Mentor } from '@/lib/types';

export default function MentorCard({
  mentorId,
  id,
  name,
  role,
  title,
  description,
  bio,
  avatarUrl,
  rating,
  reviewCount,
  pricePerSession,
  skills,
  availability = 'available',
  isFeatured,
  profileHref,
  onBook,
  isBookmarked,
  onToggleBookmark,
}: Mentor) {
  const resolvedRole = role ?? title ?? '';
  const resolvedDescription = description ?? bio ?? '';

  // Deterministic gradient derived from name length so it never flickers
  const bgGradients = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-pink-500 to-rose-600',
  ];
  const gradient = bgGradients[name.length % bgGradients.length];

  const targetId = mentorId || id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const resolvedProfileHref = profileHref ?? `/mentors/${targetId}`;

  return (
    <article className="w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 dark:bg-gray-800 dark:border-gray-700/80 flex flex-col justify-between overflow-hidden group">
      <div className="p-6 flex flex-col gap-4">
        {/* Profile photo + verified badge + availability */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar
              src={avatarUrl}
              alt={`Photo of ${name}`}
              name={name}
              size="md"
              variant="rounded"
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={onToggleBookmark}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isBookmarked ? 'currentColor' : 'none'}
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

          <div className="flex flex-col items-end gap-2">
            {isFeatured && (
              <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 text-xs font-medium text-purple-700 dark:text-purple-400 border border-purple-200/80 dark:border-purple-800">
                Featured
              </span>
            )}
            <MentorAvailabilityBadge status={availability} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
            {name}
          </h3>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {resolvedRole}
          </p>
        </div>

        {rating !== undefined && (
          <div className="flex items-center gap-2" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
            <StarRating rating={rating} size="sm" />
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
          {resolvedDescription}
        </p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Skills">
            {skills.slice(0, 5).map((skill) => (
              <MentorSkillTag key={skill} skill={skill} />
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
            className="inline-flex items-center gap-1 text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            aria-label={`View profile of ${name}`}
          >
            View Profile
            <svg
              className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {availability !== 'fully-booked' && onBook && (
            <button
              onClick={onBook}
              className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={`Book a session with ${name}`}
            >
              Book
            </button>
          )}
          {availability === 'fully-booked' && (
            <span className="text-xs font-semibold bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 px-3 py-1.5 rounded-lg cursor-not-allowed">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}