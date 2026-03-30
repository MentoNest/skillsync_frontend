'use client';

import Link from 'next/link';

export default function ToolsTemplatesSection() {
  return (
    <section aria-labelledby="tools-heading" className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-600 font-semibold">
            Tools & Templates
          </p>
          <h2 id="tools-heading" className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Build faster with polished career tools.
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Access ready-made resume and career planning resources designed to help you define your next move with confidence.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-8 text-white shadow-[0_30px_80px_rgba(99,102,241,0.18)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.35),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.25),_transparent_35%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Resume Builder
                </p>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">
                  Create a resume that stands out.
                </h3>
                <p className="mt-4 text-sm leading-7 text-purple-100 sm:text-base">
                  Choose from professional templates, customize your experience, and export a clean resume ready for every opportunity.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-950"
                >
                  Get Started
                </Link>
                <span className="text-xs text-purple-200">Built for quick customization and polished results.</span>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-950 via-violet-950 to-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(168,85,247,0.18)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,121,249,0.32),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(124,58,237,0.3),_transparent_40%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                  Career Planner
                </p>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">
                  Plan your next career milestone.
                </h3>
                <p className="mt-4 text-sm leading-7 text-fuchsia-100 sm:text-base">
                  Map out goals, track progress, and stay aligned with the next step in your professional journey.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-purple-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-fuchsia-950"
                >
                  Start Planning
                </Link>
                <span className="text-xs text-fuchsia-200">Designed for clarity, momentum, and confident decision-making.</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
