import Link from "next/link";
import { notFound } from "next/navigation";
import StarRating from "@/components/ui/StarRating";
import MentorAvailabilityBadge from "@/components/MentorAvailabilityBadge";
import { MENTORS } from "../data/mockMentors";
import { MOCK_MENTORS } from "@/components/mentors/data";
import type { Mentor } from "@/lib/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mentorSlug(mentor: { name: string }): string {
  return slugify(mentor.name);
}

// Combine datasets ensuring all mentor IDs and slugs can be resolved
const ALL_MENTORS: Mentor[] = (MENTORS as unknown as Mentor[]).concat(
  (MOCK_MENTORS as unknown as Mentor[]).filter(
    (m) =>
      !(MENTORS as unknown as Mentor[]).some(
        (existing) =>
          (existing.id || existing.mentorId) === (m.id || m.mentorId),
      ),
  ),
);

interface MentorProfilePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const paramsList: { id: string }[] = [];
  ALL_MENTORS.forEach((mentor) => {
    const mainId = String(mentor.id || mentor.mentorId || "");
    if (mainId) paramsList.push({ id: mainId });
    const nameSlug = slugify(mentor.name);
    if (nameSlug && nameSlug !== mainId) paramsList.push({ id: nameSlug });
  });
  return paramsList;
}

function findMentor(rawId: string): Mentor | undefined {
  const normalised = decodeURIComponent(rawId).toLowerCase();
  return ALL_MENTORS.find((mentor) => {
    const canonicalId = String(
      mentor.id || mentor.mentorId || "",
    ).toLowerCase();
    const nameSlug = slugify(mentor.name);
    return (
      canonicalId === normalised ||
      nameSlug === normalised ||
      (mentor.id && mentorSlug(mentor) === normalised)
    );
  });
}

export default async function MentorProfilePage({
  params,
}: MentorProfilePageProps) {
  const { id } = await params;
  const mentor = findMentor(id);
  if (!mentor) notFound();

  const profileSlug = String(
    mentor.id || mentor.mentorId || slugify(mentor.name),
  );
  const headline = mentor.headline || mentor.title || mentor.role || "Mentor";
  const bio =
    mentor.bio ||
    mentor.description ||
    "Experienced professional offering mentorship and career guidance.";
  const rating = mentor.rating ?? 5.0;
  const reviewCount = mentor.reviewCount ?? 0;
  const skills = mentor.skills ?? [];
  const industries = mentor.industries ?? mentor.expertise ?? [];
  const experienceYears = String(
    mentor.yearsExperience ??
      (mentor as unknown as Record<string, unknown>).experienceYears ??
      5,
  );
  const experienceLevel = String(mentor.experienceLevel ?? "Senior");
  const isUnavailable = mentor.availability === "fully-booked";

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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
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
              {headline}
            </p>
            {mentor.company && (
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {mentor.company}
              </p>
            )}
          </div>
          <MentorAvailabilityBadge
            status={mentor.availability ?? "available"}
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <StarRating rating={rating} size="sm" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {rating.toFixed(1)} · {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        <p className="mt-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {bio}
        </p>

        {skills.length > 0 && (
          <section className="mt-6" aria-labelledby={`skills-${profileSlug}`}>
            <h2
              id={`skills-${profileSlug}`}
              className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Skills
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {industries.length > 0 && (
          <section
            className="mt-6"
            aria-labelledby={`industries-${profileSlug}`}
          >
            <h2
              id={`industries-${profileSlug}`}
              className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
              Expertise & Industries
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </section>
        )}

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-sm dark:border-gray-800">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Experience</dt>
            <dd className="mt-0.5 font-semibold text-gray-900 dark:text-white">
              {experienceLevel} · {experienceYears} yrs
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">Per session</dt>
            <dd className="mt-0.5 font-semibold text-gray-900 dark:text-white">
              ${mentor.pricePerSession ?? 100}
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
