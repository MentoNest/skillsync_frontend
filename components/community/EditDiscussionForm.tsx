"use client";

import { useState } from "react";
import type { Discussion } from "@/lib/community-types";
import { RichTextEditor, richTextPlainLength } from "./RichTextEditor";

interface EditDiscussionFormProps {
  discussion: Discussion;
  onSaved: (updated: Discussion) => void;
  onCancel: () => void;
}

export function EditDiscussionForm({
  discussion,
  onSaved,
  onCancel,
}: EditDiscussionFormProps) {
  const [title, setTitle] = useState(discussion.title);
  const [content, setContent] = useState(discussion.content);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (richTextPlainLength(content) < 1) {
      setError("Content is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/community/discussions/${discussion.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": discussion.authorId,
        },
        body: JSON.stringify({ title: title.trim(), content }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Save failed (${res.status})`);
      }
      const data = await res.json();
      onSaved(data.discussion as Discussion);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Edit discussion
      </h2>
      <label className="block space-y-1">
        <span className="text-sm font-medium text-[var(--muted)]">Title</span>
        <input
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
        />
      </label>
      <div className="space-y-1">
        <span className="text-sm font-medium text-[var(--muted)]">Content</span>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
