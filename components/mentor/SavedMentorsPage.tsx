// Saved mentors page — lists mentors the mentee has bookmarked (#860).
"use client";

import React from "react";
import Link from "next/link";
import { useMentorListings } from "@/lib/hooks/use-mentor-listings";
import { useBookmarkedMentors } from "@/lib/hooks/use-bookmarked-mentors";
import MentorCard from "./MentorCard";
import { MentorCardSkeletonList } from "./MentorCardSkeleton";
import MentorEmptyState from "./MentorEmptyState";
import MentorBookmarkButton from "./MentorBookmarkButton";
import FollowButton from "@/components/common/FollowButton";

const SavedMentorsPage = () => {
  const { mentors, loading, error, refetch } = useMentorListings({});
  const { bookmarkedIds, toggleBookmark } = useBookmarkedMentors();

  const savedMentors = mentors.filter((mentor) => bookmarkedIds.includes(mentor.id));
  const isSavingMentors = loading && bookmarkedIds.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Saved Mentors</h1>
          <p className="mt-1 text-sm text-gray-500">
            {savedMentors.length} {savedMentors.length === 1 ? "mentor" : "mentors"} saved for later.
          </p>
        </div>
        <Link
          href="/mentors"
          className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Browse mentors
        </Link>
      </div>

      {error ? (
        <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">Something went wrong</p>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Try again
          </button>
        </div>
      ) : isSavingMentors ? (
        <div className="mt-8">
          <MentorCardSkeletonList count={3} />
        </div>
      ) : savedMentors.length === 0 ? (
        <div className="mt-8">
          <MentorEmptyState />
          <p className="text-center text-sm text-gray-500">
            Browse the{" "}
            <Link href="/mentors" className="font-medium text-primary-600 hover:underline">
              mentor directory
            </Link>{" "}
            and tap the bookmark icon to save mentors here.
          </p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
          {savedMentors.map((mentor) => (
            <li key={mentor.id}>
              <MentorCard
                mentor={mentor}
                actions={
                  <div className="flex items-center gap-2">
                    <FollowButton userId={mentor.id} userName={mentor.name} />
                    <MentorBookmarkButton
                      mentorId={mentor.id}
                      isBookmarked
                      onToggle={toggleBookmark}
                    />
                  </div>
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedMentorsPage;