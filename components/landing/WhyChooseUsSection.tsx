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
            <h3 className="text-xl font-semibold text-white">Curated mentors</h3>
            <p className="mt-4 text-slate-300">Only experienced leaders who have grown teams, shipped products, and coached rising talent.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Fast, practical feedback</h3>
            <p className="mt-4 text-slate-300">Actionable sessions focused on outcomes like promotion, interview prep, and skill-proof career moves.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Flexible support</h3>
            <p className="mt-4 text-slate-300">Book one-off advisory calls, ongoing coaching, or tailored prep for your next career milestone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
