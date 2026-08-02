"use client";

import Image from "next/image";
function StarIcon({
  className = "h-5 w-5 text-yellow-400",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

import type { Mentor } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl bg-white dark:bg-gray-800/50 shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            {mentor.avatarUrl ? (
              <Image
                className="rounded-full object-cover"
                src={mentor.avatarUrl}
                alt={mentor.name}
                fill
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {mentor.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mentor.title}
            </p>
            <div className="mt-2 flex items-center">
              <StarIcon
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                {mentor.rating} ({mentor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {mentor.bio}
        </p>
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Skills
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.skills?.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto border-t border-gray-100 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Starts from
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${mentor.pricePerSession}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                /session
              </span>
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
