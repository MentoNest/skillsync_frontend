"use client";

import React, { useState } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  discussionTitle?: string;
}

export function DeleteDiscussionModal({
  isOpen,
  onClose,
  onConfirmDelete,
  discussionTitle = "this discussion",
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirmDelete();
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Delete Discussion</h2>
        <p className="text-xs text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{discussionTitle}</span>? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-semibold disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Discussion"}
          </button>
        </div>
      </div>
    </div>
  );
}
