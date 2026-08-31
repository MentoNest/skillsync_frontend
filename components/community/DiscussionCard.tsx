"use client";

import { useState, useCallback } from "react";
import LikeButton from "../common/LikeButton";
import ReportDialog from "./ReportDialog";

export interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  repliesCount: number;
  likeCount?: number;
}

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportConfirm, setReportConfirm] = useState(false);

  const handleReportClick = useCallback(() => {
    setShowReportDialog(true);
    setReportConfirm(false);
  }, []);

  const handleReportClose = useCallback(() => {
    setShowReportDialog(false);
  }, []);

  return (
    <>
      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {discussion.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {discussion.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>Started by {discussion.author}</span>
          <div className="flex items-center gap-3">
            <LikeButton id={`discussion-${discussion.id}`} initialCount={discussion.likeCount ?? 0} />
            <span>{discussion.repliesCount} replies</span>
            <button
              type="button"
              onClick={handleReportClick}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              title="Report this discussion"
              aria-label={`Report discussion: ${discussion.title}`}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Report
            </button>
          </div>
        </div>
        {reportConfirm && (
          <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
            Report submitted. Our team will review this discussion.
          </div>
        )}
      </article>

      {showReportDialog && (
        <ReportDialog
          discussionId={discussion.id}
          discussionTitle={discussion.title}
          onClose={handleReportClose}
        />
      )}
    </>
  );
};

export default DiscussionCard;
