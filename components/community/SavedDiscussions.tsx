"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DiscussionCard from "./DiscussionCard";
import {
  mergeBookmarkedDiscussions,
  removeBookmarkedDiscussionWithPersistence,
} from "../../lib/community/communityActions";
import { getSavedDiscussions } from "../../lib/community/discussionsApi";
import { useBookmarkedDiscussions } from "../../lib/community/useCommunityInteractions";

/** Saved/bookmarked discussions page body (#1460). */
export default function SavedDiscussions() {
  const bookmarked = useBookmarkedDiscussions();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    setIsSyncing(true);
    getSavedDiscussions()
      .then((posts) => {
        if (!cancelled) mergeBookmarkedDiscussions(posts);
      })
      .catch((syncError: unknown) => {
        if (!cancelled) {
          setError(
            syncError instanceof Error
              ? syncError.message
              : "Unable to refresh saved discussions. Showing locally saved items."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsSyncing(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    setError(null);
    try {
      await removeBookmarkedDiscussionWithPersistence(id);
    } catch (removeError: unknown) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "Unable to remove the bookmark. Please try again."
      );
    } finally {
      setRemovingId(undefined);
    }
  };

  if (bookmarked.length === 0 && !isSyncing) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3a2 2 0 00-2 2v16l7-4 7 4V5a2 2 0 00-2-2H5z"
          />
        </svg>
        <h2 className="mt-3 text-base font-semibold text-gray-900">
          No saved discussions yet
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Save a discussion from the community feed and it will appear here.
        </p>
        <Link
          href="/community"
          className="mt-5 inline-block rounded-lg bg-purple-700 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-800"
        >
          Browse discussions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      )}
      {isSyncing && (
        <p role="status" className="text-sm text-gray-500">
          Refreshing saved discussions…
        </p>
      )}
      {bookmarked.map((discussion) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          isBookmarked
          onToggleBookmark={handleRemove}
          isDeleting={removingId === discussion.id}
        />
      ))}
    </div>
  );
}
