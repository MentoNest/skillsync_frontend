import Link from "next/link";

const FEATURED = {
  name: "Amara Osei",
  title: "VP of Engineering · Flutterwave",
  bio: "I grew up through the IC-to-manager transition the hard way — with no playbook and a team that deserved better. Over the last twelve years I have built and led engineering orgs across three continents, and I now mentor engineers and new managers who want the accelerated version of what took me a decade to learn. My sessions are direct, practical, and built around whatever decision you are facing this week.",
  avatarInitials: "AO",
  avatarColor: "bg-gradient-to-br from-violet-600 to-indigo-600",
  expertise: [
    "IC → manager transitions",
    "Building and scaling eng orgs",
    "Executive communication",
    "Hiring and interview loops",
    "Career navigation at staff+",
  ],
  stats: [
    { value: "4.9", label: "Average rating" },
    { value: "240+", label: "Sessions completed" },
    { value: "12 yrs", label: "Engineering leadership" },
  ],
};

/**
 * Featured mentor spotlight (#1157).
 *
 * A single wide card, deliberately different in shape from the mentor grid
 * above it so the page reads as "here is the product, and here is one person
 * who embodies it" rather than a seventh grid card.
 */
export default function FeaturedMentorHighlight() {
  return (
    <section
      id="featured-mentor"
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 py-20 lg:py-28"
      aria-labelledby="featured-mentor-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Mentor spotlight
          </p>
          <h2
            id="featured-mentor-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Meet this month&rsquo;s featured mentor
          </h2>
        </header>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Profile column */}
            <div className="flex shrink-0 flex-col items-center gap-4 text-center lg:w-56 lg:items-start lg:text-left">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-white shadow-xl ${FEATURED.avatarColor}`}
                aria-hidden="true"
              >
                {FEATURED.avatarInitials}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{FEATURED.name}</h3>
                <p className="mt-1 text-sm font-medium text-cyan-300">
                  {FEATURED.title}
                </p>
              </div>
              <dl className="grid w-full grid-cols-3 gap-2 lg:grid-cols-1">
                {FEATURED.stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/5 px-3 py-2 text-center lg:text-left"
                  >
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <p className="text-lg font-bold text-white">{value}</p>
                      <p className="text-xs text-slate-400">{label}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Bio and expertise column */}
            <div className="min-w-0 flex-1">
              <p className="text-lg leading-relaxed text-slate-300">
                {FEATURED.bio}
              </p>

              <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Areas of expertise
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2" role="list">
                {FEATURED.expertise.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-200"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-900 transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Book a session with Amara
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
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  View all mentors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
