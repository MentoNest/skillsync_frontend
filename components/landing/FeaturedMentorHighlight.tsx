import React from "react";
import Link from "next/link";

const featuredMentor = {
  name: "Sarah Doe",
  title: "Software Engineer @ Google",
  bio: "With over 10 years of experience building scalable systems at Google, Sarah specialises in React, Node.js, and cloud infrastructure. She has mentored 200+ engineers through career transitions and is passionate about making senior-level engineering accessible to everyone.",
  initials: "SD",
  stats: [
    { label: "Sessions", value: "340+" },
    { label: "Rating", value: "4.9/5" },
    { label: "Mentees", value: "200+" },
  ],
  expertise: [
    "React",
    "System Design",
    "Cloud Architecture",
    "Tech Leadership",
  ],
};

const gradients = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
];

function getGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export default function FeaturedMentorHighlight() {
  const gradient = getGradient(featuredMentor.name);

  return (
    <section
      aria-labelledby="featured-mentor-heading"
      className="bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-sm text-center mb-10 lg:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Mentor Spotlight
          </p>
          <h2
            id="featured-mentor-heading"
            className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            Featured Mentor of the Month
          </h2>
        </div>

        <article className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Avatar side */}
            <div className="flex items-center justify-center p-8 lg:p-12 lg:col-span-2 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50">
              <div className="relative">
                <div
                  className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-5xl sm:text-6xl font-bold shadow-2xl`}
                  aria-hidden="true"
                >
                  {featuredMentor.initials}
                </div>
                <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                  Featured
                </span>
              </div>
            </div>

            {/* Info side */}
            <div className="flex flex-col justify-center p-8 lg:p-12 lg:col-span-3 gap-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {featuredMentor.name}
                </h3>
                <p className="mt-1 text-base font-semibold text-cyan-600 dark:text-cyan-400">
                  {featuredMentor.title}
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                {featuredMentor.bio}
              </p>

              {/* Stats */}
              <dl className="grid grid-cols-3 gap-4 mt-1">
                {featuredMentor.stats.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Expertise tags */}
              <div
                className="flex flex-wrap gap-2"
                aria-label="Areas of expertise"
              >
                {featuredMentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 mt-1">
                <Link
                  href="/mentors/sarah-doe"
                  className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-900 transition-colors"
                >
                  View Profile
                  <svg
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
