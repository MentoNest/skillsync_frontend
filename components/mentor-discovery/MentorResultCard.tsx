import Link from "next/link";
import type { Mentor } from "./mentorData";

export default function MentorResultCard({ mentor }: { mentor: Mentor }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-purple-300 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${mentor.avatarColor}`}
          aria-hidden="true"
        >
          {mentor.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900">{mentor.name}</h3>
          <p className="truncate text-sm text-purple-700">{mentor.title}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-purple-50 px-2.5 py-1 font-medium text-purple-700">
          {mentor.experience}
        </span>
        <span className="font-medium text-slate-700">
          Rating: {mentor.rating.toFixed(1)} / 5
        </span>
        <span className="text-slate-500">({mentor.sessions} sessions)</span>
        <span className="ml-auto font-semibold text-slate-900">
          ${mentor.hourlyRate}/hr
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{mentor.bio}</p>

      <p className="mt-3 text-xs text-slate-500">
        Industries: {mentor.industry.join(", ")}
      </p>

      <div
        className="mt-3 flex flex-wrap gap-1.5"
        aria-label={`${mentor.name} expertise`}
      >
        {mentor.expertise.map((item) => (
          <span
            key={item}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href="/register"
        className="mt-4 block rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
      >
        Book a session
      </Link>
    </article>
  );
}
