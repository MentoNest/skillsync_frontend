// components/landing/CTASection.tsx

'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-600 to-purple-800 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
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
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Find a Mentor
          </Link>
          <Link
            href="/mentor"
            className="inline-block bg-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-400 transition-colors duration-200 shadow-lg border border-purple-400"
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