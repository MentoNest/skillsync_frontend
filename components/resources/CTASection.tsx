import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * CTASection — Full-width call-to-action encouraging users to sign up.
 *
 * Design intent:
 * - Rich purple-to-indigo gradient echoes the HeroSection palette so the
 *   page opens and closes with a cohesive visual bookend.
 * - Two buttons: primary "Get Started Free" (white-filled) and secondary
 *   "Explore Resources" (ghost/outline) to capture both high and low intent.
 * - Decorative blurred orbs add depth without extra network requests.
 * - Conversion-focused copy leads with the value proposition and removes
 *   friction by highlighting the free tier.
 *
 * Accessibility:
 * - Semantic <section> with aria-labelledby pointing at the heading.
 * - Decorative elements are aria-hidden.
 * - Both buttons have visible focus rings.
 * - Sufficient colour contrast on all text (white on dark gradient).
 */
export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900"
    >
      {/* ── Decorative orbs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[100px]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">

        {/* Eyebrow badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-100 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" aria-hidden="true" />
            Free to get started
          </span>
        </div>

        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Ready to accelerate{' '}
          <span className="block text-purple-200">your career?</span>
        </h2>

        {/* Supporting copy */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-purple-100/90 sm:text-lg">
          Join thousands of professionals using SkillSync to discover mentors,
          access curated resources, and take their next big step — completely free.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-purple-700 shadow-lg transition-all duration-200 hover:bg-purple-50 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Secondary */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
          >
            Explore Resources
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-xs text-purple-200/60">
          No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Free forever plan
        </p>
      </div>

      {/* ── Top fade from page background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/5 to-transparent dark:from-gray-900/10"
      />
    </section>
  );
}
