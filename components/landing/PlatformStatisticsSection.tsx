export default function PlatformStatisticsSection() {
  return (
    <section className="platform-statistics bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-4xl font-semibold">500+</p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">Verified mentors</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-4xl font-semibold">92%</p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">Return rate from mentees</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10">
            <p className="text-4xl font-semibold">4.9/5</p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">Average mentor rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
