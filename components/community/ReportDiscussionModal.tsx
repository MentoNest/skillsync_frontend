"use client";

import React, { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussionId: string;
}

export function ReportDiscussionModal({
  isOpen,
  onClose,
  discussionId,
}: ReportModalProps) {
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 className="text-lg font-bold mb-2">Report Discussion</h2>
        {submitted ? (
          <div className="p-4 bg-green-50 text-green-700 text-sm rounded">
            Report submitted successfully! A moderator will review it shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Reason for report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="Spam">Spam</option>
                <option value="Harassment">Harassment</option>
                <option value="Offensive Content">Offensive Content</option>
                <option value="Misinformation">Misinformation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Additional details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe why this discussion violates guidelines..."
                className="w-full border rounded p-2 text-sm h-24"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
