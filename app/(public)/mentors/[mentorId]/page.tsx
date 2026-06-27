import Link from 'next/link';
import { notFound } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';
import MentorAvailabilityBadge from '@/components/MentorAvailabilityBadge';
import { MENTORS, mentorSlug, type Mentor } from '../data/mockMentors';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import MentorAvailabilityBadge from '@/components/MentorAvailabilityBadge';

const mentors = [
  {
    id: 'sarah-doe',
    name: 'Sarah Doe',
    role: 'Software Engineer @ Google',
    description:
      'Expert in React, Node.js, and cloud infrastructure. Sarah has over 10 years of experience building scalable web applications and mentoring junior engineers.',
    avatarUrl: '/avatars/sarah.svg',
    availability: 'available' as const,
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'System Design'],
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    role: 'Product Manager @ Microsoft',
    description:
      'Specializes in product strategy and user-centric design. John has led cross-functional teams to deliver products used by millions worldwide.',
    avatarUrl: '/avatars/john.svg',
    availability: 'busy' as const,
    skills: ['Product Strategy', 'UX Research', 'Agile', 'Data Analytics'],
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: 'jane-roe',
    name: 'Jane Roe',
    role: 'UX Designer @ Apple',
    description:
      'Passionate about creating beautiful and intuitive user experiences. Jane has designed interfaces for award-winning applications with millions of active users.',
    avatarUrl: '/avatars/jane.svg',
    availability: 'available' as const,
    skills: ['UI Design', 'Figma', 'Design Systems', 'User Research', 'Prototyping'],
    rating: 4.8,
    reviewCount: 156,
  },
];

interface MentorProfilePageProps {
  params: Promise<{ mentorId: string }>;
}

export function generateStaticParams() {
  return MENTORS.map((mentor) => ({ mentorId: mentorSlug(mentor) }));
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
  const { mentorId } = await params;
  const mentor = findMentor(mentorId);
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
export default function MentorProfilePage({ params }: MentorProfilePageProps) {
  const mentor = mentors.find((m) => m.id === params.mentorId);

  if (!mentor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/80 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-32 sm:h-40" />

          <div className="px-6 sm:px-10 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 sm:-mt-20">
              <Avatar
                src={mentor.avatarUrl}
                alt={`Photo of ${mentor.name}`}
                name={mentor.name}
                size="xl"
                variant="circle"
                className="ring-4 ring-white dark:ring-gray-800 shadow-lg"
                priority
              />

              <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
                      {mentor.name}
                    </h1>
                    <p className="text-base sm:text-lg font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                      {mentor.role}
                    </p>
                  </div>
                  <MentorAvailabilityBadge status={mentor.availability} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {mentor.description}
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700/60">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Stats
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">Rating</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {mentor.rating}
                        </span>
                        <div className="flex items-center gap-0.5" aria-hidden="true">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(mentor.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">Reviews</span>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {mentor.reviewCount}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
