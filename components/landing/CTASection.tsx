import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="cta-section relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-cyan-500/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_45%)] opacity-80 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Start your momentum</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Get matched with a mentor who helps you move faster.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Join SkillSync today to connect with experts, sharpen your career plan, and land the next role with confidence.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
            >
              Create your account
            </Link>
            <Link
              href="/mentors"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
            >
              Browse mentors
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/90 px-5 py-4 text-center ring-1 ring-white/10">
              <p className="text-3xl font-semibold text-white">14k+</p>
              <p className="mt-2 text-sm text-slate-400">Mentees supported</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 px-5 py-4 text-center ring-1 ring-white/10">
              <p className="text-3xl font-semibold text-white">98%</p>
              <p className="mt-2 text-sm text-slate-400">Success rate in growth outcomes</p>
            </div>
            <div className="rounded-3xl bg-slate-950/90 px-5 py-4 text-center ring-1 ring-white/10">
              <p className="text-3xl font-semibold text-white">Fast response</p>
              <p className="mt-2 text-sm text-slate-400">Mentor replies within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
