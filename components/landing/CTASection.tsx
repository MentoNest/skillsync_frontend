import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700" aria-hidden="true" />

      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest mb-6">
          Get started today
        </span>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          Your next career breakthrough
          <br className="hidden sm:block" />
          <span className="text-indigo-200"> starts with the right mentor.</span>
        </h2>

        {/* Supporting copy */}
        <p className="mt-6 text-lg sm:text-xl text-indigo-200 leading-relaxed max-w-2xl mx-auto">
          Join over 18,000 learners who are closing skill gaps, landing dream roles,
          and growing with guidance from people who&rsquo;ve done it before.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
          >
            Create free account
            <svg
              className="ml-2 w-5 h-5"
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
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-transparent text-white font-bold text-base border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
          >
            Discover mentors
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-indigo-200">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">2,400+ vetted mentors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
