// components/landing/HeroSection.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full bg-gradient-to-r from-white to-purple-50 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl"
        >
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
            className="inline-block rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2 md:text-base"
          >
            Get Started
          </Link>
        </div>

        {/* Optional image row (matches your design preview) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          
          {/* Card 1 */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor1.jpg"
              alt="Portrait of Colin Brown, Leadership mentor"
              className="w-full h-40 object-cover"
            />
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative w-full h-40">
              <Image
                src="/Image (Cole Hathans).svg"
                alt="Colin Brown - Leadership Mentor"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y3ZjdmNyIvPjwvc3ZnPg=="
              />
            </div>
            <div className="p-3 text-left">
              <p className="font-medium text-sm">Colin Brown</p>
              <p className="text-xs text-gray-500">Leadership</p>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor2.jpg"
              alt="Portrait of Sarah Johnson, Product Design mentor"
              className="w-full h-40 object-cover"
            />
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative w-full h-40">
              <Image
                src="/Image (Sarah Johnson).svg"
                alt="Sarah Johnson - Product Design Mentor"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y3ZjdmNyIvPjwvc3ZnPg=="
              />
            </div>
            <div className="p-3 text-left">
              <p className="font-medium text-sm">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Product Design</p>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src="/images/mentor3.jpg"
              alt="Portrait of James Williams, Business Strategy mentor"
              className="w-full h-40 object-cover"
            />
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative w-full h-40">
              <Image
                src="/Image (Marcus Williams).svg"
                alt="James Williams - Business Strategy Mentor"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iI2Y3ZjdmNyIvPjwvc3ZnPg=="
              />
            </div>
            <div className="p-3 text-left">
              <p className="font-medium text-sm">James Williams</p>
              <p className="text-xs text-gray-500">Business Strategy</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}