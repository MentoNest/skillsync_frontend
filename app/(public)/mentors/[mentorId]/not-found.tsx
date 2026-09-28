import Link from "next/link";

export default function MentorProfileNotFound() {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 tracking-tight">
          Mentor not found
        </h1>
        <p className="mt-3 text-slate-600">
          This profile doesn&rsquo;t exist, or the mentor is no longer listed on
          SkillSync.
        </p>
        <Link
          href="/mentee/mentors"
          className="mt-8 inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Browse all mentors
        </Link>
      </div>
    </div>
  );
}
