"use client";

import React, { useState } from "react";

interface AddCommentProps {
  discussionId: string;
  onCommentAdded?: (comment: { id: string; content: string }) => void;
}

export function AddCommentForm({
  discussionId,
  onCommentAdded,
}: AddCommentProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment content cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call & optimistic update
    setTimeout(() => {
      const newComment = { id: `c-${Date.now()}`, content: content.trim() };
      if (onCommentAdded) onCommentAdded(newComment);
      setContent("");
      setLoading(false);
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-4 border rounded-lg shadow-sm"
    >
      <h3 className="text-sm font-bold text-gray-800">Add a Comment</h3>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts or feedback on this discussion..."
        className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Posting..." : "Submit Comment"}
        </button>
      </div>
    </form>
  );
}
