import StatCard, { StatCardProps } from "./StatCard";

interface PlatformStat extends StatCardProps {
  /** Accent colour applied to the value text */
  valueClassName?: string;
}

const PLATFORM_STATS: PlatformStat[] = [
  {
    value: "2,400+",
    label: "Vetted expert mentors",
    description: "Engineers, designers, PMs and founders across 14 industries.",
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
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3m-9 3a3 3 0 10-3-3"
        />
      </svg>
    ),
  },
  {
    value: "18k+",
    label: "Learners matched",
    description: "Mentorship pairings created since the platform launched.",
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
          d="M12 14l9 5-9-5-9 5 9-5zm0 0L3 9m9 5l9-5M3 9l9-5 9 5m0 0v10l-9 5-9-5V9"
        />
      </svg>
    ),
  },
  {
    value: "95%",
    label: "Session satisfaction",
    description: "Learners who would recommend their mentor to a colleague.",
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
          d="M11.48 3.5c.2-.32.64-.32.84 0l1.6 2.56a.6.6 0 00.45.32l2.83.41c.39.06.55.54.25.82l-2.05 2 .48 2.83c.07.39-.34.7-.7.51l-2.53-1.33-2.53 1.33a.5.5 0 01-.7-.51l.48-2.83-2.05-2a.5.5 0 01.25-.82l2.83-.41a.6.6 0 00.45-.32l1.6-2.56z"
        />
      </svg>
    ),
  },
  {
    value: "42",
    label: "Countries represented",
    description: "A global community learning from mentors across every timezone.",
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
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8.83 21a12 12 0 1111.114-11.114M12 3a12 12 0 00-8.83 18M12 3a9 9 0 00-9 9"
        />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section
      id="platform-stats"
      className="py-16 lg:py-20 bg-white"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Platform Statistics
          </span>
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Trusted by learners in 42 countries
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The numbers behind SkillSync &mdash; a mentorship marketplace built
            on real outcomes, not vanity metrics.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLATFORM_STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
