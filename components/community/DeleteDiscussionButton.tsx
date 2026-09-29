"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  discussionId: string;
  authorId: string;
  title: string;
  /** Called after successful delete (before navigation) */
  onDeleted?: () => void;
}

export function DeleteDiscussionButton({
  discussionId,
  authorId,
  title,
  onDeleted,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const confirmDelete = async () => {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/community/discussions/${discussionId}`, {
        method: "DELETE",
        headers: { "x-user-id": authorId },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Delete failed (${res.status})`);
      }
      setSuccess(true);
      onDeleted?.();
      // Remove from feed caches by navigating home after short feedback
      setTimeout(() => {
        router.push("/community");
        router.refresh();
      }, 600);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
      setPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
      >
        Delete
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-discussion-title"
        >
          <div className="w-full max-w-md rounded-xl bg-[var(--background)] p-6 shadow-xl border border-[var(--border)]">
            <h2
              id="delete-discussion-title"
              className="text-lg font-semibold text-[var(--foreground)]"
            >
              Delete discussion?
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              This will permanently remove{" "}
              <strong className="text-[var(--foreground)]">{title}</strong> and
              its comments from the community feed.
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-2 text-sm text-emerald-600" role="status">
                Discussion deleted. Returning to the feed…
              </p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                disabled={pending || success}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending || success}
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-60"
              >
                {pending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
