import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">Mentorship for every step</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Get the guidance you need to move faster in your career.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Connect with hand-picked mentors from top companies who help you sharpen your goals, prepare for promotion, and land the next role with confidence.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Join SkillSync
              </Link>
              <Link
                href="/mentors"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Explore mentors
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Featured mentor</p>
            <h2 className="mt-6 text-3xl font-semibold">Launch your next promotion with expert support</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Our mentors have guided thousands of professionals through high-impact career decisions, technical interviews, and leadership growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
