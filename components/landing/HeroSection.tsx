// components/landing/HeroSection.tsx

'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-white to-purple-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
          We Connect You with the Right{' '}
          <span className="text-purple-600">Mentors for your Growth</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 text-base md:text-lg max-w-2xl">
          Join thousands of learners building real-world skills with guidance
          from experienced mentors across tech, business, and more.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/get-started"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Optional image row (matches your design preview) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor1.jpg"
              alt="Mentor"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-left">
              <p className="font-medium text-sm">Colin Brown</p>
              <p className="text-xs text-gray-500">Leadership</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor2.jpg"
              alt="Mentor"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-left">
              <p className="font-medium text-sm">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Product Design</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor3.jpg"
              alt="Mentor"
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-left">
              <p className="font-medium text-sm">James Williams</p>
              <p className="text-xs text-gray-500">Business Strategy</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}