"use client";

import React, { useState } from "react";

export interface ReplyItem {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  replies?: ReplyItem[];
}

interface ThreadedRepliesProps {
  commentId: string;
  initialReplies?: ReplyItem[];
}

export function ThreadedReplies({
  commentId,
  initialReplies = [],
}: ThreadedRepliesProps) {
  const [replies, setReplies] = useState<ReplyItem[]>(initialReplies);
  const [collapsed, setCollapsed] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply: ReplyItem = {
      id: `r-${Date.now()}`,
      author: "You",
      content: replyText.trim(),
      timestamp: "Just now",
    };

    setReplies((prev) => [...prev, newReply]);
    setReplyText("");
    setShowReplyForm(false);
  };

  return (
    <div className="ml-6 mt-3 pl-3 border-l-2 border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Reply
        </button>
        {replies.length > 0 && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs text-gray-500 hover:underline"
          >
            {collapsed ? `Show ${replies.length} replies` : "Collapse thread"}
          </button>
        )}
      </div>

      {showReplyForm && (
        <form onSubmit={handleAddReply} className="mb-3 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full text-xs p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="text-xs text-gray-500 px-2 py-1 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded font-medium hover:bg-blue-700"
            >
              Post Reply
            </button>
          </div>
        </form>
      )}

      {!collapsed && (
        <div className="space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 p-2.5 rounded text-xs">
              <div className="flex justify-between font-semibold text-gray-800">
                <span>{reply.author}</span>
                <span className="text-gray-400 font-normal">
                  {reply.timestamp}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
