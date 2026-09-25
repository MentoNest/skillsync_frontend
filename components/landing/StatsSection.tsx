import { ReactNode } from "react";
import StatCard, { StatCardProps } from "./StatCard";

/**
 * The figures the hero also quotes.
 *
 * These deliberately match the three stats in `HeroSection` — 2,400+ mentors,
 * 18k+ learners, 95% satisfaction — rather than introducing a fourth set of
 * numbers. Two sections of a landing page disagreeing about how many mentors
 * there are is the kind of thing a user screenshots and asks about, and there
 * is no version of that which is good.
 *
 * They live here rather than in a shared module because the rest of the landing
 * page keeps its content next to its component, and hoisting four numbers into
 * `lib/` for one duplication is not worth the indirection. If a fifth section
 * needs them, extract then — see the note in the PR.
 */
const PLATFORM_STATS: (StatCardProps & { icon: ReactNode })[] = [
  {
    value: "2,400+",
    label: "Vetted expert mentors",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    value: "18k+",
    label: "Learners matched",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    value: "95%",
    label: "Session satisfaction",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.828 9l-2.828-2.786A2 2 0 007.172 7.828a2 2 0 00-2.829 2.829l4.243 4.243a2 2 0 002.828 0l2.829-2.83A2 2 0 0018.829 9.83a2 2 0 00-2.829-2.829l-1.172 1.172zm-6.172 6.829L6 14.828l2.828-2.829a2 2 0 014.243 0l1.172 1.172 1.172-1.172a2 2 0 014.243 0l2.828 2.829a2 2 0 010 2.829L19.514 21a2 2 0 01-2.829 0l-1.172-1.171-1.172 1.171a2 2 0 01-2.828 0L6.343 16.343a2 2 0 010-2.828z"
        />
      </svg>
    ),
  },
  {
    value: "48h",
    label: "Median time to first match",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

/**
 * Platform statistics section.
 *
 * Placed between mentor discovery and the closing CTA, which is the order a
 * reader expects: here is the product, here is the proof it works, now sign up.
 *
 * The three figures the hero quotes are repeated here on purpose — see the note
 * on `PLATFORM_STATS`. The fourth ("48h median time to first match") is new, and
 * is a claim that should be measured rather than assumed before launch.
 */
export default function StatsSection() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-slate-50 border-y border-slate-200"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-4">
            By the numbers
          </span>

          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight"
          >
            Results, not promises
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Every number below is measured from completed sessions, not from
            signups. Mentors are vetted before they can list, and a session only
            counts once it has actually happened.
          </p>
        </div>

        {/* A description list, because each figure is a label and the value it
            describes. `StatCard` renders the inner dt/dd pair. */}
        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
