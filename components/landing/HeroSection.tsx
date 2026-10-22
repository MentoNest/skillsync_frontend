import Link from "next/link";

const PROOF_POINTS = [
  { value: "2,400+", label: "Expert mentors" },
  { value: "18k+", label: "Learners matched" },
  { value: "95%", label: "Would recommend" },
];

/**
 * Landing page hero (#1155).
 *
 * Centered single-column composition: badge, headline, description, two CTAs,
 * then a proof strip. The previous two-column card layout pushed the CTAs below
 * the fold on short laptops; a centered stack keeps "Start for free" visible at
 * 1366×768 without shrinking the type.
 *
 * The section carries `pt-16` because the site navbar is `fixed`.
 */
export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-white pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-indigo-50/80 via-indigo-50/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100 opacity-60 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-700">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
          </span>
          Now matching learners with mentors
        </p>

        <h1
          id="hero-heading"
          className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          One conversation can{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
            change your career
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          SkillSync pairs you with mentors who have already done what you are
          trying to do. Skip the generic courses — get direct, personalised
          guidance from people who have walked the path.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Start for free
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="#mentors"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Browse mentors
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Free to join · No credit card required
        </p>

        <dl
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-slate-200 pt-8"
          aria-label="Platform statistics"
        >
          {PROOF_POINTS.map(({ value, label }) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <p className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">
                  {value}
                </p>
                <p className="mt-1 text-sm text-slate-600">{label}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
