import React from 'react';

interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    initials: 'AK',
    quote:
      "SkillSync connected me with a mentor who completely transformed my approach to system design. Within three months, I earned my first promotion to senior engineer.",
    name: 'Alex Kim',
    role: 'Senior Engineer at Stripe',
  },
  {
    initials: 'MJ',
    quote:
      "The structured learning paths and one-on-one mentorship helped me transition from marketing to product management in just six months. Best career decision I have ever made.",
    name: 'Maria Johnson',
    role: 'Product Manager at Airbnb',
  },
  {
    initials: 'DT',
    quote:
      "I was stuck in my career growth until I found SkillSync. My mentor gave me the honest feedback and strategic guidance I needed to break through to the next level.",
    name: 'David Thompson',
    role: 'Engineering Manager at Spotify',
  },
  {
    initials: 'SR',
    quote:
      "The community aspect sets SkillSync apart. I joined for mentorship but gained a network of incredible peers who constantly challenge and support me.",
    name: 'Sarah Rivera',
    role: 'UX Lead at Figma',
  },
];

// Deterministic gradient based on initials
const gradients = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-fuchsia-600',
];

function getGradient(initials: string): string {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-slate-50 dark:bg-gray-800/40 py-16 sm:py-20 border-t border-gray-100 dark:border-gray-800 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            What our community says
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Real stories from professionals who transformed their careers through
            SkillSync.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => {
            const gradient = getGradient(testimonial.initials);
            return (
              <article
                key={testimonial.name}
                className="flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
