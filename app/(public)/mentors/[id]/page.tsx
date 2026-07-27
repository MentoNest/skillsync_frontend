import Link from 'next/link';
import { notFound } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';
import MentorAvailabilityBadge from '@/components/MentorAvailabilityBadge';
import { MENTORS, mentorSlug, type Mentor } from '../data/mockMentors';


interface MentorProfilePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return MENTORS.map((mentor) => ({ id: mentorSlug(mentor) }));
}

function findMentor(rawId: string): Mentor | undefined {
  // Accept either the canonical id or the humanised slug produced by
  // `generateStaticParams` / `mentorSlug`.
  const normalised = decodeURIComponent(rawId).toLowerCase();
  return MENTORS.find(
    (mentor) => mentor.id === rawId || mentorSlug(mentor) === normalised,
  );
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { id } = await params;
  const mentor = findMentor(id);
  if (!mentor) notFound();

  const profileSlug = mentorSlug(mentor);
  const isUnavailable = mentor.availability === 'fully-booked';

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/mentors"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to mentors
      </Link>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {mentor.name}
            </h1>
            <p className="mt-1 text-base font-semibold text-cyan-600 dark:text-cyan-400">
              {mentor.headline}
            </p>
          </div>
          <MentorAvailabilityBadge status={mentor.availability} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <StarRating rating={mentor.rating} size="sm" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {mentor.rating.toFixed(1)} · {mentor.reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <p className="mt-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {mentor.bio}
        </p>

        {mentor.skills.length > 0 ? (
          <section className="mt-6" aria-labelledby={`skills-${profileSlug}`}>
            <h2
              id={`skills-${profileSlug}`}
              className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Skills
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {mentor.skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {mentor.industries.length > 0 ? (
          <section className="mt-6" aria-labelledby={`industries-${profileSlug}`}>
            <h2
              id={`industries-${profileSlug}`}
              className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Industries
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {mentor.industries.map((industry) => (
                <li
                  key={industry}
                  className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-sm dark:border-gray-800">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Experience</dt>
            <dd className="mt-0.5 font-semibold text-gray-900 dark:text-white">
              {mentor.experienceLevel} · {mentor.yearsExperience} yrs
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Per session</dt>
            <dd className="mt-0.5 font-semibold text-gray-900 dark:text-white">
              ${mentor.pricePerSession}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {isUnavailable ? (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-400 dark:bg-gray-800 dark:text-gray-500"
            >
              Currently unavailable
            </button>
          ) : (
            <Link
              href={`/book/${profileSlug}`}
              className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Book a session
            </Link>
          )}
          <Link
            href="/mentors"
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Find another mentor
          </Link>
        </div>
      </div>
    </main>
  );
}
