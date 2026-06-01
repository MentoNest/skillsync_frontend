export default function WhyChooseUsSection() {
  return (
    <section className="why-choose-us bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Why SkillSync</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Mentorship designed for real career acceleration.</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Curated mentors</h3>
            <p className="mt-4 text-slate-300">Only experienced leaders who have grown teams, shipped products, and coached rising talent.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Fast, practical feedback</h3>
            <p className="mt-4 text-slate-300">Actionable sessions focused on outcomes like promotion, interview prep, and skill-proof career moves.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Flexible support</h3>
            <p className="mt-4 text-slate-300">Book one-off advisory calls, ongoing coaching, or tailored prep for your next career milestone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
