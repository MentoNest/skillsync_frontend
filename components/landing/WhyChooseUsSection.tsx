import type { ReactNode } from 'react';

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Curated mentors only',
    description:
      'Every mentor is hand-vetted — proven leaders who have grown teams, shipped products, and coached rising talent at top companies.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast, practical feedback',
    description:
      'Sessions are outcome-focused — whether it is a promotion push, interview prep, or a skill gap, you leave with a concrete action plan.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible on your schedule',
    description:
      'Book a one-off advisory call, commit to ongoing coaching, or gear up for your next career milestone — on your terms.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Community-backed growth',
    description:
      'Join thousands of professionals levelling up together. Share wins, ask questions, and stay motivated inside the SkillSync network.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Track your progress',
    description:
      'Set goals with your mentor, track milestones, and measure the real impact each session has on your career trajectory.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Built for real outcomes',
    description:
      'From landing a new role to reaching Staff Engineer — our mentors have done it and they know exactly how to get you there.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section aria-labelledby="why-choose-us-heading" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Why SkillSync
          </p>
          <h2
            id="why-choose-us-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Mentorship designed for real career acceleration.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            We connect you with proven leaders who give you the guidance, feedback,
            and accountability you need to level up — fast.
          </p>
        </div>

        {/* Benefits grid */}
        <ul
          role="list"
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.08]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                {benefit.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-white">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
