"use client";

import { useEffect, useRef, useState } from "react";
import { communityApi } from "@/lib/community-api";
import { trackDiscussionShared } from "@/lib/community-analytics";
import {
  isNativeShareSupported,
  shareDiscussion,
  type ShareMethod,
} from "@/lib/share";
import { buildDiscussionPath, type Discussion } from "@/lib/community-types";

interface ShareDiscussionButtonProps {
  discussion: Pick<Discussion, "id" | "title" | "category">;
  /** Rendered next to the button, e.g. the running share count. */
  shareCount?: number;
  onShareCountChange?: (shareCount: number) => void;
  className?: string;
}

/**
 * Share control for a discussion (#1016).
 *
 * Opens a small menu offering "Copy link" everywhere and the native device
 * share sheet where the Web Share API is available. The canonical link is
 * always derived from the discussion route so the URL works outside the app.
 */
export function ShareDiscussionButton({
  discussion,
  shareCount = 0,
  onShareCountChange,
  className = "",
}: ShareDiscussionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const [count, setCount] = useState(shareCount);
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Keep the displayed count in sync when the parent re-fetches the feed.
  useEffect(() => {
    setCount(shareCount);
  }, [shareCount]);

  // Native share support can only be detected after mount on the client.
  useEffect(() => {
    setSupportsNativeShare(isNativeShareSupported());
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const discussionUrl = buildDiscussionPath(discussion);

  async function recordShare(method: ShareMethod) {
    if (method === "cancelled" || method === "manual") return;

    try {
      const result = await communityApi.shareDiscussion(
        discussion.id,
        method === "native" ? "native" : "clipboard"
      );
      trackDiscussionShared(discussion.id);
      if (typeof result?.shareCount === "number") {
        setCount(result.shareCount);
        onShareCountChange?.(result.shareCount);
      }
    } catch {
      // Sharing already succeeded locally; analytics must not break the flow.
    }
  }

  /**
   * Runs the best available transport for the current device: the native share
   * sheet where supported, otherwise a clipboard copy (or an inline link when
   * even that is blocked).
   */
  async function runShare() {
    setIsOpen(false);
    setError(null);

    const result = await shareDiscussion({
      title: discussion.title,
      url: new URL(discussionUrl, window.location.origin).toString(),
    });

    setStatus(result.message);
    // "manual" means neither the share sheet nor the clipboard worked, so the
    // link is rendered inline for the reader to copy by hand.
    if (result.method === "manual") setError(result.message);
    void recordShare(result.method);
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Share discussion: ${discussion.title}`}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.489l6.632 3.818M8.684 10.511l6.632-3.818M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Share</span>
        {count > 0 && (
          <span className="text-[var(--muted)]" aria-hidden="true">
            {count}
          </span>
        )}
        <span className="sr-only">{count > 0 ? `, ${count} shares` : ""}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56">
          <div
            role="menu"
            aria-label="Share discussion"
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={runShare}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <svg
                className="h-4 w-4 text-[var(--muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.255 17.45l.067-.02a5 5 0 01-4.243-4.243l3.18-3.18a5 5 0 016.325 6.326l-1.234 1.233m-4.26-4.26a5 5 0 011.657-1.657l2.652-2.652a5 5 0 10-7.071-7.071l-1.542 1.542"
                />
              </svg>
              Copy link
            </button>

            {supportsNativeShare && (
              <button
                type="button"
                role="menuitem"
                onClick={runShare}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                <svg
                  className="h-4 w-4 text-[var(--muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7.217 10.907a2 2 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2 2 0 103.935 2.186 2 2 0 00-3.935-2.186zm0-12.814a2 2 0 103.933-2.185 2 2 0 00-3.933 2.185z"
                  />
                </svg>
                Share via device
              </button>
            )}
          </div>

          <p className="mt-1 rounded-lg border border-[var(--border)] bg-[var(--background)] p-2 text-xs text-[var(--muted)] shadow-lg">
            {supportsNativeShare
              ? "Copy the link, or open your device share sheet."
              : "Copies the discussion link to your clipboard."}
          </p>
        </div>
      )}

      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
      {error && (
        <span className="mt-1 block text-xs text-amber-700">
          {error}{" "}
          <span className="break-all">{discussionUrl}</span>
        </span>
      )}
    </div>
  );
}
