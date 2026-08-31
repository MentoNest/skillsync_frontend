"use client";

import { useState } from "react";

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ url, title, text, className }: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared" | "error">("idle");

  const fullUrl = url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`;

  async function handleShare() {
    const shareData = { title, text: text ?? title, url: fullUrl };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        setStatus("shared");
        setTimeout(() => setStatus("idle"), 2000);
        return;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") {
          setStatus("idle");
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(fullUrl);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      title="Share discussion"
      aria-label="Share discussion"
      className={className}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold transition-colors border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600`}
      >
        {status === "copied" ? (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : status === "shared" ? (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Shared!
          </>
        ) : status === "error" ? (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Failed
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </>
        )}
      </span>
    </button>
  );
}
