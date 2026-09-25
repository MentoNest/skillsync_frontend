import Link from "next/link";

const stats = [
  { value: "2,400+", label: "Expert Mentors" },
  { value: "18k+", label: "Learners Matched" },
  { value: "95%", label: "Satisfaction Rate" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-100 opacity-40 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                Now live — join 18k+ learners
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
            >
              Accelerate your growth with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                expert mentors
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              SkillSync pairs you with seasoned professionals who have walked your
              path. Get personalised 1-on-1 guidance, actionable feedback, and the
              clarity you need to level up your career — faster.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Start for free
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
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-base border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Browse mentors
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              {/* Avatars */}
              <div className="flex -space-x-2" aria-hidden="true">
                {["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400"].map(
                  (color, i) => (
                    <span
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white ${color} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {["A", "B", "C", "D"][i]}
                    </span>
                  )
                )}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">4.9/5</span> from
                over 3,200 reviews
              </p>
            </div>
          </div>

          {/* Right: stats card visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Main card */}
              <div className="rounded-2xl bg-white shadow-2xl shadow-slate-200 p-6 border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                    SS
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Sarah Chen</p>
                    <p className="text-xs text-slate-500">Senior Product Designer</p>
                  </div>
                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Available
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  {["UX Research", "Design Systems", "Career Strategy"].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex mr-2 text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  &ldquo;I help designers transition into senior roles and build
                  systems that scale. Let&rsquo;s map your next career move.&rdquo;
                </p>

                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                >
                  Book a session
                </Link>
              </div>

              {/* Floating stat badge */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-slate-100 flex items-center gap-3"
              >
                <span className="text-2xl" role="img" aria-label="star">⭐</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Top Rated</p>
                  <p className="text-xs text-slate-500">500+ sessions</p>
                </div>
              </div>

              {/* Floating match badge */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 bg-indigo-600 rounded-xl shadow-lg px-4 py-3 text-white"
              >
                <p className="text-xs font-medium opacity-80">Matched for you</p>
                <p className="font-bold text-sm mt-0.5">98% fit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-6 sm:gap-10 border-t border-slate-200 pt-10">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{value}</p>
              <p className="mt-1 text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
