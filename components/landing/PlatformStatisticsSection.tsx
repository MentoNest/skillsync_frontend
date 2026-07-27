interface Stat {
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: '500+',
    label: 'Verified mentors',
    description: 'Rigorously vetted professionals from leading companies',
  },
  {
    value: '10k+',
    label: 'Mentees guided',
    description: 'Professionals accelerating their careers on SkillSync',
  },
  {
    value: '92%',
    label: 'Return rate',
    description: 'Mentees who book a second session after their first',
  },
  {
    value: '4.9/5',
    label: 'Average rating',
    description: 'Consistent quality across every mentoring session',
  },
];

export default function PlatformStatisticsSection() {
  return (
    <section aria-labelledby="platform-stats-heading" className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Our impact in numbers
          </p>
          <h2
            id="platform-stats-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Trusted by professionals worldwide.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            Real numbers from real people who have invested in their growth through SkillSync.
          </p>
        </div>

        {/* Stats grid */}
        <dl className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center transition duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <dt className="order-2 mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {stat.label}
              </dt>
              <dd className="order-1 text-5xl font-bold tracking-tight text-white">
                {stat.value}
              </dd>
              <p className="order-3 mt-3 text-sm leading-6 text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
