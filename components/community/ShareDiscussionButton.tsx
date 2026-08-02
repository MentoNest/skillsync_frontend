"use client";

import React, { useState } from "react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareDiscussionButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
        return;
      } catch (_err) {
        // Fallback to clipboard if share cancelled or unavailable
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
    >
      <span>🔗</span>
      <span>{copied ? "Copied Link!" : "Share"}</span>
    </button>
  );
}
