// components/landing/CTASection.tsx

'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="w-full bg-gradient-to-r from-purple-600 to-purple-800 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Headline */}
        <h2
          id="cta-heading"
          className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto"
        >
          Ready to Transform Your Career?
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-purple-100 text-base md:text-lg max-w-2xl mx-auto">
          Join thousands of professionals who are accelerating their growth with personalized mentorship.
          Start your journey today and unlock your potential.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mentee"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-700"
          >
            Find a Mentor
          </Link>
          <Link
            href="/mentor"
            className="inline-block rounded-lg border border-purple-400 bg-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-700"
          >
            Become a Mentor
          </Link>
        </div>

        {/* Additional encouragement */}
        <p className="mt-6 text-purple-200 text-sm">
          No credit card required • Start your free trial today
        </p>

      </div>
    </section>
  );
}