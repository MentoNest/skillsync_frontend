import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mentorApi, ApiError } from "@/lib/api";
import MentorRating from "@/components/mentor-discovery/MentorRating";

// Mentor profiles are user-specific and served from the mock API, so render
// per request rather than prerendering at build time.
export const dynamic = "force-dynamic";

interface MentorProfilePageProps {
  params: Promise<{ mentorId: string }>;
}

const EXPERIENCE_LABELS: Record<string, string> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  lead: "Lead",
  principal: "Principal",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  available: "Available now",
  busy: "Limited availability",
  unavailable: "Currently unavailable",
};

const AVAILABILITY_DOT_CLASSES: Record<string, string> = {
  available: "bg-emerald-500",
  busy: "bg-amber-500",
  unavailable: "bg-slate-400",
};

async function getMentor(mentorId: string) {
  try {
    return await mentorApi.getMentorById(mentorId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({
  params,
}: MentorProfilePageProps): Promise<Metadata> {
  const { mentorId } = await params;
  const mentor = await getMentor(mentorId);

  if (!mentor) {
    return { title: "Mentor not found | SkillSync" };
  }

  return {
    title: `${mentor.name} | SkillSync`,
    description: mentor.bio.slice(0, 155),
  };
}

export default async function MentorProfilePage({
  params,
}: MentorProfilePageProps) {
  const { mentorId } = await params;
  const mentor = await getMentor(mentorId);

  if (!mentor) {
    notFound();
  }

  const initials = mentor.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const experienceLabel =
    EXPERIENCE_LABELS[mentor.experienceLevel] ?? mentor.experienceLevel;
  const availabilityLabel =
    AVAILABILITY_LABELS[mentor.availability] ?? mentor.availability;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/mentee/mentors"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
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
        </nav>

        <article
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          aria-labelledby="mentor-name"
        >
          <header className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {mentor.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mentor.avatar}
                  alt=""
                  className="shrink-0 w-24 h-24 rounded-2xl object-cover bg-slate-100"
                />
              ) : (
                <div
                  className="shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br from-indigo-500 to-cyan-500"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1
                  id="mentor-name"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                >
                  {mentor.name}
                </h1>
                <p className="mt-1 text-indigo-600 font-medium">
                  {mentor.headline}
                </p>

                <div className="mt-3">
                  <MentorRating
                    rating={mentor.rating}
                    ratingCount={mentor.sessions}
                    countLabel="sessions"
                    formatCount={(count) => `· ${count.toLocaleString()} sessions`}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        AVAILABILITY_DOT_CLASSES[mentor.availability] ??
                        "bg-slate-400"
                      }`}
                      aria-hidden="true"
                    />
                    {availabilityLabel}
                  </span>
                  <span>{mentor.industry}</span>
                  <span>{experienceLabel}</span>
                </div>
              </div>

              {mentor.hourlyRate !== undefined && (
                <div className="shrink-0 sm:text-right">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold tracking-tight">
                    ${mentor.hourlyRate}/hr
                  </span>
                </div>
              )}
            </div>
          </header>

          <div className="p-6 sm:p-8 space-y-8">
            <section aria-labelledby="about-heading">
              <h2
                id="about-heading"
                className="text-sm font-semibold uppercase tracking-wider text-slate-500"
              >
                About
              </h2>
              <p className="mt-3 text-slate-700 leading-relaxed whitespace-pre-line">
                {mentor.bio}
              </p>
            </section>

            {mentor.skills.length > 0 && (
              <section aria-labelledby="skills-heading">
                <h2
                  id="skills-heading"
                  className="text-sm font-semibold uppercase tracking-wider text-slate-500"
                >
                  Skills &amp; expertise
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-slate-200 p-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Rating
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {mentor.rating.toFixed(1)}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    / 5
                  </span>
                </dd>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Sessions
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {mentor.sessions.toLocaleString()}
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 p-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Experience
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {experienceLabel}
                </dd>
              </div>
            </dl>
          </div>

          <footer className="p-6 sm:p-8 pt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Book a session
              </Link>
              <Link
                href="/mentee/mentors"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Find another mentor
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
