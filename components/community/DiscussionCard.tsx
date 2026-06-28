'use client';

import { useState } from 'react';
import Avatar from '@/components/Avatar';
import CategoryBadge from '@/components/CategoryBadge';
import DiscussionMetadata from './DiscussionMetadata';
import ConfirmDialog from '@/components/ui/confirm-dialog';
import type { DiscussionCardProps } from '@/lib/community-types';

export default function DiscussionCard({ discussion, onLike, onBookmark, onClick, onDelete, currentUserId }: DiscussionCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAuthor = currentUserId === discussion.author.id;

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(discussion.id);
    setShowDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <article
        className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onClick?.(discussion.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(discussion.id); }}
      >
        <div className="flex items-start gap-3 mb-3">
          <Avatar
            src={discussion.author.avatarUrl}
            alt={discussion.author.name}
            name={discussion.author.name}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900 truncate">
                {discussion.author.name}
              </span>
              {discussion.author.role && (
                <span className="text-xs text-gray-500">{discussion.author.role}</span>
              )}
              <CategoryBadge category={discussion.category} />
            </div>
            <h3 className="text-base font-semibold text-gray-900 leading-snug">
              {discussion.title}
            </h3>
          </div>
          {isAuthor && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-gray-400 hover:text-red-600 transition-colors p-1"
              aria-label="Delete discussion"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        {discussion.tags && discussion.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {discussion.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <DiscussionMetadata metadata={discussion} onLike={onLike} onBookmark={onBookmark} />
      </article>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Discussion"
        message="Are you sure you want to delete this discussion? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
