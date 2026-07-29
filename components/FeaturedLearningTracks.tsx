import React from "react";
import Link from "next/link";
import LearningTrackCard from "@/components/LearningTrackCard";

export interface LearningTrack {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  lessons: number;
  duration: string;
  href: string;
}

export const defaultFeaturedTracks: LearningTrack[] = [
  {
    title: "Frontend Development",
    category: "Engineering",
    description:
      "Master HTML, CSS, JavaScript, and modern frameworks like React and Next.js to build fast, responsive user interfaces.",
    lessons: 24,
    duration: "9h 15m",
    imageSrc: "/file.svg",
    href: "/resources/tracks/frontend-development",
  },
  {
    title: "Data Science & Analytics",
    category: "Data",
    description:
      "Apply data-driven thinking, analytics, statistical modeling, and machine learning to solve real-world industry problems.",
    lessons: 20,
    duration: "7h 45m",
    imageSrc: "/file.svg",
    href: "/resources/tracks/data-science",
  },
  {
    title: "Product Management",
    category: "Product",
    description:
      "Master product strategy, user research, roadmapping, and cross-functional execution to build products users love.",
    lessons: 14,
    duration: "5h 10m",
    imageSrc: "/file.svg",
    href: "/resources/tracks/product-management",
  },
];

export interface FeaturedLearningTracksProps {
  tracks?: LearningTrack[];
  className?: string;
}

export default function FeaturedLearningTracks({
  tracks = defaultFeaturedTracks,
  className = "",
}: FeaturedLearningTracksProps) {
  const featuredTracks = tracks.slice(0, 3);

  return (
    <section
      className={`bg-gray-50 dark:bg-gray-800/40 py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-150 dark:border-gray-850 transition-colors ${className}`}
      aria-labelledby="featured-tracks-heading"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between mb-8">
          <h2
            id="featured-tracks-heading"
            className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Featured Learning Tracks
          </h2>
          <Link
            href="/resources/tracks"
            className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors focus:outline-none focus:underline flex items-center gap-1"
          >
            View All
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredTracks.map((track, index) => (
            <LearningTrackCard
              key={track.title}
              {...track}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
